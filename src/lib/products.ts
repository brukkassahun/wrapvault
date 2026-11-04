/**
 * Products data layer — tries Supabase first, falls back to bundled data.
 * This allows the site to work immediately without Supabase configured,
 * and automatically uses Supabase when env vars are set on Vercel.
 */
import { supabaseAdmin } from "@/lib/supabase-admin";
import { products as bundledProducts, type Product } from "@/lib/products-data";

const isSupabaseReady =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.SUPABASE_SERVICE_ROLE_KEY &&
  process.env.SUPABASE_SERVICE_ROLE_KEY !== "your_service_role_key_here";

export type { Product };

export interface ProductQuery {
  category?: string;
  finish?: string;
  color?: string;
  series?: string;
  search?: string;
  sort?: "price-asc" | "price-desc" | "name" | "newest";
  page?: number;
  limit?: number;
  featured?: boolean;
}

export interface ProductResult {
  items: Product[];
  total: number;
  page: number;
  totalPages: number;
}

function filterBundled(query: ProductQuery): ProductResult {
  let items = [...bundledProducts];

  // Filters
  if (query.category) {
    items = items.filter((p) => p.category === query.category);
  }
  if (query.finish) {
    items = items.filter((p) => p.finish_type === query.finish);
  }
  if (query.color) {
    items = items.filter((p) => p.color_family === query.color);
  }
  if (query.series) {
    items = items.filter((p) => p.series === query.series);
  }
  if (query.featured) {
    items = items.filter((p) => p.featured);
  }
  if (query.search) {
    const q = query.search.toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.series.toLowerCase().includes(q) ||
        p.color_family.toLowerCase().includes(q),
    );
  }

  // Sort
  switch (query.sort) {
    case "price-asc":
      items.sort((a, b) => a.price_cny - b.price_cny);
      break;
    case "price-desc":
      items.sort((a, b) => b.price_cny - a.price_cny);
      break;
    case "name":
      items.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "newest":
    default:
      // Keep original order
      break;
  }

  const total = items.length;
  const page = query.page ?? 1;
  const limit = query.limit ?? 24;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginated = items.slice(start, start + limit);

  return { items: paginated, total, page, totalPages };
}

export async function getProducts(query: ProductQuery = {}): Promise<ProductResult> {
  if (!isSupabaseReady) {
    return filterBundled(query);
  }

  try {
    let dbQuery = supabaseAdmin
      .from("products")
      .select("*", { count: "exact" })
      .eq("status", "available");

    if (query.category) dbQuery = dbQuery.eq("category", query.category);
    if (query.finish) dbQuery = dbQuery.eq("finish_type", query.finish);
    if (query.color) dbQuery = dbQuery.eq("color_family", query.color);
    if (query.series) dbQuery = dbQuery.eq("series", query.series);
    if (query.featured) dbQuery = dbQuery.eq("featured", true);
    if (query.search) {
      dbQuery = dbQuery.or(
        `name.ilike.%${query.search}%,sku.ilike.%${query.search}%,series.ilike.%${query.search}%`,
      );
    }

    switch (query.sort) {
      case "price-asc":
        dbQuery = dbQuery.order("price_cny", { ascending: true });
        break;
      case "price-desc":
        dbQuery = dbQuery.order("price_cny", { ascending: false });
        break;
      case "name":
        dbQuery = dbQuery.order("name", { ascending: true });
        break;
      case "newest":
      default:
        dbQuery = dbQuery.order("created_at", { ascending: false });
        break;
    }

    const page = query.page ?? 1;
    const limit = query.limit ?? 24;
    const start = (page - 1) * limit;
    dbQuery = dbQuery.range(start, start + limit - 1);

    const { data, count, error } = await dbQuery;

    if (error || !data) {
      return filterBundled(query);
    }

    return {
      items: data as Product[],
      total: count ?? 0,
      page,
      totalPages: Math.ceil((count ?? 0) / limit),
    };
  } catch {
    return filterBundled(query);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseReady) {
    return bundledProducts.find((p) => p.slug === slug) ?? null;
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      return bundledProducts.find((p) => p.slug === slug) ?? null;
    }
    return data as Product;
  } catch {
    return bundledProducts.find((p) => p.slug === slug) ?? null;
  }
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  if (!isSupabaseReady) {
    return bundledProducts.filter((p) => p.featured).slice(0, limit);
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .eq("featured", true)
      .eq("status", "available")
      .limit(limit);

    if (error || !data || data.length === 0) {
      return bundledProducts.filter((p) => p.featured).slice(0, limit);
    }
    return data as Product[];
  } catch {
    return bundledProducts.filter((p) => p.featured).slice(0, limit);
  }
}

export async function getSimilarProducts(product: Product, limit = 3): Promise<Product[]> {
  if (!isSupabaseReady) {
    return bundledProducts
      .filter((p) => p.category === product.category && p.sku !== product.sku)
      .slice(0, limit);
  }

  try {
    const { data } = await supabaseAdmin
      .from("products")
      .select("*")
      .eq("category", product.category)
      .neq("sku", product.sku)
      .eq("status", "available")
      .limit(limit);

    if (!data || data.length === 0) {
      return bundledProducts
        .filter((p) => p.category === product.category && p.sku !== product.sku)
        .slice(0, limit);
    }
    return data as Product[];
  } catch {
    return bundledProducts
      .filter((p) => p.category === product.category && p.sku !== product.sku)
      .slice(0, limit);
  }
}

export async function getTotalProductCount(): Promise<number> {
  if (!isSupabaseReady) {
    return bundledProducts.length;
  }

  try {
    const { count } = await supabaseAdmin
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("status", "available");

    return count ?? bundledProducts.length;
  } catch {
    return bundledProducts.length;
  }
}
