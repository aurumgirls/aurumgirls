"use client";

import { shopCategories, priceBounds, type Availability } from "@/lib/shop-data";

const AVAILABILITY_OPTIONS: { value: Availability; label: string }[] = [
  { value: "in-stock", label: "In stock" },
  { value: "low-stock", label: "Low stock" },
  { value: "out-of-stock", label: "Out of stock" },
];

export default function ShopFilters({
  categoryCounts,
  selectedCategories,
  onToggleCategory,
  priceRange,
  onPriceChange,
  selectedAvailability,
  onToggleAvailability,
  onClear,
  activeCount,
}: {
  categoryCounts: Record<string, number>;
  selectedCategories: string[];
  onToggleCategory: (slug: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  selectedAvailability: Availability[];
  onToggleAvailability: (value: Availability) => void;
  onClear: () => void;
  activeCount: number;
}) {
  return (
    <aside className="lg:sticky lg:top-[92px] h-fit rounded-lg bg-cream border border-black/10 shadow-sm p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[19px]">Filters</h2>
        {activeCount > 0 && (
          <button
            onClick={onClear}
            className="text-[12.5px] font-semibold text-nar hover:text-nar-deep transition-colors"
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>

      {/* Category */}
      <div className="pb-5 mb-5 border-b border-dashed border-black/10">
        <h3 className="text-[10.5px] font-bold tracking-[0.1em] uppercase text-stone mb-3">
          Category
        </h3>
        <ul className="flex flex-col gap-2.5">
          {shopCategories.map((cat) => (
            <li key={cat.slug}>
              <label className="flex items-center justify-between gap-2 cursor-pointer group">
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.slug)}
                    onChange={() => onToggleCategory(cat.slug)}
                    className="h-4 w-4 rounded-xs border-black/20 accent-[#A83A2B] cursor-pointer"
                  />
                  <span className="text-[13.5px] text-ink group-hover:text-nar transition-colors">
                    {cat.name}
                  </span>
                </span>
                <span className="text-[11.5px] text-stone tabular-nums">
                  {categoryCounts[cat.slug] ?? 0}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div className="pb-5 mb-5 border-b border-dashed border-black/10">
        <h3 className="text-[10.5px] font-bold tracking-[0.1em] uppercase text-stone mb-3">
          Price
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 flex items-center gap-1.5 rounded-sm border border-black/15 bg-linen px-2.5 py-1.5">
            <span className="text-[12px] text-stone">₼</span>
            <input
              type="number"
              min={priceBounds.min}
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) =>
                onPriceChange([Math.min(Number(e.target.value), priceRange[1]), priceRange[1]])
              }
              className="w-full bg-transparent text-[13px] text-ink outline-none"
              aria-label="Minimum price"
            />
          </div>
          <span className="text-stone text-sm">–</span>
          <div className="flex-1 flex items-center gap-1.5 rounded-sm border border-black/15 bg-linen px-2.5 py-1.5">
            <span className="text-[12px] text-stone">₼</span>
            <input
              type="number"
              min={priceRange[0]}
              max={priceBounds.max}
              value={priceRange[1]}
              onChange={(e) =>
                onPriceChange([priceRange[0], Math.max(Number(e.target.value), priceRange[0])])
              }
              className="w-full bg-transparent text-[13px] text-ink outline-none"
              aria-label="Maximum price"
            />
          </div>
        </div>
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          value={priceRange[1]}
          onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-[#A83A2B]"
          aria-label="Maximum price range"
        />
        <div className="flex justify-between text-[11px] text-stone mt-1">
          <span>₼{priceBounds.min}</span>
          <span>₼{priceBounds.max}</span>
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-[10.5px] font-bold tracking-[0.1em] uppercase text-stone mb-3">
          Availability
        </h3>
        <ul className="flex flex-col gap-2.5">
          {AVAILABILITY_OPTIONS.map((opt) => (
            <li key={opt.value}>
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedAvailability.includes(opt.value)}
                  onChange={() => onToggleAvailability(opt.value)}
                  className="h-4 w-4 rounded-xs border-black/20 accent-[#A83A2B] cursor-pointer"
                />
                <span className="text-[13.5px] text-ink group-hover:text-nar transition-colors">
                  {opt.label}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
