"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/lib/api';

export type CartItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartStore = {
  items: CartItem[];
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const calculateTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      total: 0,

      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          let newItems: CartItem[];

          if (existing) {
            newItems = state.items.map((i) =>
              i.id === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            );
          } else {
            newItems = [
              ...state.items,
              {
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                quantity,
                image: product.images[0],
              },
            ];
          }

          return { items: newItems, total: calculateTotal(newItems) };
        }),

      removeItem: (id) =>
        set((state) => {
          const newItems = state.items.filter((i) => i.id !== id);
          return { items: newItems, total: calculateTotal(newItems) };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            const newItems = state.items.filter((i) => i.id !== id);
            return { items: newItems, total: calculateTotal(newItems) };
          }
          const newItems = state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          );
          return { items: newItems, total: calculateTotal(newItems) };
        }),

      clearCart: () => set({ items: [], total: 0 }),
    }),
    { name: 'cart-storage' }
  )
);
