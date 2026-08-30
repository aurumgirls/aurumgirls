"use client";

import { useTranslations } from 'next-intl';
import { getShippingCost } from '@/lib/cart-data';

export function DeliveryOptions({ subtotal }: { subtotal: number }) {
  const t = useTranslations('checkout');
  const shipping = getShippingCost(subtotal);

  return (
    <div className="mb-10">
      <h3 className="text-xl font-display text-forest mb-4">{t('delivery.title')}</h3>
      <label className="flex items-center justify-between p-4 border border-terracotta bg-terracotta/5 rounded-xl cursor-pointer focus-within:ring-2 focus-within:ring-forest/40">
        <div className="flex items-center gap-3">
          <input type="radio" name="delivery" defaultChecked className="accent-terracotta h-4 w-4" />
          <div>
            <div className="font-medium text-forest">{t('delivery.standardName')}</div>
            <div className="text-xs text-slate">{t('delivery.standardTime')}</div>
          </div>
        </div>
        <span className="font-medium text-forest tabular-nums">
          {shipping === 0 ? t('summary.freeShipping') : `${shipping.toFixed(2)} ₼`}
        </span>
      </label>
    </div>
  );
}
