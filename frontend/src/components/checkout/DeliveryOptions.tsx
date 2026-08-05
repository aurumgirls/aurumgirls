"use client";

import { Zap, Truck } from "lucide-react";

export type DeliveryMethodId = "standard" | "express";

export const DELIVERY_METHODS: {
  id: DeliveryMethodId;
  label: string;
  eta: string;
  price: number;
  icon: typeof Truck;
}[] = [
  { id: "standard", label: "Standard delivery", eta: "5–7 business days", price: 6, icon: Truck },
  { id: "express", label: "Express delivery", eta: "1–2 business days", price: 18, icon: Zap },
];

export default function DeliveryOptions({
  value,
  onChange,
  currency,
  freeLabel,
}: {
  value: DeliveryMethodId;
  onChange: (id: DeliveryMethodId) => void;
  currency: string;
  freeLabel?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      {DELIVERY_METHODS.map((method) => {
        const active = value === method.id;
        const isFree = freeLabel && method.id === "standard";
        return (
          <label
            key={method.id}
            className={`flex items-center justify-between gap-4 rounded-md border px-4 py-3.5 cursor-pointer transition-colors ${
              active ? "border-nar bg-nar-soft/40" : "border-black/12 bg-linen hover:border-black/25"
            }`}
          >
            <span className="flex items-center gap-3">
              <input
                type="radio"
                name="delivery-method"
                checked={active}
                onChange={() => onChange(method.id)}
                className="h-4 w-4 accent-[#A83A2B] cursor-pointer"
              />
              <method.icon size={18} strokeWidth={1.7} className="text-olive" />
              <span>
                <span className="block text-[14px] font-medium text-ink">{method.label}</span>
                <span className="block text-[12px] text-stone">{method.eta}</span>
              </span>
            </span>
            <span className="text-[14px] font-semibold text-ink shrink-0">
              {isFree ? <span className="text-olive">Free</span> : `${currency}${method.price}`}
            </span>
          </label>
        );
      })}
    </div>
  );
}
