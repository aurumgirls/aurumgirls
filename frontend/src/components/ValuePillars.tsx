"use client";

import { Leaf, Heart, Truck, CreditCard, Gift } from 'lucide-react';
import { useTranslations } from 'next-intl';
import FadeUp from '@/components/motion/FadeUp';

export default function ValuePillars() {
  const t = useTranslations('home');

  const pillars = [
    { icon: Leaf, titleKey: 'pillar1Title', descKey: 'pillar1Desc' },
    { icon: Heart, titleKey: 'pillar2Title', descKey: 'pillar2Desc' },
    { icon: Truck, titleKey: 'pillar3Title', descKey: 'pillar3Desc' },
    { icon: CreditCard, titleKey: 'pillar4Title', descKey: 'pillar4Desc' },
    { icon: Gift, titleKey: 'pillar5Title', descKey: 'pillar5Desc' },
  ];

  return (
    <section className="py-16 bg-linen/30 border-y border-sand">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-forest">{t('valuePillars.title')}</h2>
          <p className="text-slate text-sm mt-2">{t('valuePillars.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeUp key={idx} delay={0.1 * idx}>
                <div className="bg-cream p-6 rounded-2xl border border-sand shadow-soft text-center h-full flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-forest/10 text-forest flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-semibold text-forest text-base mb-2">{t(`valuePillars.${item.titleKey}`)}</h3>
                  <p className="text-slate text-xs leading-relaxed">{t(`valuePillars.${item.descKey}`)}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
