import type { Metadata } from "next";
import ProductManagementTable from "@/components/seller/ProductManagementTable";
import { sellerProducts } from "@/lib/seller-data";

export const metadata: Metadata = {
  title: "Products — Seller Dashboard",
};

export default function SellerListingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[26px] sm:text-[30px]">Products</h2>
        <p className="text-stone text-[14.5px] mt-1.5">
          {sellerProducts.length} listings · manage what&rsquo;s live in your shop.
        </p>
      </div>
      <ProductManagementTable products={sellerProducts} />
    </div>
  );
}
