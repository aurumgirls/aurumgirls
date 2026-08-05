"use client";

import { ChevronDown, LayoutGrid, X } from "lucide-react";

export type SortValue = "featured" | "newest" | "price-asc" | "price-desc" | "rating";

const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest arrivals" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top rated" },
];

export type Chip = { key: string; label: string; onRemove: () => void };

export default function ShopToolbar({
  resultCount,
  sort,
  onSortChange,
  chips,
  onClearAll,
}: {
  resultCount: number;
  sort: SortValue;
  onSortChange: (value: SortValue) => void;
  chips: Chip[];
  onClearAll: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 pb-5 mb-6 border-b border-black/10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[14px] text-stone">
          <span className="font-semibold text-ink">{resultCount}</span>{" "}
          {resultCount === 1 ? "product" : "products"}
        </p>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 text-stone">
            <span className="h-8 w-8 inline-flex items-center justify-center rounded-sm bg-sand text-ink">
              <LayoutGrid size={15} strokeWidth={1.8} />
            </span>
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortValue)}
              aria-label="Sort products"
              className="appearance-none rounded-pill bg-cream border border-black/12 pl-4 pr-9 py-2.5 text-[13.5px] font-medium text-ink shadow-sm outline-none focus:ring-2 focus:ring-aurum cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  Sort: {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={15}
              strokeWidth={2}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone pointer-events-none"
            />
          </div>
        </div>
      </div>

      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <button
              key={chip.key}
              onClick={chip.onRemove}
              className="inline-flex items-center gap-1.5 rounded-pill bg-sage text-grove text-[12.5px] font-semibold pl-3 pr-2 py-1.5 hover:bg-sage/70 transition-colors"
            >
              {chip.label}
              <X size={13} strokeWidth={2.2} />
            </button>
          ))}
          <button
            onClick={onClearAll}
            className="text-[12.5px] font-semibold text-nar hover:text-nar-deep transition-colors ml-1"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
