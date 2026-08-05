import type { Metadata } from "next";
import AdminProductsTable from "@/components/admin/AdminProductsTable";
import { allProducts, flaggedProductIds } from "@/lib/admin-data";

export const metadata: Metadata = {
  title: "Products — Admin Console",
};

export default function AdminProductsPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[26px] sm:text-[30px]">Products</h2>
        <p className="text-stone text-[14.5px] mt-1.5">
          {allProducts.length} listings across every shop · moderate, flag, or remove.
        </p>
      </div>
      <AdminProductsTable products={allProducts} flaggedIds={flaggedProductIds} />
    </div>
  );
}
