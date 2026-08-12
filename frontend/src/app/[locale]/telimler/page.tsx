import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'telimler' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function TelimlerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('telimler');

  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen">
        <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest/10 text-forest text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-honey" />
              <span>{t('eyebrow')}</span>
            </div>

            <div className="w-20 h-20 mx-auto rounded-full bg-forest/10 text-forest flex items-center justify-center mb-8">
              <GraduationCap size={36} />
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-forest mb-6 leading-tight">
              {t('title')}
            </h1>

            <p className="text-slate text-lg md:text-xl mb-8 leading-relaxed">
              {t('subtitle')}
            </p>

            <span className="inline-block bg-terracotta/10 text-terracotta text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-10">
              {t('comingSoonBadge')}
            </span>

            <p className="text-slate text-base leading-relaxed max-w-2xl mx-auto mb-12">
              {t('description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary w-full sm:w-auto">
                {t('ctaText')} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/shop" className="btn-outline w-full sm:w-auto">
                {t('secondaryCtaText')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
