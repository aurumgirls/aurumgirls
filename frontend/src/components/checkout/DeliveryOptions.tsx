"use client";

import { useTranslations } from 'next-intl';
import { FLAT_SHIPPING_RATE } from '@/lib/cart-data';

export function DeliveryOptions() {
  const t = useTranslations('checkout');

  return (
    <div className="mb-10">
      <h3 className="text-xl font-display text-forest mb-4">{t('delivery.title')}</h3>
      <label className="flex items-center justify-between p-4 border border-terracotta bg-terracotta/5 rounded-xl cursor-pointer">
        <div className="flex items-center gap-3">
          <input type="radio" name="delivery" defaultChecked readOnly className="text-terracotta focus:ring-terracotta h-4 w-4" />
          <div>
            <div className="font-medium text-forest">{t('delivery.standardName')}</div>
            <div className="text-xs text-slate">{t('delivery.standardTime')}</div>
          </div>
        </div>
        <span className="font-medium text-forest">{FLAT_SHIPPING_RATE.toFixed(2)} ₼</span>
      </label>
    </div>
  );
}
