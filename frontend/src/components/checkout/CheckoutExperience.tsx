"use client";
import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CheckoutSummary } from './CheckoutSummary';
import { DeliveryOptions } from './DeliveryOptions';
import { PaymentMethods } from './PaymentMethods';
import { useCartStore } from '@/store/cart-store';

export function CheckoutExperience() {
  const t = useTranslations('checkout');
  const { items, clearCart } = useCartStore();
  const [isPlaced, setIsPlaced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setIsPlaced(true);
  };

  if (isPlaced) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 md:py-24">
        <div className="w-20 h-20 mx-auto rounded-full bg-forest/10 text-forest flex items-center justify-center mb-6">
          <CheckCircle2 size={36} />
        </div>
        <h1 className="text-3xl md:text-4xl font-display text-forest mb-4">{t('orderSuccess.title')}</h1>
        <p className="text-slate mb-8">{t('orderSuccess.text')}</p>
        <Link href="/" className="btn-primary inline-flex">
          {t('orderSuccess.backHome')}
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 md:py-24">
        <p className="text-slate mb-8">{t('emptyCart')}</p>
        <Link href="/shop" className="btn-primary inline-flex">
          {t('emptyCartCta')}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-display text-forest mb-8">{t('title')}</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-3/5">
          <form onSubmit={handleSubmit}>
            <div className="mb-10">
              <h3 className="text-xl font-display text-forest mb-4">{t('contactInfo')}</h3>
              <div className="space-y-4">
                <input type="email" required placeholder={t('emailPlaceholder')} className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-display text-forest mb-4">{t('shippingAddress')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" required placeholder={t('firstNamePlaceholder')} className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
                <input type="text" required placeholder={t('lastNamePlaceholder')} className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
                <input type="text" required placeholder={t('addressPlaceholder')} className="col-span-2 w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
                <input type="text" required placeholder={t('cityPlaceholder')} className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
                <input type="text" placeholder={t('zipPlaceholder')} className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
              </div>
            </div>

            <DeliveryOptions />
            <PaymentMethods />

            <button type="submit" className="w-full py-4 bg-terracotta hover:bg-terracotta-light text-cream rounded-full font-medium transition-colors text-lg mt-6">
              {t('placeOrder')}
            </button>
          </form>
        </div>

        <div className="w-full lg:w-2/5">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}
