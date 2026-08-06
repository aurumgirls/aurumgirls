"use client";
import { CheckoutSummary } from "./CheckoutSummary";
import { DeliveryOptions } from "./DeliveryOptions";
import { PaymentMethods } from "./PaymentMethods";

export function CheckoutExperience() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-display text-forest mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-3/5">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-10">
              <h3 className="text-xl font-display text-forest mb-4">Contact Information</h3>
              <div className="space-y-4">
                <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
              </div>
            </div>
            
            <div className="mb-10">
              <h3 className="text-xl font-display text-forest mb-4">Shipping Address</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
                <input type="text" placeholder="Last Name" className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
                <input type="text" placeholder="Address" className="col-span-2 w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
                <input type="text" placeholder="City" className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
                <input type="text" placeholder="ZIP Code" className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
              </div>
            </div>
            
            <DeliveryOptions />
            <PaymentMethods />
            
            <button className="w-full py-4 bg-terracotta hover:bg-terracotta-light text-cream rounded-full font-medium transition-colors text-lg mt-6">
              Place Order
            </button>
          </form>
        </div>
        
        <div className="w-full lg:w-2/5">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}
