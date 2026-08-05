"use client";

import { Banknote, CreditCard, Lock } from "lucide-react";
import { TextField } from "./Field";

export type PaymentMethodId = "card" | "cod";

const METHODS: { id: PaymentMethodId; label: string; icon: typeof CreditCard }[] = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "cod", label: "Cash on Delivery", icon: Banknote },
];

export default function PaymentMethods({
  value,
  onChange,
}: {
  value: PaymentMethodId;
  onChange: (id: PaymentMethodId) => void;
}) {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3 mb-5">
        {METHODS.map((method) => {
          const active = value === method.id;
          return (
            <button
              type="button"
              key={method.id}
              onClick={() => onChange(method.id)}
              className={`flex items-center gap-3 rounded-md border px-4 py-3.5 text-left transition-colors ${
                active ? "border-nar bg-nar-soft/40" : "border-black/12 bg-linen hover:border-black/25"
              }`}
            >
              <span
                className={`h-9 w-9 rounded-pill flex items-center justify-center shrink-0 ${
                  active ? "bg-nar text-white" : "bg-sand text-ink"
                }`}
              >
                <method.icon size={16} strokeWidth={1.8} />
              </span>
              <span className="text-[14px] font-medium text-ink">{method.label}</span>
            </button>
          );
        })}
      </div>

      {value === "card" ? (
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField
            label="Card number"
            name="card-number"
            placeholder="4242 4242 4242 4242"
            span="full"
            autoComplete="cc-number"
          />
          <TextField label="Name on card" name="card-name" placeholder="Fidan Xəlilova" span="full" autoComplete="cc-name" />
          <TextField label="Expiry date" name="card-expiry" placeholder="MM / YY" autoComplete="cc-exp" />
          <TextField label="CVV" name="card-cvv" placeholder="123" autoComplete="cc-csc" />
        </div>
      ) : (
        <div className="rounded-md bg-linen border border-black/10 px-4 py-4 flex items-start gap-3">
          <Banknote size={18} strokeWidth={1.7} className="text-olive shrink-0 mt-0.5" />
          <p className="text-[13.5px] text-ink/90 leading-relaxed">
            Pay in cash when your order arrives. Please have the exact amount ready for the
            courier where possible.
          </p>
        </div>
      )}

      <p className="flex items-center gap-1.5 text-[12px] text-stone mt-4">
        <Lock size={12} strokeWidth={2} />
        Your payment details are encrypted and never stored on our servers.
      </p>
    </div>
  );
}
