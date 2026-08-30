"use client";

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import FadeUp from '@/components/motion/FadeUp';

export default function AboutCTA() {
  const t = useTranslations('about');

  return (
    <section className="py-20 lg:py-32 bg-forest text-cream text-center">
      <FadeUp className="container mx-auto px-4 md:px-6 max-w-3xl flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-display mb-6">{t('cta.title')}</h2>
        <p className="text-xl text-linen/90 mb-10">
          {t('cta.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#products"
            className="inline-flex items-center justify-center bg-terracotta hover:bg-terracotta-light text-cream px-8 py-4 rounded-full font-medium transition-[background-color,transform] duration-300 ease-organic active:scale-[0.98]"
          >
            {t('cta.shopButton')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-transparent border-2 border-cream hover:bg-cream hover:text-forest text-cream px-8 py-4 rounded-full font-medium transition-[background-color,color,transform] duration-300 ease-organic active:scale-[0.98]"
          >
            {t('cta.contactButton')}
          </Link>
        </div>
      </FadeUp>
    </section>
  );
}
