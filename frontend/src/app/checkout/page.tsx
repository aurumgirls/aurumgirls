import type { Metadata } from "next";
import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import CheckoutFooter from "@/components/checkout/CheckoutFooter";
import CheckoutExperience from "@/components/checkout/CheckoutExperience";

export const metadata: Metadata = {
  title: "Checkout — By Aurum Girls",
  description: "Complete your order from By Aurum Girls' village makers.",
};

export default function CheckoutPage() {
  return (
    <>
      <CheckoutHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-[1160px] px-5 sm:px-7 pt-8 pb-16">
          <div className="mb-8">
            <h1 className="text-[30px] sm:text-[36px]">Checkout</h1>
            <p className="text-stone text-[14.5px] mt-1.5">
              One step away from something handmade.
            </p>
          </div>
          <CheckoutExperience />
        </div>
      </main>
      <CheckoutFooter />
    </>
  );
}
