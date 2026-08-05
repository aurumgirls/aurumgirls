import type { Metadata } from "next";
import { Award, ShoppingBag, TrendingUp, Wallet } from "lucide-react";
import StatCard from "@/components/account/StatCard";
import SalesChart from "@/components/seller/SalesChart";
import CategoryBreakdown from "@/components/seller/CategoryBreakdown";
import {
  sellerOrders,
  sellerProducts,
  monthlySales,
  salesByCategory,
  totalRevenue,
} from "@/lib/seller-data";

export const metadata: Metadata = {
  title: "Sales Overview — Seller Dashboard",
};

export default function SellerAnalyticsPage() {
  const fulfilled = sellerOrders.filter((o) => o.status !== "cancelled");
  const avgOrderValue = fulfilled.length ? Math.round(totalRevenue / fulfilled.length) : 0;
  const growth =
    monthlySales.length >= 2
      ? Math.round(
          ((monthlySales[monthlySales.length - 1].value - monthlySales[monthlySales.length - 2].value) /
            monthlySales[monthlySales.length - 2].value) *
            100
        )
      : 0;
  const topProduct = [...sellerProducts].sort((a, b) => b.reviews - a.reviews)[0];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-[26px] sm:text-[30px]">Sales Overview</h2>
        <p className="text-stone text-[14.5px] mt-1.5">
          How {sellerProducts[0]?.maker ?? "your shop"} has performed over time.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Wallet} value={`₼${totalRevenue}`} label="Total revenue" href="/seller/analytics" />
        <StatCard icon={ShoppingBag} value={fulfilled.length} label="Fulfilled orders" href="/seller/orders" />
        <StatCard icon={TrendingUp} value={`${growth > 0 ? "+" : ""}${growth}%`} label="Growth vs. last month" href="/seller/analytics" />
        <StatCard icon={Award} value={`₼${avgOrderValue}`} label="Avg. order value" href="/seller/analytics" />
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <section className="rounded-lg bg-cream border border-black/10 shadow-sm p-6">
          <h3 className="text-[19px] mb-1">Revenue trend</h3>
          <p className="text-[12.5px] text-stone mb-5">Last 6 months, in ₼</p>
          <SalesChart data={monthlySales} />
        </section>

        <section className="rounded-lg bg-cream border border-black/10 shadow-sm p-6">
          <h3 className="text-[17px] mb-5">Sales by category</h3>
          <CategoryBreakdown data={salesByCategory} />
        </section>
      </div>

      {topProduct && (
        <section className="rounded-lg bg-grove text-linen p-6 sm:p-7 flex items-center gap-5">
          <span className="h-14 w-14 rounded-pill bg-aurum-soft/20 flex items-center justify-center shrink-0">
            <Award size={22} strokeWidth={1.6} className="text-aurum-soft" />
          </span>
          <div>
            <p className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-aurum-soft">
              Best seller this month
            </p>
            <p className="font-serif text-[22px] mt-1">{topProduct.name}</p>
            <p className="text-sage/80 text-[13px] mt-1">
              {topProduct.reviews} reviews · {topProduct.rating} average rating
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
