import type { ReactNode } from "react";
import SellerTopbar from "@/components/seller/SellerTopbar";
import SellerSidebar from "@/components/seller/SellerSidebar";
import CheckoutFooter from "@/components/checkout/CheckoutFooter";

export default function SellerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <SellerTopbar />
      <main className="flex-1 bg-linen">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-7 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <SellerSidebar />
            <div className="flex-1 min-w-0">{children}</div>
          </div>
        </div>
      </main>
      <CheckoutFooter maxWidth={1280} />
    </div>
  );
}
