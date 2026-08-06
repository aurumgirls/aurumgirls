export type ProductAvailability = 'available' | 'low-stock' | 'out-of-stock';

export type ShopCategory = { name: string; slug: string };

export const shopCategories: ShopCategory[] = [
  { name: 'Hədiyyə Seti', slug: 'set' },
  { name: 'Tək Məhsullar', slug: 'individual' },
];

export type Availability = 'available' | 'low-stock' | 'out-of-stock';

export type ShopProduct = {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  currency: string;
  maker: string;
  region: string;
  availability: Availability;
  swatch: [string, string];
  image?: string;
  flavorColor: string;
  isNew?: boolean;
  rating: number;
  reviews: number;
  protein: string;
  description: string;
};

export const shopProducts: ShopProduct[] = [
  {
    id: 1,
    name: 'Hədiyyə Seti (5-i 1-ində)',
    slug: 'hadiyya-seti',
    category: 'set',
    price: 42,
    currency: '₼',
    maker: 'By Aurum Girls',
    region: 'Qafqaz İcması',
    availability: 'available',
    swatch: ['#F7F3E9', '#E5DEC9'],
    image: '/images/aurum-gift-set-real.jpg',
    flavorColor: '#F7F3E9',
    rating: 5.0,
    reviews: 48,
    protein: 'Tam Dəst (5 Məhsul)',
    description: 'Bütün 5 təbii kənd məhsulumuz xüsusi hədiyyə qutusunda: Dağ Balı (500q), Ev Mürəbbəsi (450q), Kəklikotu (100q), Sarı Çiçək/Baf Çayı (80q), Dağ Çayı (120q).'
  },
  {
    id: 2,
    name: 'Təbii Dağ Balı (500q)',
    slug: 'dali-bal',
    category: 'individual',
    price: 15,
    currency: '₼',
    maker: 'By Aurum Girls',
    region: 'Qafqaz İcması',
    availability: 'available',
    swatch: ['#FFF8E1', '#FFE082'],
    image: undefined,
    flavorColor: '#FFF8E1',
    rating: 4.9,
    reviews: 36,
    protein: '100% Təbii',
    description: 'Yüksək dağ yaylalarından toplanmış 100% xalis dağ balı.'
  },
  {
    id: 3,
    name: 'Ev Mürəbbəsi (450q)',
    slug: 'murebbe',
    category: 'individual',
    price: 10,
    currency: '₼',
    maker: 'By Aurum Girls',
    region: 'Qafqaz İcması',
    availability: 'available',
    swatch: ['#FFEBEE', '#EF9A9A'],
    image: undefined,
    flavorColor: '#FFEBEE',
    rating: 4.8,
    reviews: 29,
    protein: 'Ənənəvi Resept',
    description: 'Meşə giləmeyvələrindən əllə hazırlanmış ev mürəbbəsi.'
  },
  {
    id: 4,
    name: 'Kəklikotu / Thyme (100q)',
    slug: 'keklikotu',
    category: 'individual',
    price: 6,
    currency: '₼',
    maker: 'By Aurum Girls',
    region: 'Qafqaz İcması',
    availability: 'available',
    swatch: ['#E8F5E9', '#A5D6A7'],
    image: undefined,
    flavorColor: '#E8F5E9',
    rating: 4.9,
    reviews: 42,
    protein: 'Ətirli Dağ Bitkisi',
    description: 'Qafqaz dağlarından əllə toplanmış ətirli dağ kəklikotusu.'
  },
  {
    id: 5,
    name: 'Sarı Çiçək / Baf Çayı (80q)',
    slug: 'sari-cicek',
    category: 'individual',
    price: 7,
    currency: '₼',
    maker: 'By Aurum Girls',
    region: 'Qafqaz İcması',
    availability: 'available',
    swatch: ['#FFFDE7', '#FFF59D'],
    image: undefined,
    flavorColor: '#FFFDE7',
    rating: 4.7,
    reviews: 21,
    protein: 'Sakitləşdirici Blend',
    description: 'Təbii dağ çiçəyi və ıhlamur qarışığı.'
  },
  {
    id: 6,
    name: 'Dağ Çayı Blend (120q)',
    slug: 'dag-cayi',
    category: 'individual',
    price: 8,
    currency: '₼',
    maker: 'By Aurum Girls',
    region: 'Qafqaz İcması',
    availability: 'available',
    swatch: ['#F1F8E9', '#C5E1A5'],
    image: undefined,
    flavorColor: '#F1F8E9',
    rating: 4.9,
    reviews: 34,
    protein: 'Antioksidant Rich',
    description: 'Təbiətin ətri ilə zəngin xüsusi dağ bitkiləri çayı.'
  }
];

export const priceBounds = { min: 5, max: 50 };

export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
