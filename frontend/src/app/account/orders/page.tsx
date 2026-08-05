import type { Metadata } from "next";
import OrdersFilterList from "@/components/account/OrdersFilterList";
import { orders } from "@/lib/account-data";

export const metadata: Metadata = {
  title: "My Orders — By Aurum Girls",
};

export default function OrdersPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[26px] sm:text-[30px]">Orders</h2>
        <p className="text-stone text-[14.5px] mt-1.5">
          Track, reorder, or review anything you&rsquo;ve bought from our makers.
        </p>
      </div>
      <OrdersFilterList orders={orders} />
    </div>
  );
}
