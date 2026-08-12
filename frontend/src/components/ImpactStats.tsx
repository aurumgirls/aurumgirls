import { useTranslations } from 'next-intl';
import { impactStatKeys } from '@/lib/data';

export default function ImpactStats() {
  const t = useTranslations('home');

  return (
    <section className="py-16 bg-forest text-cream">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-forest-light">
          {impactStatKeys.map((stat, idx) => (
            <div key={idx} className="px-4 border-l-0 first:border-l-0 border-forest-light">
              <div className="text-4xl md:text-5xl font-display font-bold text-honey mb-2">
                {t(stat.valueKey)}
              </div>
              <div className="text-sm md:text-base font-medium opacity-90">
                {t(stat.labelKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
