"use client";

import { Minus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  max?: number;
}

export function QuantitySelector({ quantity, onChange, max = 99 }: QuantitySelectorProps) {
  const t = useTranslations('cart');

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
        className="w-10 h-10 flex items-center justify-center rounded-full text-forest hover:bg-linen disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-[background-color,transform] duration-200 ease-organic active:scale-90 disabled:active:scale-100"
        aria-label={t('item.decrease')}
      >
        <Minus className="w-4 h-4" />
      </button>

      <span aria-live="polite" className="w-10 text-center font-medium text-charcoal tabular-nums">
        {quantity}
      </span>

      <button
        onClick={increase}
        disabled={quantity >= max}
        className="w-10 h-10 flex items-center justify-center rounded-full text-forest hover:bg-linen disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-[background-color,transform] duration-200 ease-organic active:scale-90 disabled:active:scale-100"
        aria-label={t('item.increase')}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
