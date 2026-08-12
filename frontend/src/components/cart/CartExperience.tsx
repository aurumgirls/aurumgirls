"use client";
import { ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CartItemRow } from './CartItemRow';
import { OrderSummary } from './OrderSummary';
import { useCartStore } from '@/store/cart-store';

export function CartExperience() {
  const t = useTranslations('cart');
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-forest/10 text-forest flex items-center justify-center mb-6">
          <ShoppingBag size={32} />
        </div>
        <h2 className="text-2xl font-display text-forest mb-3">{t('empty.title')}</h2>
        <p className="text-slate mb-8">{t('empty.subtitle')}</p>
        <Link href="/shop" className="btn-primary inline-flex">
          {t('empty.cta')}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-2/3">
          <div className="border-t border-sand">
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
