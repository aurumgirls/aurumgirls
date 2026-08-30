"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/api";
import { useCartStore } from "@/store/cart-store";

/** How long the button holds its "added" confirmation before reverting. */
const CONFIRM_MS = 1600;

/**
 * Adds to the cart and exposes a short-lived `justAdded` flag so buttons can
 * confirm the action in place. Without this the cart updates silently and the
 * click appears to do nothing.
 */
export function useAddToCart() {
  // Selector subscription: re-render only when addItem changes, not on every
  // cart mutation.
  const addItem = useCartStore((state) => state.addItem);
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const add = useCallback(
    (product: Product, quantity = 1) => {
      addItem(product, quantity);
      setJustAdded(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setJustAdded(false), CONFIRM_MS);
    },
    [addItem],
  );

  return { add, justAdded };
}
