import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from '@/components/about/AboutHero';
import OurStory from '@/components/about/OurStory';
import MissionVision from '@/components/about/MissionVision';
import OurArtisans from '@/components/about/OurArtisans';
import ImpactStrip from '@/components/about/ImpactStrip';
import Gallery from '@/components/about/Gallery';
import AboutCTA from '@/components/about/AboutCTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen">
        <AboutHero />
        <ImpactStrip />
        <OurStory />
        <MissionVision />
        <OurArtisans />
        <Gallery />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
