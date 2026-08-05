// Mock catalogue for the Shop page MVP.
// Swap for real API data once the backend is wired up.

export type Availability = "in-stock" | "low-stock" | "out-of-stock";

export type ShopCategory = {
  name: string;
  slug: string;
};

export const shopCategories: ShopCategory[] = [
  { name: "Handwoven Textiles", slug: "textiles" },
  { name: "Gourmet Jams & Preserves", slug: "jams-preserves" },
  { name: "Herbal Teas", slug: "herbal-teas" },
  { name: "Dried Herbs & Spices", slug: "dried-herbs" },
  { name: "Traditional Ceramics", slug: "handicraft" },
  { name: "Pantry & Sweets", slug: "pantry" },
  { name: "Gift Sets & Hampers", slug: "gift-sets" },
];

export type ShopProduct = {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  currency: string;
  maker: string;
  region: string;
  rating: number;
  reviews: number;
  availability: Availability;
  isNew?: boolean;
  swatch: [string, string];
  image?: string;
};

type Row = [
  name: string,
  category: string,
  price: number,
  maker: string,
  region: string,
  rating: number,
  reviews: number,
  availability: Availability,
  swatchA: string,
  swatchB: string,
  isNew?: boolean,
];

const swatches: Record<string, [string, string]> = {
  textiles: ["#A83A2B", "#C9A87C"],
  "jams-preserves": ["#7E2A20", "#C0892E"],
  "herbal-teas": ["#5E6E3A", "#DCE3CE"],
  "dried-herbs": ["#33432A", "#C9A87C"],
  handicraft: ["#C9A87C", "#877667"],
  pantry: ["#C0892E", "#EFE4D0"],
  "gift-sets": ["#A83A2B", "#EBD3CB"],
};

