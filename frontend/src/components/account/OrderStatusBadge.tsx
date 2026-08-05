import type { OrderStatus } from "@/lib/account-data";

const STYLES: Record<OrderStatus, string> = {
  processing: "bg-sand text-ink",
  shipped: "bg-aurum-soft text-[#6b4a17]",
  delivered: "bg-sage text-grove",
  cancelled: "bg-nar-soft text-nar-deep",
};

const LABELS: Record<OrderStatus, string> = {
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex items-center rounded-pill text-[11.5px] font-semibold px-3 py-1 ${STYLES[status]}`}>
      {LABELS[status]}
    </span>
  );
}
