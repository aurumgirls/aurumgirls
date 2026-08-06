"use client";

import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ShopToolbarProps {
  resultCount: number;
  currentSort: string;
  onSortChange: (sort: string) => void;
  onToggleFilters: () => void;
  isFiltersOpen: boolean;
}

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export function ShopToolbar({ resultCount, currentSort, onSortChange, onToggleFilters, isFiltersOpen }: ShopToolbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLabel = sortOptions.find(o => o.value === currentSort)?.label || 'Sort by';

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div className="text-slate text-sm">
        Showing <span className="font-semibold text-charcoal">{resultCount}</span> delicious products
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button
          onClick={onToggleFilters}
          className={`lg:hidden flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
            isFiltersOpen 
              ? 'bg-forest text-white border-forest' 
              : 'bg-white text-charcoal border-sand hover:bg-linen'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>

        <div className="relative w-full sm:w-auto" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2 bg-white border border-sand rounded-full text-sm font-medium text-charcoal hover:bg-linen transition-colors"
          >
            <span>{currentLabel}</span>
            <ChevronDown className="w-4 h-4 text-slate" />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-sand rounded-xl shadow-soft-lg z-20 py-2 overflow-hidden">
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    onSortChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-linen transition-colors ${
                    currentSort === option.value ? 'text-terracotta font-medium bg-cream' : 'text-charcoal'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
