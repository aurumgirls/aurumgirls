"use client";

import { useState } from 'react';
import { ProductDetail } from '@/lib/product-detail';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProductInfoSection({ product }: { product: ProductDetail }) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    nutrition: true,
    ingredients: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="bg-white rounded-3xl shadow-soft border border-sand overflow-hidden">
      {/* Nutrition Facts */}
      <div className="border-b border-sand last:border-0">
        <button 
          onClick={() => toggleSection('nutrition')}
          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-linen transition-colors"
        >
          <span className="font-display text-xl text-forest">Nutrition Facts</span>
          {openSections.nutrition ? (
            <ChevronUp className="w-5 h-5 text-forest" />
          ) : (
            <ChevronDown className="w-5 h-5 text-forest" />
          )}
        </button>
        
        <div className={cn(
          "px-6 overflow-hidden transition-all duration-300",
          openSections.nutrition ? "py-4 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="border-2 border-charcoal p-4 bg-white font-sans text-charcoal">
            <h4 className="font-black text-2xl border-b-8 border-charcoal pb-1 mb-2">Nutrition Facts</h4>
            <div className="flex justify-between font-bold border-b border-charcoal pb-1 mb-1 text-lg">
              <span>Calories</span>
              <span>{product.nutritionFacts.calories}</span>
            </div>
            <div className="text-sm">
              <div className="flex justify-between border-b border-charcoal/30 py-1">
                <span className="font-bold">Total Fat <span className="font-normal">{product.nutritionFacts.totalFat}</span></span>
              </div>
              <div className="flex justify-between border-b border-charcoal/30 py-1">
                <span className="font-bold">Total Sugars <span className="font-normal">{product.nutritionFacts.sugars}</span></span>
              </div>
              <div className="flex justify-between border-b border-charcoal/30 py-1">
                <span className="font-bold">Protein <span className="font-normal">{product.nutritionFacts.protein}</span></span>
              </div>
              <div className="flex justify-between border-b border-charcoal/30 py-1">
                <span className="font-bold">Calcium <span className="font-normal">{product.nutritionFacts.calcium}</span></span>
              </div>
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
          <span className="font-display text-xl text-forest">Ingredients</span>
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
            {product.ingredients}
          </p>
        </div>
      </div>
    </div>
  );
}
