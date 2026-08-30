"use client";

import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '@/lib/api';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

/**
 * Disclosure panel. Uses the grid-rows 0fr/1fr technique rather than a capped
 * max-height so the panel animates to its true content height and can never
 * clip, and marks collapsed content hidden so it leaves the a11y tree.
 */
function InfoPanel({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  const panelId = useId();

  return (
    <div className="border-b border-sand last:border-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-linen transition-colors"
      >
        <span className="font-display text-xl text-forest">{title}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-forest transition-transform duration-300 ease-organic",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-organic",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className={cn("px-6", isOpen ? "py-4" : "py-0")}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export function ProductInfoSection({ product }: { product: Product }) {
  const t = useTranslations('product');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    details: true,
    ingredients: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="bg-white rounded-3xl shadow-soft border border-sand overflow-hidden">
      <InfoPanel
        title={t('info.detailsTitle')}
        isOpen={openSections.details}
        onToggle={() => toggleSection('details')}
      >
        <dl className="text-sm divide-y divide-sand">
          <div className="flex justify-between py-2.5">
            <dt className="text-slate">{t('info.stockLabel')}</dt>
            <dd className="font-medium text-charcoal">
              {product.inStock ? t('info.inStockValue') : t('info.outOfStockValue')}
            </dd>
          </div>
          <div className="flex justify-between py-2.5">
            <dt className="text-slate">{t('info.storageLabel')}</dt>
            <dd className="font-medium text-charcoal text-right max-w-[60%]">{t('info.storageValue')}</dd>
          </div>
          <div className="flex justify-between py-2.5">
            <dt className="text-slate">{t('info.shelfLifeLabel')}</dt>
            <dd className="font-medium text-charcoal">{t('info.shelfLifeValue')}</dd>
          </div>
        </dl>
      </InfoPanel>

      <InfoPanel
        title={t('info.ingredientsTitle')}
        isOpen={openSections.ingredients}
        onToggle={() => toggleSection('ingredients')}
      >
        <p className="text-slate leading-relaxed">{t('info.ingredientsValue')}</p>
      </InfoPanel>
    </div>
  );
}
