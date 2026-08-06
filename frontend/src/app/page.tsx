import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import CommunityIntro from '@/components/CommunityIntro';
import GiftSetBanner from '@/components/GiftSetBanner';
import FeaturedProducts from '@/components/FeaturedProducts';
import ValuePillars from '@/components/ValuePillars';
import ImpactStats from '@/components/ImpactStats';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <CommunityIntro />
        <GiftSetBanner />
        <FeaturedProducts />
        <ValuePillars />
        <ImpactStats />
      </main>
      <Footer />
    </>
  );
}
