import { shopProducts, type ShopProduct } from "@/lib/shop-data";

export type Spec = { label: string; value: string };

export type Seller = {
  name: string;
  region: string;
  bio: string;
  since: number;
  rating: number;
  sales: number;
  responseTime: string;
  swatch: [string, string];
};

export type ProductDetail = ShopProduct & {
  description: string;
  highlights: string[];
  materialsLabel: string;
  materials: string[];
  dimensions: string;
  care: string;
  specs: Spec[];
  gallery: { type: "photo" | "swatch"; src?: string; swatch: [string, string]; label: string; angle: number }[];
};

type CategoryDefaults = {
  materialsLabel: string;
  materials: string[];
  dimensions: string;
  care: string;
  highlights: string[];
  specExtra: Spec[];
  descriptionTemplate: (p: ShopProduct) => string;
};

const CATEGORY_DEFAULTS: Record<string, CategoryDefaults> = {
  textiles: {
    materialsLabel: "Materials",
    materials: ["100% natural silk", "Hand-mixed plant dyes", "Hand-rolled edges"],
    dimensions: "110 × 110 cm",
    care: "Dry clean only. Store folded, away from direct sunlight.",
    highlights: ["Hand-loomed on a traditional frame", "Naturally dyed, no synthetic pigment", "Signed by the maker on the label"],
    specExtra: [
      { label: "Technique", value: "Hand block-print & dye" },
      { label: "Weight", value: "Approx. 120 g" },
    ],
    descriptionTemplate: (p) =>
      `Woven by hand in ${p.region}, this piece carries a pattern passed down through generations of ${p.maker}'s family. Every thread is set on a traditional loom and finished with natural, plant-based dyes — no two pieces come out quite the same, which is exactly the point.`,
  },
  "jams-preserves": {
    materialsLabel: "Ingredients",
    materials: ["Seasonal fruit, hand-picked", "Raw cane sugar", "No preservatives or additives"],
    dimensions: "Net weight 350 g · 250 ml jar",
    care: "Store in a cool, dry place. Refrigerate after opening and use within 3 weeks.",
    highlights: ["Small-batch, cooked in copper pots", "Traditional family recipe", "Reusable glass jar"],
    specExtra: [
      { label: "Shelf life", value: "18 months unopened" },
      { label: "Allergens", value: "None" },
    ],
    descriptionTemplate: (p) =>
      `${p.maker} makes this in small batches at home in ${p.region}, using a recipe passed down from her mother. The fruit is hand-picked in season and cooked slowly in a copper pot — the same way it's been done in her family for three generations.`,
  },
  "herbal-teas": {
    materialsLabel: "Ingredients",
    materials: ["Wild-harvested mountain herbs", "Sun-dried, no additives", "Hand-sorted by leaf quality"],
    dimensions: "Net weight 100 g pouch",
    care: "Keep sealed, away from light and moisture. Best used within 12 months.",
    highlights: ["Hand-picked in the foothills of the Caucasus", "Naturally caffeine-free", "Sun-dried, never machine-processed"],
    specExtra: [
      { label: "Steeping time", value: "5–7 minutes" },
      { label: "Caffeine", value: "None" },
    ],
    descriptionTemplate: (p) =>
      `Gathered by hand in the hills around ${p.region}, these herbs are sun-dried the traditional way before ${p.maker} sorts and packs them herself. A calm, earthy cup that tastes like the mountains it came from.`,
  },
  "dried-herbs": {
    materialsLabel: "Ingredients",
    materials: ["Sun-dried herbs & spices", "Stone-ground where noted", "No fillers or anti-caking agents"],
    dimensions: "Net weight 80 g pouch",
    care: "Store airtight in a cool, dark cupboard.",
    highlights: ["Harvested at peak season", "Ground in small batches to order", "Packed within days of harvest"],
    specExtra: [
      { label: "Shelf life", value: "12 months" },
      { label: "Origin", value: "Lahıc valley farms" },
    ],
    descriptionTemplate: (p) =>
      `${p.maker} sources and dries these herself, working with a handful of family farms around ${p.region}. Packed in small batches so the aroma stays as close to fresh-picked as possible.`,
  },
  handicraft: {
    materialsLabel: "Materials",
    materials: ["Locally sourced red clay", "Lead-free natural glaze", "Finished by hand on a foot-powered wheel"],
    dimensions: "18 × 18 × 22 cm",
    care: "Hand wash recommended. Avoid sudden temperature changes.",
    highlights: ["Thrown on a traditional foot-powered wheel", "Fired in a wood-burning kiln", "Every piece is one of a kind"],
    specExtra: [
      { label: "Technique", value: "Wheel-thrown, wood-fired" },
      { label: "Origin", value: `${"Lahıc"} workshop` },
    ],
    descriptionTemplate: (p) =>
      `Shaped on a foot-powered wheel in ${p.maker}'s workshop in ${p.region}, then fired in a wood-burning kiln — a craft that's been practiced in this village for centuries. Small marks and variations are part of the handmade character, not a flaw.`,
  },
  pantry: {
    materialsLabel: "Ingredients",
    materials: ["Local seasonal produce", "No artificial flavoring", "Traditional household recipe"],
    dimensions: "Net weight 300–400 g",
    care: "Store in a cool, dry place, sealed after opening.",
    highlights: ["Made in home kitchens, not factories", "Recipes passed down through generations", "Small-batch, limited quantities"],
    specExtra: [
      { label: "Shelf life", value: "6 months" },
      { label: "Storage", value: "Cool, dry pantry" },
    ],
    descriptionTemplate: (p) =>
      `A household recipe from ${p.maker}'s kitchen in ${p.region}, made the way it's always been made — in small batches, by hand, with ingredients from the local market.`,
  },
  "gift-sets": {
    materialsLabel: "What's inside",
    materials: ["A curated mix of maker goods", "Kraft gift box with window", "Handwritten note card included"],
    dimensions: "30 × 22 × 12 cm box",
    care: "Keep contents per their individual care instructions.",
    highlights: ["Curated from multiple village makers", "Beautifully boxed, ready to gift", "Supports several women with one order"],
    specExtra: [
      { label: "Contents", value: "4–6 handmade items" },
      { label: "Packaging", value: "Kraft box, recyclable" },
    ],
    descriptionTemplate: (p) =>
      `A hand-packed selection curated by ${p.maker}, bringing together several makers' work in one gift. Arrives boxed and ready to give — every item inside was made by a woman it directly supports.`,
  },
};

