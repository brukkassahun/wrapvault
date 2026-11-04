"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { useCurrency } from "./CurrencyProvider";
import { formatPrice, whatsappLink, site } from "@/lib/site";

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
  clear: "linear-gradient(135deg, #E8F5E9, #F1F8E9, #E3F2FD, #E8EAF6)",
};

export default function CartDrawer() {
  const { items, isOpen, close, updateQty, removeItem, clear, totalItems } =
    useCart();
  const { code } = useCurrency();

  // Calculate subtotal (sum of unit price × qty)
  const subtotalCNY = items.reduce(
    (sum, item) => sum + item.product.price_cny * item.quantity,
    0
  );

  // Build WhatsApp checkout message
  const checkoutMessage = items.length
    ? `Hello ${site.name}, I'd like to order the following:\n\n${items
        .map(
          (i, idx) =>
            `${idx + 1}. ${i.product.name} (${i.product.series}) — Qty: ${i.quantity} × ${formatPrice(i.product.price_cny, code)}`
        )
        .join("\n")}\n\nSubtotal: ${formatPrice(subtotalCNY, code)}\n\nPlease confirm availability and shipping.`
    : `Hello ${site.name}, I'd like to inquire about your wrap films.`;

  return (
    <>
      {/* ─── Backdrop ─── */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* ─── Drawer ─── */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-ink-border bg-white shadow-2xl shadow-black/10 transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-border px-5 py-4">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-base font-black uppercase tracking-tight text-silver-bright">
              Your Cart
            </h2>
            {totalItems > 0 && (
              <span className="badge badge-featured">{totalItems} item{totalItems > 1 ? "s" : ""}</span>
            )}
          </div>
          <button
            onClick={close}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-silver transition-colors hover:bg-white hover:text-silver-bright"
            aria-label="Close cart"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items list */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <svg className="h-8 w-8 text-silver" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-wider text-silver-bright">
                Your cart is empty
              </p>
              <p className="mt-1 text-xs text-silver">
                Browse 700+ colors and add your favorites.
              </p>
            </div>
            <Link
              href="/products"
              onClick={close}
              className="btn-primary !py-3 text-[11px]"
            >
              Shop Films
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="space-y-4">
              {items.map((item) => {
                const swatchColor =
                  colorSwatches[item.product.color_family.toLowerCase()] ?? "#2A2A2E";
                const image = item.product.thumbnail ?? item.product.images?.[0];

                return (
                  <li
                    key={item.product.id}
                    className="flex gap-3 rounded-xl border border-ink-border bg-white p-3"
                  >
                    {/* Thumbnail / swatch */}
                    <Link
                      href={`/products/${item.product.slug}`}
                      onClick={close}
                      className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-ink"
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                          data-protected
                          draggable={false}
                        />
                      ) : (
                        <div
                          className="h-full w-full"
                          style={{
                            background: swatchColor.startsWith("linear-gradient")
                              ? swatchColor
                              : swatchColor,
                          }}
                        />
                      )}
                    </Link>

                    {/* Details */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-silver">
                            {item.product.series}
                          </p>
                          <Link
                            href={`/products/${item.product.slug}`}
                            onClick={close}
                            className="text-sm font-bold text-silver-bright hover:text-vault"
                          >
                            {item.product.name}
                          </Link>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-silver transition-colors hover:text-flame"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        {/* Qty controls */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQty(item.product.id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-ink-border text-silver-bright transition-colors hover:border-vault hover:text-vault"
                            aria-label="Decrease quantity"
                          >
                            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                              <path strokeLinecap="round" d="M2 6h8" />
                            </svg>
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-silver-bright">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.product.id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-ink-border text-silver-bright transition-colors hover:border-vault hover:text-vault"
                            aria-label="Increase quantity"
                          >
                            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                              <path strokeLinecap="round" d="M6 2v8M2 6h8" />
                            </svg>
                          </button>
                        </div>

                        <p className="font-display text-sm font-black text-vault">
                          {formatPrice(item.product.price_cny * item.quantity, code)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Clear cart */}
            <button
              onClick={clear}
              className="mt-4 text-xs font-medium text-silver transition-colors hover:text-flame"
            >
              Clear all items
            </button>
          </div>
        )}

        {/* ─── Footer: subtotal + checkout ─── */}
        {items.length > 0 && (
          <div className="border-t border-ink-border px-5 py-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-silver">
                  Subtotal
                </p>
                <p className="font-display text-2xl font-black text-vault">
                  {formatPrice(subtotalCNY, code)}
                </p>
              </div>
              <p className="text-right text-[11px] text-silver">
                Shipping calculated<br />at checkout
              </p>
            </div>

            {/* WhatsApp checkout */}
            <a
              href={whatsappLink(checkoutMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-signal w-full"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Checkout via WhatsApp
            </a>

            <p className="mt-3 text-center text-[11px] text-silver">
              Secure order confirmation · Pay after we verify stock &amp; shipping
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
