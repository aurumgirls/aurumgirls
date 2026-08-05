import Image from "next/image";
import { Lock, ShieldCheck } from "lucide-react";
import { initialCartLines } from "@/lib/cart-data";
import { shopProducts } from "@/lib/shop-data";

const items = initialCartLines
  .map((line) => ({ line, product: shopProducts.find((p) => p.id === line.productId) }))
  .filter((x): x is { line: typeof x.line; product: NonNullable<typeof x.product> } => Boolean(x.product));

export default function CheckoutSummary({
  shipping,
  currency,
  submitting,
}: {
  shipping: number;
  currency: string;
  submitting: boolean;
}) {
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.line.qty, 0);
  const total = subtotal + shipping;
  const itemCount = items.reduce((sum, i) => sum + i.line.qty, 0);

  return (
    <div className="lg:sticky lg:top-8 h-fit rounded-lg bg-cream border border-black/10 shadow-sm p-6">
      <h2 className="text-[19px] mb-5">Order Summary</h2>

      <div className="flex flex-col gap-4 pb-5 mb-5 border-b border-dashed border-black/10 max-h-[280px] overflow-y-auto pr-1">
        {items.map(({ product, line }) => (
          <div key={product.id} className="flex items-center gap-3">
            <div className="relative h-14 w-14 shrink-0 rounded-md overflow-hidden border border-black/10 bg-linen">
              {product.image ? (
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(135deg, ${product.swatch[0]}, ${product.swatch[1]})` }}
                />
              )}
              <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-pill bg-grove text-linen text-[10px] font-bold flex items-center justify-center">
                {line.qty}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-ink truncate">{product.name}</p>
              <p className="text-[11.5px] text-stone">{product.maker}</p>
            </div>
            <span className="text-[13.5px] font-medium text-ink shrink-0">
              {currency}
              {product.price * line.qty}
            </span>
          </div>
        ))}
      </div>

      <dl className="flex flex-col gap-3 pb-5 border-b border-dashed border-black/10">
        <div className="flex items-center justify-between text-[14px]">
          <dt className="text-stone">Subtotal ({itemCount} items)</dt>
          <dd className="font-medium text-ink">
            {currency}
            {subtotal.toFixed(2)}
          </dd>
        </div>
        <div className="flex items-center justify-between text-[14px]">
          <dt className="text-stone">Delivery</dt>
          <dd className="font-medium text-ink">
            {shipping === 0 ? <span className="text-olive font-semibold">Free</span> : `${currency}${shipping.toFixed(2)}`}
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

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 rounded-sm bg-nar text-white text-[15px] font-semibold px-6 py-3.5 shadow-sm hover:bg-nar-deep transition-colors disabled:opacity-60 disabled:cursor-wait"
      >
        <Lock size={15} strokeWidth={2} />
        {submitting ? "Placing your order…" : "Place Order"}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-[11.5px] text-stone mt-4">
        <ShieldCheck size={13} strokeWidth={1.8} />
        Secured &amp; encrypted checkout
      </p>
    </div>
  );
}