const SELLER_DIRECTORY: Record<string, Seller> = {
  "Zeynəb's Kitchen": {
    name: "Zeynəb's Kitchen",
    region: "Gakh",
    bio: "Zeynəb has been preserving fruit from her family orchard for over twenty years. Every jar is cooked in small batches on her stovetop in Gakh.",
    since: 2019,
    rating: 4.9,
    sales: 1240,
    responseTime: "Usually replies within a day",
    swatch: ["#A83A2B", "#EBD3CB"],
  },
  "Basti's Loom": {
    name: "Basti's Loom",
    region: "Sheki",
    bio: "Basti learned kəlağayı weaving from her grandmother in Basqal. She now works with three other women in her workshop, keeping the craft alive.",
    since: 2018,
    rating: 5,
    sales: 860,
    responseTime: "Usually replies within a few hours",
    swatch: ["#33432A", "#DCE3CE"],
  },
  "Nərgiz's Herbs": {
    name: "Nərgiz's Herbs",
    region: "Lahıc",
    bio: "Nərgiz forages herbs in the hills above Lahıc with her daughters, drying and blending them the way her mother taught her.",
    since: 2020,
    rating: 4.9,
    sales: 970,
    responseTime: "Usually replies within a day",
    swatch: ["#5E6E3A", "#C9A87C"],
  },
  "Lahıc Herb House": {
    name: "Lahıc Herb House",
    region: "Lahıc",
    bio: "A small family operation drying and packing herbs and spices sourced from farms across the Lahıc valley.",
    since: 2017,
    rating: 4.8,
    sales: 1510,
    responseTime: "Usually replies within a day",
    swatch: ["#7E2A20", "#C0892E"],
  },
  "Aygün's Studio": {
    name: "Aygün's Studio",
    region: "Ismayıllı",
    bio: "Aygün trained under a master potter in Lahıc before opening her own studio. Each piece is wheel-thrown and wood-fired.",
    since: 2016,
    rating: 4.9,
    sales: 640,
    responseTime: "Usually replies within 2 days",
    swatch: ["#C0892E", "#877667"],
  },
  "Səbinə's Table": {
    name: "Səbinə's Table",
    region: "Sheki",
    bio: "Səbinə runs a small home bakery specializing in traditional Şəki sweets, made fresh to order every week.",
    since: 2021,
    rating: 5,
    sales: 430,
    responseTime: "Usually replies within a few hours",
    swatch: ["#C0892E", "#EFE4D0"],
  },
  "Xədicə's Pantry": {
    name: "Xədicə's Pantry",
    region: "Quba",
    bio: "Xədicə preserves fruit grown on her family's land in Quba, following recipes handed down from her grandmother.",
    since: 2020,
    rating: 4.8,
    sales: 510,
    responseTime: "Usually replies within a day",
    swatch: ["#A83A2B", "#C9A87C"],
  },
  "Firuzə Textiles": {
    name: "Firuzə Textiles",
    region: "Basqal",
    bio: "Firuzə and her two sisters hand-embroider textiles in the tekelduz style, a craft native to their village.",
    since: 2019,
    rating: 4.7,
    sales: 380,
    responseTime: "Usually replies within 2 days",
    swatch: ["#A83A2B", "#EFE4D0"],
  },
  "By Aurum Girls": {
    name: "By Aurum Girls",
    region: "Multi-region",
    bio: "Our in-house team curates gift sets that bring together work from several village makers into one thoughtfully packed box.",
    since: 2022,
    rating: 4.9,
    sales: 2100,
    responseTime: "Usually replies within a few hours",
    swatch: ["#C9A87C", "#EFE4D0"],
  },
};

