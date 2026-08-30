"use client";

import { useState } from 'react';
import type { Product } from '@/lib/api';
import { CURRENCY } from '@/lib/constants';
import { Truck, ShieldCheck, Leaf, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { QuantitySelector } from './QuantitySelector';
import { useAddToCart } from '@/components/cart/useAddToCart';
import { useRouter } from '@/i18n/navigation';

const HIGHLIGHT_KEYS = [
  'highlights.point1',
  'highlights.point2',
  'highlights.point3',
  'highlights.point4',
  'highlights.point5',
];

export function PurchasePanel({ product }: { product: Product }) {
  const t = useTranslations('product');
  const [quantity, setQuantity] = useState(1);
  const { add, justAdded } = useAddToCart();
  const router = useRouter();

  const available = product.inStock && product.quantityAvailable > 0;

  const handleAddToCart = () => {
    add(product, quantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-soft border border-sand">
      {/* Header Info */}
      <div className="mb-6">
        <h1 className="font-display text-3xl md:text-4xl text-forest mb-2 text-balance">{product.name}</h1>

        <div className="font-display text-2xl text-forest font-medium mb-4">
          {product.price.toFixed(2)} {CURRENCY}
        </div>
      </div>

      {product.description && <p className="text-slate mb-6 text-lg">{product.description}</p>}

      {/* Highlights */}
      <div className="mb-8">
        <ul className="space-y-2">
          {HIGHLIGHT_KEYS.map((key) => (
            <li key={key} className="flex items-center text-charcoal font-medium">
              <Leaf className="w-5 h-5 text-forest-light mr-3 shrink-0" />
              {t(key)}
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px bg-sand w-full mb-8" />

      {/* Actions */}
      <div className="space-y-6">
        {available ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-charcoal font-medium">{t('purchase.quantityLabel')}</span>
              <QuantitySelector quantity={quantity} onChange={setQuantity} max={Math.min(20, product.quantityAvailable)} />
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-terracotta hover:bg-terracotta-light text-white font-medium py-4 rounded-full transition-[background-color,transform,box-shadow] duration-200 ease-organic hover:shadow-soft active:scale-[0.99] shadow-sm flex items-center justify-center gap-2"
              >
                {justAdded && <Check className="w-4 h-4" aria-hidden="true" />}
                <span className="tabular-nums">
                  {t('purchase.addToCart')} — {(product.price * quantity).toFixed(2)} {CURRENCY}
                </span>
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full bg-forest hover:bg-forest-light text-cream font-medium py-4 rounded-full transition-[background-color,transform] duration-200 ease-organic active:scale-[0.99]"
              >
                {t('purchase.buyNow')}
              </button>
            </div>
          </>
        ) : (
          <div className="w-full text-center bg-sand/40 text-slate font-medium py-4 rounded-full">
            {t('purchase.outOfStock')}
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <div className="mt-8 grid grid-cols-3 gap-4 border-t border-sand pt-6">
        <div className="flex flex-col items-center text-center">
          <Truck className="w-6 h-6 text-forest-light mb-2" />
          <span className="text-xs text-slate">{t('purchase.freeShipping')}<br/>{t('purchase.freeShippingThreshold')}</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <Leaf className="w-6 h-6 text-forest-light mb-2" />
          <span className="text-xs text-slate">{t('purchase.shipsFresh')}</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <ShieldCheck className="w-6 h-6 text-forest-light mb-2" />
          <span className="text-xs text-slate">{t('purchase.secureCheckout')}</span>
        </div>
      </div>
    </div>
  );
}
