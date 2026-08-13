"use client";

import { useState } from 'react';
import { Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { isValidName, isValidEmail } from '@/lib/validation';

type FormState = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = { name: '', email: '', topic: '', message: '' };
const MIN_MESSAGE_LENGTH = 10;

export default function ContactForm() {
  const t = useTranslations('contact');
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setFieldErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    if (!isValidName(form.name)) errors.name = t('form.errors.nameInvalid');
    if (!isValidEmail(form.email)) errors.email = t('form.errors.emailInvalid');
    if (!form.topic) errors.topic = t('form.errors.topicInvalid');
    if (form.message.trim().length < MIN_MESSAGE_LENGTH) errors.message = t('form.errors.messageInvalid');
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    // Mock API call — the backend has no contact/message endpoint.
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setForm(EMPTY_FORM);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  const fieldClass = (field: keyof FormState) =>
    cn(
      "w-full px-4 py-3 bg-linen border rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all",
      fieldErrors[field] ? "border-terracotta" : "border-sand"
    );

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-soft border border-sand">
      <h3 className="text-2xl font-display text-forest mb-6">{t('form.title')}</h3>

      {isSuccess ? (
        <div className="bg-green-50 text-forest p-6 rounded-2xl flex flex-col items-center justify-center text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Send className="text-green-600" size={24} />
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
                type="text"
                id="name"
                value={form.name}
                onChange={updateField('name')}
                className={fieldClass('name')}
                placeholder={t('form.namePlaceholder')}
              />
              {fieldErrors.name && <p className="text-terracotta text-xs">{fieldErrors.name}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-forest">{t('form.emailLabel')}</label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={updateField('email')}
                className={fieldClass('email')}
                placeholder={t('form.emailPlaceholder')}
              />
              {fieldErrors.email && <p className="text-terracotta text-xs">{fieldErrors.email}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="topic" className="text-sm font-medium text-forest">{t('form.topicLabel')}</label>
            <select
              id="topic"
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
            {fieldErrors.topic && <p className="text-terracotta text-xs">{fieldErrors.topic}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-forest">{t('form.messageLabel')}</label>
            <textarea
              id="message"
              value={form.message}
              onChange={updateField('message')}
              rows={5}
              className={cn(fieldClass('message'), "resize-none")}
              placeholder={t('form.messagePlaceholder')}
            ></textarea>
            {fieldErrors.message && <p className="text-terracotta text-xs">{fieldErrors.message}</p>}
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
