import type { Metadata } from "next";
import { Package, ShoppingBag, Store, Users } from "lucide-react";
import ReportCard from "@/components/admin/ReportCard";
import SalesChart from "@/components/seller/SalesChart";
import CategoryBreakdown from "@/components/seller/CategoryBreakdown";
import {
  platformOrders,
  platformTotalRevenue,
  platformMonthlyRevenue,
  platformUsers,
  topSellers,
  categoryDistribution,
  userGrowth,
} from "@/lib/admin-data";

export const metadata: Metadata = {
  title: "Reports — Admin Console",
};

export default function AdminReportsPage() {
  const sellerCount = platformUsers.filter((u) => u.role === "seller").length;
  const customerCount = platformUsers.filter((u) => u.role === "customer").length;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-[26px] sm:text-[30px]">Reports</h2>
        <p className="text-stone text-[14.5px] mt-1.5">
          Generate a snapshot of how the marketplace is performing.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <ReportCard
          icon={ShoppingBag}
          title="Sales report"
          description="Revenue, orders, and category performance for the period."
          stat={`₼${platformTotalRevenue.toLocaleString()}`}
          statLabel="Revenue this period"
        />
        <ReportCard
          icon={Package}
          title="Orders report"
          description="Order volume, fulfillment status, and cancellations."
          stat={String(platformOrders.length)}
          statLabel="Orders this period"
        />
        <ReportCard
          icon={Store}
          title="Sellers performance"
          description="Top-earning shops and product output by seller."
          stat={String(sellerCount)}
          statLabel="Active sellers"
        />
        <ReportCard
          icon={Users}
          title="User growth"
          description="New signups across customers and sellers over time."
          stat={String(customerCount)}
          statLabel="Total customers"
        />
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <section className="rounded-lg bg-cream border border-black/10 shadow-sm p-6">
          <h3 className="text-[19px] mb-1">Revenue trend</h3>
          <p className="text-[12.5px] text-stone mb-5">Last 6 months, platform-wide, in ₼</p>
          <SalesChart data={platformMonthlyRevenue} />
        </section>

        <section className="rounded-lg bg-cream border border-black/10 shadow-sm p-6">
          <h3 className="text-[17px] mb-5">Revenue by category</h3>
          <CategoryBreakdown data={categoryDistribution} />
        </section>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <section className="rounded-lg bg-cream border border-black/10 shadow-sm p-6">
          <h3 className="text-[19px] mb-1">User growth</h3>
          <p className="text-[12.5px] text-stone mb-5">Total accounts, last 6 months</p>
          <SalesChart data={userGrowth} currency="" />
        </section>

        <section className="rounded-lg bg-cream border border-black/10 shadow-sm p-6">
          <h3 className="text-[17px] mb-5">Top sellers</h3>
          <div className="flex flex-col gap-4">
            {topSellers.slice(0, 4).map(({ profile, revenue }) => (
              <div key={profile.slug} className="flex items-center justify-between gap-3">
                <span className="text-[13px] text-ink truncate">{profile.shopName}</span>
                <span className="text-[12.5px] font-semibold text-stone shrink-0">₼{revenue}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
