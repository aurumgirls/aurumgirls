import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Bell, Heart, MapPin, Package } from "lucide-react";
import StatCard from "@/components/account/StatCard";
import OrdersList from "@/components/account/OrdersList";
import NotificationRow from "@/components/account/NotificationRow";
import { currentUser, orders, addresses, notifications, wishlistItems } from "@/lib/account-data";

export const metadata: Metadata = {
  title: "My Account — By Aurum Girls",
};

export default function AccountDashboardPage() {
  const unread = notifications.filter((n) => !n.read).length;
  const recentOrders = orders.slice(0, 3);
  const recentNotifications = notifications.slice(0, 3);
  const wishlistPreview = wishlistItems.slice(0, 4);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-aurum">
          Welcome back
        </span>
        <h2 className="text-[26px] sm:text-[30px] mt-1">
          Hello, {currentUser.firstName} 👋
        </h2>
        <p className="text-stone text-[14.5px] mt-1.5">
          Member since {currentUser.memberSince} · Here&rsquo;s what&rsquo;s happening with your account.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} value={orders.length} label="Total orders" href="/account/orders" />
        <StatCard icon={Heart} value={wishlistItems.length} label="Saved items" href="/account/wishlist" />
        <StatCard icon={MapPin} value={addresses.length} label="Saved addresses" href="/account/addresses" />
        <StatCard icon={Bell} value={unread} label="Unread notifications" href="/account/notifications" />
      </div>

      <section>
        <div className="flex items-end justify-between mb-4">
          <h3 className="text-[20px]">Recent orders</h3>
          <Link href="/account/orders" className="text-[13.5px] font-semibold text-nar hover:text-nar-deep transition-colors">
            View all →
          </Link>
        </div>
        <OrdersList orders={recentOrders} />
      </section>

      <div className="grid lg:grid-cols-2 gap-8">
        <section>
          <div className="flex items-end justify-between mb-4">
            <h3 className="text-[20px]">From your wishlist</h3>
            <Link href="/account/wishlist" className="text-[13.5px] font-semibold text-nar hover:text-nar-deep transition-colors">
              View all →
            </Link>
          </div>
          <div className="rounded-lg bg-cream border border-black/10 shadow-sm p-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
            {wishlistPreview.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className="rounded-md overflow-hidden border border-black/10 group"
              >
                <div className="relative h-20 sm:h-24">
                  {p.image ? (
                    <Image src={p.image} alt={p.name} fill className="object-cover" />
                  ) : (
                    <div
                      className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${p.swatch[0]}, ${p.swatch[1]})` }}
                    />
                  )}
                </div>
                <p className="text-[11.5px] font-medium text-ink px-2 py-1.5 truncate bg-cream">{p.name}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-end justify-between mb-4">
            <h3 className="text-[20px]">Notifications</h3>
            <Link href="/account/notifications" className="text-[13.5px] font-semibold text-nar hover:text-nar-deep transition-colors">
              View all →
            </Link>
          </div>
          <div className="rounded-lg bg-cream border border-black/10 shadow-sm divide-y divide-black/10 overflow-hidden">
            {recentNotifications.map((n) => (
              <NotificationRow key={n.id} item={n} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
