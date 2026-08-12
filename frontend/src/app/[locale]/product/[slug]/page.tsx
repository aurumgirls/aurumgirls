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
import { getProductBySlug } from '@/lib/product-detail';

type ProductPageParams = { locale: string; slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<ProductPageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  const t = await getTranslations({ locale, namespace: 'product' });

  if (!product) return { title: t('meta.notFoundTitle') };

  const shopT = await getTranslations({ locale, namespace: 'shop' });
  const name = locale === 'az' ? product.name : shopT(`products.${product.slug}.name`);
  const description = locale === 'az' ? product.description : shopT(`products.${product.slug}.description`);

  return {
    title: `${name} — ${t('meta.titleSuffix')}`,
    description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<ProductPageParams>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const t = await getTranslations('product');
  const shopT = await getTranslations('shop');
  const name = locale === 'az' ? product.name : shopT(`products.${product.slug}.name`);
  const categoryName = shopT(`categories.${product.category}` as 'categories.set' | 'categories.individual');

  const breadcrumbs = [
    { label: t('breadcrumbs.shop'), href: '/shop' },
    { label: categoryName, href: `/shop?category=${product.category}` },
    { label: name },
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
              <Gallery
                images={product.gallery}
                productName={name}
                flavorColor={product.flavorColor}
              />
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

          <RelatedProducts currentProductId={product.id} category={product.category} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
