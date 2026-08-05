import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import CartExperience from "@/components/cart/CartExperience";

export const metadata: Metadata = {
  title: "Your Cart — By Aurum Girls",
  description: "Review your basket of handmade goods from Azerbaijani village makers before checkout.",
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <div className="mx-auto max-w-[1160px] px-5 sm:px-7 pt-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
          <h1 className="text-[32px] sm:text-[40px] mt-3">Shopping Cart</h1>
          <p className="text-stone text-[15px] mt-1.5 mb-8">
            Every item ships directly from the maker who made it.
          </p>
        </div>

        <div className="mx-auto max-w-[1160px] px-5 sm:px-7 pb-16 sm:pb-20">
          <CartExperience />
        </div>
      </main>
      <Footer />
    </>
  );
}
