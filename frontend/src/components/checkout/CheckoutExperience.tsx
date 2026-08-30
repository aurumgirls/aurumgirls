"use client";
import { useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import FadeUp from '@/components/motion/FadeUp';
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
  const { items, total, clearCart } = useCartStore();
  const [isPlaced, setIsPlaced] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('applepay');
  const [card, setCard] = useState<CardDetails>(EMPTY_CARD);
  const [cardErrors, setCardErrors] = useState<CardFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Individual top-level refs, not an object literal keyed by field name —
  // the React Compiler's ref lint rule flags `ref={someObject.someKey}` as an
  // unsafe render-time ref access even though each value is a plain useRef.
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);

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
      // Built here, inside the handler, rather than stored on the component —
      // reading `.current` is only safe outside of render.
      const refsByField: Record<keyof FormState, React.RefObject<HTMLInputElement | null>> = {
        phone: phoneRef,
        email: emailRef,
        firstName: firstNameRef,
        lastName: lastNameRef,
        address: addressRef,
        city: cityRef,
        zip: zipRef,
      };
      const firstInvalidField = (
        ['phone', 'email', 'firstName', 'lastName', 'address', 'city', 'zip'] as const
      ).find((field) => errors[field]);
      if (firstInvalidField) refsByField[firstInvalidField].current?.focus();
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
      "w-full px-4 py-3 rounded-xl border bg-white transition-[border-color,box-shadow] duration-200 ease-organic",
      "focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/25",
      fieldErrors[field] ? "border-terracotta" : "border-sand"
    );

  if (isPlaced) {
    return (
      <FadeUp trigger="mount" duration={0.5} y={16} className="max-w-xl mx-auto text-center py-16 md:py-24">
        <div className="w-20 h-20 mx-auto rounded-full bg-forest/10 text-forest flex items-center justify-center mb-6">
          <CheckCircle2 size={36} />
        </div>
        <h1 className="text-3xl md:text-4xl font-display text-forest mb-4">{t('orderSuccess.title')}</h1>
        <p className="text-slate mb-8">{t('orderSuccess.text')}</p>
        <Link href="/" className="btn-primary inline-flex">
          {t('orderSuccess.backHome')}
        </Link>
      </FadeUp>
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
                  <input type="tel" value={form.phone} ref={phoneRef} name="tel" spellCheck={false} autoComplete="tel" onChange={updateField('phone')} placeholder={t('phonePlaceholder')} className={inputClass('phone')} aria-invalid={!!fieldErrors.phone} aria-describedby={fieldErrors.phone ? 'phone-error' : undefined} />
                  {fieldErrors.phone && (
                  <FadeUp trigger="mount" duration={0.15} y={4}>
                    <p id="phone-error" role="alert" className="text-terracotta text-xs">{fieldErrors.phone}</p>
                  </FadeUp>
                )}
                </div>
                <div className="space-y-1">
                  <input type="email" value={form.email} ref={emailRef} name="email" spellCheck={false} autoComplete="email" onChange={updateField('email')} placeholder={t('emailPlaceholder')} className={inputClass('email')} aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? 'email-error' : undefined} />
                  {fieldErrors.email && (
                  <FadeUp trigger="mount" duration={0.15} y={4}>
                    <p id="email-error" role="alert" className="text-terracotta text-xs">{fieldErrors.email}</p>
                  </FadeUp>
                )}
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-display text-forest mb-4">{t('shippingAddress')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input type="text" value={form.firstName} ref={firstNameRef} name="firstName" autoComplete="given-name" onChange={updateField('firstName')} placeholder={t('firstNamePlaceholder')} className={inputClass('firstName')} aria-invalid={!!fieldErrors.firstName} aria-describedby={fieldErrors.firstName ? 'firstName-error' : undefined} />
                  {fieldErrors.firstName && (
                  <FadeUp trigger="mount" duration={0.15} y={4}>
                    <p id="firstName-error" role="alert" className="text-terracotta text-xs">{fieldErrors.firstName}</p>
                  </FadeUp>
                )}
                </div>
                <div className="space-y-1">
                  <input type="text" value={form.lastName} ref={lastNameRef} name="lastName" autoComplete="family-name" onChange={updateField('lastName')} placeholder={t('lastNamePlaceholder')} className={inputClass('lastName')} aria-invalid={!!fieldErrors.lastName} aria-describedby={fieldErrors.lastName ? 'lastName-error' : undefined} />
                  {fieldErrors.lastName && (
                  <FadeUp trigger="mount" duration={0.15} y={4}>
                    <p id="lastName-error" role="alert" className="text-terracotta text-xs">{fieldErrors.lastName}</p>
                  </FadeUp>
                )}
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <input type="text" value={form.address} ref={addressRef} name="address" autoComplete="street-address" onChange={updateField('address')} placeholder={t('addressPlaceholder')} className={inputClass('address')} aria-invalid={!!fieldErrors.address} aria-describedby={fieldErrors.address ? 'address-error' : undefined} />
                  {fieldErrors.address && (
                  <FadeUp trigger="mount" duration={0.15} y={4}>
                    <p id="address-error" role="alert" className="text-terracotta text-xs">{fieldErrors.address}</p>
                  </FadeUp>
                )}
                </div>
                <div className="space-y-1">
                  <input type="text" value={form.city} ref={cityRef} name="city" autoComplete="address-level2" onChange={updateField('city')} placeholder={t('cityPlaceholder')} className={inputClass('city')} aria-invalid={!!fieldErrors.city} aria-describedby={fieldErrors.city ? 'city-error' : undefined} />
                  {fieldErrors.city && (
                  <FadeUp trigger="mount" duration={0.15} y={4}>
                    <p id="city-error" role="alert" className="text-terracotta text-xs">{fieldErrors.city}</p>
                  </FadeUp>
                )}
                </div>
                <div className="space-y-1">
                  <input type="text" value={form.zip} ref={zipRef} name="zip" autoComplete="postal-code" onChange={updateField('zip')} placeholder={t('zipPlaceholder')} className={inputClass('zip')} aria-invalid={!!fieldErrors.zip} aria-describedby={fieldErrors.zip ? 'zip-error' : undefined} />
                  {fieldErrors.zip && (
                  <FadeUp trigger="mount" duration={0.15} y={4}>
                    <p id="zip-error" role="alert" className="text-terracotta text-xs">{fieldErrors.zip}</p>
                  </FadeUp>
                )}
                </div>
              </div>
            </div>

            <DeliveryOptions subtotal={total} />
            <PaymentMethods
              method={paymentMethod}
              onMethodChange={setPaymentMethod}
              card={card}
              onCardChange={updateCard}
              fieldErrors={cardErrors}
            />

            {error && <p role="alert" className="text-terracotta text-sm mt-4">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="w-full py-4 bg-terracotta hover:bg-terracotta-light disabled:opacity-60 disabled:cursor-not-allowed text-cream rounded-full font-medium transition-[background-color,transform] duration-200 ease-organic active:scale-[0.99] disabled:active:scale-100 text-lg mt-6 flex items-center justify-center gap-2"
            >
              {isSubmitting && (
                <span
                  aria-hidden="true"
                  className="w-4 h-4 rounded-full border-2 border-cream/40 border-t-cream animate-spin"
                />
              )}
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
