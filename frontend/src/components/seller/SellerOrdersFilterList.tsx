"use client";

import { useState } from "react";
import SellerOrdersList from "./SellerOrdersList";
import type { SellerOrder, SellerOrderStatus } from "@/lib/seller-data";

const TABS: { id: SellerOrderStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
];

const NEXT_STATUS: Partial<Record<SellerOrderStatus, SellerOrderStatus>> = {
  new: "processing",
  processing: "shipped",
  shipped: "delivered",
};

export default function SellerOrdersFilterList({ orders }: { orders: SellerOrder[] }) {
  const [list, setList] = useState(orders);
  const [tab, setTab] = useState<SellerOrderStatus | "all">("all");

  const advance = (id: string) => {
    setList((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const next = NEXT_STATUS[o.status];
        return next ? { ...o, status: next } : o;
      })
    );
  };

  const filtered = tab === "all" ? list : list.filter((o) => o.status === tab);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-pill px-4 py-2 text-[13px] font-semibold border transition-colors ${
              tab === t.id ? "bg-nar text-white border-nar" : "bg-cream text-ink border-black/12 hover:bg-sand"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <SellerOrdersList orders={filtered} onAdvance={advance} />
    </div>
  );
}
