import { CheckoutExperience } from '@/components/checkout/CheckoutExperience';
import { CheckoutHeader } from '@/components/checkout/CheckoutHeader';
import { CheckoutFooter } from '@/components/checkout/CheckoutFooter';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Checkout — Painterland Sisters',
  description: 'Complete your purchase.',
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col font-body">
      <CheckoutHeader />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <CheckoutExperience />
        </div>
      </main>
      <CheckoutFooter />
    </div>
  );
}
