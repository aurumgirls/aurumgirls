import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { CheckoutExperience } from '@/components/checkout/CheckoutExperience';
import { CheckoutHeader } from '@/components/checkout/CheckoutHeader';
import { CheckoutFooter } from '@/components/checkout/CheckoutFooter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'checkout' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-cream flex flex-col font-body">
      <CheckoutHeader />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <CheckoutExperience />
        </div>
      </main>
      <CheckoutFooter />
    </div>
  );
}
