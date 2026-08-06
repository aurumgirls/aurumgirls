import { shopProducts } from '@/lib/shop-data';

export type CartLine = { productId: number; qty: number };

export const initialCartLines: CartLine[] = [
  { productId: 1, qty: 1 },
];

export type Coupon = { code: string; label: string; kind: 'percent' | 'flat'; value: number };

export const COUPONS: Coupon[] = [
  { code: 'AURUM10', label: '10% endirim', kind: 'percent', value: 10 },
  { code: 'ICMA', label: '3 ₼ endirim', kind: 'flat', value: 3 },
];

export const FREE_SHIPPING_THRESHOLD = 50;
export const FLAT_SHIPPING_RATE = 3.50;
