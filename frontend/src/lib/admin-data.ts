import { shopProducts, shopCategories, type ShopProduct } from "@/lib/shop-data";
import { makerProfiles, getMakerProducts } from "@/lib/makers-data";
import { stockFor, LOW_STOCK_THRESHOLD } from "@/lib/seller-data";

export { stockFor, LOW_STOCK_THRESHOLD };

// ---------------------------------------------------------------------------
// Platform orders (spans every maker — distinct from the seller's own orders)
// ---------------------------------------------------------------------------

export type PlatformOrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export type PlatformOrder = {
  id: string;
  buyer: string;
  date: string;
  items: { productId: number; qty: number }[];
  status: PlatformOrderStatus;
};

function pid(name: string): number {
  const p = shopProducts.find((p) => p.name === name);
  if (!p) throw new Error(`Unknown admin seed product: ${name}`);
  return p.id;
}

export const platformOrders: PlatformOrder[] = [
  { id: "AG-48312", buyer: "Leyla Həsənova", date: "Aug 4, 2026", items: [{ productId: pid('Hand-dyed "Kəlağayı" Scarf'), qty: 1 }], status: "pending" },
  { id: "AG-48308", buyer: "Marcus Thaler", date: "Aug 4, 2026", items: [{ productId: pid("Rose Petal Jam (Gakh)"), qty: 3 }], status: "pending" },
  { id: "AG-48291", buyer: "Nino Beridze", date: "Aug 3, 2026", items: [{ productId: pid("Glazed Ceramic Bowl Set"), qty: 1 }, { productId: pid("Şəki Pakhlava (Box of 12)"), qty: 1 }], status: "processing" },
  { id: "AG-48277", buyer: "Camille Fontaine", date: "Aug 3, 2026", items: [{ productId: pid("Shahdag Wool Kilim Rug"), qty: 1 }], status: "processing" },
  { id: "AG-48240", buyer: "Rauf Nağıyev", date: "Aug 2, 2026", items: [{ productId: pid("Sumac Spice Pouch"), qty: 2 }, { productId: pid("Saffron Threads (Absheron)"), qty: 1 }], status: "shipped" },
  { id: "AG-48198", buyer: "Elena Volkova", date: "Aug 1, 2026", items: [{ productId: pid("Village Gift Hamper"), qty: 1 }], status: "shipped" },
  { id: "AG-48120", buyer: "Diana Rusu", date: "Jul 31, 2026", items: [{ productId: pid("Lahıc Herbal Blend"), qty: 2 }], status: "delivered" },
  { id: "AG-48065", buyer: "Tofiq Abbasov", date: "Jul 28, 2026", items: [{ productId: pid("Sour Cherry Jam"), qty: 1 }], status: "delivered" },
  { id: "AG-47990", buyer: "Priya Nair", date: "Jul 26, 2026", items: [{ productId: pid("Tekelduz Embroidered Cushion"), qty: 1 }], status: "cancelled" },
  { id: "AG-47944", buyer: "Sara Johansen", date: "Jul 24, 2026", items: [{ productId: pid("Taste of Azerbaijan Box"), qty: 1 }], status: "delivered" },
];

export function platformOrderTotal(order: PlatformOrder): number {
  return order.items.reduce((sum, line) => {
    const product = shopProducts.find((p) => p.id === line.productId);
    return sum + (product ? product.price * line.qty : 0);
  }, 0);
}

export const platformTotalRevenue = platformOrders
  .filter((o) => o.status !== "cancelled")
  .reduce((sum, o) => sum + platformOrderTotal(o), 0);

// ---------------------------------------------------------------------------
// Users (customers, sellers pulled from the real maker directory, admins)
// ---------------------------------------------------------------------------

export type UserRole = "customer" | "seller" | "admin";
export type UserStatus = "active" | "suspended" | "pending";

export type PlatformUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joined: string;
  meta: string; // orders count (customer) or product count (seller) or title (admin)
  swatch: [string, string];
};

