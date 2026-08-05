import type { Metadata } from "next";
import AdminUsersTable from "@/components/admin/AdminUsersTable";
import { platformUsers } from "@/lib/admin-data";

export const metadata: Metadata = {
  title: "Users — Admin Console",
};

export default function AdminUsersPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[26px] sm:text-[30px]">Users</h2>
        <p className="text-stone text-[14.5px] mt-1.5">
          {platformUsers.length} accounts · customers, sellers, and admins in one place.
        </p>
      </div>
      <AdminUsersTable users={platformUsers} />
    </div>
  );
}
