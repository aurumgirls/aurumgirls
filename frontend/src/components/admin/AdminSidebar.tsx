"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  FileBarChart,
  LayoutDashboard,
  LogOut,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";
import { allProducts, platformUsers, stockFor, LOW_STOCK_THRESHOLD } from "@/lib/admin-data";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Inventory", href: "/admin/inventory", icon: AlertTriangle },
  { label: "Reports", href: "/admin/reports", icon: FileBarChart },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const lowStockCount = allProducts.filter((p) => stockFor(p) <= LOW_STOCK_THRESHOLD).length;

  return (
    <aside className="w-full lg:w-[260px] shrink-0">
      <div className="lg:sticky lg:top-[84px] flex flex-col gap-5">
        <div className="rounded-lg bg-cream border border-black/10 shadow-sm p-5">
          <div className="flex items-center gap-3.5">
            <div
              className="h-12 w-12 rounded-pill shrink-0 flex items-center justify-center text-linen font-serif text-[17px]"
              style={{ background: "linear-gradient(135deg, #33432A, #DCE3CE)" }}
            >
              G
            </div>
            <div className="min-w-0">
              <p className="text-[14.5px] font-semibold text-ink truncate">Günel Abbasova</p>
              <p className="text-[12px] text-stone truncate">Platform Lead</p>
            </div>
          </div>
        </div>

        <nav className="rounded-lg bg-cream border border-black/10 shadow-sm p-2.5 flex flex-col gap-0.5">
          {NAV.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            const badge =
              item.label === "Users" ? platformUsers.length : item.label === "Inventory" ? lowStockCount : null;
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
                {badge != null && badge > 0 && (
                  <span
                    className={`h-5 min-w-5 px-1 rounded-pill text-[10.5px] font-bold flex items-center justify-center ${
                      active ? "bg-white text-nar" : "bg-nar text-white"
                    }`}
                  >
                    {badge}
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
