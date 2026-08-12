"use client";

import { useState } from 'react';
import { ProductDetail } from '@/lib/product-detail';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useLocalizedProduct } from '@/lib/shop-i18n';

export function ProductInfoSection({ product }: { product: ProductDetail }) {
  const t = useTranslations('product');
  const text = useLocalizedProduct(product);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    details: true,
    ingredients: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="bg-white rounded-3xl shadow-soft border border-sand overflow-hidden">
      {/* Product Details */}
      <div className="border-b border-sand last:border-0">
        <button
          onClick={() => toggleSection('details')}
          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-linen transition-colors"
        >
          <span className="font-display text-xl text-forest">{t('info.detailsTitle')}</span>
          {openSections.details ? (
            <ChevronUp className="w-5 h-5 text-forest" />
          ) : (
            <ChevronDown className="w-5 h-5 text-forest" />
          )}
        </button>

        <div className={cn(
          "px-6 overflow-hidden transition-all duration-300",
          openSections.details ? "py-4 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="text-sm divide-y divide-sand">
            <div className="flex justify-between py-2.5">
              <span className="text-slate">{t('info.originLabel')}</span>
              <span className="font-medium text-charcoal">{text.region}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-slate">{t('info.storageLabel')}</span>
              <span className="font-medium text-charcoal text-right max-w-[60%]">{t('info.storageValue')}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-slate">{t('info.shelfLifeLabel')}</span>
              <span className="font-medium text-charcoal">{t('info.shelfLifeValue')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="border-b border-sand last:border-0">
        <button
          onClick={() => toggleSection('ingredients')}
          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-linen transition-colors"
        >
          <span className="font-display text-xl text-forest">{t('info.ingredientsTitle')}</span>
          {openSections.ingredients ? (
            <ChevronUp className="w-5 h-5 text-forest" />
          ) : (
            <ChevronDown className="w-5 h-5 text-forest" />
          )}
        </button>

        <div className={cn(
          "px-6 overflow-hidden transition-all duration-300",
          openSections.ingredients ? "py-4 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <p className="text-slate leading-relaxed">
            {t('info.ingredientsValue')}
          </p>
        </div>
      </div>
    </div>
  );
}
