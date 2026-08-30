"use client";

import Image from 'next/image';
import { Check, Gift, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import FadeUp from '@/components/motion/FadeUp';
import { useAddToCart } from '@/components/cart/useAddToCart';
import { Link } from '@/i18n/navigation';
import type { Product } from '@/lib/api';
import { CURRENCY } from '@/lib/constants';

export function GiftSetBanner({ product }: { product: Product | null }) {
  const t = useTranslations('home');
  const { add, justAdded } = useAddToCart();

  const items = [
    { name: t('giftBanner.item1Name'), desc: t('giftBanner.item1Desc') },
    { name: t('giftBanner.item2Name'), desc: t('giftBanner.item2Desc') },
    { name: t('giftBanner.item3Name'), desc: t('giftBanner.item3Desc') },
    { name: t('giftBanner.item4Name'), desc: t('giftBanner.item4Desc') },
    { name: t('giftBanner.item5Name'), desc: t('giftBanner.item5Desc') },
  ];

  return (
    <section className="py-20 bg-forest text-cream relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text & Features */}
          <FadeUp delay={0.1}>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-honey/20 text-honey text-xs font-semibold">
                <Gift className="w-4 h-4 text-honey" />
                <span>{t('giftBanner.badge')}</span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-cream leading-tight text-balance">
                {t('giftBanner.title')}
              </h2>

              <p className="text-cream/90 text-base md:text-lg leading-relaxed">
                {t('giftBanner.description')}
              </p>

              {/* Set contents list */}
              <div className="space-y-2 pt-2">
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-cream/90">
                    <span className="w-5 h-5 rounded-full bg-honey/30 text-honey flex items-center justify-center font-bold text-xs">{idx + 1}</span>
                    <span><strong>{item.name}</strong> — {item.desc}</span>
                  </div>
                ))}
              </div>

              {/* Price & Action */}
              {product ? (
                <div className="pt-4 flex items-center gap-6">
                  <div>
                    <span className="text-xs text-cream/70 block">{t('giftBanner.priceLabel')}</span>
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-4xl font-bold text-honey tabular-nums">{product.price.toFixed(2)} {CURRENCY}</span>
                      {product.oldPrice && (
                        <span className="text-sm text-cream/50 line-through tabular-nums">{product.oldPrice.toFixed(2)} {CURRENCY}</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => add(product)}
                    className="btn-secondary font-semibold"
                  >
                    {t('giftBanner.addToCart')}
                    {justAdded ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              ) : (
                <div className="pt-4">
                  <Link href="/#products" className="btn-secondary font-semibold inline-flex">
                    {t('giftBanner.addToCart')} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </FadeUp>

          {/* Right Column: Real Box Photo */}
          <FadeUp delay={0.2}>
            <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden border-4 border-cream/20 shadow-soft-lg group bg-forest-light/30 flex items-center justify-center">
              <Image
                src="/images/gift-set-box.jpg"
                alt={t('giftBanner.imageAlt')}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 ease-organic group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-terracotta text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                {t('giftBanner.savingsBadge')}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
export default GiftSetBanner;
