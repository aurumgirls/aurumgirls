import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import CommunityIntro from '@/components/CommunityIntro';
import { GiftSetBanner } from '@/components/GiftSetBanner';
import FeaturedProducts from '@/components/FeaturedProducts';
import ValuePillars from '@/components/ValuePillars';
import ImpactStats from '@/components/ImpactStats';
import { getProducts } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const products = await getProducts().catch(() => []);
  const giftSetProduct = products.find((p) => p.slug === 'hadiyya-seti') ?? products[0] ?? null;

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <CommunityIntro />
        <GiftSetBanner product={giftSetProduct} />
        <FeaturedProducts products={products.slice(0, 6)} />
        <ValuePillars />
        <ImpactStats />
      </main>
      <Footer />
    </>
  );
}
