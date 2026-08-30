"use client";

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger';

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
        <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-8" staggerDelay={0.1}>
          {stats.map((stat, idx) => (
            <StaggerItem
              key={idx}
              /* `divide-x` on a 2-column mobile grid draws a stray border on the
                 first cell of the second row; scope dividers to the md single-row
                 layout instead. */
              className={cn(
                'flex flex-col items-center text-center px-4',
                idx > 0 && 'md:border-l md:border-forest-light/40'
              )}
            >
              <span className="text-3xl md:text-4xl lg:text-5xl font-display text-cream mb-2">
                {t(stat.valueKey)}
              </span>
              <span className="text-sm md:text-base text-linen/80 uppercase tracking-wider">
                {t(stat.labelKey)}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
