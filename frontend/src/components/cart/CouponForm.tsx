"use client";

import { useState } from 'react';
import { Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CouponForm() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.toUpperCase() === 'SKYR10' || code.toUpperCase() === 'MOOCREW') {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="py-6 border-b border-sand">
      <button className="flex items-center gap-2 text-forest hover:text-terracotta transition-colors font-medium mb-4">
        <Tag className="w-4 h-4" />
        Have a promo code?
      </button>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setStatus('idle');
          }}
          placeholder="e.g. SKYR10"
          className={cn(
            "flex-1 bg-white border rounded-full px-4 py-2.5 text-sm focus:outline-none transition-colors",
            status === 'error' ? "border-terracotta focus:ring-1 focus:ring-terracotta" : "border-sand focus:border-forest"
          )}
        />
        <button 
          type="submit"
          className="bg-forest hover:bg-forest-light text-cream px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
        >
          Apply
        </button>
      </form>
      
      {status === 'error' && (
        <p className="text-terracotta text-xs mt-2 ml-4">Invalid promo code.</p>
      )}
      {status === 'success' && (
        <p className="text-forest text-xs mt-2 ml-4">Promo code applied successfully!</p>
      )}
    </div>
  );
}
