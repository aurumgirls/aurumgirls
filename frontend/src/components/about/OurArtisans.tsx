"use client";

import { Droplet, CookingPot, Leaf } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function OurArtisans() {
  const t = useTranslations('about');

  const roles = [
    { icon: Droplet, titleKey: 'artisans.role1Title', textKey: 'artisans.role1Text', gradient: 'from-[#FFE082] to-[#F4A261]' },
    { icon: CookingPot, titleKey: 'artisans.role2Title', textKey: 'artisans.role2Text', gradient: 'from-[#F7C5C2] to-[#EF9A9A]' },
    { icon: Leaf, titleKey: 'artisans.role3Title', textKey: 'artisans.role3Text', gradient: 'from-[#C5E1A5] to-[#A5D6A7]' },
  ];

  return (
    <section className="py-20 lg:py-32 bg-cream">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display text-forest mb-4">{t('artisans.title')}</h2>
          <p className="text-slate text-lg max-w-2xl mx-auto">
            {t('artisans.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {roles.map((role, idx) => {
            const Icon = role.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center space-y-6">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${role.gradient} shadow-soft-lg flex items-center justify-center text-forest`}>
                  <Icon className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-display text-forest">{t(role.titleKey)}</h3>
                </div>
                <p className="text-slate max-w-xs">
                  {t(role.textKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
