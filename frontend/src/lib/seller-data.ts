import { getMakerByShopName, getMakerProducts } from "@/lib/makers-data";
import type { ShopProduct } from "@/lib/shop-data";

// The dashboard is demoed as Basti's Loom — reuses the same maker profile
// and product catalogue as the public Seller Profile page.
export const SELLER_SHOP_NAME = "Basti's Loom";

export const sellerProfile = getMakerByShopName(SELLER_SHOP_NAME)!;
export const sellerProducts: ShopProduct[] = getMakerProducts(SELLER_SHOP_NAME);

export type SellerOrderStatus = "new" | "processing" | "shipped" | "delivered" | "cancelled";

export type SellerOrder = {
  id: string;
  buyer: string;
  date: string;
  items: { productId: number; qty: number }[];
  status: SellerOrderStatus;
};

function pid(name: string): number {
  const p = sellerProducts.find((p) => p.name === name);
  if (!p) throw new Error(`Unknown seller seed product: ${name}`);
  return p.id;
}

export const sellerOrders: SellerOrder[] = [
  {
    id: "AG-48301",
    buyer: "Leyla Həsənova",
    date: "August 4, 2026",
    items: [{ productId: pid('Hand-dyed "Kəlağayı" Scarf'), qty: 1 }],
    status: "new",
  },
  {
    id: "AG-48277",
    buyer: "Camille Fontaine",
    date: "August 3, 2026",
    items: [{ productId: pid("Shahdag Wool Kilim Rug"), qty: 1 }],
    status: "new",
  },
  {
    id: "AG-48120",
    buyer: "Elena Volkova",
    date: "August 1, 2026",
    items: [
      { productId: pid('Hand-dyed "Kəlağayı" Scarf'), qty: 2 },
      { productId: pid("Handwoven Wool Socks"), qty: 1 },
    ],
    status: "processing",
  },
  {
    id: "AG-47903",
    buyer: "Rashad Məmmədov",
    date: "July 29, 2026",
    items: [{ productId: pid("Natural Dye Cotton Shawl"), qty: 1 }],
    status: "shipped",
  },
  {
    id: "AG-47740",
    buyer: "Tofiq Abbasov",
    date: "July 25, 2026",
    items: [{ productId: pid("Shahdag Wool Kilim Rug"), qty: 1 }],
    status: "delivered",
  },
  {
    id: "AG-47601",
    buyer: "Sara Johansen",
    date: "July 21, 2026",
    items: [{ productId: pid('Hand-dyed "Kəlağayı" Scarf'), qty: 1 }],
    status: "delivered",
  },
  {
    id: "AG-47455",
    buyer: "Vugar Talıbov",
    date: "July 17, 2026",
    items: [{ productId: pid("Handwoven Wool Socks"), qty: 2 }],
    status: "cancelled",
  },
];

export function orderTotal(order: SellerOrder): number {
  return order.items.reduce((sum, line) => {
    const product = sellerProducts.find((p) => p.id === line.productId);
    return sum + (product ? product.price * line.qty : 0);
  }, 0);
}

export const totalRevenue = sellerOrders
  .filter((o) => o.status !== "cancelled")
  .reduce((sum, o) => sum + orderTotal(o), 0);

// Deterministic mock stock levels, derived from availability + product id
// (no real inventory backend yet).
export function stockFor(product: ShopProduct): number {
  if (product.availability === "out-of-stock") return 0;
  if (product.availability === "low-stock") return 2 + (product.id % 4);
  return 18 + ((product.id * 7) % 40);
}

export const LOW_STOCK_THRESHOLD = 6;

// Last 6 months of revenue, in ₼ — hand-authored for a believable trend.
export const monthlySales = [
  { label: "Mar", value: 640 },
  { label: "Apr", value: 780 },
  { label: "May", value: 705 },
  { label: "Jun", value: 890 },
  { label: "Jul", value: 1120 },
  { label: "Aug", value: 860 },
];

export const salesByCategory = [
  { label: "Scarves & wraps", value: 62 },
  { label: "Rugs & kilims", value: 24 },
  { label: "Cushions & home", value: 9 },
  { label: "Accessories", value: 5 },
];
