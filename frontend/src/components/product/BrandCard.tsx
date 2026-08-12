"use client";

import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function BrandCard() {
  const t = useTranslations('product');

  return (
    <div className="bg-cream rounded-3xl p-6 border border-sand">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-forest text-cream flex items-center justify-center flex-shrink-0">
          <Heart className="w-8 h-8" />
        </div>

        <div>
          <h3 className="font-display text-xl text-forest mb-1">{t('brandCard.title')}</h3>
          <p className="text-sm text-terracotta font-medium mb-3">{t('brandCard.subtitle')}</p>
          <p className="text-slate text-sm mb-4 leading-relaxed">
            {t('brandCard.description')}
          </p>

          <Link
            href="/about"
            className="inline-block px-5 py-2 rounded-full border border-forest text-forest hover:bg-forest hover:text-white transition-colors text-sm font-medium"
          >
            {t('brandCard.cta')}
          </Link>
        </div>
      </div>
    </div>
  );
}
