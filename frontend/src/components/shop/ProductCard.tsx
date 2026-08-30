"use client";

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import type { Product } from '@/lib/api';
import { resolveImageUrl } from '@/lib/api';
import { CURRENCY, FALLBACK_SWATCH } from '@/lib/constants';
import { Check, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useAddToCart } from '@/components/cart/useAddToCart';
import { EASE_ORGANIC } from '@/components/motion/useReveal';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('shop');
  const { add, justAdded } = useAddToCart();
  const image = product.images[0];
  const available = product.inStock && product.quantityAvailable > 0;

  return (
    /* The card link is a stretched overlay rather than a wrapper, so the
       add-to-cart button is a sibling instead of a button nested inside an
       anchor (invalid, and unreachable for keyboard/AT users). */
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-sand transition-[transform,box-shadow,border-color] duration-300 ease-organic hover:-translate-y-1 hover:border-forest/30 hover:shadow-card-hover focus-within:-translate-y-1 focus-within:shadow-card-hover h-full flex flex-col">
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
            className="object-contain p-4 transition-transform duration-500 ease-organic group-hover:scale-105"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center shadow-soft">
            <span className="font-display text-forest text-lg text-center px-4 leading-tight">{product.name}</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col grow bg-cream min-w-0">
        <h3 className="font-display text-forest text-xl mb-1 truncate transition-colors duration-200 ease-organic group-hover:text-terracotta">
          {product.name}
        </h3>

        <div className="mt-auto pt-4 border-t border-sand flex items-center justify-between">
          <span className="font-display text-forest text-lg font-medium">{product.price.toFixed(2)} {CURRENCY}</span>
          {available ? (
            <button
              onClick={() => add(product)}
              className="relative z-20 bg-cream hover:bg-terracotta text-terracotta hover:text-white border border-terracotta rounded-full w-8 h-8 flex items-center justify-center transition-[background-color,color,transform] duration-200 ease-organic active:scale-90 shadow-sm"
              aria-label={`${t('productCard.addToCart')}: ${product.name}`}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={justAdded ? 'added' : 'idle'}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ duration: 0.15, ease: EASE_ORGANIC }}
                  className="grid place-items-center"
                >
                  {justAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
          ) : (
            <span className="relative z-20 text-xs font-medium text-slate bg-sand/40 rounded-full px-3 py-1.5">
              {t('productCard.outOfStock')}
            </span>
          )}
        </div>
      </div>

      <Link
        href={`/product/${product.slug}`}
        className="absolute inset-0 z-10 rounded-2xl"
        aria-label={product.name}
      />
    </div>
  );
}
