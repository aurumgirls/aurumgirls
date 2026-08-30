"use client";

import { useTranslations } from 'next-intl';
import type { Product } from '@/lib/api';
import { ProductCard } from '@/components/shop/ProductCard';
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger';

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const t = useTranslations('product');

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-24 pt-16 border-t border-sand">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-3xl text-forest text-balance">{t('related.title')}</h2>
      </div>

      <StaggerGroup
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        staggerDelay={0.08}
        amount={0.05}
      >
        {products.map(product => (
          <StaggerItem key={product.id} className="h-full">
            <ProductCard product={product} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
