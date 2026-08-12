"use client";
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCartStore, type CartItem } from '@/store/cart-store';
import { useLocalizedProductName } from '@/lib/shop-i18n';
import { FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING_RATE } from '@/lib/cart-data';

function SummaryLine({ item }: { item: CartItem }) {
  const t = useTranslations('checkout');
  const name = useLocalizedProductName(item.slug, item.name);

  return (
    <div className="flex gap-4 py-4 border-b border-sand last:border-b-0">
      <div
        className="w-16 h-16 rounded-lg relative overflow-hidden flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: item.flavorColor }}
      >
        {item.image ? (
          <Image src={item.image} alt={name} fill className="object-contain p-1" unoptimized />
        ) : (
          <span className="font-display text-forest text-[8px] text-center px-1 leading-tight">{name}</span>
        )}
      </div>
      <div className="flex-1 flex justify-between">
        <div>
          <h4 className="font-medium text-forest text-sm">{name}</h4>
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

  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;
  const grandTotal = total + shipping;

  return (
    <div className="bg-cream p-6 sm:p-8 rounded-2xl shadow-soft h-fit sticky top-8">
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
