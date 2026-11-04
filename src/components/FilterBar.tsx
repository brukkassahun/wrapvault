"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { filmCategories, finishTypes, colorFamilies } from "@/lib/site";

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured First" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name", label: "Name: A → Z" },
];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState(searchParams.get("q") ?? "");

  // Read current filter values from URL
  const activeCategory = searchParams.get("category") ?? "all";
  const activeFinish = searchParams.get("finish") ?? "all";
  const activeColor = searchParams.get("color") ?? "all";
  const activeSort = (searchParams.get("sort") ?? "featured") as SortOption;

  // Update URL search params
  const updateFilters = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "all" || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }

      startTransition(() => {
        router.push(`/products?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams]
  );

  // Debounced search
  const [searchTimer, setSearchTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  function handleSearchChange(value: string) {
    setSearchInput(value);
    if (searchTimer) clearTimeout(searchTimer);
    const timer = setTimeout(() => {
      updateFilters({ q: value || null, page: null });
    }, 350);
    setSearchTimer(timer);
  }

  return (
    <div className="space-y-5">
      {/* ─── Search bar ─── */}
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-silver"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a8 8 0 100-16 8 8 0 000 16zm0 0l7 7" />
        </svg>
        <input
          type="search"
          placeholder="Search 700+ colors, series, finishes…"
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="input-field !pl-11"
          aria-label="Search products"
        />
        {searchInput && (
          <button
            onClick={() => handleSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-silver transition-colors hover:text-flame"
            aria-label="Clear search"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* ─── Category tabs ─── */}
      <div className="flex flex-wrap gap-2">
        <CategoryTab
          label="All Films"
          isActive={activeCategory === "all"}
          onClick={() => updateFilters({ category: null })}
        />
        {filmCategories.map((cat) => (
          <CategoryTab
            key={cat.id}
            label={cat.name}
            isActive={activeCategory === cat.id}
            onClick={() => updateFilters({ category: cat.id })}
          />
        ))}
      </div>

      {/* ─── Dropdowns row ─── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Finish type */}
        <FilterSelect
          label="Finish"
          value={activeFinish}
          options={finishTypes.map((f) => ({ value: f, label: f.replace(/-/g, " ") }))}
          onChange={(v) => updateFilters({ finish: v })}
        />

        {/* Color family */}
        <FilterSelect
          label="Color"
          value={activeColor}
          options={colorFamilies.map((c) => ({ value: c, label: c }))}
          onChange={(v) => updateFilters({ color: v })}
        />

        {/* Sort */}
        <FilterSelect
          label="Sort"
          value={activeSort}
          options={sortOptions.map((s) => ({ value: s.value, label: s.label }))}
          onChange={(v) => updateFilters({ sort: v })}
          className="sm:ml-auto"
        />

        {/* Results indicator */}
        {isPending && (
          <span className="flex items-center gap-1.5 text-xs text-silver">
            <svg className="h-3 w-3 animate-spin text-vault" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.2" />
              <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Updating…
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────

function CategoryTab({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-200 ${
        isActive
          ? "border-vault bg-vault/10 text-vault"
          : "border-ink-border bg-ink-light text-silver-light hover:border-silver-light hover:text-silver-bright"
      }`}
    >
      {label}
    </button>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
  className = "",
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-silver">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field cursor-pointer appearance-none !py-2.5 pr-9 text-xs font-medium capitalize"
        aria-label={`Filter by ${label}`}
      >
        <option value="all">All {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="capitalize">
            {opt.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-[calc(50%+8px)] h-3 w-3 -translate-y-1/2 text-silver"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
