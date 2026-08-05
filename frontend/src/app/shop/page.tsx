import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import ShopExperience from "@/components/shop/ShopExperience";

export const metadata: Metadata = {
  title: "Shop All — By Aurum Girls",
  description:
    "Browse handcrafted jams, teas, textiles and handicraft made by village women across Azerbaijan. Filter by category, price and availability.",
};

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <div className="bg-cream border-b border-black/10">
          <div className="mx-auto max-w-[1160px] px-5 sm:px-7 pt-6 pb-8 sm:pb-10">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-4">
              <div>
                <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-aurum">
                  The full collection
                </span>
                <h1 className="text-[32px] sm:text-[42px] mt-1.5">Shop All</h1>
                <p className="text-stone text-[15px] mt-2 max-w-[56ch]">
                  Jams, teas, textiles and handicraft — handmade by village women across
                  Azerbaijan, sold directly from their hands to yours.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1160px] px-5 sm:px-7 py-8 sm:py-10">
          <ShopExperience />
        </div>
      </main>
      <Footer />
    </>
  );
}