export function getSeller(makerName: string): Seller {
  return (
    SELLER_DIRECTORY[makerName] ?? {
      name: makerName,
      region: "Azerbaijan",
      bio: `${makerName} is one of the village makers behind the By Aurum Girls marketplace, selling directly to buyers like you.`,
      since: 2021,
      rating: 4.8,
      sales: 300,
      responseTime: "Usually replies within a day",
      swatch: ["#C9A87C", "#877667"],
    }
  );
}

function buildGallery(product: ShopProduct): ProductDetail["gallery"] {
  const labels = ["Front", "Detail", "In use", "Packaging"];
  const angles = [135, 60, 200, 20];
  return labels.map((label, i) => ({
    type: i === 0 && product.image ? "photo" : "swatch",
    src: i === 0 ? product.image : undefined,
    swatch: product.swatch,
    label,
    angle: angles[i],
  }));
}

export function getProductBySlug(slug: string): ProductDetail | undefined {
  const base = shopProducts.find((p) => p.slug === slug);
  if (!base) return undefined;

  const defaults = CATEGORY_DEFAULTS[base.category];
  const specs: Spec[] = [
    { label: "Maker", value: base.maker },
    { label: "Region", value: base.region },
    ...defaults.specExtra,
    { label: "Availability", value: base.availability.replace("-", " ") },
  ];

  return {
    ...base,
    description: defaults.descriptionTemplate(base),
    highlights: defaults.highlights,
    materialsLabel: defaults.materialsLabel,
    materials: defaults.materials,
    dimensions: defaults.dimensions,
    care: defaults.care,
    specs,
    gallery: buildGallery(base),
  };
}

export function getRelatedProducts(product: ShopProduct, count = 4): ShopProduct[] {
  const sameCategory = shopProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  if (sameCategory.length >= count) return sameCategory.slice(0, count);
  const fillers = shopProducts.filter(
    (p) => p.id !== product.id && !sameCategory.includes(p)
  );
  return [...sameCategory, ...fillers].slice(0, count);
}
