import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/shop/Breadcrumbs';
import { Gallery } from '@/components/product/Gallery';
import { PurchasePanel } from '@/components/product/PurchasePanel';
import { ProductInfoSection } from '@/components/product/ProductInfoSection';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { BrandCard } from '@/components/product/BrandCard';
import { getProduct, getProducts } from '@/lib/api';

type ProductPageParams = { locale: string; slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<ProductPageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProduct(slug);
  const t = await getTranslations({ locale, namespace: 'product' });

  if (!product) return { title: t('meta.notFoundTitle') };

  return {
    title: `${product.name} — ${t('meta.titleSuffix')}`,
    description: product.description ?? undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<ProductPageParams>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await getProduct(slug);
  if (!product) {
    notFound();
  }

  const t = await getTranslations('product');

  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  const breadcrumbs = [
    { label: t('breadcrumbs.shop'), href: '/shop' },
    { label: product.name },
  ];

  return (
    <div className="min-h-screen bg-cream flex flex-col font-body">
      <Header />
      <main className="flex-1 pb-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            {/* Left Column - Gallery */}
            <div className="lg:col-span-7">
              <Gallery images={product.images} productName={product.name} />
            </div>

            {/* Right Column - Info & Purchase */}
            <div className="lg:col-span-5 flex flex-col">
              <PurchasePanel product={product} />

              <div className="mt-12 space-y-8">
                <BrandCard />
                <ProductInfoSection product={product} />
              </div>
            </div>
          </div>

          <RelatedProducts products={relatedProducts} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
