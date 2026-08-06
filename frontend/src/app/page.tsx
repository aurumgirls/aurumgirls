import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ValuePillars from '@/components/ValuePillars';
import FeaturedProducts from '@/components/FeaturedProducts';
import FounderStory from '@/components/FounderStory';
import CategoryGrid from '@/components/CategoryGrid';
import ImpactStats from '@/components/ImpactStats';
import GiftCollections from '@/components/GiftCollections';
import StoreLocatorBanner from '@/components/StoreLocatorBanner';
import MakersPreview from '@/components/MakersPreview';
import JournalTeasers from '@/components/JournalTeasers';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ValuePillars />
        <FeaturedProducts />
        <FounderStory />
        <ImpactStats />
        <CategoryGrid />
        <GiftCollections />
        <StoreLocatorBanner />
        <MakersPreview />
        <JournalTeasers />
      </main>
      <Footer />
    </>
  );
}
