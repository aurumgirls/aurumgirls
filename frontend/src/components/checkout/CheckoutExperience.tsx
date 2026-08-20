"use client";
import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CheckoutSummary } from './CheckoutSummary';
import { DeliveryOptions } from './DeliveryOptions';
import { PaymentMethods, type PaymentMethod, type CardDetails, type CardFieldErrors } from './PaymentMethods';
import { useCartStore } from '@/store/cart-store';
import { createOrder, ApiError } from '@/lib/api';
import { cn } from '@/lib/utils';
import {
  isValidName,
  isValidPhone,
  isValidEmail,
  isValidAddress,
  isValidZip,
  isValidCardNumber,
  isValidCardExpiry,
  isValidCvv,
} from '@/lib/validation';
import { sendOrderConfirmationEmail } from '@/lib/email';

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zip: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  zip: '',
};

const EMPTY_CARD: CardDetails = { name: '', number: '', expiry: '', cvv: '' };

export function CheckoutExperience() {
  const t = useTranslations('checkout');
  const { items, clearCart } = useCartStore();
  const [isPlaced, setIsPlaced] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('applepay');
  const [card, setCard] = useState<CardDetails>(EMPTY_CARD);
  const [cardErrors, setCardErrors] = useState<CardFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setFieldErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const updateCard = (field: keyof CardDetails, value: string) => {
    setCard((prev) => ({ ...prev, [field]: value }));
    setCardErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    if (!isValidName(form.firstName)) errors.firstName = t('errors.nameInvalid');
    if (!isValidName(form.lastName)) errors.lastName = t('errors.nameInvalid');
    if (!isValidPhone(form.phone)) errors.phone = t('errors.phoneInvalid');
    if (!isValidEmail(form.email)) errors.email = t('errors.emailInvalid');
    if (!isValidAddress(form.address)) errors.address = t('errors.addressInvalid');
    if (!isValidName(form.city)) errors.city = t('errors.cityInvalid');
    if (!isValidZip(form.zip)) errors.zip = t('errors.zipInvalid');
    return errors;
  };

  const validateCard = (): CardFieldErrors => {
    if (paymentMethod !== 'card') return {};
    const errors: CardFieldErrors = {};
    if (!isValidName(card.name)) errors.name = t('errors.cardNameInvalid');
    if (!isValidCardNumber(card.number)) errors.number = t('errors.cardNumberInvalid');
    if (!isValidCardExpiry(card.expiry)) errors.expiry = t('errors.cardExpiryInvalid');
    if (!isValidCvv(card.cvv)) errors.cvv = t('errors.cardCvvInvalid');
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const errors = validate();
    const cErrors = validateCard();
    if (Object.keys(errors).length > 0 || Object.keys(cErrors).length > 0) {
      setFieldErrors(errors);
      setCardErrors(cErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const order = await createOrder({
        customerName: `${form.firstName} ${form.lastName}`.trim(),
        customerPhone: form.phone,
        customerAddress: form.address,
        city: form.city,
        zipCode: form.zip || undefined,
        items: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
      });
      sendOrderConfirmationEmail({
        toEmail: form.email,
        toName: `${form.firstName} ${form.lastName}`.trim(),
        orderId: order.id,
        totalPrice: order.totalPrice,
        items: items.map((item) => ({ name: item.name, quantity: item.quantity, price: item.price })),
      });
      clearCart();
      setIsPlaced(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t('orderError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormState) =>
    cn(
      "w-full px-4 py-3 rounded-xl border focus:outline-none bg-white",
      fieldErrors[field] ? "border-terracotta focus:border-terracotta" : "border-sand focus:border-terracotta"
    );

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
        <Link href="/#products" className="btn-primary inline-flex">
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
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-10">
              <h3 className="text-xl font-display text-forest mb-4">{t('contactInfo')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input type="tel" value={form.phone} onChange={updateField('phone')} placeholder={t('phonePlaceholder')} className={inputClass('phone')} />
                  {fieldErrors.phone && <p className="text-terracotta text-xs">{fieldErrors.phone}</p>}
                </div>
                <div className="space-y-1">
                  <input type="email" value={form.email} onChange={updateField('email')} placeholder={t('emailPlaceholder')} className={inputClass('email')} />
                  {fieldErrors.email && <p className="text-terracotta text-xs">{fieldErrors.email}</p>}
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-display text-forest mb-4">{t('shippingAddress')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input type="text" value={form.firstName} onChange={updateField('firstName')} placeholder={t('firstNamePlaceholder')} className={inputClass('firstName')} />
                  {fieldErrors.firstName && <p className="text-terracotta text-xs">{fieldErrors.firstName}</p>}
                </div>
                <div className="space-y-1">
                  <input type="text" value={form.lastName} onChange={updateField('lastName')} placeholder={t('lastNamePlaceholder')} className={inputClass('lastName')} />
                  {fieldErrors.lastName && <p className="text-terracotta text-xs">{fieldErrors.lastName}</p>}
                </div>
                <div className="col-span-2 space-y-1">
                  <input type="text" value={form.address} onChange={updateField('address')} placeholder={t('addressPlaceholder')} className={inputClass('address')} />
                  {fieldErrors.address && <p className="text-terracotta text-xs">{fieldErrors.address}</p>}
                </div>
                <div className="space-y-1">
                  <input type="text" value={form.city} onChange={updateField('city')} placeholder={t('cityPlaceholder')} className={inputClass('city')} />
                  {fieldErrors.city && <p className="text-terracotta text-xs">{fieldErrors.city}</p>}
                </div>
                <div className="space-y-1">
                  <input type="text" value={form.zip} onChange={updateField('zip')} placeholder={t('zipPlaceholder')} className={inputClass('zip')} />
                  {fieldErrors.zip && <p className="text-terracotta text-xs">{fieldErrors.zip}</p>}
                </div>
              </div>
            </div>

            <DeliveryOptions />
            <PaymentMethods
              method={paymentMethod}
              onMethodChange={setPaymentMethod}
              card={card}
              onCardChange={updateCard}
              fieldErrors={cardErrors}
            />

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
