"use client";

import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  max?: number;
}

export function QuantitySelector({ quantity, onChange, max = 99 }: QuantitySelectorProps) {
  const decrease = () => {
    if (quantity > 1) onChange(quantity - 1);
  };

  const increase = () => {
    if (quantity < max) onChange(quantity + 1);
  };

  return (
    <div className="flex items-center bg-cream border border-sand rounded-full h-12 p-1">
      <button
        onClick={decrease}
        disabled={quantity <= 1}
        className="w-10 h-10 flex items-center justify-center rounded-full text-forest hover:bg-linen disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </button>
      
      <span className="w-10 text-center font-medium text-charcoal">
        {quantity}
      </span>
      
      <button
        onClick={increase}
        disabled={quantity >= max}
        className="w-10 h-10 flex items-center justify-center rounded-full text-forest hover:bg-linen disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
