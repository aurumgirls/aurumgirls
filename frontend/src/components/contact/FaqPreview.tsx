"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Where can I find Painterland Sisters yogurt?",
      answer: "Our skyr is available in select Whole Foods, Sprouts, Publix, and independent natural grocers across the country. Check our Find Us page for a store locator!"
    },
    {
      question: "Is your yogurt really lactose free?",
      answer: "Yes! The traditional Icelandic straining process naturally removes the lactose while leaving behind the rich, creamy texture and high protein content."
    },
    {
      question: "How long does your yogurt stay fresh?",
      answer: "Please check the best-by date printed on the cup. Our skyr typically maintains its optimal freshness and taste for about 45 days when properly refrigerated."
    },
    {
      question: "Do you offer wholesale?",
      answer: "Yes, we love partnering with retailers who share our values. Please email inquiries@painterlandsisters.com with 'Wholesale' in the subject line or use our contact form."
    }
  ];

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-soft border border-sand">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-display text-forest mb-4">Frequently Asked Questions</h3>
        <p className="text-slate">Quick answers to common questions about our skyr.</p>
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
