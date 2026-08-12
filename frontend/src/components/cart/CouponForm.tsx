"use client";

import { useState } from 'react';
import { Tag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { COUPONS, type Coupon } from '@/lib/cart-data';

export function CouponForm({ onApply }: { onApply: (coupon: Coupon | null) => void }) {
  const t = useTranslations('cart');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const match = COUPONS.find((c) => c.code === code.trim().toUpperCase());
    if (match) {
      setStatus('success');
      onApply(match);
    } else {
      setStatus('error');
      onApply(null);
    }
  };

  return (
    <div className="py-6 border-b border-sand">
      <p className="flex items-center gap-2 text-forest font-medium mb-4">
        <Tag className="w-4 h-4" />
        {t('coupon.toggle')}
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setStatus('idle');
          }}
          placeholder={t('coupon.placeholder')}
          className={cn(
            "flex-1 bg-white border rounded-full px-4 py-2.5 text-sm focus:outline-none transition-colors",
            status === 'error' ? "border-terracotta focus:ring-1 focus:ring-terracotta" : "border-sand focus:border-forest"
          )}
        />
        <button
          type="submit"
          className="bg-forest hover:bg-forest-light text-cream px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
        >
          {t('coupon.apply')}
        </button>
      </form>

      {status === 'error' && (
        <p className="text-terracotta text-xs mt-2 ml-4">{t('coupon.invalid')}</p>
      )}
      {status === 'success' && (
        <p className="text-forest text-xs mt-2 ml-4">{t('coupon.success')}</p>
      )}
    </div>
  );
}
