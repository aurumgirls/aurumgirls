"use client";

import Image from 'next/image';
import type { Product } from '@/lib/api';
import { resolveImageUrl } from '@/lib/api';
import { CURRENCY, FALLBACK_SWATCH } from '@/lib/constants';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useCartStore } from '@/store/cart-store';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('shop');
  const { addItem } = useCartStore();
  const image = product.images[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link href={`/product/${product.slug}`} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden border border-sand transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-soft-lg h-full flex flex-col relative">
        <div
          className="relative aspect-square p-6 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: FALLBACK_SWATCH }}
        >
          {image ? (
            <Image
              src={resolveImageUrl(image)}
              alt={product.name}
              fill
              unoptimized
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center shadow-soft">
              <span className="font-display text-forest text-lg text-center px-4 leading-tight">{product.name}</span>
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col grow bg-cream">
          <h3 className="font-display text-forest text-xl mb-1">{product.name}</h3>

          <div className="mt-auto pt-4 border-t border-sand flex items-center justify-between">
            <span className="font-display text-forest text-lg font-medium">{product.price.toFixed(2)} {CURRENCY}</span>
            <button
              onClick={handleAddToCart}
              className="bg-cream hover:bg-terracotta text-terracotta hover:text-white border border-terracotta rounded-full w-8 h-8 flex items-center justify-center transition-colors shadow-sm"
              aria-label={`${t('productCard.addToCart')}: ${product.name}`}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
