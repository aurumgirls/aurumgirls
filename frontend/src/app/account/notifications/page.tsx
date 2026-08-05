import type { Metadata } from "next";
import NotificationsFeed from "@/components/account/NotificationsFeed";
import { notifications } from "@/lib/account-data";

export const metadata: Metadata = {
  title: "Notifications — By Aurum Girls",
};

export default function NotificationsPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[26px] sm:text-[30px]">Notifications</h2>
        <p className="text-stone text-[14.5px] mt-1.5">
          Order updates, maker messages and account activity.
        </p>
      </div>
      <NotificationsFeed items={notifications} />
    </div>
  );
}
