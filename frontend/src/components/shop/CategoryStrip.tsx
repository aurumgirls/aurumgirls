"use client";

import { shopCategories } from '@/lib/shop-data';
import { cn } from '@/lib/utils';

interface CategoryStripProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryStrip({ selectedCategory, onSelectCategory }: CategoryStripProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
      <button
        onClick={() => onSelectCategory('all')}
        className={cn(
          "px-5 py-2.5 rounded-full whitespace-nowrap font-medium transition-all duration-300 text-sm border",
          selectedCategory === 'all'
            ? "bg-terracotta text-white border-terracotta"
            : "bg-cream text-charcoal border-sand hover:bg-linen"
        )}
      >
        All Flavors
      </button>
      {shopCategories.map((category) => (
        <button
          key={category.slug}
          onClick={() => onSelectCategory(category.slug)}
          className={cn(
            "px-5 py-2.5 rounded-full whitespace-nowrap font-medium transition-all duration-300 text-sm border",
            selectedCategory === category.slug
              ? "bg-terracotta text-white border-terracotta"
              : "bg-cream text-charcoal border-sand hover:bg-linen"
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
