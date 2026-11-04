"use client";

import { useEffect, useRef, useState } from "react";
import { useCurrency } from "./CurrencyProvider";
import { currencies } from "@/lib/site";

/**
 * Dropdown button that shows the current currency code + symbol.
 * Click to open a menu of all supported currencies.
 */
export default function CurrencySelector({
  className = "",
}: {
  className?: string;
}) {
  const { code, setCode } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = currencies.find((c) => c.code === code) ?? currencies[0];

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-ink-border bg-white px-3 py-2 text-xs font-bold uppercase tracking-wider text-silver-bright transition-colors hover:border-vault hover:text-vault"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select currency"
      >
        <span className="text-vault">{current.symbol}</span>
        <span>{current.code}</span>
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-ink-border bg-white py-1 shadow-2xl shadow-black/10"
          role="listbox"
        >
          {currencies.map((c) => (
            <li key={c.code}>
              <button
                type="button"
                onClick={() => {
                  setCode(c.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white ${
                  c.code === code ? "text-vault" : "text-silver-bright"
                }`}
                role="option"
                aria-selected={c.code === code}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{c.symbol}</span>
                  {c.label}
                </span>
                <span className="text-xs uppercase tracking-wider text-silver">
                  {c.code}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
