"use client";

import { CreditCard, Wallet, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { CARD_PAYMENTS_ENABLED } from '@/lib/constants';

export type PaymentMethod = 'card' | 'applepay';

export type CardDetails = {
  name: string;
  number: string;
  expiry: string;
  cvv: string;
};

export type CardFieldErrors = Partial<Record<keyof CardDetails, string>>;

type PaymentMethodsProps = {
  method: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  card: CardDetails;
  onCardChange: (field: keyof CardDetails, value: string) => void;
  fieldErrors: CardFieldErrors;
};

export function PaymentMethods({ method, onMethodChange, card, onCardChange, fieldErrors }: PaymentMethodsProps) {
  const t = useTranslations('checkout');

  const inputClass = (field: keyof CardDetails) =>
    cn(
      "w-full px-4 py-2.5 rounded-xl border text-sm bg-white transition-[border-color,box-shadow] duration-200 ease-organic",
      "focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/25",
      fieldErrors[field] ? "border-terracotta" : "border-sand"
    );

  return (
    <div className="space-y-6">
      <h3 className="font-display text-xl text-forest font-semibold mb-4">{t('payment.title')}</h3>

      <div role="radiogroup" aria-label={t('payment.title')} className={cn("grid grid-cols-1 gap-4", CARD_PAYMENTS_ENABLED && "sm:grid-cols-2")}>
        {CARD_PAYMENTS_ENABLED && (
          <label
            className={cn(
              "p-5 rounded-2xl border cursor-pointer flex items-center gap-4",
              "transition-[border-color,background-color,box-shadow] duration-200 ease-organic",
              "focus-within:ring-2 focus-within:ring-forest/40",
              method === 'card'
                ? "border-terracotta bg-cream shadow-soft"
                : "border-sand bg-white hover:border-forest/40"
            )}
          >
            <input
              type="radio"
              name="payment-method"
              value="card"
              checked={method === 'card'}
              onChange={() => onMethodChange('card')}
              className="sr-only"
            />
            <CreditCard className="w-6 h-6 text-terracotta shrink-0" />
            <div>
              <p className="font-semibold text-forest text-sm">{t('payment.cardTitle')}</p>
              <p className="text-xs text-slate">{t('payment.cardSubtitle')}</p>
            </div>
          </label>
        )}

        <label
          className={cn(
            "p-5 rounded-2xl border cursor-pointer flex items-center gap-4",
            "transition-[border-color,background-color,box-shadow] duration-200 ease-organic",
            "focus-within:ring-2 focus-within:ring-forest/40",
            method === 'applepay'
              ? "border-terracotta bg-cream shadow-soft"
              : "border-sand bg-white hover:border-forest/40"
          )}
        >
          <input
            type="radio"
            name="payment-method"
            value="applepay"
            checked={method === 'applepay'}
            onChange={() => onMethodChange('applepay')}
            className="sr-only"
          />
          <Wallet className="w-6 h-6 text-forest shrink-0" />
          <div>
            <p className="font-semibold text-forest text-sm">{t('payment.walletTitle')}</p>
            <p className="text-xs text-slate">{t('payment.walletSubtitle')}</p>
          </div>
        </label>
      </div>

      {CARD_PAYMENTS_ENABLED && method === 'card' && (
        <div className="p-6 rounded-2xl bg-white border border-sand space-y-4">
          <div>
            <label className="block text-xs font-semibold text-forest mb-1">{t('payment.cardNameLabel')}</label>
            <input
              type="text"
              name="cc-name"
              autoComplete="cc-name"
              value={card.name}
              onChange={(e) => onCardChange('name', e.target.value)}
              placeholder={t('payment.cardNamePlaceholder')}
              className={inputClass('name')}
            />
            {fieldErrors.name && <p className="text-terracotta text-xs mt-1">{fieldErrors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-forest mb-1">{t('payment.cardNumberLabel')}</label>
            <input
              type="text"
              inputMode="numeric"
              name="cc-number"
              autoComplete="cc-number"
              spellCheck={false}
              value={card.number}
              onChange={(e) => onCardChange('number', e.target.value)}
              placeholder="4543 0000 0000 0000"
              className={inputClass('number')}
            />
            {fieldErrors.number && <p className="text-terracotta text-xs mt-1">{fieldErrors.number}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-forest mb-1">{t('payment.expiryLabel')}</label>
              <input
                type="text"
                name="cc-exp"
                autoComplete="cc-exp"
                spellCheck={false}
                value={card.expiry}
                onChange={(e) => onCardChange('expiry', e.target.value)}
                placeholder="MM/YY"
                className={inputClass('expiry')}
              />
              {fieldErrors.expiry && <p className="text-terracotta text-xs mt-1">{fieldErrors.expiry}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-forest mb-1">{t('payment.cvvLabel')}</label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                name="cc-csc"
                autoComplete="cc-csc"
                spellCheck={false}
                value={card.cvv}
                onChange={(e) => onCardChange('cvv', e.target.value)}
                placeholder="123"
                className={inputClass('cvv')}
              />
              {fieldErrors.cvv && <p className="text-terracotta text-xs mt-1">{fieldErrors.cvv}</p>}
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
