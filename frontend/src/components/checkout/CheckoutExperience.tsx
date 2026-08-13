"use client";
import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CheckoutSummary } from './CheckoutSummary';
import { DeliveryOptions } from './DeliveryOptions';
import { PaymentMethods } from './PaymentMethods';
import { useCartStore } from '@/store/cart-store';
import { createOrder, ApiError } from '@/lib/api';

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
};

const EMPTY_FORM: FormState = {
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  city: '',
  zip: '',
};

export function CheckoutExperience() {
  const t = useTranslations('checkout');
  const { items, clearCart } = useCartStore();
  const [isPlaced, setIsPlaced] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await createOrder({
        customerName: `${form.firstName} ${form.lastName}`.trim(),
        customerPhone: form.phone,
        customerAddress: form.address,
        city: form.city,
        zipCode: form.zip || undefined,
        items: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
      });
      clearCart();
      setIsPlaced(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t('orderError'));
    } finally {
      setIsSubmitting(false);
    }
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
                <input type="tel" required value={form.phone} onChange={updateField('phone')} placeholder={t('phonePlaceholder')} className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-display text-forest mb-4">{t('shippingAddress')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" required value={form.firstName} onChange={updateField('firstName')} placeholder={t('firstNamePlaceholder')} className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
                <input type="text" required value={form.lastName} onChange={updateField('lastName')} placeholder={t('lastNamePlaceholder')} className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
                <input type="text" required value={form.address} onChange={updateField('address')} placeholder={t('addressPlaceholder')} className="col-span-2 w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
                <input type="text" required value={form.city} onChange={updateField('city')} placeholder={t('cityPlaceholder')} className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
                <input type="text" value={form.zip} onChange={updateField('zip')} placeholder={t('zipPlaceholder')} className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
              </div>
            </div>

            <DeliveryOptions />
            <PaymentMethods />

            {error && <p className="text-terracotta text-sm mt-4">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-terracotta hover:bg-terracotta-light disabled:opacity-60 text-cream rounded-full font-medium transition-colors text-lg mt-6"
            >
              {isSubmitting ? t('placingOrder') : t('placeOrder')}
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
