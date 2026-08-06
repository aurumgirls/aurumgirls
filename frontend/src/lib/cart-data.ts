import { shopProducts } from '@/lib/shop-data';

export type CartLine = { productId: number; qty: number };

export const initialCartLines: CartLine[] = [
  { productId: 2, qty: 3 },
  { productId: 4, qty: 2 },
  { productId: 10, qty: 1 },
];

export type Coupon = { code: string; label: string; kind: 'percent' | 'flat'; value: number };

export const COUPONS: Coupon[] = [
  { code: 'SKYR10', label: '10% off your order', kind: 'percent', value: 10 },
  { code: 'MOOCREW', label: '$3 off your order', kind: 'flat', value: 3 },
];

export const FREE_SHIPPING_THRESHOLD = 25;
export const FLAT_SHIPPING_RATE = 5.99;
