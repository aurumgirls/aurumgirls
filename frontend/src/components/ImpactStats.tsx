"use client";

import { useTranslations } from 'next-intl';
import { impactStatKeys } from '@/lib/data';
import { cn } from '@/lib/utils';
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger';

export default function ImpactStats() {
  const t = useTranslations('home');

  return (
    <section className="py-16 bg-forest text-cream">
      <div className="container mx-auto px-4">
        <StaggerGroup
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          staggerDelay={0.1}
        >
          {impactStatKeys.map((stat, idx) => (
            <StaggerItem
              key={idx}
              /* Dividers only from md up, where the stats sit on one row. In the
                 2x2 mobile grid the gap does the separating — the previous
                 `divide-x` was cancelled by `border-l-0` and never rendered. */
              className={cn('px-4', idx > 0 && 'md:border-l md:border-forest-light/40')}
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-honey tabular-nums mb-2">
                {t(stat.valueKey)}
              </div>
              <div className="text-sm md:text-base font-medium text-cream/90">
                {t(stat.labelKey)}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
