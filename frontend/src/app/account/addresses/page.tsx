import type { Metadata } from "next";
import AddressesManager from "@/components/account/AddressesManager";
import { addresses } from "@/lib/account-data";

export const metadata: Metadata = {
  title: "Saved Addresses — By Aurum Girls",
};

export default function AddressesPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[26px] sm:text-[30px]">Saved Addresses</h2>
        <p className="text-stone text-[14.5px] mt-1.5">
          Manage the addresses you ship to most often.
        </p>
      </div>
      <AddressesManager addresses={addresses} />
    </div>
  );
}
