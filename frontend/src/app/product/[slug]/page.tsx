import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/shop/Breadcrumbs';
import { Gallery } from '@/components/product/Gallery';
import { PurchasePanel } from '@/components/product/PurchasePanel';
import { ProductInfoSection } from '@/components/product/ProductInfoSection';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { BrandCard } from '@/components/product/BrandCard';
import { getProductBySlug } from '@/lib/product-detail';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `${product.name} — Painterland Sisters`,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Shop', href: '/shop' },
    { label: product.category, href: `/shop?category=${product.category.toLowerCase()}` },
    { label: product.name }
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
                productName={product.name} 
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
