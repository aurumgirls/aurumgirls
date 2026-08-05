import { shopProducts } from "@/lib/shop-data";

export type CartLine = {
  productId: number;
  qty: number;
};

function idFor(name: string): number {
  const product = shopProducts.find((p) => p.name === name);
  if (!product) throw new Error(`Unknown seed product: ${name}`);
  return product.id;
}

// Pre-populated for the demo so the cart page has something real to show.
export const initialCartLines: CartLine[] = [
  { productId: idFor("Rose Petal Jam (Gakh)"), qty: 2 },
  { productId: idFor('Hand-dyed "Kəlağayı" Scarf'), qty: 1 },
  { productId: idFor("Sumac Spice Pouch"), qty: 1 },
  { productId: idFor("Village Gift Hamper"), qty: 1 },
];

export type Coupon = {
  code: string;
  label: string;
  kind: "percent" | "flat";
  value: number;
};

export const COUPONS: Coupon[] = [
  { code: "AURUM10", label: "10% off your order", kind: "percent", value: 10 },
  { code: "WELCOME5", label: "₼5 off your order", kind: "flat", value: 5 },
];

export const FREE_SHIPPING_THRESHOLD = 60;
export const FLAT_SHIPPING_RATE = 6;
