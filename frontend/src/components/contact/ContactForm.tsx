"use client";

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
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
      <h3 className="text-2xl font-display text-forest mb-6">Send a Message</h3>
      
      {isSuccess ? (
        <div className="bg-green-50 text-forest p-6 rounded-2xl flex flex-col items-center justify-center text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Send className="text-green-600" size={24} />
          </div>
          <h4 className="text-xl font-display mb-2">Message Sent!</h4>
          <p>Thank you for reaching out. We&apos;ll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-forest">Full Name</label>
              <input 
                type="text" 
                id="name" 
                required 
                className="w-full px-4 py-3 bg-linen border border-sand rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all"
                placeholder="Jane Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-forest">Email Address</label>
              <input 
                type="email" 
                id="email" 
                required 
                className="w-full px-4 py-3 bg-linen border border-sand rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all"
                placeholder="jane@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="topic" className="text-sm font-medium text-forest">What is this regarding?</label>
            <select 
              id="topic" 
              required
              className="w-full px-4 py-3 bg-linen border border-sand rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all appearance-none"
            >
              <option value="">Select a topic...</option>
              <option value="general">General Inquiry</option>
              <option value="wholesale">Wholesale Inquiry</option>
              <option value="press">Press & Media</option>
              <option value="quality">Product Quality</option>
              <option value="where-to-buy">Where to Buy</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-forest">Your Message</label>
            <textarea 
              id="message" 
              required 
              rows={5}
              className="w-full px-4 py-3 bg-linen border border-sand rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all resize-none"
              placeholder="How can we help you?"
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
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}
