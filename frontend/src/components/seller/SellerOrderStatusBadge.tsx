import type { SellerOrderStatus } from "@/lib/seller-data";

const STYLES: Record<SellerOrderStatus, string> = {
  new: "bg-nar text-white",
  processing: "bg-sand text-ink",
  shipped: "bg-aurum-soft text-[#6b4a17]",
  delivered: "bg-sage text-grove",
  cancelled: "bg-nar-soft text-nar-deep",
};

const LABELS: Record<SellerOrderStatus, string> = {
  new: "New",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function SellerOrderStatusBadge({ status }: { status: SellerOrderStatus }) {
  return (
    <span className={`inline-flex items-center rounded-pill text-[11.5px] font-semibold px-3 py-1 ${STYLES[status]}`}>
      {LABELS[status]}
    </span>
  );
}
