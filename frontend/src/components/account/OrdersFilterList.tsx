"use client";

import { useState } from "react";
import OrdersList from "./OrdersList";
import type { Order, OrderStatus } from "@/lib/account-data";

const TABS: { id: OrderStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
];

export default function OrdersFilterList({ orders }: { orders: Order[] }) {
  const [tab, setTab] = useState<OrderStatus | "all">("all");
  const filtered = tab === "all" ? orders : orders.filter((o) => o.status === tab);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-pill px-4 py-2 text-[13px] font-semibold border transition-colors ${
              tab === t.id
                ? "bg-nar text-white border-nar"
                : "bg-cream text-ink border-black/12 hover:bg-sand"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <OrdersList orders={filtered} />
    </div>
  );
}
