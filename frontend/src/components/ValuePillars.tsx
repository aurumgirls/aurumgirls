"use client";

import { Leaf, Heart, Truck, Wallet, Gift } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger';

export default function ValuePillars() {
  const t = useTranslations('home');

  const pillars = [
    { icon: Leaf, titleKey: 'pillar1Title', descKey: 'pillar1Desc' },
    { icon: Heart, titleKey: 'pillar2Title', descKey: 'pillar2Desc' },
    { icon: Truck, titleKey: 'pillar3Title', descKey: 'pillar3Desc' },
    { icon: Wallet, titleKey: 'pillar4Title', descKey: 'pillar4Desc' },
    { icon: Gift, titleKey: 'pillar5Title', descKey: 'pillar5Desc' },
  ];

  return (
    <section className="py-16 bg-linen/30 border-y border-sand">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-forest text-balance">{t('valuePillars.title')}</h2>
          <p className="text-slate text-sm mt-2">{t('valuePillars.subtitle')}</p>
        </div>

        <StaggerGroup
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          staggerDelay={0.08}
        >
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={idx} className="h-full">
                <div className="group bg-cream p-6 rounded-2xl border border-sand shadow-soft text-center h-full flex flex-col items-center transition-[transform,box-shadow] duration-300 ease-organic hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="w-12 h-12 rounded-full bg-forest/10 text-forest flex items-center justify-center mb-4 transition-colors duration-300 ease-organic group-hover:bg-forest group-hover:text-cream">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-semibold text-forest text-base mb-2">{t(`valuePillars.${item.titleKey}`)}</h3>
                  <p className="text-slate text-xs leading-relaxed">{t(`valuePillars.${item.descKey}`)}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
