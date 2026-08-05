// Mock content for the MVP homepage.
// Swap for real API data once the backend is wired up.

export type Category = {
  name: string;
  slug: string;
  blurb: string;
  swatch: [string, string]; // gradient pair
};

export const categories: Category[] = [
  {
    name: "Handwoven Textiles",
    slug: "textiles",
    blurb: "Kelağayı scarves, rugs & kilims",
    swatch: ["#A83A2B", "#C9A87C"],
  },
  {
    name: "Gourmet Jams & Spices",
    slug: "jams-preserves",
    blurb: "Rose petal jam, sumac, herbs",
    swatch: ["#7E2A20", "#C0892E"],
  },
  {
    name: "Traditional Ceramics",
    slug: "handicraft",
    blurb: "Hand-thrown pottery & clay",
    swatch: ["#C9A87C", "#877667"],
  },
  {
    name: "Natural Remedies",
    slug: "dried-herbs",
    blurb: "Herbal teas, oils & tonics",
    swatch: ["#5E6E3A", "#DCE3CE"],
  },
];

export type Product = {
  name: string;
  slug: string;
  price: number;
  currency: string;
  maker: string;
  region: string;
  rating: number;
  reviews: number;
  swatch: [string, string];
  image?: string;
};

export const featuredProducts: Product[] = [
  {
    name: "Rose Petal Jam (Gakh)",
    slug: "rose-petal-jam",
    price: 30,
    currency: "₼",
    maker: "Zeynəb's Kitchen",
    region: "Gakh",
    rating: 5,
    reviews: 24,
    swatch: ["#A83A2B", "#EBD3CB"],
  },
  {
    name: "Sumac Spice Pouch",
    slug: "sumac-spice-pouch",
    price: 20,
    currency: "₼",
    maker: "Lahıc Herb House",
    region: "Lahıc",
    rating: 5,
    reviews: 18,
    swatch: ["#7E2A20", "#C0892E"],
  },
  {
    name: 'Hand-dyed "Kəlağayı" Scarf',
    slug: "kelagayi-scarf",
    price: 35,
    currency: "₼",
    maker: "Basti's Loom",
    region: "Sheki",
    rating: 5,
    reviews: 41,
    swatch: ["#33432A", "#A83A2B"],
  },
  {
    name: "Village Gift Hamper",
    slug: "village-gift-hamper",
    price: 45,
    currency: "₼",
    maker: "By Aurum Girls",
    region: "Multi-region",
    rating: 5,
    reviews: 12,
    swatch: ["#C9A87C", "#EFE4D0"],
    image: "/images/product-gift-hamper.jpg",
  },
];

export type Maker = {
  name: string;
  region: string;
  craft: string;
  products: number;
  swatch: [string, string];
};

export const makers: Maker[] = [
  { name: "Zeynəb Əliyeva", region: "Gakh", craft: "Jams & preserves", products: 14, swatch: ["#A83A2B", "#EBD3CB"] },
  { name: "Basti Hüseynova", region: "Sheki", craft: "Kəlağayı weaving", products: 9, swatch: ["#33432A", "#DCE3CE"] },
  { name: "Nərgiz Quliyeva", region: "Lahıc", craft: "Herbal remedies", products: 21, swatch: ["#5E6E3A", "#C9A87C"] },
  { name: "Aygün Məmmədova", region: "Ismayıllı", craft: "Ceramics", products: 11, swatch: ["#C0892E", "#877667"] },
];

export const impactStats = [
  { value: "180+", label: "Village makers empowered" },
  { value: "23", label: "Regions across Azerbaijan" },
  { value: "₼410K", label: "Paid directly to women" },
  { value: "4.9★", label: "Average maker rating" },
];

export type GiftCollection = {
  name: string;
  blurb: string;
  swatch: [string, string];
};

export const giftCollections: GiftCollection[] = [
  { name: "For the Home", blurb: "Ceramics, textiles & table linens", swatch: ["#C9A87C", "#EFE4D0"] },
  { name: "Flavors of Azerbaijan", blurb: "Jams, preserves & spice sets", swatch: ["#A83A2B", "#C0892E"] },
  { name: "Gifts under ₼25", blurb: "Small tokens, big impact", swatch: ["#5E6E3A", "#DCE3CE"] },
];

export type JournalPost = {
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
  swatch: [string, string];
};

export const journalPosts: JournalPost[] = [
  {
    title: "The last kəlağayı weavers of Basqal",
    excerpt: "How a handful of women in one Sheki village kept a UNESCO-listed craft alive.",
    tag: "Craft",
    readTime: "6 min read",
    swatch: ["#33432A", "#A83A2B"],
  },
  {
    title: "A recipe for Gakh-style rose petal jam",
    excerpt: "Zeynəb walks through the three-day process behind her best-selling jar.",
    tag: "Recipe",
    readTime: "4 min read",
    swatch: ["#7E2A20", "#EBD3CB"],
  },
  {
    title: "Why we pay makers before the order ships",
    excerpt: "A look inside the payout model built to put income in women's hands faster.",
    tag: "Impact",
    readTime: "5 min read",
    swatch: ["#C0892E", "#EFE4D0"],
  },
];