const customerUsers: PlatformUser[] = [
  { id: "u-c1", name: "Leyla Həsənova", email: "leyla.h@example.com", role: "customer", status: "active", joined: "Feb 2025", meta: "12 orders", swatch: ["#A83A2B", "#EBD3CB"] },
  { id: "u-c2", name: "Marcus Thaler", email: "marcus.t@example.com", role: "customer", status: "active", joined: "May 2025", meta: "7 orders", swatch: ["#5E6E3A", "#DCE3CE"] },
  { id: "u-c3", name: "Nino Beridze", email: "nino.b@example.com", role: "customer", status: "active", joined: "Nov 2024", meta: "21 orders", swatch: ["#C0892E", "#EFE4D0"] },
  { id: "u-c4", name: "Priya Nair", email: "priya.n@example.com", role: "customer", status: "suspended", joined: "Jan 2026", meta: "2 orders", swatch: ["#33432A", "#C9A87C"] },
  { id: "u-c5", name: "Sara Johansen", email: "sara.j@example.com", role: "customer", status: "active", joined: "Jun 2025", meta: "9 orders", swatch: ["#7E2A20", "#C0892E"] },
  { id: "u-c6", name: "Rauf Nağıyev", email: "rauf.n@example.com", role: "customer", status: "pending", joined: "Aug 2026", meta: "0 orders", swatch: ["#877667", "#DCE3CE"] },
];

const sellerUsers: PlatformUser[] = makerProfiles.map((m) => ({
  id: `u-s-${m.slug}`,
  name: m.personName,
  email: `${m.slug.replace(/-/g, ".")}@byaurumgirls.com`,
  role: "seller" as const,
  status: "active" as const,
  joined: `${m.joinedYear}`,
  meta: `${getMakerProducts(m.shopName).length} products`,
  swatch: m.swatch,
}));

const adminUsers: PlatformUser[] = [
  { id: "u-a1", name: "Günel Abbasova", email: "gunel@byaurumgirls.com", role: "admin", status: "active", joined: "Jan 2023", meta: "Platform Lead", swatch: ["#33432A", "#DCE3CE"] },
  { id: "u-a2", name: "Elvin Rzayev", email: "elvin@byaurumgirls.com", role: "admin", status: "active", joined: "Sep 2023", meta: "Trust & Safety", swatch: ["#7E2A20", "#C9A87C"] },
];

export const platformUsers: PlatformUser[] = [...adminUsers, ...sellerUsers, ...customerUsers];

// ---------------------------------------------------------------------------
// Revenue trend + top sellers
// ---------------------------------------------------------------------------

export const platformMonthlyRevenue = [
  { label: "Mar", value: 18400 },
  { label: "Apr", value: 21200 },
  { label: "May", value: 19800 },
  { label: "Jun", value: 24600 },
  { label: "Jul", value: 28950 },
  { label: "Aug", value: 22100 },
];

export const topSellers = [...makerProfiles]
  .map((m) => ({
    profile: m,
    productCount: getMakerProducts(m.shopName).length,
    revenue: getMakerProducts(m.shopName).reduce((sum, p) => sum + p.price * (p.reviews % 6 + 3), 0),
  }))
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 5);

// ---------------------------------------------------------------------------
// All products, platform-wide (for moderation + inventory views)
// ---------------------------------------------------------------------------

export const allProducts: ShopProduct[] = shopProducts;

export const flaggedProductIds = new Set<number>(
  shopProducts.filter((p) => p.id % 17 === 0).map((p) => p.id)
);

// ---------------------------------------------------------------------------
// Report summaries
// ---------------------------------------------------------------------------

const categoryRevenue = shopCategories.map((c) => {
  const total = shopProducts
    .filter((p) => p.category === c.slug)
    .reduce((sum, p) => sum + p.price * (p.reviews % 5 + 2), 0);
  return { label: c.name, total };
});
const categoryRevenueSum = categoryRevenue.reduce((sum, c) => sum + c.total, 0) || 1;

export const categoryDistribution = categoryRevenue
  .map((c) => ({ label: c.label, value: Math.round((c.total / categoryRevenueSum) * 100) }))
  .sort((a, b) => b.value - a.value)
  .slice(0, 5);

export const userGrowth = [
  { label: "Mar", value: 142 },
  { label: "Apr", value: 168 },
  { label: "May", value: 190 },
  { label: "Jun", value: 224 },
  { label: "Jul", value: 261 },
  { label: "Aug", value: platformUsers.length + 270 },
];
