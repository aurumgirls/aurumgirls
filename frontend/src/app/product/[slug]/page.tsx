import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import Gallery from "@/components/product/Gallery";
import PurchasePanel from "@/components/product/PurchasePanel";
import SellerCard from "@/components/product/SellerCard";
import ProductInfoSection from "@/components/product/ProductInfoSection";
import RelatedProducts from "@/components/product/RelatedProducts";
import { getProductBySlug, getRelatedProducts, getSeller } from "@/lib/product-detail";
import { shopCategories, shopProducts } from "@/lib/shop-data";

export function generateStaticParams() {
  return shopProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found — By Aurum Girls" };
  return {
    title: `${product.name} — By Aurum Girls`,
    description: product.description,
  };
}

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const seller = getSeller(product.maker);
  const related = getRelatedProducts(product, 4);
  const categoryName = shopCategories.find((c) => c.slug === product.category)?.name ?? "Shop";

  return (
    <>
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <div className="mx-auto max-w-[1160px] px-5 sm:px-7 pt-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: categoryName },
              { label: product.name },
            ]}
          />
        </div>

        <section className="mx-auto max-w-[1160px] px-5 sm:px-7 pt-6 pb-14 sm:pb-16">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14">
            <Gallery images={product.gallery} productName={product.name} />

            <div className="flex flex-col gap-6 lg:sticky lg:top-[92px] h-fit">
              <div>
                <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-aurum">
                  {categoryName}
                </span>
                <h1 className="text-[30px] sm:text-[36px] mt-1.5 leading-[1.08]">{product.name}</h1>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className={i < Math.round(product.rating) ? "fill-aurum text-aurum" : "text-sand"}
                      />
                    ))}
                  </div>
                  <span className="text-[13.5px] text-stone">
                    {product.rating} · {product.reviews} reviews
                  </span>
                  <span className="text-stone/40">·</span>
                  <span className="text-[13.5px] text-stone">{product.region}</span>
                </div>
              </div>

              <PurchasePanel product={product} />
              <SellerCard seller={seller} />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1160px] px-5 sm:px-7 pb-16 sm:pb-20">
          <ProductInfoSection product={product} />
        </section>

        <section className="bg-cream border-y border-black/10">
          <div className="mx-auto max-w-[1160px] px-5 sm:px-7 py-14 sm:py-16">
            <RelatedProducts products={related} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
