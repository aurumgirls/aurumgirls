import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import MakersPreview from "@/components/MakersPreview";
import ImpactStats from "@/components/ImpactStats";
import GiftCollections from "@/components/GiftCollections";
import JournalTeasers from "@/components/JournalTeasers";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 pb-14 lg:pb-0">
        <Hero />
        <CategoryGrid />
        <FeaturedProducts />
        <MakersPreview />
        <ImpactStats />
        <GiftCollections />
        <JournalTeasers />
      </main>
      <Footer />
    </>
  );
}
