import type { Metadata } from "next";
import SellerSettingsForm from "@/components/seller/SellerSettingsForm";
import { sellerProfile } from "@/lib/seller-data";

export const metadata: Metadata = {
  title: "Profile Settings — Seller Dashboard",
};

export default function SellerSettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[26px] sm:text-[30px]">Profile Settings</h2>
        <p className="text-stone text-[14.5px] mt-1.5">
          Keep your shop details and payout information up to date.
        </p>
      </div>
      <SellerSettingsForm profile={sellerProfile} />
    </div>
  );
}
