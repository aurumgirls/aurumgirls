import { shopProducts } from "@/lib/shop-data";

export const currentUser = {
  firstName: "Fidan",
  lastName: "Xəlilova",
  email: "xelilovafidan61@gmail.com",
  phone: "+994 50 123 45 67",
  memberSince: 2023,
  swatch: ["#A83A2B", "#EBD3CB"] as [string, string],
};

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export type Order = {
  id: string;
  date: string;
  items: { productId: number; qty: number }[];
  status: OrderStatus;
};

function pid(name: string): number {
  const p = shopProducts.find((p) => p.name === name);
  if (!p) throw new Error(`Unknown seed product: ${name}`);
  return p.id;
}

export const orders: Order[] = [
  {
    id: "AG-48213",
    date: "August 2, 2026",
    items: [
      { productId: pid("Rose Petal Jam (Gakh)"), qty: 2 },
      { productId: pid("Sumac Spice Pouch"), qty: 1 },
    ],
    status: "shipped",
  },
  {
    id: "AG-47790",
    date: "July 21, 2026",
    items: [{ productId: pid('Hand-dyed "Kəlağayı" Scarf'), qty: 1 }],
    status: "delivered",
  },
  {
    id: "AG-47215",
    date: "July 6, 2026",
    items: [
      { productId: pid("Village Gift Hamper"), qty: 1 },
      { productId: pid("Şəki Pakhlava (Box of 12)"), qty: 1 },
    ],
    status: "delivered",
  },
  {
    id: "AG-46504",
    date: "June 18, 2026",
    items: [{ productId: pid("Lahıc Herbal Blend"), qty: 2 }],
    status: "cancelled",
  },
  {
    id: "AG-46022",
    date: "June 2, 2026",
    items: [{ productId: pid("Glazed Ceramic Bowl Set"), qty: 1 }],
    status: "processing",
  },
];

export type Address = {
  id: number;
  label: string;
  name: string;
  phone: string;
  country: string;
  city: string;
  street: string;
  postal: string;
  isDefault: boolean;
};

export const addresses: Address[] = [
  {
    id: 1,
    label: "Home",
    name: "Fidan Xəlilova",
    phone: "+994 50 123 45 67",
    country: "Azerbaijan",
    city: "Baku",
    street: "28 May Street, 12, Apt. 4",
    postal: "AZ1000",
    isDefault: true,
  },
  {
    id: 2,
    label: "Office",
    name: "Fidan Xəlilova",
    phone: "+994 50 987 65 43",
    country: "Azerbaijan",
    city: "Baku",
    street: "Nizami Street, 203",
    postal: "AZ1005",
    isDefault: false,
  },
];

export type NotificationItem = {
  id: number;
  type: "order" | "message" | "promo" | "account";
  title: string;
  message: string;
  date: string;
  read: boolean;
};

export const notifications: NotificationItem[] = [
  {
    id: 1,
    type: "order",
    title: "Your order has shipped",
    message: "Order #AG-48213 is on its way from Zeynəb's Kitchen and Lahıc Herb House.",
    date: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "message",
    title: "New message from Basti's Loom",
    message: "Basti replied to your question about scarf care instructions.",
    date: "Yesterday",
    read: false,
  },
  {
    id: 3,
    type: "promo",
    title: "New arrivals from Lahıc",
    message: "Nərgiz's Herbs just added three new herbal blends to her shop.",
    date: "3 days ago",
    read: true,
  },
  {
    id: 4,
    type: "order",
    title: "Order delivered",
    message: "Order #AG-47790 was delivered. We'd love to hear what you think.",
    date: "July 24, 2026",
    read: true,
  },
  {
    id: 5,
    type: "account",
    title: "Password changed",
    message: "Your account password was changed successfully.",
    date: "July 10, 2026",
    read: true,
  },
];

export const wishlistProductNames = [
  "Shahdag Wool Kilim Rug",
  "Saffron Threads (Absheron)",
  "Copper Engraved Tray (Lahıc)",
  "Taste of Azerbaijan Box",
  'Hand-dyed "Kəlağayı" Scarf',
];

export const wishlistItems = wishlistProductNames
  .map((name) => shopProducts.find((p) => p.name === name))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));
