import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import AccountSidebar from "@/components/account/AccountSidebar";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <div className="bg-cream border-b border-black/10">
          <div className="mx-auto max-w-[1160px] px-5 sm:px-7 pt-6 pb-6">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "My Account" }]} />
            <h1 className="text-[28px] sm:text-[32px] mt-3">My Account</h1>
          </div>
        </div>

        <div className="mx-auto max-w-[1160px] px-5 sm:px-7 py-8 sm:py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <AccountSidebar />
            <div className="flex-1 min-w-0">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
