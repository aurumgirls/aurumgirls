import type { Metadata } from "next";
import InventoryTable from "@/components/seller/InventoryTable";
import { sellerProducts } from "@/lib/seller-data";

export const metadata: Metadata = {
  title: "Inventory — Seller Dashboard",
};

export default function SellerInventoryPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[26px] sm:text-[30px]">Inventory</h2>
        <p className="text-stone text-[14.5px] mt-1.5">
          Keep stock counts current so buyers never order something you&rsquo;re out of.
        </p>
      </div>
      <InventoryTable products={sellerProducts} />
    </div>
  );
}
