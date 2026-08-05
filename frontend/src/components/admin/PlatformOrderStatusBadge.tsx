import type { PlatformOrderStatus } from "@/lib/admin-data";

const STYLES: Record<PlatformOrderStatus, string> = {
  pending: "bg-nar text-white",
  processing: "bg-sand text-ink",
  shipped: "bg-aurum-soft text-[#6b4a17]",
  delivered: "bg-sage text-grove",
  cancelled: "bg-nar-soft text-nar-deep",
};

const LABELS: Record<PlatformOrderStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function PlatformOrderStatusBadge({ status }: { status: PlatformOrderStatus }) {
  return (
    <span className={`inline-flex items-center rounded-pill text-[11.5px] font-semibold px-3 py-1 ${STYLES[status]}`}>
      {LABELS[status]}
    </span>
  );
}
