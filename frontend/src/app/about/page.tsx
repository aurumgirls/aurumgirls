import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import MissionVision from "@/components/about/MissionVision";
import MeetTheWomen from "@/components/about/MeetTheWomen";
import ImpactStrip from "@/components/about/ImpactStrip";
import Gallery from "@/components/about/Gallery";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us — By Aurum Girls",
  description:
    "By Aurum Girls connects rural women artisans across Azerbaijan directly with buyers — our story, mission, and the makers behind every product.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pb-14 lg:pb-0">
        <div className="mx-auto max-w-[1160px] px-5 sm:px-7 pt-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
        </div>

        <section className="mx-auto max-w-[1160px] px-5 sm:px-7 pt-6 pb-14 sm:pb-16">
          <AboutHero />
        </section>

        <section className="bg-cream border-y border-black/10">
          <div className="mx-auto max-w-[1160px] px-5 sm:px-7 py-14 sm:py-16">
            <OurStory />
          </div>
        </section>

        <section className="mx-auto max-w-[1160px] px-5 sm:px-7 py-14 sm:py-16">
          <MissionVision />
        </section>

        <section className="bg-cream border-y border-black/10">
          <div className="mx-auto max-w-[1160px] px-5 sm:px-7 py-14 sm:py-16">
            <MeetTheWomen />
          </div>
        </section>

        <section className="mx-auto max-w-[1160px] px-5 sm:px-7 py-14 sm:py-16">
          <ImpactStrip />
        </section>

        <section className="bg-cream border-y border-black/10">
          <div className="mx-auto max-w-[1160px] px-5 sm:px-7 py-14 sm:py-16">
            <Gallery />
          </div>
        </section>

        <section className="mx-auto max-w-[1160px] px-5 sm:px-7 py-14 sm:py-16">
          <AboutCTA />
        </section>
      </main>
      <Footer />
    </>
  );
}
