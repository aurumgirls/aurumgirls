"use client";

import { shopCategories } from '@/lib/shop-data';
import { useTranslations } from 'next-intl';
import { useLocalizedCategoryName } from '@/lib/shop-i18n';
import { cn } from '@/lib/utils';

interface CategoryStripProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

function CategoryButton({
  name,
  isSelected,
  onSelect,
}: {
  name: string;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "px-5 py-2.5 rounded-full whitespace-nowrap font-medium transition-all duration-300 text-sm border",
        isSelected
          ? "bg-terracotta text-white border-terracotta"
          : "bg-cream text-charcoal border-sand hover:bg-linen"
      )}
    >
      {name}
    </button>
  );
}

function CategoryStripItem({ categorySlug, selectedCategory, onSelectCategory }: { categorySlug: string; selectedCategory: string; onSelectCategory: (c: string) => void }) {
  const name = useLocalizedCategoryName(categorySlug);
  return (
    <CategoryButton
      name={name}
      isSelected={selectedCategory === categorySlug}
      onSelect={() => onSelectCategory(categorySlug)}
    />
  );
}

export function CategoryStrip({ selectedCategory, onSelectCategory }: CategoryStripProps) {
  const t = useTranslations('shop');

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
      <CategoryButton
        name={t('categories.allLabel')}
        isSelected={selectedCategory === 'all'}
        onSelect={() => onSelectCategory('all')}
      />
      {shopCategories.map((category) => (
        <CategoryStripItem
          key={category.slug}
          categorySlug={category.slug}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
      ))}
    </div>
  );
}
