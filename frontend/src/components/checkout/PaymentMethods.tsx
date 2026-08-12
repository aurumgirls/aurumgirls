"use client";

import { useState } from 'react';
import { CreditCard, Wallet, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export function PaymentMethods() {
  const t = useTranslations('checkout');
  const [method, setMethod] = useState('card');

  return (
    <div className="space-y-6">
      <h3 className="font-display text-xl text-forest font-semibold mb-4">{t('payment.title')}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label
          onClick={() => setMethod('card')}
          className={cn(
            "p-5 rounded-2xl border cursor-pointer transition-all flex items-center gap-4",
            method === 'card'
              ? "border-terracotta bg-cream shadow-soft"
              : "border-sand bg-white hover:border-forest/40"
          )}
        >
          <CreditCard className="w-6 h-6 text-terracotta shrink-0" />
          <div>
            <p className="font-semibold text-forest text-sm">{t('payment.cardTitle')}</p>
            <p className="text-xs text-slate">{t('payment.cardSubtitle')}</p>
          </div>
        </label>

        <label
          onClick={() => setMethod('applepay')}
          className={cn(
            "p-5 rounded-2xl border cursor-pointer transition-all flex items-center gap-4",
            method === 'applepay'
              ? "border-terracotta bg-cream shadow-soft"
              : "border-sand bg-white hover:border-forest/40"
          )}
        >
          <Wallet className="w-6 h-6 text-forest shrink-0" />
          <div>
            <p className="font-semibold text-forest text-sm">{t('payment.walletTitle')}</p>
            <p className="text-xs text-slate">{t('payment.walletSubtitle')}</p>
          </div>
        </label>
      </div>

      {method === 'card' && (
        <div className="p-6 rounded-2xl bg-white border border-sand space-y-4">
          <div>
            <label className="block text-xs font-semibold text-forest mb-1">{t('payment.cardNameLabel')}</label>
            <input type="text" placeholder={t('payment.cardNamePlaceholder')} className="w-full px-4 py-2.5 rounded-xl border border-sand text-sm focus:outline-none focus:border-terracotta" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-forest mb-1">{t('payment.cardNumberLabel')}</label>
            <input type="text" placeholder="4543 0000 0000 0000" className="w-full px-4 py-2.5 rounded-xl border border-sand text-sm focus:outline-none focus:border-terracotta" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-forest mb-1">{t('payment.expiryLabel')}</label>
              <input type="text" placeholder="MM/YY" className="w-full px-4 py-2.5 rounded-xl border border-sand text-sm focus:outline-none focus:border-terracotta" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-forest mb-1">{t('payment.cvvLabel')}</label>
              <input type="password" maxLength={4} placeholder="123" className="w-full px-4 py-2.5 rounded-xl border border-sand text-sm focus:outline-none focus:border-terracotta" />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-slate bg-linen/50 p-4 rounded-xl border border-sand">
        <ShieldCheck className="w-4 h-4 text-forest shrink-0" />
        <span>{t('payment.secureNote')}</span>
      </div>
    </div>
  );
}
