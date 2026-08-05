import type { Metadata } from "next";
import AccountSettingsForm from "@/components/account/AccountSettingsForm";
import { currentUser } from "@/lib/account-data";

export const metadata: Metadata = {
  title: "Account Settings — By Aurum Girls",
};

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[26px] sm:text-[30px]">Account Settings</h2>
        <p className="text-stone text-[14.5px] mt-1.5">
          Manage your profile, password and preferences.
        </p>
      </div>
      <AccountSettingsForm user={currentUser} />
    </div>
  );
}
