"use client";

import { useState } from "react";
import { BellOff, CheckCheck } from "lucide-react";
import NotificationRow from "./NotificationRow";
import type { NotificationItem } from "@/lib/account-data";

export default function NotificationsFeed({ items }: { items: NotificationItem[] }) {
  const [list, setList] = useState(items);
  const [tab, setTab] = useState<"all" | "unread">("all");

  const markRead = (id: number) => {
    setList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    setList((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filtered = tab === "unread" ? list.filter((n) => !n.read) : list;
  const unreadCount = list.filter((n) => !n.read).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex gap-2">
          {(["all", "unread"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-pill px-4 py-2 text-[13px] font-semibold border transition-colors ${
                tab === t ? "bg-nar text-white border-nar" : "bg-cream text-ink border-black/12 hover:bg-sand"
              }`}
            >
              {t === "all" ? "All" : `Unread (${unreadCount})`}
            </button>
          ))}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-nar hover:text-nar-deep transition-colors"
          >
            <CheckCheck size={14} strokeWidth={2} />
            Mark all as read
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="rounded-lg bg-cream border border-black/10 shadow-sm divide-y divide-black/10 overflow-hidden">
          {filtered.map((n) => (
            <NotificationRow key={n.id} item={n} onToggleRead={markRead} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-16 rounded-lg bg-cream border border-black/10">
          <BellOff size={28} strokeWidth={1.4} className="text-stone mb-3" />
          <p className="text-stone text-[14px]">You&rsquo;re all caught up.</p>
        </div>
      )}
    </div>
  );
}
