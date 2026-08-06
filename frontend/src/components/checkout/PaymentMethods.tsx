"use client";

import { useState } from 'react';
import { CreditCard, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Field } from './Field';

export function PaymentMethods() {
  const [method, setMethod] = useState('card');

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <label className={cn(
          "flex-1 p-4 rounded-xl border cursor-pointer transition-all flex flex-col items-center justify-center gap-2",
          method === 'card' 
            ? "border-forest bg-forest/5 ring-1 ring-forest" 
            : "border-sand hover:border-forest/30"
        )}>
          <input 
            type="radio" 
            name="payment" 
            value="card" 
            checked={method === 'card'}
            onChange={(e) => setMethod(e.target.value)}
            className="sr-only"
          />
          <CreditCard className={cn("w-6 h-6", method === 'card' ? "text-forest" : "text-slate")} />
          <span className={cn("text-sm font-medium", method === 'card' ? "text-forest" : "text-slate")}>Credit Card</span>
        </label>
        
        <label className={cn(
          "flex-1 p-4 rounded-xl border cursor-pointer transition-all flex flex-col items-center justify-center gap-2",
          method === 'paypal' 
            ? "border-forest bg-forest/5 ring-1 ring-forest" 
            : "border-sand hover:border-forest/30"
        )}>
          <input 
            type="radio" 
            name="payment" 
            value="paypal" 
            checked={method === 'paypal'}
            onChange={(e) => setMethod(e.target.value)}
            className="sr-only"
          />
          <Wallet className={cn("w-6 h-6", method === 'paypal' ? "text-forest" : "text-slate")} />
          <span className={cn("text-sm font-medium", method === 'paypal' ? "text-forest" : "text-slate")}>PayPal</span>
        </label>
      </div>

      {method === 'card' && (
        <div className="space-y-4 p-5 bg-cream rounded-xl border border-sand">
          <Field label="Card Number" id="cardNumber" placeholder="0000 0000 0000 0000" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Expiration Date" id="exp" placeholder="MM/YY" />
            <Field label="CVC" id="cvc" placeholder="123" />
          </div>
          <Field label="Name on Card" id="cardName" placeholder="Jane Doe" />
        </div>
      )}

      {method === 'paypal' && (
        <div className="p-5 bg-cream rounded-xl border border-sand text-center text-sm text-slate">
          You will be redirected to PayPal to complete your purchase securely.
        </div>
      )}
    </div>
  );
}
