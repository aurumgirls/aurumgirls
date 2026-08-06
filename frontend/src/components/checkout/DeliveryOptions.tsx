"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';

export function DeliveryOptions() {
  const [selected, setSelected] = useState('standard');
  const { total } = useCartStore();
  const isFreeStandard = total > 25;

  const options = [
    {
      id: 'standard',
      title: 'Standard Cold Shipping',
      time: '5-7 business days',
      price: isFreeStandard ? 0 : 5.99,
    },
    {
      id: 'express',
      title: 'Express Cold Shipping',
      time: '1-2 business days',
      price: 12.99,
    }
  ];

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <label 
          key={option.id}
          className={cn(
            "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all",
            selected === option.id 
              ? "border-forest bg-forest/5 ring-1 ring-forest" 
              : "border-sand hover:border-forest/30"
          )}
        >
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-5 h-5 rounded-full border flex items-center justify-center",
              selected === option.id ? "border-forest" : "border-slate"
            )}>
              {selected === option.id && <div className="w-2.5 h-2.5 rounded-full bg-forest" />}
            </div>
            <div>
              <p className="font-medium text-charcoal">{option.title}</p>
              <p className="text-sm text-slate">{option.time}</p>
            </div>
          </div>
          <div className="font-medium text-forest">
            {option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
          </div>
        </label>
      ))}
    </div>
  );
}
