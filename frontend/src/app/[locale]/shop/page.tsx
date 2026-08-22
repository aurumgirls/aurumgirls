import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { ShopExperience } from '@/components/shop/ShopExperience';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { redirect } from '@/i18n/navigation';
import { SHOP_PAGE_ENABLED } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'shop' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function ShopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!SHOP_PAGE_ENABLED) {
    redirect({ href: '/#products', locale });
  }

  const t = await getTranslations('shop');

  return (
    <div className="min-h-screen bg-cream flex flex-col font-body">
      <Header />
      <main className="flex-1">
        <section className="bg-forest text-cream py-16 px-6 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">{t('hero.title')}</h1>
          <p className="text-lg md:text-xl text-cream/90 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </section>
        <Suspense fallback={<div className="py-20 text-center text-forest">…</div>}>
          <ShopExperience />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
