import { shopProducts, ShopProduct } from './shop-data';

export type ProductDetail = ShopProduct & {
  gallery: {
    type: 'image' | 'swatch';
    src?: string;
    swatch?: [string, string];
    label: string;
    angle?: string;
  }[];
};

export function getProductBySlug(slug: string): ProductDetail | undefined {
  const base = shopProducts.find((p) => p.slug === slug);
  if (!base) return undefined;

  return {
    ...base,
    gallery: [
      {
        type: base.image ? 'image' : 'swatch',
        src: base.image,
        swatch: base.image ? undefined : base.swatch,
        label: base.name,
        angle: 'front',
      },
    ],
  };
}

export function getRelatedProducts(slug: string, count: number = 4): ShopProduct[] {
  return shopProducts.filter((p) => p.slug !== slug).slice(0, count);
}
