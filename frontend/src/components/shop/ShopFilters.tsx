"use client";

import { useTranslations } from 'next-intl';

export interface FilterState {
  priceRange: [number, number];
}

interface ShopFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  bounds: { min: number; max: number };
}

export function ShopFilters({ filters, onFilterChange, bounds }: ShopFiltersProps) {
  const t = useTranslations('shop');

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, priceRange: [bounds.min, parseInt(e.target.value)] });
  };

  const clearFilters = () => {
    onFilterChange({ priceRange: [bounds.min, bounds.max] });
  };

  const isFiltered = filters.priceRange[1] < bounds.max;

  return (
    <div className="bg-white p-6 rounded-2xl border border-sand">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg text-forest">{t('filters.title')}</h3>
        {isFiltered && (
          <button
            onClick={clearFilters}
            className="text-sm text-terracotta hover:text-terracotta-light transition-colors"
          >
            {t('filters.clearAll')}
          </button>
        )}
      </div>

      <div className="mb-8">
        <h4 className="font-medium text-charcoal mb-4">{t('filters.priceRange')}</h4>
        <div className="space-y-4">
          <input
            type="range"
            min={bounds.min}
            max={bounds.max}
            value={filters.priceRange[1]}
            onChange={handlePriceChange}
            className="w-full accent-terracotta"
          />
          <div className="flex justify-between text-sm text-slate">
            <span>{bounds.min} ₼</span>
            <span>{filters.priceRange[1]} ₼</span>
          </div>
        </div>
      </div>
    </div>
  );
}
