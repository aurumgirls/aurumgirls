import { Bell, MessageCircle, Sparkles, UserCog } from "lucide-react";
import type { NotificationItem } from "@/lib/account-data";

const ICONS: Record<NotificationItem["type"], typeof Bell> = {
  order: Bell,
  message: MessageCircle,
  promo: Sparkles,
  account: UserCog,
};

const ICON_COLORS: Record<NotificationItem["type"], string> = {
  order: "bg-sage text-grove",
  message: "bg-aurum-soft text-[#6b4a17]",
  promo: "bg-nar-soft text-nar-deep",
  account: "bg-sand text-ink",
};

export default function NotificationRow({
  item,
  onToggleRead,
}: {
  item: NotificationItem;
  onToggleRead?: (id: number) => void;
}) {
  const Icon = ICONS[item.type];

  return (
    <div
      className={`flex items-start gap-3.5 px-5 sm:px-6 py-4 ${!item.read ? "bg-linen/60" : ""}`}
    >
      <span className={`h-9 w-9 shrink-0 rounded-pill flex items-center justify-center ${ICON_COLORS[item.type]}`}>
        <Icon size={15} strokeWidth={1.8} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-[13.5px] font-semibold text-ink">{item.title}</p>
          {!item.read && <span className="h-1.5 w-1.5 rounded-pill bg-nar shrink-0" />}
        </div>
        <p className="text-[13px] text-stone mt-0.5 leading-relaxed">{item.message}</p>
        <p className="text-[11.5px] text-stone/70 mt-1.5">{item.date}</p>
      </div>
      {onToggleRead && !item.read && (
        <button
          onClick={() => onToggleRead(item.id)}
          className="text-[11.5px] font-semibold text-nar hover:text-nar-deep transition-colors shrink-0 whitespace-nowrap"
        >
          Mark read
        </button>
      )}
    </div>
  );
}
