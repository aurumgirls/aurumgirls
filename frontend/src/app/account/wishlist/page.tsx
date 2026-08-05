import type { Metadata } from "next";
import WishlistGrid from "@/components/account/WishlistGrid";
import { wishlistItems } from "@/lib/account-data";

export const metadata: Metadata = {
  title: "My Wishlist — By Aurum Girls",
};

export default function WishlistPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[26px] sm:text-[30px]">Wishlist</h2>
        <p className="text-stone text-[14.5px] mt-1.5">
          {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later.
        </p>
      </div>
      <WishlistGrid items={wishlistItems} />
    </div>
  );
}
