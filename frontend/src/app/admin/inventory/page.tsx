import type { Metadata } from "next";
import AdminInventoryTable from "@/components/admin/AdminInventoryTable";
import { allProducts } from "@/lib/admin-data";

export const metadata: Metadata = {
  title: "Inventory — Admin Console",
};

export default function AdminInventoryPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[26px] sm:text-[30px]">Inventory alerts</h2>
        <p className="text-stone text-[14.5px] mt-1.5">
          Platform-wide low stock and out-of-stock listings across every seller.
        </p>
      </div>
      <AdminInventoryTable products={allProducts} />
    </div>
  );
}
