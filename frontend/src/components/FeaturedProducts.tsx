"use client";

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import type { Product } from '@/lib/api';
import { resolveImageUrl } from '@/lib/api';
import { CURRENCY, FALLBACK_SWATCH } from '@/lib/constants';
import { Check, ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger';
import { EASE_ORGANIC } from '@/components/motion/useReveal';
import { useAddToCart } from '@/components/cart/useAddToCart';

function FeaturedProductCard({ product }: { product: Product }) {
  const t = useTranslations('home');
  const { add, justAdded } = useAddToCart();
  const image = product.images[0];
  const available = product.inStock && product.quantityAvailable > 0;

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-sand shadow-soft transition-[transform,box-shadow] duration-300 ease-organic hover:-translate-y-1 hover:shadow-card-hover flex flex-col h-full group">
      {/* Product Image / Gradient */}
      <div
        className="relative aspect-square w-full flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: FALLBACK_SWATCH }}
      >
        {image ? (
          <Image
            src={resolveImageUrl(image)}
            alt={product.name}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 ease-organic group-hover:scale-105"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-forest/10 flex items-center justify-center p-4 text-center">
            <span className="font-display text-forest font-bold text-lg">{product.name}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 justify-between min-w-0">
        <div>
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-display text-xl font-bold text-forest mb-2 truncate transition-colors duration-200 ease-organic group-hover:text-terracotta">
              {product.name}
            </h3>
          </Link>

          {product.description && (
            <p className="text-slate text-sm line-clamp-2 mb-4 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-sand/60 mt-2">
          <span className="font-display text-2xl font-bold text-forest">
            {product.price.toFixed(2)} {CURRENCY}
          </span>

          {available ? (
            <button
              onClick={() => add(product)}
              aria-label={`${t('featured.addToCart')}: ${product.name}`}
              className="btn-primary text-xs py-2.5 px-4"
            >
              {/* Icon swaps to a check on success: confirms the click without
                  needing new copy in messages/. */}
              <span className="relative grid h-3.5 w-3.5 place-items-center">
                <AnimatePresence initial={false} mode="wait">
                  <motion.span
                    key={justAdded ? 'added' : 'idle'}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.15, ease: EASE_ORGANIC }}
                    className="absolute inset-0 grid place-items-center"
                  >
                    {justAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span>{t('featured.addToCart')}</span>
            </button>
          ) : (
            <span className="text-xs font-medium text-slate bg-sand/40 rounded-full py-2.5 px-4">
              {t('featured.outOfStock')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts({ products }: { products: Product[] }) {
  const t = useTranslations('home');

  if (products.length === 0) return null;

  return (
    <section id="products" className="py-20 lg:py-28 bg-cream scroll-mt-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold text-terracotta tracking-wider uppercase block mb-2">{t('featured.eyebrow')}</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-forest text-balance">{t('featured.title')}</h2>
            <p className="text-slate text-base mt-2">{t('featured.subtitle')}</p>
          </div>
        </div>

        <StaggerGroup
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          staggerDelay={0.1}
        >
          {products.map((product) => (
            <StaggerItem key={product.id} className="h-full">
              <FeaturedProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
