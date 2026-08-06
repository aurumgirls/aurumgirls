"use client";
import Image from "next/image";

export function CheckoutSummary() {
  return (
    <div className="bg-cream p-6 sm:p-8 rounded-2xl shadow-soft h-fit sticky top-8">
      <h3 className="text-xl font-display text-forest mb-6">Order Summary</h3>
      
      <div className="flex gap-4 py-4 border-b border-sand">
        <div className="w-16 h-16 bg-vanilla rounded-lg relative">
          <Image src="/images/yogurt-strawberry.jpg" alt="Strawberry Skyr" fill className="object-contain p-1" unoptimized />
        </div>
        <div className="flex-1 flex justify-between">
          <div>
            <h4 className="font-medium text-forest text-sm">Strawberry Skyr</h4>
            <span className="text-slate text-xs">Qty: 2</span>
          </div>
          <span className="font-medium text-sm">$18.00</span>
        </div>
      </div>
      
      <div className="space-y-3 text-sm font-body py-6 border-b border-sand">
        <div className="flex justify-between text-slate">
          <span>Subtotal</span>
          <span>$18.00</span>
        </div>
        <div className="flex justify-between text-slate">
          <span>Standard Shipping</span>
          <span>$5.00</span>
        </div>
        <div className="flex justify-between text-slate">
          <span>Taxes</span>
          <span>$0.00</span>
        </div>
      </div>
      
      <div className="pt-4 flex justify-between items-center">
        <span className="font-display text-lg text-forest">Total</span>
        <span className="font-display text-2xl text-forest">$23.00</span>
      </div>
    </div>
  );
}
