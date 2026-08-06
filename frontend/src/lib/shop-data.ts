// The Curated Collection — exactly five products, treated as a small
// exhibition rather than a high-volume catalogue. See the Marketplace page
// spec: "standard symmetrical grids will look incomplete" with any other count.

export type ProductAvailability = "available" | "archived";

export type ShopCategory = {
  name: string;
  slug: string;
};

export const shopCategories: ShopCategory[] = [
  { name: "Handwoven Textiles", slug: "textiles" },
  { name: "Gourmet Jams & Preserves", slug: "jams-preserves" },
  { name: "Herbal Teas", slug: "herbal-teas" },
  { name: "Traditional Ceramics", slug: "handicraft" },
  { name: "Pantry & Sweets", slug: "pantry" },
];

export type ShopProduct = {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  currency: string;
  maker: string; // maker shop name — see makers-data.ts
  region: string;
  availability: ProductAvailability;
  /** Only set when availability === "archived". e.g. "Archived" or "Awaiting Harvest". */
  archivedLabel?: string;
  swatch: [string, string];
  image?: string;
};

type Row = [
  name: string,
  category: string,
  price: number,
  maker: string,
  region: string,
  availability: ProductAvailability,
  swatchA: string,
  swatchB: string,
  archivedLabel?: string,
];

const rows: Row[] = [
  [
    'Hand-dyed "Kəlağayı" Scarf',
    "textiles",
    35,
    "Basti's Loom",
    "Sheki",
    "available",
    "#C27A65",
    "#EDE6D9",
  ],
  [
    "Rose Petal Jam (Gakh)",
    "jams-preserves",
    30,
    "Zeynəb's Kitchen",
    "Gakh",
    "available",
    "#8B5A4B",
    "#EDE6D9",
  ],
  [
    "Lahıc Herbal Blend",
    "herbal-teas",
    14,
    "Nərgiz's Herbs",
    "Lahıc",
    "available",
    "#4A5D4E",
    "#EDE6D9",
  ],
  [
    "Glazed Ceramic Bowl Set",
    "handicraft",
    44,
    "Aygün's Studio",
    "Ismayıllı",
    "available",
    "#8B5A4B",
    "#D4AF37",
  ],
  [
    "Şəki Pakhlava (Box of 12)",
    "pantry",
    25,
    "Səbinə's Table",
    "Sheki",
    "archived",
    "#C27A65",
    "#D4AF37",
    "Awaiting Harvest",
  ],
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
  const [name, category, price, maker, region, availability, sa, sb, archivedLabel] = r;
  return {
    id: i + 1,
    name,
    slug: slugify(name),
    category,
    price,
    currency: "₼",
    maker,
    region,
    availability,
    archivedLabel,
    swatch: [sa, sb],
    image: undefined,
  };
});
