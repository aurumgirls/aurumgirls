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

// Note: product & maker mock data now lives in `shop-data.ts` and
// `makers-data.ts` so the Shop, Product and Seller Profile pages share one
// consistent source of truth.

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
