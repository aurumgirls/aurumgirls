"use client";

import { useRef, useState } from 'react';
import { Send } from 'lucide-react';
import FadeUp from '@/components/motion/FadeUp';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { isValidName, isValidEmail, isValidPhone } from '@/lib/validation';
import { sendContactEmail } from '@/lib/email';

type FormState = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = { name: '', email: '', phone: '', topic: '', message: '' };
const MIN_MESSAGE_LENGTH = 10;

export default function ContactForm() {
  const t = useTranslations('contact');
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Individual top-level refs, not an object literal keyed by field name —
  // the React Compiler's ref lint rule flags `ref={someObject.someKey}` as an
  // unsafe render-time ref access even though each value is a plain useRef.
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const topicRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const updateField = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setFieldErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    if (submitError) setSubmitError(null);
  };

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    if (!isValidName(form.name)) errors.name = t('form.errors.nameInvalid');
    if (!isValidEmail(form.email)) errors.email = t('form.errors.emailInvalid');
    if (!isValidPhone(form.phone)) {
      errors.phone = t.has('form.errors.phoneInvalid') ? t('form.errors.phoneInvalid') : 'Zəhmət olmasa doğru telefon nömrəsi daxil edin.';
    }
    if (!form.topic) errors.topic = t('form.errors.topicInvalid');
    if (form.message.trim().length < MIN_MESSAGE_LENGTH) errors.message = t('form.errors.messageInvalid');
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      // Built here, inside the handler, rather than stored on the component —
      // reading `.current` is only safe outside of render.
      const refsByField: Record<keyof FormState, React.RefObject<HTMLElement | null>> = {
        name: nameRef,
        email: emailRef,
        phone: phoneRef,
        topic: topicRef,
        message: messageRef,
      };
      const firstInvalidField = (['name', 'email', 'phone', 'topic', 'message'] as const).find(
        (field) => errors[field]
      );
      if (firstInvalidField) refsByField[firstInvalidField].current?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await sendContactEmail({
        name: form.name,
        email: form.email,
        phone: form.phone.trim(),
        topic: form.topic,
        message: form.message,
      });
      setIsSuccess(true);
      setForm(EMPTY_FORM);
    } catch (err) {
      console.error('Contact email send error:', err);
      setSubmitError(t('form.errors.sendFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (field: keyof FormState) =>
    cn(
      "w-full px-4 py-3 bg-linen border rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-[border-color,box-shadow] duration-200 ease-organic",
      fieldErrors[field] ? "border-terracotta" : "border-sand"
    );

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-soft border border-sand">
      <h3 className="text-2xl font-display text-forest mb-6">{t('form.title')}</h3>

      {submitError && (
        <div className="mb-6 p-4 bg-terracotta/10 border border-terracotta/30 text-terracotta rounded-xl text-sm">
          {submitError}
        </div>
      )}

      {isSuccess ? (
        <div className="bg-forest/5 text-forest p-6 rounded-2xl flex flex-col items-center justify-center text-center py-12">
          <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mb-4">
            <Send className="text-forest" size={24} />
          </div>
          <h4 className="text-xl font-display mb-2">{t('form.successTitle')}</h4>
          <p>{t('form.successText')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-forest">{t('form.nameLabel')}</label>
              <input
                ref={nameRef}
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={updateField('name')}
                className={fieldClass('name')}
                placeholder={t('form.namePlaceholder')}
              />
              {fieldErrors.name && (
                <FadeUp trigger="mount" duration={0.15} y={4}>
                  <p role="alert" className="text-terracotta text-xs">{fieldErrors.name}</p>
                </FadeUp>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-forest">{t('form.emailLabel')}</label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                spellCheck={false}
                value={form.email}
                onChange={updateField('email')}
                className={fieldClass('email')}
                placeholder={t('form.emailPlaceholder')}
              />
              {fieldErrors.email && (
                <FadeUp trigger="mount" duration={0.15} y={4}>
                  <p role="alert" className="text-terracotta text-xs">{fieldErrors.email}</p>
                </FadeUp>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-forest">
              {t.has('form.phoneLabel') ? t('form.phoneLabel') : 'Telefon Nömrəsi'}
            </label>
            <input
              ref={phoneRef}
              type="tel"
              id="phone"
              name="tel"
              autoComplete="tel"
              spellCheck={false}
              value={form.phone}
              onChange={updateField('phone')}
              className={fieldClass('phone')}
              placeholder={t.has('form.phonePlaceholder') ? t('form.phonePlaceholder') : '+994 50 123 45 67'}
            />
            {fieldErrors.phone && (
              <FadeUp trigger="mount" duration={0.15} y={4}>
                <p role="alert" className="text-terracotta text-xs">{fieldErrors.phone}</p>
              </FadeUp>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="topic" className="text-sm font-medium text-forest">{t('form.topicLabel')}</label>
            <select
              ref={topicRef}
              id="topic"
              name="topic"
              autoComplete="off"
              value={form.topic}
              onChange={updateField('topic')}
              className={cn(fieldClass('topic'), "appearance-none")}
            >
              <option value="" disabled>{t('form.topicPlaceholder')}</option>
              <option value="general">{t('form.topicGeneral')}</option>
              <option value="wholesale">{t('form.topicWholesale')}</option>
              <option value="press">{t('form.topicPress')}</option>
              <option value="quality">{t('form.topicQuality')}</option>
              <option value="where-to-buy">{t('form.topicWhereToBuy')}</option>
            </select>
            {fieldErrors.topic && (
              <FadeUp trigger="mount" duration={0.15} y={4}>
                <p role="alert" className="text-terracotta text-xs">{fieldErrors.topic}</p>
              </FadeUp>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-forest">{t('form.messageLabel')}</label>
            <textarea
              ref={messageRef}
              id="message"
              name="message"
              autoComplete="off"
              value={form.message}
              onChange={updateField('message')}
              rows={5}
              className={cn(fieldClass('message'), "resize-none")}
              placeholder={t('form.messagePlaceholder')}
            ></textarea>
            {fieldErrors.message && (
              <FadeUp trigger="mount" duration={0.15} y={4}>
                <p role="alert" className="text-terracotta text-xs">{fieldErrors.message}</p>
              </FadeUp>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-forest hover:bg-forest-light text-cream py-4 rounded-full font-medium transition-colors duration-300 flex items-center justify-center disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-cream border-t-transparent mr-2"></span>
            ) : null}
            {isSubmitting ? t('form.sendingButton') : t('form.sendButton')}
          </button>
        </form>
      )}
    </div>
  );
}
