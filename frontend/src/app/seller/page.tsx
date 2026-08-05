import Link from "next/link";
import type { Metadata } from "next";
import { AlertTriangle, Package, ShoppingBag, Star, Wallet } from "lucide-react";
import StatCard from "@/components/account/StatCard";
import SalesChart from "@/components/seller/SalesChart";
import SellerOrdersList from "@/components/seller/SellerOrdersList";
import {
  sellerProfile,
  sellerProducts,
  sellerOrders,
  monthlySales,
  totalRevenue,
  stockFor,
  LOW_STOCK_THRESHOLD,
} from "@/lib/seller-data";

export const metadata: Metadata = {
  title: "Seller Dashboard — By Aurum Girls",
};

export default function SellerDashboardPage() {
  const newOrders = sellerOrders.filter((o) => o.status === "new").length;
  const lowStock = sellerProducts.filter((p) => {
    const stock = stockFor(p);
    return stock > 0 && stock <= LOW_STOCK_THRESHOLD;
  });
  const recentOrders = sellerOrders.slice(0, 4);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-aurum">
          Seller dashboard
        </span>
        <h2 className="text-[26px] sm:text-[30px] mt-1">
          Sağ olun, {sellerProfile.personName.split(" ")[0]} 👋
        </h2>
        <p className="text-stone text-[14.5px] mt-1.5">
          Here&rsquo;s how {sellerProfile.shopName} is doing this month.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Wallet} value={`₼${totalRevenue}`} label="Total revenue" href="/seller/analytics" />
        <StatCard icon={ShoppingBag} value={sellerOrders.length} label="Total orders" href="/seller/orders" />
        <StatCard icon={Package} value={newOrders} label="New orders" href="/seller/orders" />
        <StatCard icon={Star} value={sellerProfile.rating} label="Shop rating" href="/seller/settings" />
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <section className="rounded-lg bg-cream border border-black/10 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[19px]">Sales overview</h3>
              <p className="text-[12.5px] text-stone mt-0.5">Revenue over the last 6 months</p>
            </div>
            <Link href="/seller/analytics" className="text-[13px] font-semibold text-nar hover:text-nar-deep transition-colors">
              Full report →
            </Link>
          </div>
          <SalesChart data={monthlySales} />
        </section>

        <section className="rounded-lg bg-cream border border-black/10 shadow-sm p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="h-8 w-8 rounded-pill bg-nar-soft text-nar-deep flex items-center justify-center shrink-0">
              <AlertTriangle size={15} strokeWidth={1.8} />
            </span>
            <h3 className="text-[17px]">Low stock alerts</h3>
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
            <p className="text-[13px] text-stone">All your listings are well stocked.</p>
          )}
          <Link
            href="/seller/inventory"
            className="inline-flex items-center text-[12.5px] font-semibold text-nar hover:text-nar-deep transition-colors mt-4"
          >
            Manage inventory →
          </Link>
        </section>
      </div>

      <section>
        <div className="flex items-end justify-between mb-4">
          <h3 className="text-[20px]">Recent orders</h3>
          <Link href="/seller/orders" className="text-[13.5px] font-semibold text-nar hover:text-nar-deep transition-colors">
            View all →
          </Link>
        </div>
        <SellerOrdersList orders={recentOrders} />
      </section>
    </div>
  );
}
