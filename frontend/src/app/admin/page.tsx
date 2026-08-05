import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { AlertTriangle, ShoppingBag, Star, Store, Users, Wallet } from "lucide-react";
import StatCard from "@/components/account/StatCard";
import SalesChart from "@/components/seller/SalesChart";
import PlatformOrderStatusBadge from "@/components/admin/PlatformOrderStatusBadge";
import { shopProducts } from "@/lib/shop-data";
import {
  platformOrders,
  platformOrderTotal,
  platformTotalRevenue,
  platformMonthlyRevenue,
  platformUsers,
  topSellers,
  allProducts,
  stockFor,
  LOW_STOCK_THRESHOLD,
} from "@/lib/admin-data";

export const metadata: Metadata = {
  title: "Admin Dashboard — By Aurum Girls",
};

export default function AdminDashboardPage() {
  const sellerCount = platformUsers.filter((u) => u.role === "seller").length;
  const recentOrders = platformOrders.slice(0, 5);
  const lowStock = allProducts
    .filter((p) => {
      const stock = stockFor(p);
      return stock > 0 && stock <= LOW_STOCK_THRESHOLD;
    })
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-aurum">
          Admin dashboard
        </span>
        <h2 className="text-[26px] sm:text-[30px] mt-1">Platform overview</h2>
        <p className="text-stone text-[14.5px] mt-1.5">
          A snapshot of orders, sellers, and inventory across By Aurum Girls.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Wallet} value={`₼${platformTotalRevenue.toLocaleString()}`} label="Total revenue" href="/admin/reports" />
        <StatCard icon={ShoppingBag} value={platformOrders.length} label="Total orders" href="/admin/products" />
        <StatCard icon={Store} value={sellerCount} label="Active sellers" href="/admin/users" />
        <StatCard icon={Users} value={platformUsers.length} label="Total users" href="/admin/users" />
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <section className="rounded-lg bg-cream border border-black/10 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[19px]">Revenue trend</h3>
              <p className="text-[12.5px] text-stone mt-0.5">Platform-wide, last 6 months</p>
            </div>
            <Link href="/admin/reports" className="text-[13px] font-semibold text-nar hover:text-nar-deep transition-colors">
              Full report →
            </Link>
          </div>
          <SalesChart data={platformMonthlyRevenue} />
        </section>

        <section className="rounded-lg bg-cream border border-black/10 shadow-sm p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="h-8 w-8 rounded-pill bg-nar-soft text-nar-deep flex items-center justify-center shrink-0">
              <AlertTriangle size={15} strokeWidth={1.8} />
            </span>
            <h3 className="text-[17px]">Inventory alerts</h3>
          </div>
          {lowStock.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {lowStock.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3">
                  <span className="text-[13px] text-ink truncate">{p.name}</span>
                  <span className="text-[12px] font-semibold text-nar shrink-0">{stockFor(p)} left</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[13px] text-stone">No listings are running low right now.</p>
          )}
          <Link
            href="/admin/inventory"
            className="inline-flex items-center text-[12.5px] font-semibold text-nar hover:text-nar-deep transition-colors mt-4"
          >
            View inventory →
          </Link>
        </section>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <section>
          <div className="flex items-end justify-between mb-4">
            <h3 className="text-[20px]">Recent orders</h3>
            <Link href="/admin/products" className="text-[13.5px] font-semibold text-nar hover:text-nar-deep transition-colors">
              View all →
            </Link>
          </div>
          <div className="rounded-lg bg-cream border border-black/10 shadow-sm divide-y divide-black/8 overflow-hidden">
            {recentOrders.map((order) => {
              const firstProduct = shopProducts.find((p) => p.id === order.items[0]?.productId);
              return (
                <div key={order.id} className="flex items-center gap-3 px-5 py-3.5">
                  {firstProduct && (
                    <div className="h-11 w-11 rounded-sm bg-sand overflow-hidden shrink-0 relative">
                      {firstProduct.image ? (
                        <Image src={firstProduct.image} alt="" fill sizes="44px" className="object-cover" />
                      ) : (
                        <div
                          className="absolute inset-0"
                          style={{ background: `linear-gradient(135deg, ${firstProduct.swatch[0]}, ${firstProduct.swatch[1]})` }}
                        />
                      )}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] font-semibold text-ink truncate">{order.id}</p>
                    <p className="text-[12px] text-stone truncate">{order.buyer} · {order.date}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[13.5px] font-semibold text-ink">₼{platformOrderTotal(order)}</p>
                    <div className="mt-1">
                      <PlatformOrderStatusBadge status={order.status} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <div className="flex items-end justify-between mb-4">
            <h3 className="text-[20px]">Recent sellers</h3>
            <Link href="/admin/users" className="text-[13.5px] font-semibold text-nar hover:text-nar-deep transition-colors">
              View all →
            </Link>
          </div>
          <div className="rounded-lg bg-cream border border-black/10 shadow-sm divide-y divide-black/8 overflow-hidden">
            {topSellers.map(({ profile, productCount, revenue }) => (
              <div key={profile.slug} className="flex items-center gap-3 px-5 py-3.5">
                <div
                  className="h-11 w-11 rounded-pill shrink-0 flex items-center justify-center text-linen font-serif text-[15px]"
                  style={{ background: `linear-gradient(135deg, ${profile.swatch[0]}, ${profile.swatch[1]})` }}
                >
                  {profile.personName.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-semibold text-ink truncate">{profile.shopName}</p>
                  <p className="text-[12px] text-stone truncate">
                    {profile.village} · {productCount} products
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[13.5px] font-semibold text-ink">₼{revenue}</p>
                  <p className="text-[11.5px] text-stone flex items-center justify-end gap-1 mt-0.5">
                    <Star size={11} strokeWidth={2} className="fill-aurum text-aurum" />
                    {profile.rating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
