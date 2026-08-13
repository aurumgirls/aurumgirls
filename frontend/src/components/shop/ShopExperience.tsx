"use client";

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Breadcrumbs } from './Breadcrumbs';
import { SearchBar } from './SearchBar';
import { ShopToolbar } from './ShopToolbar';
import { ShopFilters, FilterState } from './ShopFilters';
import { ProductCard } from './ProductCard';
import { Pagination } from './Pagination';
import FadeUp from '@/components/motion/FadeUp';
import { StaggerGroup } from '@/components/motion/Stagger';
import { getProducts, type Product } from '@/lib/api';

const ITEMS_PER_PAGE = 12;
const DEFAULT_BOUNDS = { min: 0, max: 100 };

export function ShopExperience() {
  const t = useTranslations('shop');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    getProducts()
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
          setLoadError(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [retryToken]);

  const handleRetry = () => setRetryToken((n) => n + 1);

  const bounds = useMemo(() => {
    if (!products || products.length === 0) return DEFAULT_BOUNDS;
    const prices = products.map((p) => p.price);
    return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
  }, [products]);

  // Parse URL params
  const currentSearch = searchParams.get('q') || '';
  const currentSort = searchParams.get('sort') || 'featured';
  const currentPage = parseInt(searchParams.get('page') || '1');

  // null = user hasn't set a custom price ceiling yet, so fall back to bounds.max
  const [priceCeiling, setPriceCeiling] = useState<number | null>(null);
  const priceMin = bounds.min;
  const priceMax = priceCeiling ?? bounds.max;
  const filters: FilterState = { priceRange: [priceMin, priceMax] };
  const setFilters = (next: FilterState) => setPriceCeiling(next.priceRange[1]);

  // Derived state
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    const query = currentSearch.toLowerCase();
    return products.filter((product) => {
      if (query && !product.name.toLowerCase().includes(query)) return false;
      if (product.price < priceMin || product.price > priceMax) return false;
      return true;
    }).sort((a, b) => {
      switch (currentSort) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default: return 0;
      }
    });
  }, [products, currentSearch, priceMin, priceMax, currentSort]);

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

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Breadcrumbs items={[{ label: t('breadcrumbs.shop'), href: '/shop' }]} />

      <div className="mb-8">
        <SearchBar
          initialValue={currentSearch}
          onSearch={(q) => updateUrl({ q: q || null, page: '1' })}
          className="w-full md:w-1/3"
        />
      </div>

      {loadError ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-sand">
          <h3 className="text-xl font-display text-forest mb-2">{t('loadError.title')}</h3>
          <p className="text-slate mb-6">{t('loadError.subtitle')}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-2 bg-terracotta text-white rounded-full hover:bg-terracotta-light transition-colors"
          >
            {t('loadError.retry')}
          </button>
        </div>
      ) : !products ? (
        <div className="py-20 text-center text-forest">…</div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <aside className={`lg:w-64 shrink-0 lg:block ${isFiltersOpen ? 'block' : 'hidden'}`}>
            <div className="sticky top-24">
              <ShopFilters filters={filters} onFilterChange={setFilters} bounds={bounds} />
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
                    setFilters({ priceRange: [bounds.min, bounds.max] });
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
      )}
    </div>
  );
}
