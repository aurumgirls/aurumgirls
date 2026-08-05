"use client";

import Image from "next/image";
import { ArrowRight, Package } from "lucide-react";
import SellerOrderStatusBadge from "./SellerOrderStatusBadge";
import { sellerProducts, orderTotal, type SellerOrder, type SellerOrderStatus } from "@/lib/seller-data";

const ACTION_LABEL: Partial<Record<SellerOrderStatus, string>> = {
  new: "Accept & prepare",
  processing: "Mark as shipped",
  shipped: "Mark as delivered",
};

export default function SellerOrdersList({
  orders,
  onAdvance,
}: {
  orders: SellerOrder[];
  onAdvance?: (id: string) => void;
}) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-14 rounded-lg bg-cream border border-black/10">
        <p className="text-stone text-[14px]">No orders here yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-cream border border-black/10 shadow-sm divide-y divide-black/10">
      {orders.map((order) => {
        const items = order.items
          .map((line) => ({ line, product: sellerProducts.find((p) => p.id === line.productId) }))
          .filter((x): x is { line: typeof x.line; product: NonNullable<typeof x.product> } => Boolean(x.product));
        const itemCount = items.reduce((sum, i) => sum + i.line.qty, 0);
        const action = ACTION_LABEL[order.status];

        return (
          <div key={order.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex -space-x-3 shrink-0">
              {items.slice(0, 3).map(({ product }) => (
                <div key={product.id} className="relative h-12 w-12 rounded-md border-2 border-cream overflow-hidden bg-linen">
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
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <p className="text-[14.5px] font-semibold text-ink">Order #{order.id}</p>
                <SellerOrderStatusBadge status={order.status} />
              </div>
              <p className="text-[12.5px] text-stone mt-1">
                {order.buyer} · {order.date} · {itemCount} {itemCount === 1 ? "item" : "items"}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="font-serif text-[18px]">₼{orderTotal(order)}</span>
              {action && onAdvance ? (
                <button
                  onClick={() => onAdvance(order.id)}
                  className="inline-flex items-center gap-1.5 rounded-pill bg-nar text-white text-[12.5px] font-semibold px-3.5 py-2 hover:bg-nar-deep transition-colors"
                >
                  {action}
                  <ArrowRight size={13} strokeWidth={2.2} />
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[12px] text-stone">
                  <Package size={13} strokeWidth={1.8} />
                  {action ? "Action needed" : "No action needed"}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
