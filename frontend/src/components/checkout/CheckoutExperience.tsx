"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, MapPin, Truck, Receipt, Wallet } from "lucide-react";
import SectionCard from "./SectionCard";
import AddressFields from "./AddressFields";
import DeliveryOptions, { DELIVERY_METHODS, type DeliveryMethodId } from "./DeliveryOptions";
import PaymentMethods, { type PaymentMethodId } from "./PaymentMethods";
import CheckoutSummary from "./CheckoutSummary";
import { FREE_SHIPPING_THRESHOLD, initialCartLines } from "@/lib/cart-data";
import { shopProducts } from "@/lib/shop-data";

const subtotal = initialCartLines.reduce((sum, line) => {
  const product = shopProducts.find((p) => p.id === line.productId);
  return sum + (product ? product.price * line.qty : 0);
}, 0);

export default function CheckoutExperience() {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethodId>("standard");
  const [billingSame, setBillingSame] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>("card");
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState(false);

  const qualifiesFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const selectedMethod = DELIVERY_METHODS.find((m) => m.id === deliveryMethod)!;
  const shipping =
    deliveryMethod === "standard" && qualifiesFreeShipping ? 0 : selectedMethod.price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setPlaced(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1400);
  };

  if (placed) {
    const orderNumber = `AG-${Math.floor(10000 + subtotal * 37) % 90000 + 10000}`;
    return (
      <div className="max-w-[560px] mx-auto text-center py-16">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-pill bg-sage text-grove mb-6">
          <CheckCircle2 size={30} strokeWidth={1.6} />
        </span>
        <h1 className="text-[32px] sm:text-[38px]">Thank you — your order is placed</h1>
        <p className="text-stone text-[15px] mt-3 leading-relaxed">
          Order <span className="font-semibold text-ink">#{orderNumber}</span> has been sent to
          your makers. You'll receive a confirmation email shortly, and each item will ship
          directly from the woman who made it.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-sm bg-nar text-white text-[14.5px] font-semibold px-6 py-3 hover:bg-nar-deep transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-sm border-[1.5px] border-olive text-grove text-[14.5px] font-semibold px-6 py-3 hover:bg-sage transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
      <div className="flex flex-col gap-6">
        <SectionCard icon={MapPin} step={1} title="Shipping Information" description="Where should we send your order?">
          <AddressFields idPrefix="shipping" />
        </SectionCard>

        <SectionCard icon={Truck} step={2} title="Delivery Information" description="Choose how fast you'd like it.">
          <DeliveryOptions
            value={deliveryMethod}
            onChange={setDeliveryMethod}
            currency="₼"
            freeLabel={qualifiesFreeShipping}
          />
        </SectionCard>

        <SectionCard
          icon={Receipt}
          step={3}
          title="Billing Information"
          description="The address associated with your payment method."
          action={
            <label className="flex items-center gap-2 text-[12.5px] font-medium text-stone cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={billingSame}
                onChange={(e) => setBillingSame(e.target.checked)}
                className="h-4 w-4 rounded-xs accent-[#A83A2B] cursor-pointer"
              />
              Same as shipping
            </label>
          }
        >
          {!billingSame && <AddressFields idPrefix="billing" />}
        </SectionCard>

        <SectionCard icon={Wallet} step={4} title="Payment Methods" description="All transactions are encrypted.">
          <PaymentMethods value={paymentMethod} onChange={setPaymentMethod} />
        </SectionCard>
      </div>

      <CheckoutSummary shipping={shipping} currency="₼" submitting={submitting} />
    </form>
  );
}
