"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import CartItemRow from "./CartItemRow";
import OrderSummary from "./OrderSummary";
import { shopProducts } from "@/lib/shop-data";
import {
  initialCartLines,
  COUPONS,
  FREE_SHIPPING_THRESHOLD,
  FLAT_SHIPPING_RATE,
  type Coupon,
} from "@/lib/cart-data";

export default function CartExperience() {
  const [lines, setLines] = useState(initialCartLines);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const items = useMemo(
    () =>
      lines
        .map((line) => ({
          line,
          product: shopProducts.find((p) => p.id === line.productId),
        }))
        .filter((x): x is { line: typeof x.line; product: NonNullable<typeof x.product> } =>
          Boolean(x.product)
        ),
    [lines]
  );

  const groups = useMemo(() => {
    const byMaker = new Map<string, typeof items>();
    for (const item of items) {
      const key = item.product.maker;
      if (!byMaker.has(key)) byMaker.set(key, []);
      byMaker.get(key)!.push(item);
    }
    return [...byMaker.entries()];
  }, [items]);

  const itemCount = items.reduce((sum, i) => sum + i.line.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.line.qty, 0);

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return appliedCoupon.kind === "percent"
      ? Math.round(((subtotal * appliedCoupon.value) / 100) * 100) / 100
      : Math.min(appliedCoupon.value, subtotal);
  }, [appliedCoupon, subtotal]);

  const shippableTotal = subtotal - discount;
  const shipping = itemCount === 0 || shippableTotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;
  const total = Math.max(0, shippableTotal + shipping);

  const updateQty = (productId: number, qty: number) => {
    setLines((prev) => prev.map((l) => (l.productId === productId ? { ...l, qty } : l)));
  };

  const removeLine = (productId: number) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  };

  const handleApplyCoupon = (code: string) => {
    const match = COUPONS.find((c) => c.code === code.toUpperCase());
    if (!match) {
      setCouponError("That code doesn't look right — try AURUM10.");
      return;
    }
    setAppliedCoupon(match);
    setCouponError(null);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-24 rounded-lg bg-cream border border-black/10">
        <ShoppingBag size={38} strokeWidth={1.4} className="text-stone mb-4" />
        <p className="font-serif text-[24px] text-ink">Your cart is empty</p>
        <p className="text-stone text-[14.5px] mt-2 max-w-[40ch]">
          Nothing here yet — browse the marketplace and find something handmade to love.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center rounded-sm bg-nar text-white text-[14.5px] font-semibold px-6 py-3 hover:bg-nar-deep transition-colors"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-10">
      <div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-stone hover:text-nar transition-colors mb-5"
        >
          <ArrowLeft size={15} strokeWidth={2} />
          Continue Shopping
        </Link>

        <div className="rounded-lg bg-cream border border-black/10 shadow-sm divide-y divide-black/10">
          {groups.map(([maker, makerItems]) => (
            <div key={maker} className="px-5 sm:px-6">
              <div className="flex items-center gap-2 pt-5">
                <span className="h-6 w-6 rounded-pill bg-sage shrink-0" />
                <span className="text-[12.5px] font-semibold text-ink">
                  Sold &amp; shipped by {maker}
                </span>
              </div>
              <div className="divide-y divide-black/10">
                {makerItems.map(({ product, line }) => (
                  <CartItemRow
                    key={product.id}
                    product={product}
                    qty={line.qty}
                    onQtyChange={(qty) => updateQty(product.id, qty)}
                    onRemove={() => removeLine(product.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <OrderSummary
        itemCount={itemCount}
        subtotal={subtotal}
        discount={discount}
        shipping={shipping}
        total={total}
        currency="₼"
        appliedCoupon={appliedCoupon}
        couponError={couponError}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={() => {
          setAppliedCoupon(null);
          setCouponError(null);
        }}
      />
    </div>
  );
}
