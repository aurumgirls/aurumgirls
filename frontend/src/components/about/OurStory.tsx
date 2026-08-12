"use client";

import { useTranslations } from 'next-intl';

export default function OurStory() {
  const t = useTranslations('about');

  return (
    <section className="py-20 lg:py-32 bg-cream">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-forest">
            {t('story.title')}
          </h2>
          <div className="space-y-6 text-slate text-lg leading-relaxed">
            <p>{t('story.paragraph1')}</p>
            <p>{t('story.paragraph2')}</p>
            <p>{t('story.paragraph3')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
