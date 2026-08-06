"use client";
import { CartItemRow } from "./CartItemRow";
import { OrderSummary } from "./OrderSummary";

export function CartExperience() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
      <h1 className="text-4xl md:text-5xl font-display text-forest mb-12">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-2/3">
          <div className="border-t border-sand">
            <CartItemRow />
            {/* Additional items would render here */}
          </div>
        </div>
        
        <div className="w-full lg:w-1/3">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
