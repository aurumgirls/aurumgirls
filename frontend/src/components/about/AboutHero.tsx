"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function AboutHero() {
  const t = useTranslations('about');

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 flex flex-col space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-forest leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-slate max-w-xl">
              {t('hero.subtitle')}
            </p>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-soft-lg border-8 border-sand">
              <Image
                src="/images/founders-portrait.jpg"
                alt={t('hero.imageAlt')}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
