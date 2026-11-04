import Link from "next/link";
import { getProducts, type Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import FilterBar from "@/components/FilterBar";
import Reveal from "@/components/Reveal";

export const revalidate = 300; // Revalidate every 5 minutes

const PRODUCTS_PER_PAGE = 24;

interface SearchParams {
  category?: string;
  finish?: string;
  color?: string;
  q?: string;
  sort?: string;
  page?: string;
}

async function getProductsData(searchParams: SearchParams) {
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);
  const sort = searchParams.sort === "price-asc" || searchParams.sort === "price-desc" || searchParams.sort === "name"
    ? searchParams.sort
    : "newest";

  const result = await getProducts({
    category: searchParams.category && searchParams.category !== "all" ? searchParams.category : undefined,
    finish: searchParams.finish && searchParams.finish !== "all" ? searchParams.finish : undefined,
    color: searchParams.color && searchParams.color !== "all" ? searchParams.color : undefined,
    search: searchParams.q,
    sort: sort as "price-asc" | "price-desc" | "name" | "newest",
    page,
    limit: PRODUCTS_PER_PAGE,
  });

  return {
    products: result.items as Product[],
    total: result.total,
    page: result.page,
    totalPages: result.totalPages,
    error: false,
  };
}

function buildPaginationHref(
  params: SearchParams,
  newPage: number
): string {
  const sp = new URLSearchParams();
  if (params.category) sp.set("category", params.category);
  if (params.finish) sp.set("finish", params.finish);
  if (params.color) sp.set("color", params.color);
  if (params.q) sp.set("q", params.q);
  if (params.sort) sp.set("sort", params.sort);
  if (newPage > 1) sp.set("page", String(newPage));
  const qs = sp.toString();
  return qs ? `/products?${qs}` : "/products";
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;

  // Normalize search params (handle arrays from repeated query params)
  const normalized: SearchParams = {
    category: Array.isArray(sp.category) ? sp.category[0] : sp.category,
    finish: Array.isArray(sp.finish) ? sp.finish[0] : sp.finish,
    color: Array.isArray(sp.color) ? sp.color[0] : sp.color,
    q: Array.isArray(sp.q) ? sp.q[0] : sp.q,
    sort: Array.isArray(sp.sort) ? sp.sort[0] : sp.sort,
    page: Array.isArray(sp.page) ? sp.page[0] : sp.page,
  };

  const { products, total, page, totalPages, error: fetchError } = await getProductsData(normalized);

  // Build filter context description
  const activeFilters: string[] = [];
  if (normalized.category === "pet-color-change") activeFilters.push("PET Color Change");
  if (normalized.category === "self-healing") activeFilters.push("Self-Healing PPF");
  if (normalized.finish && normalized.finish !== "all") activeFilters.push(normalized.finish);
  if (normalized.color && normalized.color !== "all") activeFilters.push(normalized.color);

  return (
    <>
      {/* ─── Page header ─── */}
      <section className="border-b border-ink-border bg-ink-light">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <nav className="mb-4 flex items-center gap-2 text-[11px] font-medium text-silver">
            <Link href="/" className="transition-colors hover:text-vault">Home</Link>
            <span className="text-ink-border">/</span>
            <span className="text-silver-bright">Products</span>
          </nav>

          <p className="eyebrow mb-3">
            <span className="text-vault">●</span> The Full Vault
          </p>

          <h1 className="display-lg text-silver-bright">
            {activeFilters.length > 0 ? activeFilters.join(" · ") : "All Wrap Films"}
          </h1>

          <p className="mt-2 max-w-xl text-sm text-silver">
            Browse our complete catalog of {total > 0 ? total : "700+"} premium wrap
            films. Filter by category, finish, and color to find your perfect match.
          </p>
        </div>
      </section>

      {/* ─── Filters + grid ─── */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* FilterBar (client component) */}
        <div className="mb-8">
          <FilterBar />
        </div>

        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-silver">
            {fetchError ? (
              "Unable to load products. Please try again."
            ) : total > 0 ? (
              <>
                Showing{" "}
                <span className="font-bold text-silver-bright">
                  {(page - 1) * PRODUCTS_PER_PAGE + 1}–
                  {Math.min(page * PRODUCTS_PER_PAGE, total)}
                </span>{" "}
                of <span className="font-bold text-silver-bright">{total}</span> films
              </>
            ) : (
              "No films found"
            )}
          </p>

          {/* Active filter chips */}
          {activeFilters.length > 0 && (
            <div className="hidden flex-wrap gap-2 sm:flex">
              {activeFilters.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-ink-border bg-ink-light px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-silver-light"
                >
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Product grid or empty states */}
        {fetchError ? (
          <div className="card-dark flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-flame/10">
              <svg className="h-8 w-8 text-flame" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-silver-bright">Connection Error</h3>
              <p className="mt-1 text-sm text-silver">
                We couldn&apos;t load the product catalog. Please try again in a moment.
              </p>
            </div>
            <Link href="/contact" className="btn-ghost !py-2.5 text-[11px]">
              Contact Us Instead →
            </Link>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {products.map((product, i) => (
                <Reveal key={product.id} delay={(i % 4) * 0.06}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>

            {/* ─── Pagination ─── */}
            {totalPages > 1 && (
              <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
                {/* Previous */}
                {page > 1 ? (
                  <Link
                    href={buildPaginationHref(normalized, page - 1)}
                    className="flex h-10 items-center gap-1.5 rounded-lg border border-ink-border px-4 text-xs font-bold uppercase tracking-wider text-silver-bright transition-colors hover:border-vault hover:text-vault"
                    aria-label="Previous page"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Prev
                  </Link>
                ) : (
                  <span className="flex h-10 cursor-not-allowed items-center gap-1.5 rounded-lg border border-ink-border/50 px-4 text-xs font-bold uppercase tracking-wider text-silver/40">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Prev
                  </span>
                )}

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => {
                    // Show first, last, current, and neighbors
                    return (
                      p === 1 ||
                      p === totalPages ||
                      Math.abs(p - page) <= 1
                    );
                  })
                  .map((p, idx, arr) => {
                    const showEllipsisBefore =
                      idx > 0 && arr[idx - 1] !== p - 1;
                    return (
                      <span key={p} className="flex items-center gap-2">
                        {showEllipsisBefore && (
                          <span className="px-1 text-sm text-silver">…</span>
                        )}
                        <Link
                          href={buildPaginationHref(normalized, p)}
                          className={`flex h-10 w-10 items-center justify-center rounded-lg font-display text-sm font-bold transition-all ${
                            p === page
                              ? "bg-vault text-ink"
                              : "border border-ink-border text-silver-bright hover:border-vault hover:text-vault"
                          }`}
                          aria-label={`Page ${p}`}
                          aria-current={p === page ? "page" : undefined}
                        >
                          {p}
                        </Link>
                      </span>
                    );
                  })}

                {/* Next */}
                {page < totalPages ? (
                  <Link
                    href={buildPaginationHref(normalized, page + 1)}
                    className="flex h-10 items-center gap-1.5 rounded-lg border border-ink-border px-4 text-xs font-bold uppercase tracking-wider text-silver-bright transition-colors hover:border-vault hover:text-vault"
                    aria-label="Next page"
                  >
                    Next
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                ) : (
                  <span className="flex h-10 cursor-not-allowed items-center gap-1.5 rounded-lg border border-ink-border/50 px-4 text-xs font-bold uppercase tracking-wider text-silver/40">
                    Next
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                )}
              </nav>
            )}
          </>
        ) : (
          <div className="card-dark flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-vault/10">
              <svg className="h-8 w-8 text-vault" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-silver-bright">No Films Match</h3>
              <p className="mt-1 max-w-sm text-sm text-silver">
                No products match your current filters. Try adjusting your selection
                or clearing filters to see all films.
              </p>
            </div>
            <Link href="/products" className="btn-primary !py-2.5 text-[11px]">
              Clear All Filters
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
