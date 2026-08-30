"use client";
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCartStore, type CartItem } from '@/store/cart-store';
import { resolveImageUrl } from '@/lib/api';
import { FALLBACK_SWATCH } from '@/lib/constants';
import { getShippingCost } from '@/lib/cart-data';

function SummaryLine({ item }: { item: CartItem }) {
  const t = useTranslations('checkout');

  return (
    <div className="flex gap-4 py-4 border-b border-sand last:border-b-0">
      <div
        className="w-16 h-16 rounded-lg relative overflow-hidden flex items-center justify-center shrink-0"
        style={{ backgroundColor: FALLBACK_SWATCH }}
      >
        {item.image ? (
          <Image src={resolveImageUrl(item.image)} alt={item.name} fill className="object-contain p-1" unoptimized />
        ) : (
          <span className="font-display text-forest text-[8px] text-center px-1 leading-tight">{item.name}</span>
        )}
      </div>
      <div className="flex-1 flex justify-between gap-2">
        <div className="min-w-0">
          <h4 className="font-medium text-forest text-sm truncate">{item.name}</h4>
          <span className="text-slate text-xs">{t('summary.qty')}: {item.quantity}</span>
        </div>
        <span className="font-medium text-sm">{(item.price * item.quantity).toFixed(2)} ₼</span>
      </div>
    </div>
  );
}

export function CheckoutSummary() {
  const t = useTranslations('checkout');
  const { items, total } = useCartStore();

  const shipping = getShippingCost(total);
  const grandTotal = total + shipping;

  return (
    <div className="bg-cream p-6 sm:p-8 rounded-2xl shadow-soft border border-sand h-fit lg:sticky lg:top-24">
      <h3 className="text-xl font-display text-forest mb-6">{t('summary.title')}</h3>

      <div className="border-b border-sand">
        {items.map((item) => (
          <SummaryLine key={item.id} item={item} />
        ))}
      </div>

      <div className="space-y-3 text-sm font-body py-6 border-b border-sand">
        <div className="flex justify-between text-slate">
          <span>{t('summary.subtotal')}</span>
          <span>{total.toFixed(2)} ₼</span>
        </div>
        <div className="flex justify-between text-slate">
          <span>{t('summary.shipping')}</span>
          <span>{shipping === 0 ? t('summary.freeShipping') : `${shipping.toFixed(2)} ₼`}</span>
        </div>
      </div>

      <div className="pt-4 flex justify-between items-center">
        <span className="font-display text-lg text-forest">{t('summary.total')}</span>
        <span className="font-display text-2xl text-forest">{grandTotal.toFixed(2)} ₼</span>
      </div>
    </div>
  );
}
