"use client";

import Image from 'next/image';
import { useCartStore } from '@/store/cart-store';

export function CheckoutSummary() {
  const { items, total } = useCartStore();
  
  const subtotal = total;
  const shipping = subtotal > 25 ? 0 : 5.99;
  const finalTotal = subtotal + shipping;

  return (
    <div className="bg-white rounded-3xl border border-sand p-6 lg:p-8 shadow-soft">
      <h3 className="font-display text-2xl text-forest mb-6">Order Details</h3>
      
      <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="relative w-16 h-16 rounded-xl bg-cream flex-shrink-0 flex items-center justify-center border border-sand overflow-hidden">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={48}
                  height={48}
                  unoptimized
                  className="object-contain"
                />
              ) : (
                <span className="text-[10px] text-forest font-display">Painterland</span>
              )}
              <span className="absolute -top-2 -right-2 bg-terracotta text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium shadow-sm">
                {item.quantity}
              </span>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-forest font-medium truncate">{item.name}</h4>
              <p className="text-xs text-slate">{item.category}</p>
            </div>
            
            <div className="text-right font-medium text-charcoal">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 py-4 border-t border-b border-sand text-sm">
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

      <div className="flex justify-between items-end pt-4">
        <span className="font-medium text-charcoal text-lg">Total</span>
        <div className="text-right">
          <span className="font-display text-3xl text-forest font-medium">${finalTotal.toFixed(2)}</span>
          <p className="text-xs text-slate mt-1">USD</p>
        </div>
      </div>
    </div>
  );
}
