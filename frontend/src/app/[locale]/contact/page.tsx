import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactInfoCard from '@/components/contact/ContactInfoCard';
import ContactForm from '@/components/contact/ContactForm';
import FaqPreview from '@/components/contact/FaqPreview';
import MapPlaceholder from '@/components/contact/MapPlaceholder';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-forest mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-slate">
              {t('hero.subtitle')}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto mb-20">
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
              <ContactInfoCard />
            </div>
            <div className="w-full lg:w-2/3">
              <ContactForm />
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <FaqPreview />
          </div>

          <div className="mt-20">
            <MapPlaceholder />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
