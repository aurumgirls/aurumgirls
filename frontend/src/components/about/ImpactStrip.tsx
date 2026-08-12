"use client";

import { useTranslations } from 'next-intl';

export default function ImpactStrip() {
  const t = useTranslations('about');

  const stats = [
    { valueKey: 'impact.stat1Value', labelKey: 'impact.stat1Label' },
    { valueKey: 'impact.stat2Value', labelKey: 'impact.stat2Label' },
    { valueKey: 'impact.stat3Value', labelKey: 'impact.stat3Label' },
    { valueKey: 'impact.stat4Value', labelKey: 'impact.stat4Label' },
  ];

  return (
    <section className="bg-forest py-12 border-y-8 border-sand">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-forest-light">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center px-4">
              <span className="text-3xl md:text-4xl lg:text-5xl font-display text-cream mb-2">
                {t(stat.valueKey)}
              </span>
              <span className="text-sm md:text-base text-linen/80 uppercase tracking-wider">
                {t(stat.labelKey)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
