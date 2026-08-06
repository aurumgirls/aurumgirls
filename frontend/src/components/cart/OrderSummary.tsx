"use client";

import { useCartStore } from '@/store/cart-store';
import { CouponForm } from './CouponForm';
import Link from 'next/link';
import { ShieldCheck, Truck, Leaf } from 'lucide-react';

export function OrderSummary() {
  const { total } = useCartStore();
  
  const subtotal = total;
  const shipping = subtotal > 25 ? 0 : 5.99;
  const finalTotal = subtotal + shipping;

  return (
    <div className="bg-white rounded-3xl border border-sand p-8 shadow-soft">
      <h3 className="font-display text-2xl text-forest mb-6">Order Summary</h3>
      
      <div className="space-y-4 mb-6 text-sm">
        <div className="flex justify-between text-slate">
          <span>Subtotal</span>
          <span className="font-medium text-charcoal">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate">
          <span>Shipping</span>
          <span className="font-medium text-charcoal">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
      </div>

      <CouponForm />

      <div className="flex justify-between items-end py-6">
        <span className="font-medium text-charcoal text-lg">Total</span>
        <div className="text-right">
          <span className="font-display text-3xl text-forest font-medium">${finalTotal.toFixed(2)}</span>
          <p className="text-xs text-slate mt-1">USD including VAT</p>
        </div>
      </div>

      <Link 
        href="/checkout"
        className="block w-full bg-terracotta hover:bg-terracotta-light text-white text-center font-medium py-4 rounded-full transition-colors mb-6 shadow-sm"
      >
        Proceed to Checkout
      </Link>

      <div className="grid grid-cols-3 gap-2 pt-6 border-t border-sand">
        <div className="flex flex-col items-center text-center">
          <Truck className="w-5 h-5 text-forest-light mb-1.5" />
          <span className="text-[10px] text-slate leading-tight">Free Shipping<br/>Over $25</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <Leaf className="w-5 h-5 text-forest-light mb-1.5" />
          <span className="text-[10px] text-slate leading-tight">Ships<br/>Fresh</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <ShieldCheck className="w-5 h-5 text-forest-light mb-1.5" />
          <span className="text-[10px] text-slate leading-tight">Secure<br/>Checkout</span>
        </div>
      </div>
    </div>
  );
}
