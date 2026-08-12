"use client";

import Image from 'next/image';
import { Gift, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import FadeUp from '@/components/motion/FadeUp';
import { useCartStore } from '@/store/cart-store';
import { shopProducts } from '@/lib/shop-data';

export function GiftSetBanner() {
  const t = useTranslations('home');
  const { addItem } = useCartStore();
  const giftSet = shopProducts.find((p) => p.slug === 'hadiyya-seti') || shopProducts[0];

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

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-cream leading-tight">
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
              <div className="pt-4 flex items-center gap-6">
                <div>
                  <span className="text-xs text-cream/70 block">{t('giftBanner.priceLabel')}</span>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-4xl font-bold text-honey">42 ₼</span>
                    <span className="text-sm text-cream/50 line-through">48 ₼</span>
                  </div>
                </div>

                <button
                  onClick={() => addItem(giftSet)}
                  className="btn-secondary font-semibold"
                >
                  {t('giftBanner.addToCart')} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </FadeUp>

          {/* Right Column: Real Box Photo */}
          <FadeUp delay={0.2}>
            <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden border-4 border-cream/20 shadow-soft-lg group">
              <Image
                src="/images/aurum-gift-set-real.jpg"
                alt={t('giftBanner.imageAlt')}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-500"
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
