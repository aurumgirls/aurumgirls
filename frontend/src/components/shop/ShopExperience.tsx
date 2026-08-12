"use client";

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Breadcrumbs } from './Breadcrumbs';
import { SearchBar } from './SearchBar';
import { CategoryStrip } from './CategoryStrip';
import { ShopToolbar } from './ShopToolbar';
import { ShopFilters, FilterState } from './ShopFilters';
import { ProductCard } from './ProductCard';
import { Pagination } from './Pagination';
import FadeUp from '@/components/motion/FadeUp';
import { StaggerGroup } from '@/components/motion/Stagger';
import { shopProducts, priceBounds } from '@/lib/shop-data';

const ITEMS_PER_PAGE = 12;

export function ShopExperience() {
  const t = useTranslations('shop');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parse URL params
  const currentCategory = searchParams.get('category') || 'all';
  const currentSearch = searchParams.get('q') || '';
  const currentSort = searchParams.get('sort') || 'featured';
  const currentPage = parseInt(searchParams.get('page') || '1');

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [priceBounds.min, priceBounds.max],
  });

  // Derived state
  const filteredProducts = useMemo(() => {
    const query = currentSearch.toLowerCase();
    return shopProducts.filter((product) => {
      if (currentCategory !== 'all' && product.category !== currentCategory) return false;
      if (query) {
        const azName = product.name.toLowerCase();
        const enName = t(`products.${product.slug}.name`).toLowerCase();
        if (!azName.includes(query) && !enName.includes(query)) return false;
      }
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
      return true;
    }).sort((a, b) => {
      switch (currentSort) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'newest': return (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1;
        default: return b.rating - a.rating;
      }
    });
  }, [currentCategory, currentSearch, filters, currentSort, t]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const updateUrl = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) params.delete(key);
      else params.set(key, value);
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Breadcrumbs items={[{ label: t('breadcrumbs.shop'), href: '/shop' }]} />

      <div className="flex flex-col md:flex-row gap-6 mb-8 items-center">
        <div className="w-full md:w-2/3">
          <CategoryStrip
            selectedCategory={currentCategory}
            onSelectCategory={(c) => updateUrl({ category: c === 'all' ? null : c, page: '1' })}
          />
        </div>
        <div className="w-full md:w-1/3">
          <SearchBar
            initialValue={currentSearch}
            onSearch={(q) => updateUrl({ q: q || null, page: '1' })}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <aside className={`lg:w-64 flex-shrink-0 lg:block ${isFiltersOpen ? 'block' : 'hidden'}`}>
          <div className="sticky top-24">
            <ShopFilters filters={filters} onFilterChange={setFilters} />
          </div>
        </aside>

        <div className="flex-1 w-full">
          <ShopToolbar
            resultCount={filteredProducts.length}
            currentSort={currentSort}
            onSortChange={(s) => updateUrl({ sort: s, page: '1' })}
            onToggleFilters={() => setIsFiltersOpen(!isFiltersOpen)}
            isFiltersOpen={isFiltersOpen}
          />

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-2xl border border-sand">
              <h3 className="text-xl font-display text-forest mb-2">{t('empty.title')}</h3>
              <p className="text-slate">{t('empty.subtitle')}</p>
              <button
                onClick={() => {
                  setFilters({ priceRange: [priceBounds.min, priceBounds.max] });
                  router.push('/shop');
                }}
                className="mt-6 px-6 py-2 bg-terracotta text-white rounded-full hover:bg-terracotta-light transition-colors"
              >
                {t('empty.clearButton')}
              </button>
            </div>
          ) : (
            <>
              <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedProducts.map(product => (
                  <FadeUp key={product.id}>
                    <ProductCard product={product} />
                  </FadeUp>
                ))}
              </StaggerGroup>

              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(p) => updateUrl({ page: p.toString() })}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
