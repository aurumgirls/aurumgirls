"use client";

import { useState } from 'react';
import { ProductDetail } from '@/lib/product-detail';
import { Star, Truck, ShieldCheck, Leaf } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { QuantitySelector } from './QuantitySelector';
import { useCartStore } from '@/store/cart-store';
import { useRouter } from '@/i18n/navigation';
import { useLocalizedProduct } from '@/lib/shop-i18n';

const HIGHLIGHT_KEYS = [
  'highlights.point1',
  'highlights.point2',
  'highlights.point3',
  'highlights.point4',
  'highlights.point5',
];

export function PurchasePanel({ product }: { product: ProductDetail }) {
  const t = useTranslations('product');
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const router = useRouter();
  const text = useLocalizedProduct(product);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-soft border border-sand">
      {/* Header Info */}
      <div className="mb-6">
        {product.isNew && (
          <span className="inline-block bg-terracotta text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            {t('purchase.newBadge')}
          </span>
        )}
        <h1 className="font-display text-3xl md:text-4xl text-forest mb-2">{text.name}</h1>

        <div className="flex items-center justify-between mb-4">
          <div className="font-display text-2xl text-forest font-medium">
            {product.price.toFixed(2)} {product.currency}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-honey fill-honey" : "text-sand fill-sand"}`}
                />
              ))}
            </div>
            <span className="text-slate text-sm">{product.reviews} {t('purchase.reviewsSuffix')}</span>
          </div>
        </div>
      </div>

      <p className="text-slate mb-6 text-lg">{text.description}</p>

      {/* Highlights */}
      <div className="mb-8">
        <ul className="space-y-2">
          {HIGHLIGHT_KEYS.map((key) => (
            <li key={key} className="flex items-center text-charcoal font-medium">
              <Leaf className="w-5 h-5 text-forest-light mr-3 flex-shrink-0" />
              {t(key)}
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px bg-sand w-full mb-8" />

      {/* Actions */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-charcoal font-medium">{t('purchase.quantityLabel')}</span>
          <QuantitySelector quantity={quantity} onChange={setQuantity} max={20} />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleAddToCart}
            className="w-full bg-terracotta hover:bg-terracotta-light text-white font-medium py-4 rounded-full transition-colors shadow-sm"
          >
            {t('purchase.addToCart')} — {(product.price * quantity).toFixed(2)} {product.currency}
          </button>
          <button
            onClick={handleBuyNow}
            className="w-full bg-forest hover:bg-forest-light text-cream font-medium py-4 rounded-full transition-colors"
          >
            {t('purchase.buyNow')}
          </button>
        </div>
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
