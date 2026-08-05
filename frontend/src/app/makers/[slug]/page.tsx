import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import MakerHero from "@/components/maker/MakerHero";
import MakerStory from "@/components/maker/MakerStory";
import MakerProductGallery from "@/components/maker/MakerProductGallery";
import MakerReviews from "@/components/maker/MakerReviews";
import { getMakerBySlug, getMakerProducts, makerProfiles } from "@/lib/makers-data";

export function generateStaticParams() {
  return makerProfiles.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata(props: PageProps<"/makers/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const maker = getMakerBySlug(slug);
  if (!maker) return { title: "Maker not found — By Aurum Girls" };
  return {
    title: `${maker.personName} — ${maker.shopName} | By Aurum Girls`,
    description: maker.bio,
  };
}

export default async function MakerProfilePage(props: PageProps<"/makers/[slug]">) {
  const { slug } = await props.params;
  const maker = getMakerBySlug(slug);
  if (!maker) notFound();

  const products = getMakerProducts(maker.shopName);

  return (
    <>
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <div className="mx-auto max-w-[1160px] px-5 sm:px-7 pt-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Meet the Makers" },
              { label: maker.personName },
            ]}
          />
        </div>

        <section className="mx-auto max-w-[1160px] px-5 sm:px-7 pt-6 pb-14 sm:pb-16">
          <MakerHero maker={maker} productCount={products.length} />
        </section>

        <section className="mx-auto max-w-[1160px] px-5 sm:px-7 pb-16 sm:pb-20">
          <MakerStory maker={maker} />
        </section>

        <section className="bg-cream border-y border-black/10">
          <div className="mx-auto max-w-[1160px] px-5 sm:px-7 py-14 sm:py-16">
            <MakerProductGallery products={products} makerName={maker.personName} />
          </div>
        </section>

        <section className="mx-auto max-w-[1160px] px-5 sm:px-7 py-14 sm:py-16">
          <MakerReviews maker={maker} />
        </section>
      </main>
      <Footer />
    </>
  );
}
