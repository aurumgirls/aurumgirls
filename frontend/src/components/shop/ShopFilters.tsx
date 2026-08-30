"use client";

import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CURRENCY } from '@/lib/constants';

export interface FilterState {
  priceRange: [number, number];
}

interface ShopFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  bounds: { min: number; max: number };
  /** Supplied on narrow viewports, where the panel is a disclosure that needs dismissing. */
  onClose?: () => void;
}

export function ShopFilters({ filters, onFilterChange, bounds, onClose }: ShopFiltersProps) {
  const t = useTranslations('shop');

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, priceRange: [bounds.min, parseInt(e.target.value)] });
  };

  const clearFilters = () => {
    onFilterChange({ priceRange: [bounds.min, bounds.max] });
  };

  const isFiltered = filters.priceRange[1] < bounds.max;

  return (
    <div className="bg-white p-6 rounded-2xl border border-sand shadow-soft">
      <div className="flex items-center justify-between mb-6 gap-3">
        <h3 className="font-display text-lg text-forest">{t('filters.title')}</h3>

        <div className="flex items-center gap-1">
          {isFiltered && (
            <button
              onClick={clearFilters}
              className="text-sm text-terracotta hover:text-terracotta-light transition-colors rounded-full px-2 py-1"
            >
              {t('filters.clearAll')}
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden text-slate hover:text-terracotta transition-colors p-1 rounded-full"
              aria-label={t('toolbar.filtersButton')}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-charcoal mb-4">{t('filters.priceRange')}</h4>
        <div className="space-y-4">
          <input
            type="range"
            min={bounds.min}
            max={bounds.max}
            value={filters.priceRange[1]}
            onChange={handlePriceChange}
            aria-label={t('filters.priceRange')}
            aria-valuetext={`${filters.priceRange[1]} ${CURRENCY}`}
            className="w-full accent-terracotta cursor-pointer"
          />
          <div className="flex justify-between text-sm text-slate tabular-nums">
            <span>{bounds.min} {CURRENCY}</span>
            <span className="font-medium text-charcoal">{filters.priceRange[1]} {CURRENCY}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
