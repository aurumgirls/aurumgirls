"use client";

import { useCartStore } from '@/store/cart-store';
import { CartItemRow } from './CartItemRow';
import { OrderSummary } from './OrderSummary';
import FadeUp from '@/components/motion/FadeUp';
import { StaggerGroup } from '@/components/motion/Stagger';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';

export function CartExperience() {
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <FadeUp className="text-center py-20 bg-white rounded-3xl border border-sand">
        <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-terracotta" />
        </div>
        <h2 className="font-display text-2xl text-forest mb-4">Your cart is empty</h2>
        <p className="text-slate mb-8 max-w-md mx-auto">
          Looks like you haven't added any of our delicious skyr yogurt to your cart yet. Let's fix that!
        </p>
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-light text-white px-8 py-3 rounded-full transition-colors font-medium shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Shop
        </Link>
      </FadeUp>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-8">
        <div className="bg-white rounded-3xl border border-sand overflow-hidden">
          <div className="px-8 py-6 border-b border-sand bg-cream flex justify-between items-center">
            <h3 className="font-display text-xl text-forest">Your Items ({items.length})</h3>
            <Link href="/shop" className="text-sm text-terracotta hover:text-terracotta-light transition-colors font-medium">
              Continue Shopping
            </Link>
          </div>
          
          <StaggerGroup className="p-8">
            {items.map(item => (
              <FadeUp key={item.id}>
                <CartItemRow item={item} />
              </FadeUp>
            ))}
          </StaggerGroup>
        </div>
      </div>

      <div className="lg:col-span-4">
        <div className="sticky top-24">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
