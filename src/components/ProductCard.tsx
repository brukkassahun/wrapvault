"use client";

import Link from "next/link";
import { useCart, type Product } from "./CartProvider";
import { formatPrice } from "@/lib/site";
import { useCurrency } from "./CurrencyProvider";

// Color swatch map for placeholder thumbnails
const colorSwatches: Record<string, string> = {
  black: "#0A0A0B",
  white: "#FAF9F6",
  grey: "#6B7280",
  silver: "#C0C0C8",
  red: "#E53E3E",
  blue: "#3182CE",
  green: "#38A169",
  yellow: "#ECC94B",
  purple: "#805AD5",
  pink: "#ED64A6",
  orange: "#ED8936",
  gold: "#D4AF37",
  brown: "#8B6F47",
  multi: "linear-gradient(135deg, #FF3D71, #FFAB00, #00E676, #00E5FF, #805AD5)",
};

const statusLabels: Record<Product["status"], string> = {
  available: "Available",
  sold: "Sold",
  reserved: "Reserved",
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { code } = useCurrency();

  const swatchColor =
    colorSwatches[product.color_family.toLowerCase()] ?? "#2A2A2E";
  const isAvailable = product.status === "available";

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isAvailable) return;
    addItem(product);
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="card-dark group flex flex-col overflow-hidden transition-all duration-300 hover:border-vault/40 hover:shadow-lg hover:shadow-vault/5"
    >
      {/* ─── Thumbnail / Swatch ─── */}
      <div className="relative aspect-square overflow-hidden bg-ink-light">
        {product.thumbnail || (product.images && product.images[0]) ? (
          <img
            src={product.thumbnail ?? product.images![0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            data-protected
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background: swatchColor.startsWith("linear-gradient")
                  ? swatchColor
                  : `radial-gradient(circle at 35% 30%, ${swatchColor}ee, ${swatchColor}aa 60%, ${swatchColor}66)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  product.finish_type?.includes("matte")
                    ? "none"
                    : "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
              }}
            />
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.featured && (
            <span className="badge badge-featured backdrop-blur-sm">Featured</span>
          )}
          <span className={`badge badge-${product.status} backdrop-blur-sm`}>
            {statusLabels[product.status]}
          </span>
        </div>

        {/* Finish type badge */}
        {product.finish_type && (
          <div className="absolute bottom-3 left-3">
            <span className="rounded-lg bg-ink/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-silver-bright backdrop-blur-sm">
              {product.finish_type}
            </span>
          </div>
        )}
      </div>

      {/* ─── Info ─── */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-silver">
            {product.series}
          </span>
        </div>

        <h3 className="font-display text-base font-bold leading-snug text-silver-bright transition-colors group-hover:text-vault">
          {product.name}
        </h3>

        {/* Specs */}
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-silver">
          {product.thickness && <span>📊 {product.thickness}</span>}
          {product.roll_width && <span>↔ {product.roll_width}</span>}
          {product.durability && <span>🛡 {product.durability}</span>}
        </div>

        {/* Price + CTA */}
        <div className="mt-4 flex items-center justify-between gap-3 pt-3 border-t border-ink-border">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-silver">
              Price
            </p>
            <p className="font-display text-lg font-black text-vault">
              {formatPrice(product.price_cny, code)}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!isAvailable}
            className="btn-primary !px-5 !py-2.5 text-[11px] disabled:cursor-not-allowed disabled:border-ink-border disabled:bg-ink-light disabled:text-silver disabled:hover:scale-100"
            aria-label={`Add ${product.name} to cart`}
          >
            {isAvailable ? "Add to Cart" : "Unavailable"}
          </button>
        </div>
      </div>
    </Link>
  );
}
