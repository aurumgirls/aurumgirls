"use client";

import Image from 'next/image';
import { shopProducts, ShopProduct } from '@/lib/shop-data';
import { Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import FadeUp from '@/components/motion/FadeUp';
import { useCartStore } from '@/store/cart-store';
import { useLocalizedProduct } from '@/lib/shop-i18n';

function FeaturedProductCard({ product }: { product: ShopProduct }) {
  const t = useTranslations('home');
  const { addItem } = useCartStore();
  const text = useLocalizedProduct(product);

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-sand shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col h-full group">
      {/* Product Image / Gradient */}
      <div
        className="relative aspect-square w-full flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: product.flavorColor }}
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={text.name}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-forest/10 flex items-center justify-center p-4 text-center">
            <span className="font-display text-forest font-bold text-lg">{text.name}</span>
          </div>
        )}

        <div className="absolute top-4 left-4 bg-cream/90 backdrop-blur-sm text-forest font-semibold text-xs px-3 py-1 rounded-full shadow-sm">
          {text.badge}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1 text-honey text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-honey" />
              <span>{product.rating}</span>
              <span className="text-slate/60">({product.reviews})</span>
            </div>
            <span className="text-xs text-slate">{text.region}</span>
          </div>

          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-display text-xl font-bold text-forest mb-2 group-hover:text-terracotta transition-colors">
              {text.name}
            </h3>
          </Link>

          <p className="text-slate text-sm line-clamp-2 mb-4 leading-relaxed">
            {text.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-sand/60 mt-2">
          <span className="font-display text-2xl font-bold text-forest">
            {product.price} {product.currency}
          </span>

          <button
            onClick={() => addItem(product)}
            className="btn-primary text-xs py-2.5 px-4"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t('featured.addToCart')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const t = useTranslations('home');

  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold text-terracotta tracking-wider uppercase block mb-2">{t('featured.eyebrow')}</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-forest">{t('featured.title')}</h2>
            <p className="text-slate text-base mt-2">{t('featured.subtitle')}</p>
          </div>
          <Link href="/shop" className="btn-outline shrink-0 inline-flex items-center gap-2">
            {t('featured.viewAll')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {shopProducts.map((product, idx) => (
            <FadeUp key={product.id} delay={0.1 * idx}>
              <FeaturedProductCard product={product} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
