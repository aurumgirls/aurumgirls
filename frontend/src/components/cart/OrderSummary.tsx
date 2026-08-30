"use client";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useCartStore } from '@/store/cart-store';
import { getShippingCost } from '@/lib/cart-data';

export function OrderSummary() {
  const t = useTranslations('cart');
  const { total } = useCartStore();

  const shipping = getShippingCost(total);
  const grandTotal = total + shipping;

  return (
    <div className="bg-cream p-6 sm:p-8 rounded-2xl shadow-soft border border-sand lg:sticky lg:top-24">
      <h3 className="text-xl font-display text-forest mb-6">{t('summary.title')}</h3>

      <div className="space-y-4 text-sm font-body mb-2">
        <div className="flex justify-between text-slate">
          <span>{t('summary.subtotal')}</span>
          <span className="tabular-nums">{total.toFixed(2)} ₼</span>
        </div>
        <div className="flex justify-between text-slate">
          <span>{t('summary.shipping')}</span>
          <span>{shipping === 0 ? t('summary.freeShipping') : `${shipping.toFixed(2)} ₼`}</span>
        </div>
      </div>

      <div className="border-t border-sand pt-4 mb-8 mt-6 flex justify-between items-center">
        <span className="font-display text-lg text-forest">{t('summary.total')}</span>
        <span className="font-display text-2xl text-forest tabular-nums">{grandTotal.toFixed(2)} ₼</span>
      </div>

      <Link
        href="/checkout"
        className="w-full block text-center py-4 bg-terracotta hover:bg-terracotta-light text-cream rounded-full font-medium transition-[background-color,transform,box-shadow] duration-200 ease-organic hover:shadow-soft active:scale-[0.99] text-lg"
      >
        {t('summary.checkoutButton')}
      </Link>
    </div>
  );
}
