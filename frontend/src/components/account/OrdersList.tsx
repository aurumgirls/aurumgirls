import Image from "next/image";
import { RotateCw } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import { shopProducts } from "@/lib/shop-data";
import type { Order } from "@/lib/account-data";

export default function OrdersList({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-14 rounded-lg bg-cream border border-black/10">
        <p className="text-stone text-[14px]">You haven&rsquo;t placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-cream border border-black/10 shadow-sm divide-y divide-black/10">
      {orders.map((order) => {
        const items = order.items
          .map((line) => ({ line, product: shopProducts.find((p) => p.id === line.productId) }))
          .filter((x): x is { line: typeof x.line; product: NonNullable<typeof x.product> } => Boolean(x.product));
        const total = items.reduce((sum, i) => sum + i.product.price * i.line.qty, 0);
        const itemCount = items.reduce((sum, i) => sum + i.line.qty, 0);

        return (
          <div key={order.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex -space-x-3 shrink-0">
              {items.slice(0, 3).map(({ product }) => (
                <div
                  key={product.id}
                  className="relative h-12 w-12 rounded-md border-2 border-cream overflow-hidden bg-linen"
                >
                  {product.image ? (
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(135deg, ${product.swatch[0]}, ${product.swatch[1]})` }}
                    />
                  )}
                </div>
              ))}
              {items.length > 3 && (
                <div className="h-12 w-12 rounded-md border-2 border-cream bg-sand flex items-center justify-center text-[11px] font-semibold text-ink">
                  +{items.length - 3}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <p className="text-[14.5px] font-semibold text-ink">Order #{order.id}</p>
                <OrderStatusBadge status={order.status} />
              </div>
              <p className="text-[12.5px] text-stone mt-1">
                {order.date} · {itemCount} {itemCount === 1 ? "item" : "items"} ·{" "}
                {items.map((i) => i.product.name).join(", ")}
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <span className="font-serif text-[18px]">₼{total}</span>
              <button className="inline-flex items-center gap-1.5 rounded-pill border-[1.5px] border-olive text-grove text-[12.5px] font-semibold px-3.5 py-2 hover:bg-sage transition-colors">
                <RotateCw size={13} strokeWidth={2} />
                Buy again
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
