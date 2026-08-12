import { useLocale, useTranslations } from 'next-intl';
import type { ShopProduct } from './shop-data';

export type LocalizedProductText = {
  name: string;
  description: string;
  region: string;
  badge: string;
};

export function useLocalizedProduct(product: ShopProduct): LocalizedProductText {
  const locale = useLocale();
  const t = useTranslations('shop');

  if (locale === 'az') {
    return {
      name: product.name,
      description: product.description,
      region: product.region,
      badge: product.protein,
    };
  }

  return {
    name: t(`products.${product.slug}.name`),
    description: t(`products.${product.slug}.description`),
    region: t(`products.${product.slug}.region`),
    badge: t(`products.${product.slug}.badge`),
  };
}

export function useLocalizedProductName(slug: string, fallbackName: string): string {
  const locale = useLocale();
  const t = useTranslations('shop');
  return locale === 'az' ? fallbackName : t(`products.${slug}.name`);
}

export function useLocalizedCategoryName(categorySlug: string): string {
  const t = useTranslations('shop');
  if (categorySlug === 'set' || categorySlug === 'individual') {
    return t(`categories.${categorySlug}`);
  }
  return categorySlug;
}