const rows: Row[] = [
  // Handwoven Textiles
  ['Hand-dyed "Kəlağayı" Scarf', "textiles", 35, "Basti's Loom", "Sheki", 5, 41, "in-stock", "#A83A2B", "#C9A87C", true],
  ["Shahdag Wool Kilim Rug", "textiles", 68, "Basti's Loom", "Sheki", 4.9, 19, "in-stock", "#7E2A20", "#C9A87C"],
  ["Basqal Silk Headscarf", "textiles", 42, "Firuzə Textiles", "Basqal", 5, 27, "low-stock", "#A83A2B", "#EFE4D0"],
  ["Embroidered Table Runner", "textiles", 24, "Firuzə Textiles", "Ismayıllı", 4.7, 12, "in-stock", "#33432A", "#C9A87C"],
  ["Handwoven Wool Socks", "textiles", 14, "Basti's Loom", "Sheki", 4.8, 33, "in-stock", "#5E6E3A", "#DCE3CE"],
  ["Tekelduz Embroidered Cushion", "textiles", 29, "Firuzə Textiles", "Ganja", 4.6, 9, "out-of-stock", "#7E2A20", "#EBD3CB"],
  ["Natural Dye Cotton Shawl", "textiles", 31, "Basti's Loom", "Quba", 4.9, 15, "in-stock", "#A83A2B", "#877667"],

  // Gourmet Jams & Preserves
  ["Rose Petal Jam (Gakh)", "jams-preserves", 30, "Zeynəb's Kitchen", "Gakh", 5, 24, "in-stock", "#A83A2B", "#EBD3CB", true],
  ["Quince & Walnut Preserve", "jams-preserves", 22, "Zeynəb's Kitchen", "Gakh", 4.8, 16, "in-stock", "#7E2A20", "#C0892E"],
  ["Sour Cherry Jam", "jams-preserves", 18, "Xədicə's Pantry", "Quba", 4.9, 21, "in-stock", "#A83A2B", "#C9A87C"],
  ["Fig Preserve in Syrup", "jams-preserves", 20, "Zeynəb's Kitchen", "Gakh", 4.7, 11, "low-stock", "#7E2A20", "#EFE4D0"],
  ["Mulberry Jam (Şəki)", "jams-preserves", 19, "Xədicə's Pantry", "Sheki", 4.8, 14, "in-stock", "#33432A", "#C0892E"],
  ["Green Walnut Jam", "jams-preserves", 23, "Zeynəb's Kitchen", "Gakh", 5, 18, "in-stock", "#7E2A20", "#877667"],
  ["Watermelon Rind Preserve", "jams-preserves", 17, "Xədicə's Pantry", "Quba", 4.6, 7, "in-stock", "#A83A2B", "#DCE3CE"],
  ["Pomegranate Molasses (Nar-şərab)", "jams-preserves", 16, "Zeynəb's Kitchen", "Gəncə", 4.9, 29, "in-stock", "#7E2A20", "#C9A87C"],

  // Herbal Teas
  ["Mountain Thyme Tea", "herbal-teas", 12, "Nərgiz's Herbs", "Lahıc", 4.8, 20, "in-stock", "#5E6E3A", "#DCE3CE"],
  ["Lahıc Herbal Blend", "herbal-teas", 14, "Nərgiz's Herbs", "Lahıc", 5, 31, "in-stock", "#33432A", "#C9A87C", true],
  ["Rosehip & Mint Tea", "herbal-teas", 13, "Nərgiz's Herbs", "Lahıc", 4.7, 15, "in-stock", "#5E6E3A", "#EFE4D0"],
  ["Sage Leaf Tea", "herbal-teas", 11, "Nərgiz's Herbs", "Ismayıllı", 4.6, 9, "low-stock", "#33432A", "#DCE3CE"],
  ["Linden Blossom Tea", "herbal-teas", 12, "Nərgiz's Herbs", "Quba", 4.8, 13, "in-stock", "#5E6E3A", "#C9A87C"],
  ["St. John's Wort Tea", "herbal-teas", 15, "Nərgiz's Herbs", "Lahıc", 4.9, 22, "in-stock", "#33432A", "#877667"],

  // Dried Herbs & Spices
  ["Sumac Spice Pouch", "dried-herbs", 20, "Lahıc Herb House", "Lahıc", 5, 18, "in-stock", "#7E2A20", "#C0892E", true],
  ["Dried Tarragon Bundle", "dried-herbs", 9, "Lahıc Herb House", "Lahıc", 4.6, 8, "in-stock", "#33432A", "#C9A87C"],
  ["Saffron Threads (Absheron)", "dried-herbs", 48, "Lahıc Herb House", "Absheron", 5, 26, "in-stock", "#C0892E", "#7E2A20"],
  ["Dried Barberries", "dried-herbs", 15, "Lahıc Herb House", "Lahıc", 4.7, 12, "low-stock", "#33432A", "#877667"],
  ["Wild Oregano", "dried-herbs", 10, "Lahıc Herb House", "Ismayıllı", 4.8, 10, "in-stock", "#5E6E3A", "#C9A87C"],
  ["Dried Mint Leaves", "dried-herbs", 8, "Lahıc Herb House", "Lahıc", 4.6, 6, "in-stock", "#33432A", "#DCE3CE"],

  // Traditional Ceramics
  ["Hand-thrown Clay Jug (Lahıc)", "handicraft", 38, "Aygün's Studio", "Lahıc", 4.9, 17, "in-stock", "#C9A87C", "#877667"],
  ["Glazed Ceramic Bowl Set", "handicraft", 44, "Aygün's Studio", "Ismayıllı", 5, 23, "in-stock", "#C9A87C", "#EFE4D0", true],
  ["Copper Engraved Tray (Lahıc)", "handicraft", 55, "Aygün's Studio", "Lahıc", 4.8, 14, "low-stock", "#C0892E", "#877667"],
  ["Hand-carved Wooden Spoon Set", "handicraft", 18, "Aygün's Studio", "Ismayıllı", 4.7, 9, "in-stock", "#877667", "#C9A87C"],
  ["Woven Basket (Şəki)", "handicraft", 26, "Aygün's Studio", "Sheki", 4.6, 11, "in-stock", "#C9A87C", "#DCE3CE"],
  ["Painted Clay Plate", "handicraft", 21, "Aygün's Studio", "Lahıc", 4.8, 8, "out-of-stock", "#C0892E", "#EFE4D0"],
  ["Wicker Bread Basket", "handicraft", 19, "Aygün's Studio", "Ismayıllı", 4.7, 13, "in-stock", "#877667", "#EFE4D0"],

  // Pantry & Sweets
  ["Şəki Pakhlava (Box of 12)", "pantry", 25, "Səbinə's Table", "Sheki", 5, 38, "in-stock", "#C0892E", "#EFE4D0", true],
  ["Walnut Churchkhela", "pantry", 16, "Səbinə's Table", "Sheki", 4.7, 14, "in-stock", "#7E2A20", "#C9A87C"],
  ["Homemade Sherbet Syrup", "pantry", 14, "Səbinə's Table", "Quba", 4.6, 10, "in-stock", "#C0892E", "#877667"],
  ["Roasted Hazelnut Mix", "pantry", 17, "Səbinə's Table", "Gəncə", 4.8, 16, "low-stock", "#7E2A20", "#EFE4D0"],
  ["Dried Fruit & Nut Mix", "pantry", 21, "Səbinə's Table", "Sheki", 4.9, 20, "in-stock", "#C0892E", "#C9A87C"],
  ["Honeycomb (Raw)", "pantry", 27, "Səbinə's Table", "Quba", 5, 25, "in-stock", "#C0892E", "#7E2A20"],
  ["Traditional Şəkərbura", "pantry", 23, "Səbinə's Table", "Sheki", 4.8, 19, "in-stock", "#7E2A20", "#EFE4D0"],

  // Gift Sets & Hampers
  ["Village Gift Hamper", "gift-sets", 45, "By Aurum Girls", "Multi-region", 5, 12, "in-stock", "#C9A87C", "#EFE4D0"],
  ["Taste of Azerbaijan Box", "gift-sets", 52, "By Aurum Girls", "Multi-region", 4.9, 21, "in-stock", "#A83A2B", "#C0892E", true],
  ["Tea Lover's Gift Set", "gift-sets", 33, "By Aurum Girls", "Multi-region", 4.8, 15, "in-stock", "#5E6E3A", "#DCE3CE"],
  ["Home & Table Gift Box", "gift-sets", 58, "By Aurum Girls", "Multi-region", 4.7, 8, "low-stock", "#C9A87C", "#877667"],
  ["Newlywed Gift Basket", "gift-sets", 65, "By Aurum Girls", "Multi-region", 5, 18, "in-stock", "#A83A2B", "#EBD3CB"],
  ["Corporate Gift Crate", "gift-sets", 60, "By Aurum Girls", "Multi-region", 4.8, 6, "in-stock", "#33432A", "#C9A87C"],
  ["Mini Sweets Sampler", "gift-sets", 19, "By Aurum Girls", "Multi-region", 4.6, 10, "out-of-stock", "#C0892E", "#EFE4D0"],
];

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ə/g, "e")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ç/g, "c")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const shopProducts: ShopProduct[] = rows.map((r, i) => {
  const [name, category, price, maker, region, rating, reviews, availability, sa, sb, isNew] = r;
  return {
    id: i + 1,
    name,
    slug: slugify(name),
    category,
    price,
    currency: "₼",
    maker,
    region,
    rating,
    reviews,
    availability,
    isNew,
    swatch: [sa, sb],
    image: name === "Village Gift Hamper" ? "/images/product-gift-hamper.jpg" : undefined,
  };
});

export const priceBounds = {
  min: Math.min(...shopProducts.map((p) => p.price)),
  max: Math.max(...shopProducts.map((p) => p.price)),
};
