"use client";

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cart-store';
import { CheckoutSummary } from './CheckoutSummary';
import { AddressFields } from './AddressFields';
import { DeliveryOptions } from './DeliveryOptions';
import { PaymentMethods } from './PaymentMethods';
import { SectionCard } from './SectionCard';
import FadeUp from '@/components/motion/FadeUp';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function CheckoutExperience() {
  const { items, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0 && !orderComplete) {
    return (
      <FadeUp className="text-center py-20 bg-white rounded-3xl border border-sand">
        <h2 className="font-display text-2xl text-forest mb-4">Your cart is empty</h2>
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-light text-white px-8 py-3 rounded-full transition-colors font-medium"
        >
          Return to Shop <ArrowRight className="w-5 h-5" />
        </Link>
      </FadeUp>
    );
  }

  if (orderComplete) {
    return (
      <FadeUp className="text-center py-20 bg-white rounded-3xl border border-sand max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-forest" />
        </div>
        <h2 className="font-display text-3xl text-forest mb-4">Thank You for Your Order!</h2>
        <p className="text-slate mb-8 max-w-md mx-auto text-lg">
          Your delicious skyr yogurt is being prepared for shipping. We've sent a confirmation email with your order details.
        </p>
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-light text-white px-8 py-3 rounded-full transition-colors font-medium shadow-sm"
        >
          Continue Shopping
        </Link>
      </FadeUp>
    );
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-7 xl:col-span-8 space-y-6">
        <SectionCard 
          step={1} 
          title="Shipping Address" 
          isActive={step === 1}
          isCompleted={step > 1}
          onEdit={() => setStep(1)}
        >
          <div className="space-y-6">
            <AddressFields />
            <div className="flex justify-end">
              <button 
                onClick={() => setStep(2)}
                className="bg-forest hover:bg-forest-light text-cream px-8 py-3 rounded-full transition-colors font-medium"
              >
                Continue to Delivery
              </button>
            </div>
          </div>
        </SectionCard>

        <SectionCard 
          step={2} 
          title="Delivery Method" 
          isActive={step === 2}
          isCompleted={step > 2}
          onEdit={() => setStep(2)}
        >
          <div className="space-y-6">
            <DeliveryOptions />
            <div className="flex justify-end">
              <button 
                onClick={() => setStep(3)}
                className="bg-forest hover:bg-forest-light text-cream px-8 py-3 rounded-full transition-colors font-medium"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </SectionCard>

        <SectionCard 
          step={3} 
          title="Payment" 
          isActive={step === 3}
          isCompleted={step > 3}
          onEdit={() => setStep(3)}
        >
          <div className="space-y-6">
            <PaymentMethods />
            <div className="flex justify-end pt-4">
              <button 
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="bg-terracotta hover:bg-terracotta-light text-white px-8 py-4 rounded-full transition-colors font-medium w-full md:w-auto shadow-sm disabled:opacity-70 flex items-center justify-center"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="lg:col-span-5 xl:col-span-4">
        <div className="sticky top-24">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}
