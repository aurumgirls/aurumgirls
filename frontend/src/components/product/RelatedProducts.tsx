"use client";

import { useTranslations } from 'next-intl';
import { shopProducts } from '@/lib/shop-data';
import { ProductCard } from '@/components/shop/ProductCard';

interface RelatedProductsProps {
  currentProductId: number;
  category: string;
}

export function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const t = useTranslations('product');
  const relatedProducts = shopProducts
    .filter(p => p.id !== currentProductId && p.category === category)
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-24 pt-16 border-t border-sand">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-3xl text-forest">{t('related.title')}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
