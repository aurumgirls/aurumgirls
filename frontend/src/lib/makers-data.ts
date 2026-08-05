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
  rating: number;
  responseTime: string;
  swatch: [string, string];
  reviews: MakerReview[];
};

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
      "Today she still uses that same copper pot. Every jar of Rose Petal Jam starts with roses picked before sunrise from her own garden, while the dew is still on them — she says that's when the petals hold the most fragrance. The fruit for her other preserves comes from her neighbors' orchards, bought directly at harvest.",
      "Zeynəb sells enough now to have hired two women from her street to help during the summer preserve season. She says the best part of selling online isn't the income, though that matters — it's hearing from someone in another country that her jam tasted like their own grandmother's kitchen.",
    ],
    pullQuote: "The best part isn't the income — it's hearing my jam tasted like someone's own grandmother's kitchen.",
    rating: 4.9,
    responseTime: "Usually replies within a day",
    swatch: ["#A83A2B", "#EBD3CB"],
    reviews: [
      { id: 1, author: "Leyla H.", rating: 5, date: "June 2026", text: "This tastes exactly like the jam my own grandmother used to make in Gakh. I actually teared up a little opening the jar.", productName: "Rose Petal Jam (Gakh)" },
      { id: 2, author: "Marcus T.", rating: 5, date: "May 2026", text: "Ordered this as a gift and ended up buying a second jar for myself. Incredibly fragrant, not overly sweet.", productName: "Rose Petal Jam (Gakh)" },
      { id: 3, author: "Aynur S.", rating: 4, date: "April 2026", text: "Lovely quince and walnut flavor, arrived well packed. Would love a bigger jar option.", productName: "Quince & Walnut Preserve" },
      { id: 4, author: "Diana R.", rating: 5, date: "March 2026", text: "You can tell this is made in small batches — the fruit pieces are real and generous. Will reorder.", productName: "Green Walnut Jam" },
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
    rating: 5,
    responseTime: "Usually replies within a few hours",
    swatch: ["#33432A", "#DCE3CE"],
    reviews: [
      { id: 1, author: "Camille F.", rating: 5, date: "July 2026", text: "The colors are so much richer in person than in photos. You can feel the hand-dyeing in every fold.", productName: 'Hand-dyed "Kəlağayı" Scarf' },
      { id: 2, author: "Rashad M.", rating: 5, date: "June 2026", text: "Bought this rug as an anniversary gift — the craftsmanship is honestly museum-quality.", productName: "Shahdag Wool Kilim Rug" },
      { id: 3, author: "Elena V.", rating: 5, date: "May 2026", text: "Basti was lovely to message with about care instructions. The scarf itself is stunning.", productName: 'Hand-dyed "Kəlağayı" Scarf' },
      { id: 4, author: "Tofiq A.", rating: 4, date: "March 2026", text: "Beautiful shawl, slightly smaller than I expected but the quality more than makes up for it.", productName: "Natural Dye Cotton Shawl" },
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
    rating: 4.9,
    responseTime: "Usually replies within a day",
    swatch: ["#5E6E3A", "#C9A87C"],
    reviews: [
      { id: 1, author: "Sara J.", rating: 5, date: "June 2026", text: "You can smell the difference the second you open the pouch. Genuinely the best herbal tea I've had.", productName: "Lahıc Herbal Blend" },
      { id: 2, author: "Farid Q.", rating: 5, date: "May 2026", text: "Calming, earthy, not bitter at all. My evening routine now.", productName: "Mountain Thyme Tea" },
      { id: 3, author: "Priya N.", rating: 4, date: "April 2026", text: "Lovely tea, packaging could be a bit more airtight for long-term storage.", productName: "Rosehip & Mint Tea" },
    ],
  },
  {
    slug: "rena-abbasova",
    shopName: "Lahıc Herb House",
    personName: "Rəna Abbasova",
    village: "Lahıc",
    district: "Ismayıllı District",
    craft: "Dried herbs & spice sourcing",
    craftYears: 19,
    joinedYear: 2017,
    bio: "Rəna and her husband source and hand-sort dried herbs and spices from a dozen small farms across the Lahıc valley.",
    story: [
      "Rəna Abbasova runs Lahıc Herb House with her husband, working with about a dozen small farms scattered across the Lahıc valley to source herbs and spices that aren't easy to find in city markets — real saffron, wild oregano, hand-picked barberries.",
      "She personally tastes and smells every batch before it's packed, rejecting anything that doesn't meet the standard her mother taught her. It's a habit that's made her something of a trusted name among cooks in the region, long before she ever sold online.",
      "The shop now supports eleven farming families during harvest season. Rəna says the goal was never to grow big — just to make sure the herbs her family always relied on don't disappear as younger farmers move to the cities.",
    ],
    pullQuote: "The goal was never to grow big — just to make sure these herbs don't disappear.",
    rating: 4.8,
    responseTime: "Usually replies within a day",
    swatch: ["#7E2A20", "#C0892E"],
    reviews: [
      { id: 1, author: "Grigor K.", rating: 5, date: "July 2026", text: "This is the real thing — color, aroma, everything. Nothing like the saffron I've bought at the supermarket.", productName: "Saffron Threads (Absheron)" },
      { id: 2, author: "Nino B.", rating: 5, date: "May 2026", text: "Sumac has such a bright, clean taste. Bought a second pouch for my sister.", productName: "Sumac Spice Pouch" },
      { id: 3, author: "Hasan D.", rating: 4, date: "April 2026", text: "Great quality dried barberries, arrived quickly and well sealed.", productName: "Dried Barberries" },
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
    rating: 4.9,
    responseTime: "Usually replies within 2 days",
    swatch: ["#C0892E", "#877667"],
    reviews: [
      { id: 1, author: "Olga P.", rating: 5, date: "June 2026", text: "The glaze is gorgeous and the weight of the bowls feels so substantial. Worth every manat.", productName: "Glazed Ceramic Bowl Set" },
      { id: 2, author: "Kamran E.", rating: 5, date: "May 2026", text: "The copper tray is a genuine piece of art. It's the centerpiece of our dinner table now.", productName: "Copper Engraved Tray (Lahıc)" },
      { id: 3, author: "Beatriz L.", rating: 4, date: "March 2026", text: "Beautiful jug, small chip on arrival but the seller resolved it kindly and quickly.", productName: "Hand-thrown Clay Jug (Lahıc)" },
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
    rating: 5,
    responseTime: "Usually replies within a few hours",
    swatch: ["#C0892E", "#EFE4D0"],
    reviews: [
      { id: 1, author: "Ilkin V.", rating: 5, date: "July 2026", text: "Genuinely the best pakhlava I've had outside my own family's kitchen. Arrived fresh, perfectly packed.", productName: "Şəki Pakhlava (Box of 12)" },
      { id: 2, author: "Marta S.", rating: 5, date: "June 2026", text: "The churchkhela is addictive. Ordered a second batch within a week.", productName: "Walnut Churchkhela" },
      { id: 3, author: "Rauf N.", rating: 5, date: "April 2026", text: "Sent this to family abroad for Novruz and they said it tasted exactly like home.", productName: "Traditional Şəkərbura" },
    ],
  },
  {
    slug: "xedice-rzayeva",
    shopName: "Xədicə's Pantry",
    personName: "Xədicə Rzayeva",
    village: "Quba",
    district: "Quba District",
    craft: "Small-batch fruit preserving",
    craftYears: 17,
    joinedYear: 2020,
    bio: "Xədicə preserves fruit from her family's orchards in Quba, keeping her grandmother's recipes alive in small, unhurried batches.",
    story: [
      "Xədicə preserves fruit from her family's land in Quba, a region known across Azerbaijan for its orchards. Her grandmother's sour cherry jam recipe is one of the few things she still keeps written down — everything else lives in her hands.",
      "She cooks in small batches, rarely more than twenty jars at a time, because she says rushing a jam changes its texture. Watermelon rind preserve, one of her quieter sellers, is the one she's proudest of — it's the recipe most likely to disappear if someone doesn't keep making it.",
      "Selling online has let her keep doing this work on her own terms, in her own kitchen, without needing to scale up in a way that would change how it's made.",
    ],
    pullQuote: "Rushing a jam changes its texture — so nothing here is ever made in a hurry.",
    rating: 4.8,
    responseTime: "Usually replies within a day",
    swatch: ["#A83A2B", "#C9A87C"],
    reviews: [
      { id: 1, author: "Julia W.", rating: 5, date: "May 2026", text: "Sour cherry jam is tart in exactly the right way. Not overly processed-tasting at all.", productName: "Sour Cherry Jam" },
      { id: 2, author: "Emin R.", rating: 4, date: "April 2026", text: "Loved the watermelon rind preserve — never tried anything like it before, very unique.", productName: "Watermelon Rind Preserve" },
      { id: 3, author: "Katya M.", rating: 5, date: "February 2026", text: "The pomegranate molasses is rich and tangy, elevated my salad dressings instantly.", productName: "Pomegranate Molasses (Nar-şərab)" },
    ],
  },
  {
    slug: "firuze-guliyeva",
    shopName: "Firuzə Textiles",
    personName: "Firuzə Quliyeva",
    village: "Basqal",
    district: "Sheki–Zaqatala",
    craft: "Tekelduz hand embroidery",
    craftYears: 20,
    joinedYear: 2019,
    bio: "Firuzə and her two sisters hand-embroider in the tekelduz style native to their village, splitting each piece between them.",
    story: [
      "Firuzə and her two sisters embroider in the tekelduz style — a dense, colorful needlework native to their village — sitting together most afternoons the way their mother and aunts once did.",
      "A single cushion cover can take a week of evenings to finish. They split the work by strength: one sister is faster with fine detail, another with the bold outer borders, and Firuzə does the finishing and pattern planning for all of it.",
      "The three of them are among the last in their village still practicing tekelduz by hand rather than machine. They've started teaching Firuzə's teenage niece on weekends, hoping to keep it going one more generation.",
    ],
    pullQuote: "We're among the last in the village still doing this by hand, not machine.",
    rating: 4.7,
    responseTime: "Usually replies within 2 days",
    swatch: ["#A83A2B", "#EFE4D0"],
    reviews: [
      { id: 1, author: "Anastasia D.", rating: 5, date: "June 2026", text: "The embroidery detail is unreal for handmade work at this price. So happy with this cushion.", productName: "Tekelduz Embroidered Cushion" },
      { id: 2, author: "Vugar T.", rating: 4, date: "April 2026", text: "Beautiful table runner, took a little longer to ship but worth the wait.", productName: "Embroidered Table Runner" },
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

export function makerHref(shopName: string): string | undefined {
  const profile = getMakerByShopName(shopName);
  return profile ? `/makers/${profile.slug}` : undefined;
}
