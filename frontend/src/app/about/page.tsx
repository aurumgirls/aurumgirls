import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from '@/components/about/AboutHero';
import OurStory from '@/components/about/OurStory';
import MissionVision from '@/components/about/MissionVision';
import MeetTheSisters from '@/components/about/MeetTheSisters';
import ImpactStrip from '@/components/about/ImpactStrip';
import Gallery from '@/components/about/Gallery';
import AboutCTA from '@/components/about/AboutCTA';

export const metadata: Metadata = {
  title: 'Our Story — Painterland Sisters',
  description: 'Learn about the Painterland Sisters and our 5th generation dairy farm.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen">
        <AboutHero />
        <ImpactStrip />
        <OurStory />
        <MissionVision />
        <MeetTheSisters />
        <Gallery />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
