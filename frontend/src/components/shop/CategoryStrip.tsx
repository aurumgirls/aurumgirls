"use client";

import { shopCategories } from "@/lib/shop-data";

export default function CategoryStrip({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (slug: string) => void;
}) {
  return (
    <div className="flex items-center gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <button
        onClick={() => selected.forEach((s) => onToggle(s))}
        className={`shrink-0 rounded-pill px-4 py-2 text-[13.5px] font-semibold border transition-colors ${
          selected.length === 0
            ? "bg-nar text-white border-nar shadow-sm"
            : "bg-cream text-ink border-black/12 hover:bg-sand"
        }`}
      >
        All products
      </button>
      {shopCategories.map((cat) => {
        const active = selected.includes(cat.slug);
        return (
          <button
            key={cat.slug}
            onClick={() => onToggle(cat.slug)}
            className={`shrink-0 rounded-pill px-4 py-2 text-[13.5px] font-semibold border transition-colors ${
              active
                ? "bg-nar text-white border-nar shadow-sm"
                : "bg-cream text-ink border-black/12 hover:bg-sand"
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
