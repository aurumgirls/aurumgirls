import type { ReactNode } from "react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import CheckoutFooter from "@/components/checkout/CheckoutFooter";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminTopbar />
      <main className="flex-1 bg-linen">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-7 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <AdminSidebar />
            <div className="flex-1 min-w-0">{children}</div>
          </div>
        </div>
      </main>
      <CheckoutFooter />
    </div>
  );
}
