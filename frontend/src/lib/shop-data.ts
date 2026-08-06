export type ProductAvailability = 'available' | 'low-stock' | 'out-of-stock';

export type ShopCategory = { name: string; slug: string };

export const shopCategories: ShopCategory[] = [
  { name: 'Single Serve (5.3oz)', slug: 'single-serve' },
  { name: 'Multi-Serve (24oz)', slug: 'multi-serve' },
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
  { id: 1, name: 'Plain Skyr', slug: 'plain-cup', category: 'single-serve', price: 2.49, currency: '$', maker: 'Painterland Sisters', region: 'Tioga County, PA', availability: 'available', swatch: ['#F0EDE8', '#DDD8D0'], image: undefined, flavorColor: '#F0EDE8', rating: 4.8, reviews: 124, protein: '18g', description: 'Pure organic skyr, thick and creamy.' },
  { id: 2, name: 'Vanilla Bean Skyr', slug: 'vanilla-bean-cup', category: 'single-serve', price: 2.49, currency: '$', maker: 'Painterland Sisters', region: 'Tioga County, PA', availability: 'available', swatch: ['#F5EBE6', '#DDA15E'], image: '/images/yogurt-vanilla.jpg', flavorColor: '#F5EBE6', rating: 4.9, reviews: 198, protein: '17g', description: 'Real vanilla bean specks in every spoonful.' },
  { id: 3, name: 'Blueberry Lemon Skyr', slug: 'blueberry-lemon', category: 'single-serve', price: 2.49, currency: '$', maker: 'Painterland Sisters', region: 'Tioga County, PA', availability: 'available', swatch: ['#BAC7E8', '#7B94C9'], image: '/images/yogurt-blueberry.jpg', flavorColor: '#BAC7E8', rating: 4.9, reviews: 176, protein: '16g', description: 'Zesty lemon meets wild blueberry.' },
  { id: 4, name: 'Strawberry Fields Skyr', slug: 'strawberry', category: 'single-serve', price: 2.49, currency: '$', maker: 'Painterland Sisters', region: 'Tioga County, PA', availability: 'available', swatch: ['#F7C5C2', '#E8908A'], image: '/images/yogurt-strawberry.jpg', flavorColor: '#F7C5C2', rating: 4.8, reviews: 165, protein: '16g', description: 'Organic strawberry blend, sweet and smooth.' },
  { id: 5, name: 'Meadow Berry Skyr', slug: 'meadow-berry', category: 'single-serve', price: 2.49, currency: '$', maker: 'Painterland Sisters', region: 'Tioga County, PA', availability: 'available', swatch: ['#C68BB0', '#A86895'], image: undefined, flavorColor: '#C68BB0', rating: 4.7, reviews: 89, protein: '16g', description: 'A mixed berry medley from the meadow.', isNew: true },
  { id: 6, name: "Savannah's Peach Skyr", slug: 'peach', category: 'single-serve', price: 2.49, currency: '$', maker: 'Painterland Sisters', region: 'Tioga County, PA', availability: 'available', swatch: ['#F9C7A1', '#E8A67A'], image: undefined, flavorColor: '#F9C7A1', rating: 4.8, reviews: 112, protein: '16g', description: 'Sweet Georgia peach puree blended in.' },
  { id: 7, name: 'Passion Fruit Skyr', slug: 'passion-fruit', category: 'single-serve', price: 2.49, currency: '$', maker: 'Painterland Sisters', region: 'Tioga County, PA', availability: 'available', swatch: ['#FFD700', '#E8C200'], image: undefined, flavorColor: '#FFD700', rating: 4.7, reviews: 67, protein: '16g', description: 'Tropical passion fruit tang.', isNew: true },
  { id: 8, name: 'Raspberry Skyr', slug: 'raspberry', category: 'single-serve', price: 2.49, currency: '$', maker: 'Painterland Sisters', region: 'Tioga County, PA', availability: 'available', swatch: ['#E8A0BF', '#D07A9F'], image: undefined, flavorColor: '#E8A0BF', rating: 4.8, reviews: 95, protein: '16g', description: 'Bold raspberry flavor, perfectly balanced.', isNew: true },
  { id: 9, name: 'Plain Skyr Tub', slug: 'plain-tub', category: 'multi-serve', price: 6.99, currency: '$', maker: 'Painterland Sisters', region: 'Tioga County, PA', availability: 'available', swatch: ['#F0EDE8', '#DDD8D0'], image: undefined, flavorColor: '#F0EDE8', rating: 4.9, reviews: 87, protein: '21g', description: 'Family-size plain organic skyr.' },
  { id: 10, name: 'Vanilla Bean Skyr Tub', slug: 'vanilla-bean-tub', category: 'multi-serve', price: 6.99, currency: '$', maker: 'Painterland Sisters', region: 'Tioga County, PA', availability: 'available', swatch: ['#F5EBE6', '#DDA15E'], image: '/images/yogurt-vanilla.jpg', flavorColor: '#F5EBE6', rating: 4.9, reviews: 143, protein: '20g', description: 'Family-size vanilla bean organic skyr.' },
];

export const priceBounds = { min: 2, max: 8 };

export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
