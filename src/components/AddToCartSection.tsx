"use client";

import { useState } from "react";
import { useCart, type Product } from "@/components/CartProvider";
import { useCurrency } from "@/components/CurrencyProvider";
import { formatPrice, whatsappLink } from "@/lib/site";

interface AddToCartSectionProps {
  product: Product;
}

export default function AddToCartSection({ product }: AddToCartSectionProps) {
  const { addItem } = useCart();
  const { code } = useCurrency();
  const [quantity, setQuantity] = useState(1);

  const isAvailable = product.status === "available";

  const inquiryMessage = `Hello WrapVault, I'm interested in:\n\n${product.name} (${product.series})\nSKU: ${product.sku}\nFinish: ${product.finish_type}\nColor: ${product.color_family}\nPrice: ${formatPrice(product.price_cny, code)}\n\nIs this in stock and ready to ship?`;

  return (
    <div className="space-y-5">
      {/* Price + quantity */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-silver">
            Price per roll
          </p>
          <p className="font-display text-3xl font-black text-vault">
            {formatPrice(product.price_cny, code)}
          </p>
        </div>

        {/* Quantity selector */}
        <div>
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-silver">
            Quantity
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-border text-silver-bright transition-colors hover:border-vault hover:text-vault"
              aria-label="Decrease quantity"
            >
              <svg className="h-4 w-4" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" d="M2 6h8" />
              </svg>
            </button>
            <span className="w-12 text-center font-display text-lg font-black text-silver-bright">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-border text-silver-bright transition-colors hover:border-vault hover:text-vault"
              aria-label="Increase quantity"
            >
              <svg className="h-4 w-4" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" d="M6 2v8M2 6h8" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => addItem(product, quantity)}
          disabled={!isAvailable}
          className="btn-primary w-full disabled:cursor-not-allowed disabled:border-ink-border disabled:bg-white disabled:text-silver disabled:hover:scale-100"
        >
          {isAvailable ? (
            <>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add {quantity} to Cart
            </>
          ) : (
            "Currently Unavailable"
          )}
        </button>

        <a
          href={whatsappLink(inquiryMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-signal w-full"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Inquire on WhatsApp
        </a>
      </div>

      {/* Trust line */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-silver">
        <svg className="h-3.5 w-3.5 text-signal" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M2.166 4.999A11.254 11.254 0 0010 1.5 11.254 11.254 0 0017.834 5c.41.205.837.385 1.279.518.533.162 1.069.31 1.621.382.368.048.766.075 1.166.075V12c0 4.5-2.5 8.5-7.5 10.5C9 20.5 6.5 16.5 6.5 12V6.975c.6-.075 1.198-.22 1.779-.428.42-.146.846-.295 1.279-.518.808-.41 1.579-.924 2.272-1.526a11.254 11.254 0 00-7.834-3.474 11.254 11.254 0 00-7.834 3.474" clipRule="evenodd" />
        </svg>
        Factory-direct pricing · Stock verified before payment
      </div>
    </div>
  );
}
