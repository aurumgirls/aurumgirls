"use client";

import { useState } from 'react';
import { priceBounds, shopCategories } from '@/lib/shop-data';

export interface FilterState {
  priceRange: [number, number];
}

interface ShopFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function ShopFilters({ filters, onFilterChange }: ShopFiltersProps) {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, priceRange: [priceBounds.min, parseInt(e.target.value)] });
  };

  const clearFilters = () => {
    onFilterChange({ priceRange: [priceBounds.min, priceBounds.max] });
  };

  const isFiltered = filters.priceRange[1] < priceBounds.max;

  return (
    <div className="bg-white p-6 rounded-2xl border border-sand">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg text-forest">Filters</h3>
        {isFiltered && (
          <button 
            onClick={clearFilters}
            className="text-sm text-terracotta hover:text-terracotta-light transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="mb-8">
        <h4 className="font-medium text-charcoal mb-4">Price Range</h4>
        <div className="space-y-4">
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            value={filters.priceRange[1]}
            onChange={handlePriceChange}
            className="w-full accent-terracotta"
          />
          <div className="flex justify-between text-sm text-slate">
            <span>${priceBounds.min}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>
      
      {/* We removed availability filter since yogurt is always available, 
          and category is handled by CategoryStrip. We can keep this component simple. */}
    </div>
  );
}
