import { shopProducts, ShopProduct } from './shop-data';

export type ProductDetail = ShopProduct & {
  highlights: string[];
  nutritionFacts: {
    calories: number;
    totalFat: string;
    protein: string;
    sugars: string;
    calcium: string;
  };
  ingredients: string;
  gallery: {
    type: 'image' | 'swatch';
    src?: string;
    swatch?: [string, string];
    label: string;
    angle?: string;
  }[];
};

export type Seller = {
  name: string;
  brand: string;
  location: string;
  description: string;
};

const COMMON_HIGHLIGHTS = [
  'Made with organic milk from our family farm',
  'Thick Icelandic-style skyr',
  'High protein, lactose free',
  'BB12 probiotics for gut health',
  'No artificial flavors or preservatives',
];

export function getProductBySlug(slug: string): ProductDetail | undefined {
  const base = shopProducts.find((p) => p.slug === slug);
  if (!base) return undefined;

  return {
    ...base,
    highlights: COMMON_HIGHLIGHTS,
    nutritionFacts: {
      calories: 140,
      totalFat: '6g',
      protein: base.protein,
      sugars: '5g',
      calcium: '15%',
    },
    ingredients: 'Organic Pasteurized Cultured Whole Milk, Organic Fruit Preparation, Lactase Enzyme, Live Active Cultures.',
    gallery: [
      {
        type: base.image ? 'image' : 'swatch',
        src: base.image,
        swatch: base.image ? undefined : base.swatch,
        label: base.name,
        angle: 'front',
      }
    ],
  };
}

export function getRelatedProducts(slug: string, count: number = 4): ShopProduct[] {
  return shopProducts.filter((p) => p.slug !== slug).slice(0, count);
}

export function getSeller(sellerName: string): Seller {
  return {
    name: 'Stephanie & Hayley Painter',
    brand: 'Painterland Sisters',
    location: 'Tioga County, PA',
    description: '5th generation dairy farmers creating organic skyr with milk from our family farm.',
  };
}
