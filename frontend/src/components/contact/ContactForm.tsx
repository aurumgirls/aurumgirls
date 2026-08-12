"use client";

import { useState } from 'react';
import { Send } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-forest">{t('form.nameLabel')}</label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-3 bg-linen border border-sand rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all"
                placeholder={t('form.namePlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-forest">{t('form.emailLabel')}</label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-3 bg-linen border border-sand rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all"
                placeholder={t('form.emailPlaceholder')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="topic" className="text-sm font-medium text-forest">{t('form.topicLabel')}</label>
            <select
              id="topic"
              required
              defaultValue=""
              className="w-full px-4 py-3 bg-linen border border-sand rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all appearance-none"
            >
              <option value="" disabled>{t('form.topicPlaceholder')}</option>
              <option value="general">{t('form.topicGeneral')}</option>
              <option value="wholesale">{t('form.topicWholesale')}</option>
              <option value="press">{t('form.topicPress')}</option>
              <option value="quality">{t('form.topicQuality')}</option>
              <option value="where-to-buy">{t('form.topicWhereToBuy')}</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-forest">{t('form.messageLabel')}</label>
            <textarea
              id="message"
              required
              rows={5}
              className="w-full px-4 py-3 bg-linen border border-sand rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all resize-none"
              placeholder={t('form.messagePlaceholder')}
            ></textarea>
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
