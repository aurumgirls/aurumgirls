import { CartExperience } from '@/components/cart/CartExperience';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Cart — Painterland Sisters',
  description: 'Review your skyr yogurt order.',
};

export default function CartPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col font-body">
      <Header />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl text-forest mb-8 text-center">Your Cart</h1>
          <CartExperience />
        </div>
      </main>
      <Footer />
    </div>
  );
}
