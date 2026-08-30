"use client";

import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { PopIn } from '@/components/motion/PopIn';

interface ShopToolbarProps {
  resultCount: number;
  currentSort: string;
  onSortChange: (sort: string) => void;
  onToggleFilters: () => void;
  isFiltersOpen: boolean;
}

export function ShopToolbar({ resultCount, currentSort, onSortChange, onToggleFilters, isFiltersOpen }: ShopToolbarProps) {
  const t = useTranslations('shop');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    { value: 'featured', label: t('toolbar.sortFeatured') },
    { value: 'newest', label: t('toolbar.sortNewest') },
    { value: 'price-asc', label: t('toolbar.sortPriceAsc') },
    { value: 'price-desc', label: t('toolbar.sortPriceDesc') },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentLabel = sortOptions.find(o => o.value === currentSort)?.label ?? t('toolbar.sortLabel');

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div className="text-slate text-sm">
        {t('toolbar.resultsPrefix')} <span className="font-semibold text-charcoal">{resultCount}</span> {t('toolbar.resultsSuffix')}
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button
          onClick={onToggleFilters}
          aria-expanded={isFiltersOpen}
          aria-controls="shop-filters"
          className={`lg:hidden flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-[background-color,color,border-color,transform] duration-200 ease-organic active:scale-95 ${
            isFiltersOpen
              ? 'bg-forest text-white border-forest'
              : 'bg-white text-charcoal border-sand hover:bg-linen'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          {t('toolbar.filtersButton')}
        </button>

        <div className="relative w-full sm:w-auto" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2 bg-white border border-sand rounded-full text-sm font-medium text-charcoal hover:bg-linen transition-colors"
          >
            <span>{currentLabel}</span>
            <ChevronDown className={`w-4 h-4 text-slate transition-transform duration-200 ease-organic ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          <PopIn
            show={isOpen}
            origin="top right"
            className="absolute right-0 mt-2 w-48 bg-white border border-sand rounded-xl shadow-soft-lg z-20 py-2 overflow-hidden"
          >
            <div role="listbox">
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  role="option"
                  aria-selected={currentSort === option.value}
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
          </PopIn>
        </div>
      </div>
    </div>
  );
}
