"use client";

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('common');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mb-6">
          <AlertTriangle size={28} />
        </div>
        <h1 className="text-2xl font-display text-forest mb-3">{t('error.title')}</h1>
        <p className="text-slate mb-8">{t('error.text')}</p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-terracotta hover:bg-terracotta-light text-white rounded-full font-medium transition-colors"
          >
            {t('error.retry')}
          </button>
          <Link href="/" className="px-6 py-3 bg-white border border-sand text-charcoal rounded-full font-medium hover:bg-linen transition-colors">
            {t('error.backHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
