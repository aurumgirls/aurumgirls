import type { Metadata } from "next";
import SellerOrdersFilterList from "@/components/seller/SellerOrdersFilterList";
import { sellerOrders } from "@/lib/seller-data";

export const metadata: Metadata = {
  title: "Orders — Seller Dashboard",
};

export default function SellerOrdersPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[26px] sm:text-[30px]">Orders</h2>
        <p className="text-stone text-[14.5px] mt-1.5">
          Fulfil incoming orders and keep buyers updated.
        </p>
      </div>
      <SellerOrdersFilterList orders={sellerOrders} />
    </div>
  );
}
