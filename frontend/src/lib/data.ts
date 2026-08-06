export type FlavorColor = string;

export const flavorColors: Record<string, FlavorColor> = {
  plain: '#F0EDE8',
  'vanilla-bean': '#F5EBE6',
  'blueberry-lemon': '#BAC7E8',
  strawberry: '#F7C5C2',
  'meadow-berry': '#C68BB0',
  peach: '#F9C7A1',
  'passion-fruit': '#FFD700',
  raspberry: '#E8A0BF',
};

export type FeaturedProduct = {
  id: number;
  name: string;
  slug: string;
  price: number;
  size: string;
  image?: string;
  flavorColor: string;
  description: string;
};

export const featuredProducts: FeaturedProduct[] = [
  { id: 1, name: 'Plain Skyr', slug: 'plain-cup', price: 2.49, size: '5.3oz', image: undefined, flavorColor: '#F0EDE8', description: 'Pure, thick, and creamy organic skyr.' },
  { id: 2, name: 'Vanilla Bean Skyr', slug: 'vanilla-bean-cup', price: 2.49, size: '5.3oz', image: '/images/yogurt-vanilla.jpg', flavorColor: '#F5EBE6', description: 'Real vanilla bean specks in every spoonful.' },
  { id: 3, name: 'Strawberry Fields Skyr', slug: 'strawberry', price: 2.49, size: '5.3oz', image: '/images/yogurt-strawberry.jpg', flavorColor: '#F7C5C2', description: 'Sweet organic strawberry blend.' },
  { id: 4, name: 'Blueberry Lemon Skyr', slug: 'blueberry-lemon', price: 2.49, size: '5.3oz', image: '/images/yogurt-blueberry.jpg', flavorColor: '#BAC7E8', description: 'Zesty lemon meets wild blueberry.' },
];

export const impactStats = [
  { value: '100+', label: 'Years of Farming Heritage' },
  { value: '5th', label: 'Generation Dairy Farmers' },
  { value: '100%', label: 'Organic & Regenerative' },
  { value: '16-21g', label: 'Protein Per Serving' },
];

export const valuePillars = [
  { icon: 'protein', title: '16-21g Protein', description: 'High protein to fuel your day' },
  { icon: 'lactose', title: 'Lactose Free', description: 'Easy on sensitive stomachs' },
  { icon: 'probiotic', title: 'BB12 Probiotics', description: 'Supports gut health naturally' },
  { icon: 'organic', title: 'USDA Organic', description: 'Certified organic ingredients' },
  { icon: 'milk', title: '6% Whole Milk Fat', description: 'Rich, creamy whole milk skyr' },
  { icon: 'women', title: 'Women Owned', description: 'Proudly sister-founded & led' },
];

export type Recipe = {
  title: string;
  description: string;
  category: string;
  prepTime: string;
  protein: string;
  image?: string;
  flavorUsed: string;
};

export const recipes: Recipe[] = [
  { title: 'Berry Bliss Smoothie Bowl', description: 'A vibrant smoothie bowl topped with fresh berries, granola, and a drizzle of honey.', category: 'Breakfast', prepTime: '10 min', protein: '24g', image: '/images/recipe-hero.jpg', flavorUsed: 'Blueberry Lemon' },
  { title: 'Skyr Protein Pancakes', description: 'Fluffy pancakes made with skyr for extra protein and incredible texture.', category: 'Breakfast', prepTime: '15 min', protein: '28g', image: undefined, flavorUsed: 'Vanilla Bean' },
  { title: 'Creamy Tzatziki Dip', description: 'A Mediterranean-inspired dip perfect with fresh vegetables or pita bread.', category: 'Dips & Savory', prepTime: '5 min', protein: '18g', image: undefined, flavorUsed: 'Plain' },
  { title: 'Strawberry Skyr Parfait', description: 'Layered strawberry skyr with homemade granola and fresh fruit.', category: 'Desserts', prepTime: '8 min', protein: '22g', image: undefined, flavorUsed: 'Strawberry Fields' },
  { title: 'Peach Mango Smoothie', description: 'A tropical blend of peach skyr with fresh mango and coconut water.', category: 'Smoothies', prepTime: '5 min', protein: '20g', image: undefined, flavorUsed: "Savannah's Peach" },
  { title: 'High-Protein Overnight Oats', description: 'Prep the night before for a grab-and-go breakfast packed with protein.', category: 'Breakfast', prepTime: '5 min', protein: '26g', image: undefined, flavorUsed: 'Vanilla Bean' },
];

export const retailers = [
  'Whole Foods Market', 'Sprouts Farmers Market', 'Publix', 'Wegmans',
  'Fresh Market', 'Natural Grocers', 'FreshDirect', 'Instacart',
];
