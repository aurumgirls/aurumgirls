import { shopProducts, type ShopProduct } from "@/lib/shop-data";

export type MakerReview = {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
  productName: string;
};

export type MakerProfile = {
  slug: string;
  shopName: string;
  personName: string;
  village: string;
  district: string;
  craft: string;
  craftYears: number;
  joinedYear: number;
  bio: string;
  story: string[];
  pullQuote: string;
  swatch: [string, string];
  reviews: MakerReview[];
};

// The five makers behind the Curated Collection's five products.
export const makerProfiles: MakerProfile[] = [
  {
    slug: "zeyneb-eliyeva",
    shopName: "Zeynəb's Kitchen",
    personName: "Zeynəb Əliyeva",
    village: "Gakh",
    district: "Gakh District",
    craft: "Jams & fruit preserves",
    craftYears: 22,
    joinedYear: 2019,
    bio: "Zeynəb has been preserving fruit from her family orchard in Gakh for over two decades, using her grandmother's copper-pot recipes.",
    story: [
      "Zeynəb grew up in her grandmother's kitchen in Gakh, a quiet town in Azerbaijan's northwest known for its walnut orchards and quince trees. She learned to make jam the way most girls in her family did — standing on a stool at the stove, stirring a copper pot while her grandmother told her when the fruit was ready by its smell, not a clock.",
      "Today she still uses that same copper pot. Every jar of Rose Petal Jam starts with roses picked before sunrise from her own garden, while the dew is still on them — she says that's when the petals hold the most fragrance.",
      "Zeynəb sells enough now to have hired two women from her street to help during the summer preserve season. She says the best part of selling online isn't the income, though that matters — it's hearing from someone in another country that her jam tasted like their own grandmother's kitchen.",
    ],
    pullQuote: "The best part isn't the income — it's hearing my jam tasted like someone's own grandmother's kitchen.",
    swatch: ["#8B5A4B", "#EDE6D9"],
    reviews: [
      { id: 1, author: "Leyla H.", rating: 5, date: "June 2026", text: "This tastes exactly like the jam my own grandmother used to make in Gakh. I actually teared up a little opening the jar.", productName: "Rose Petal Jam (Gakh)" },
      { id: 2, author: "Marcus T.", rating: 5, date: "May 2026", text: "Ordered this as a gift and ended up buying a second jar for myself. Incredibly fragrant, not overly sweet.", productName: "Rose Petal Jam (Gakh)" },
    ],
  },
  {
    slug: "basti-huseynova",
    shopName: "Basti's Loom",
    personName: "Basti Hüseynova",
    village: "Basqal",
    district: "Sheki–Zaqatala",
    craft: "Kəlağayı silk weaving",
    craftYears: 28,
    joinedYear: 2018,
    bio: "Basti weaves kəlağayı silk scarves in Basqal using the same UNESCO-listed technique her grandmother taught her as a child.",
    story: [
      "Basti was seven years old when her grandmother first let her touch the loom — not to weave, just to wind silk thread onto a spindle without breaking it. It took her a year to be trusted with the shuttle. Kəlağayı weaving, the silk headscarf craft native to her village of Basqal, has been passed down this way for centuries, mother to daughter.",
      "Each scarf takes her three to five days, from stretching the raw silk to hand block-printing the pattern with natural dyes made from walnut husks, pomegranate skin, and indigo. No two are ever exactly alike — a slight variation in dye, or a pattern set half a millimeter off, is proof that a hand made it, not a machine.",
      "Basqal's kəlağayı tradition was named to UNESCO's Intangible Cultural Heritage list, but Basti says the recognition matters less to her than the fact that three other women now weave alongside her, in a workshop she opened four years ago. Without buyers, she says, the craft would have ended with her generation.",
    ],
    pullQuote: "A slight variation in the dye is proof that a hand made it, not a machine.",
    swatch: ["#4A5D4E", "#EDE6D9"],
    reviews: [
      { id: 1, author: "Camille F.", rating: 5, date: "July 2026", text: "The colors are so much richer in person than in photos. You can feel the hand-dyeing in every fold.", productName: 'Hand-dyed "Kəlağayı" Scarf' },
      { id: 2, author: "Elena V.", rating: 5, date: "May 2026", text: "Basti was lovely to message with about care instructions. The scarf itself is stunning.", productName: 'Hand-dyed "Kəlağayı" Scarf' },
    ],
  },
  {
    slug: "nergiz-quliyeva",
    shopName: "Nərgiz's Herbs",
    personName: "Nərgiz Quliyeva",
    village: "Lahıc",
    district: "Ismayıllı District",
    craft: "Herbal tea foraging & blending",
    craftYears: 15,
    joinedYear: 2020,
    bio: "Nərgiz forages wild herbs in the hills above Lahıc with her daughters, sun-drying every blend the traditional way.",
    story: [
      "Nərgiz forages in the hills above Lahıc with her two daughters, following trails her own mother showed her as a child — which slopes hold the best wild thyme, which valleys keep their linden trees shaded enough to bloom late into summer.",
      "She dries everything the traditional way, spread on cloth in a covered stone room, never in a machine. It takes longer, but she says heat from a dryer flattens the aroma. Her Lahıc Herbal Blend is the same mix her family has drunk every evening for as long as she can remember.",
      "Since joining the marketplace, foraging season has become a small family business rather than just a household habit — her daughters now help sort and pack, and she's started teaching a neighbor's daughter the trails too, so the knowledge doesn't stop with her.",
    ],
    pullQuote: "Heat from a dryer flattens the aroma — so everything is still dried on cloth, the old way.",
    swatch: ["#4A5D4E", "#D4AF37"],
    reviews: [
      { id: 1, author: "Sara J.", rating: 5, date: "June 2026", text: "You can smell the difference the second you open the pouch. Genuinely the best herbal tea I've had.", productName: "Lahıc Herbal Blend" },
    ],
  },
  {
    slug: "aygun-memmedova",
    shopName: "Aygün's Studio",
    personName: "Aygün Məmmədova",
    village: "Ismayıllı",
    district: "Ismayıllı District",
    craft: "Wheel-thrown pottery",
    craftYears: 12,
    joinedYear: 2016,
    bio: "Aygün trained under a master potter in Lahıc before opening her own wood-fired studio in Ismayıllı.",
    story: [
      "Aygün trained for three years under a master potter in Lahıc, a village famous across Azerbaijan for its copperwork and pottery, before she felt ready to open a wheel of her own in nearby Ismayıllı.",
      "She digs and prepares her own red clay, throws each piece on a foot-powered wheel exactly as her teacher did, and fires everything in a wood-burning kiln that she still has to watch overnight, feeding the fire by hand until the temperature is right.",
      "Every bowl and jug carries small marks — a slightly uneven rim, a thumbprint pressed into the base — that Aygün refuses to smooth away. 'A machine can be perfect,' she says. 'A hand can only be honest.'",
    ],
    pullQuote: "A machine can be perfect. A hand can only be honest.",
    swatch: ["#8B5A4B", "#D4AF37"],
    reviews: [
      { id: 1, author: "Olga P.", rating: 5, date: "June 2026", text: "The glaze is gorgeous and the weight of the bowls feels so substantial. Worth every manat.", productName: "Glazed Ceramic Bowl Set" },
    ],
  },
  {
    slug: "sebine-huseynli",
    shopName: "Səbinə's Table",
    personName: "Səbinə Hüseynli",
    village: "Sheki",
    district: "Sheki–Zaqatala",
    craft: "Traditional sweets & pastry",
    craftYears: 9,
    joinedYear: 2021,
    bio: "Səbinə bakes Şəki pakhlava and traditional sweets to order from her home kitchen, using her family's orchard walnuts and honey.",
    story: [
      "Səbinə started baking pakhlava for neighbors' weddings before she ever thought of it as a business — it was just what you did when someone in Sheki got married. She'd stay up nights layering paper-thin dough with walnuts and honey syrup, no recipe card in sight.",
      "She still makes everything to order in her home kitchen, usually within a day or two of it shipping, because she doesn't believe pastry this delicate should sit on a shelf. The walnuts come from a family orchard; the honey from a beekeeper two streets over.",
      "What started as wedding favors for friends has become a small weekly bakery run out of her kitchen. She says the hardest part of growing wasn't the baking — it was believing people outside Sheki would want a taste of it too.",
    ],
    pullQuote: "The hardest part wasn't the baking — it was believing people outside Sheki would want a taste of it too.",
    swatch: ["#C27A65", "#D4AF37"],
    reviews: [
      { id: 1, author: "Ilkin V.", rating: 5, date: "July 2026", text: "Genuinely the best pakhlava I've had outside my own family's kitchen. Arrived fresh, perfectly packed.", productName: "Şəki Pakhlava (Box of 12)" },
    ],
  },
];

export function getMakerBySlug(slug: string): MakerProfile | undefined {
  return makerProfiles.find((m) => m.slug === slug);
}

export function getMakerByShopName(shopName: string): MakerProfile | undefined {
  return makerProfiles.find((m) => m.shopName === shopName);
}

export function getMakerProducts(shopName: string): ShopProduct[] {
  return shopProducts.filter((p) => p.maker === shopName);
}
