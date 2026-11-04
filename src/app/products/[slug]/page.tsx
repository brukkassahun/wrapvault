import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getProductBySlug, getSimilarProducts as getSimilar, type Product } from "@/lib/products";
import { site, formatPrice, whatsappLink } from "@/lib/site";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

export const revalidate = 300;

// ─── SEO metadata ──────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "This product could not be found.",
    };
  }

  const title = `${product.name} — ${product.finish_type} ${product.color_family} Wrap`;
  const description =
    product.description ??
    `${product.name} from the ${product.series} series. ${product.finish_type} finish, ${product.color_family} color. Factory-direct pricing. Global shipping.`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.series,
      product.finish_type,
      product.color_family,
      "car wrap",
      "wrap film",
      product.category === "self-healing" ? "PPF" : "color change film",
    ],
    openGraph: {
      type: "website",
      url: `${site.url}/products/${product.slug}`,
      title,
      description,
      images: product.images?.length
        ? [{ url: product.images[0], alt: product.name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ─── Static params for known slugs (optional optimization) ──
export async function generateStaticParams() {
  const { products } = await import("@/lib/products-data");
  return products.map((p) => ({ slug: p.slug }));
}

// ─── Page component ─────────────────────────────────────────
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const similarProducts = await getSimilar(product);

  // Build spec list
  const specs: { label: string; value?: string }[] = [
    { label: "Series", value: product.series },
    { label: "SKU", value: product.sku },
    { label: "Finish Type", value: product.finish_type },
    { label: "Color Family", value: product.color_family },
    { label: "Category", value: product.category === "pet-color-change" ? "PET Color Change" : product.category === "ppf" ? "Paint Protection Film (TPU)" : "Self-Healing PPF" },
    { label: "Roll Width", value: product.roll_width },
    { label: "Roll Length", value: product.roll_length },
    { label: "Thickness", value: product.thickness },
    { label: "Durability", value: product.durability },
  ];

  return (
    <>
      {/* ─── Breadcrumb ─── */}
      <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-10">
        <nav className="flex items-center gap-2 text-[11px] font-medium text-silver">
          <Link href="/" className="transition-colors hover:text-vault">Home</Link>
          <span className="text-ink-border">/</span>
          <Link href="/products" className="transition-colors hover:text-vault">Products</Link>
          <span className="text-ink-border">/</span>
          <Link
            href={`/products?category=${product.category}`}
            className="transition-colors hover:text-vault"
          >
            {product.category === "pet-color-change" ? "Color Change" : product.category === "ppf" ? "PPF" : "Self-Healing"}
          </Link>
          <span className="text-ink-border">/</span>
          <span className="truncate text-silver-bright">{product.name}</span>
        </nav>
      </div>

      {/* ─── Product main section ─── */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery
              images={product.images}
              productName={product.name}
              colorFamily={product.color_family}
              finishType={product.finish_type}
            />
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-silver">
                  {product.series}
                </span>
                {product.featured && (
                  <span className="badge badge-featured">Featured</span>
                )}
                <span className={`badge badge-${product.status}`}>
                  {product.status === "available"
                    ? "In Stock"
                    : product.status === "sold"
                    ? "Sold Out"
                    : "Reserved"}
                </span>
              </div>

              <h1 className="font-display text-3xl font-black leading-tight tracking-tight text-silver-bright sm:text-4xl">
                {product.name}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                {product.finish_type && (
                  <span className="rounded-lg border border-ink-border bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-vault">
                    {product.finish_type}
                  </span>
                )}
                {product.color_family && (
                  <span className="rounded-lg border border-ink-border bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-silver-light">
                    {product.color_family}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="card-dark p-5">
                <p className="text-sm leading-relaxed text-silver-light">
                  {product.description}
                </p>
              </div>
            )}

            {/* Purchase section */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink(`Hi, I'm interested in ${product.name} (${product.sku}) — ${formatPrice(product.price_cny)} per roll (15.5m). Is it available?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1"
              >
                Inquire on WhatsApp
              </a>
              <Link href="/contact" className="btn-ghost flex-1">
                Request Quote
              </Link>
            </div>

            {/* Specifications */}
            <div className="card-dark overflow-hidden">
              <div className="border-b border-ink-border px-5 py-4">
                <h2 className="font-display text-sm font-bold uppercase tracking-wider text-silver-bright">
                  Specifications
                </h2>
              </div>
              <dl className="divide-y divide-ink-border">
                {specs
                  .filter((s) => s.value)
                  .map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between gap-4 px-5 py-3"
                    >
                      <dt className="text-xs font-bold uppercase tracking-wider text-silver">
                        {spec.label}
                      </dt>
                      <dd className="text-right text-sm font-medium capitalize text-silver-bright">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
              </dl>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="card-dark p-5">
                <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-silver-bright">
                  Key Features
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {product.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-silver-light"
                    >
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-signal" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trust badges row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-ink-border bg-white px-5 py-4">
              {[
                { label: "Factory Direct", icon: "🏭" },
                { label: "ISO 9001 Quality", icon: "✅" },
                { label: "Global Shipping", icon: "🌍" },
                { label: "Stock Verified", icon: "📦" },
              ].map((item) => (
                <span key={item.label} className="text-[11px] font-bold uppercase tracking-wider text-silver">
                  {item.icon} {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Similar products ─── */}
      {similarProducts.length > 0 && (
        <section className="border-t border-ink-border bg-white">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow mb-2">
                  <span className="text-vault">●</span> You May Also Like
                </p>
                <h2 className="display-md text-silver-bright">Similar Films</h2>
              </div>
              <Link
                href={`/products?category=${product.category}`}
                className="btn-ghost !py-2.5 text-[11px]"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {similarProducts.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 0.06}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA strip ─── */}
      <section className="border-t border-ink-border">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-ink-border bg-white p-8 text-center shadow-sm sm:flex-row sm:text-left">
            <div>
              <h3 className="font-display text-xl font-bold text-silver-bright">
                Need a Custom Color or Bulk Quantity?
              </h3>
              <p className="mt-1 text-sm text-silver">
                We offer color matching, custom branding, and volume pricing
                for orders of 10+ rolls.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink(
                  `Hello WrapVault, I'm interested in ${product.name} (${product.sku}). Can you help with bulk pricing or custom options?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-signal"
              >
                Chat on WhatsApp
              </a>
              <Link href="/wholesale" className="btn-ghost">
                Wholesale Info
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
