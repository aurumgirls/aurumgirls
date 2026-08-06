import { Suspense } from 'react';
import { ShopExperience } from '@/components/shop/ShopExperience';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Skyr Yogurt — Painterland Sisters',
  description: 'Shop our delicious, organic skyr yogurt made with love on our Pennsylvania family farm.',
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col font-body">
      <Header />
      <main className="flex-1">
        <section className="bg-forest text-cream py-16 px-6 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">Our Organic Skyr Lineup</h1>
          <p className="text-lg md:text-xl text-cream/90 max-w-2xl mx-auto">
            Discover our thick, creamy, and protein-packed Icelandic-style skyr, available in a variety of delicious flavors.
          </p>
        </section>
        <Suspense fallback={<div className="py-20 text-center text-forest">Loading shop...</div>}>
          <ShopExperience />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
