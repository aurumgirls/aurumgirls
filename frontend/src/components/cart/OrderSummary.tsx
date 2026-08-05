import Link from "next/link";
import { ShieldCheck, Truck, RotateCcw } from "lucide-react";
import CouponForm from "./CouponForm";
import type { Coupon } from "@/lib/cart-data";

export default function OrderSummary({
  itemCount,
  subtotal,
  discount,
  shipping,
  total,
  currency,
  appliedCoupon,
  couponError,
  onApplyCoupon,
  onRemoveCoupon,
}: {
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  currency: string;
  appliedCoupon: Coupon | null;
  couponError: string | null;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
}) {
  return (
    <div className="lg:sticky lg:top-[92px] h-fit rounded-lg bg-cream border border-black/10 shadow-sm p-6">
      <h2 className="text-[20px] mb-5">Order Summary</h2>

      <div className="mb-5">
        <CouponForm
          applied={appliedCoupon}
          error={couponError}
          onApply={onApplyCoupon}
          onRemove={onRemoveCoupon}
        />
      </div>

      <dl className="flex flex-col gap-3 pb-5 border-b border-dashed border-black/10">
        <div className="flex items-center justify-between text-[14px]">
          <dt className="text-stone">
            Subtotal <span className="text-stone/70">({itemCount} {itemCount === 1 ? "item" : "items"})</span>
          </dt>
          <dd className="font-medium text-ink">
            {currency}
            {subtotal.toFixed(2)}
          </dd>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-[14px]">
            <dt className="text-olive">Discount</dt>
            <dd className="font-medium text-olive">
              −{currency}
              {discount.toFixed(2)}
            </dd>
          </div>
        )}

        <div className="flex items-center justify-between text-[14px]">
          <dt className="text-stone">Shipping</dt>
          <dd className="font-medium text-ink">
            {shipping === 0 ? (
              <span className="text-olive font-semibold">Free</span>
            ) : (
              `${currency}${shipping.toFixed(2)}`
            )}
          </dd>
        </div>
      </dl>

      <div className="flex items-center justify-between pt-5 mb-6">
        <span className="text-[16px] font-medium">Total</span>
        <span className="font-serif text-[28px]">
          {currency}
          {total.toFixed(2)}
        </span>
      </div>

      <Link
        href="/checkout"
        className="w-full inline-flex items-center justify-center rounded-sm bg-nar text-white text-[15px] font-semibold px-6 py-3.5 shadow-sm hover:bg-nar-deep transition-colors"
      >
        Proceed to Checkout
      </Link>

      <Link
        href="/shop"
        className="w-full inline-flex items-center justify-center rounded-sm border-[1.5px] border-olive text-grove text-[14px] font-semibold px-6 py-3 mt-3 hover:bg-sage transition-colors"
      >
        Continue Shopping
      </Link>

      <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-dashed border-black/10">
        {[
          { icon: Truck, label: "Ships in 3–5 days" },
          { icon: RotateCcw, label: "14-day returns" },
          { icon: ShieldCheck, label: "Secure checkout" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center text-center gap-1.5">
            <Icon size={16} strokeWidth={1.6} className="text-olive" />
            <span className="text-[10.5px] text-stone leading-tight">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
