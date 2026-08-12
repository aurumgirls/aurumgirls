import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { CartExperience } from '@/components/cart/CartExperience';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cart' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('cart');

  return (
    <div className="min-h-screen bg-cream flex flex-col font-body">
      <Header />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl text-forest mb-8 text-center">{t('title')}</h1>
          <CartExperience />
        </div>
      </main>
      <Footer />
    </div>
  );
}
