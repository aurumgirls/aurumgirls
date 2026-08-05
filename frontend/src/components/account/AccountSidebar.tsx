"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Heart, LayoutDashboard, LogOut, MapPin, Package, Settings } from "lucide-react";
import { currentUser, notifications } from "@/lib/account-data";

const NAV = [
  { label: "Dashboard", href: "/account", icon: LayoutDashboard },
  { label: "Orders", href: "/account/orders", icon: Package },
  { label: "Wishlist", href: "/account/wishlist", icon: Heart },
  { label: "Addresses", href: "/account/addresses", icon: MapPin },
  { label: "Notifications", href: "/account/notifications", icon: Bell },
  { label: "Settings", href: "/account/settings", icon: Settings },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <aside className="w-full lg:w-[260px] shrink-0">
      <div className="lg:sticky lg:top-[84px] flex flex-col gap-5">
        <div className="rounded-lg bg-cream border border-black/10 shadow-sm p-5 flex items-center gap-3.5">
          <div
            className="h-12 w-12 rounded-pill shrink-0 flex items-center justify-center text-linen font-serif text-[17px]"
            style={{ background: `linear-gradient(135deg, ${currentUser.swatch[0]}, ${currentUser.swatch[1]})` }}
          >
            {currentUser.firstName.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-[14.5px] font-semibold text-ink truncate">
              {currentUser.firstName} {currentUser.lastName}
            </p>
            <p className="text-[12px] text-stone truncate">{currentUser.email}</p>
          </div>
        </div>

        <nav className="rounded-lg bg-cream border border-black/10 shadow-sm p-2.5 flex flex-col gap-0.5">
          {NAV.map((item) => {
            const active = item.href === "/account" ? pathname === "/account" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-sm px-3.5 py-2.5 text-[13.5px] font-medium transition-colors ${
                  active ? "bg-nar text-white" : "text-ink hover:bg-sand"
                }`}
              >
                <item.icon size={16} strokeWidth={1.8} />
                <span className="flex-1">{item.label}</span>
                {item.label === "Notifications" && unread > 0 && (
                  <span
                    className={`h-5 min-w-5 px-1 rounded-pill text-[10.5px] font-bold flex items-center justify-center ${
                      active ? "bg-white text-nar" : "bg-nar text-white"
                    }`}
                  >
                    {unread}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <button className="flex items-center gap-3 rounded-lg bg-cream border border-black/10 shadow-sm px-3.5 py-3 text-[13.5px] font-medium text-stone hover:text-nar transition-colors">
          <LogOut size={16} strokeWidth={1.8} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
