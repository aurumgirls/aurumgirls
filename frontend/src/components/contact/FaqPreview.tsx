"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function FaqPreview() {
  const t = useTranslations('contact');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
  ];

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-soft border border-sand">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-display text-forest mb-4">{t('faq.title')}</h3>
        <p className="text-slate">{t('faq.subtitle')}</p>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border border-sand rounded-2xl overflow-hidden transition-all duration-300 hover:border-terracotta/30"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <span className="font-medium text-forest pr-8">{faq.question}</span>
              <span className={`text-terracotta transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}>
                <ChevronDown size={20} />
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-6 pt-0 text-slate">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
