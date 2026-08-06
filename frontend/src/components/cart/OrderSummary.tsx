"use client";
import Link from "next/link";

export function OrderSummary() {
  return (
    <div className="bg-cream p-6 sm:p-8 rounded-2xl shadow-soft">
      <h3 className="text-xl font-display text-forest mb-6">Order Summary</h3>
      
      <div className="space-y-4 text-sm font-body mb-6">
        <div className="flex justify-between text-slate">
          <span>Subtotal</span>
          <span>$18.00</span>
        </div>
        <div className="flex justify-between text-slate">
          <span>Standard Shipping</span>
          <span>$5.00</span>
        </div>
      </div>
      
      <div className="border-t border-sand pt-4 mb-8 flex justify-between items-center">
        <span className="font-display text-lg text-forest">Total</span>
        <span className="font-display text-2xl text-forest">$23.00</span>
      </div>
      
      <Link 
        href="/checkout"
        className="w-full block text-center py-4 bg-terracotta hover:bg-terracotta-light text-cream rounded-full font-medium transition-colors text-lg"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
