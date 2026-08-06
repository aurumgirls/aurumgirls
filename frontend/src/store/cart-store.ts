"use client";

import { create } from 'zustand';
import { shopProducts, ShopProduct } from '@/lib/shop-data';

export type CartItem = {
  id: number;
  name: string;
  slug: string;
  category?: string;
  price: number;
  quantity: number;
  image?: string;
  flavorColor: string;
  protein: string;
};

type CartStore = {
  items: CartItem[];
  total: number;
  addItem: (product: ShopProduct, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

const calculateTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const useCartStore = create<CartStore>((set) => ({
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
            category: product.category,
            price: product.price,
            quantity,
            image: product.image,
            flavorColor: product.flavorColor,
            protein: product.protein,
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
}));
