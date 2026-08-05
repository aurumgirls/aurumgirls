"use client";

import { useState } from "react";
import { MapPin, Pencil, Plus, Star, Trash2, X } from "lucide-react";
import { TextField, SelectField } from "@/components/checkout/Field";
import type { Address } from "@/lib/account-data";

const COUNTRIES = ["Azerbaijan", "Turkey", "Georgia", "United States", "United Kingdom", "Germany"];

export default function AddressesManager({ addresses }: { addresses: Address[] }) {
  const [list, setList] = useState(addresses);
  const [adding, setAdding] = useState(false);

  const setDefault = (id: number) => {
    setList((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const remove = (id: number) => {
    setList((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newAddress: Address = {
      id: Date.now(),
      label: String(form.get("new-label") || "Address"),
      name: String(form.get("new-name") || ""),
      phone: String(form.get("new-phone") || ""),
      country: String(form.get("new-country") || "Azerbaijan"),
      city: String(form.get("new-city") || ""),
      street: String(form.get("new-street") || ""),
      postal: String(form.get("new-postal") || ""),
      isDefault: list.length === 0,
    };
    setList((prev) => [...prev, newAddress]);
    setAdding(false);
    e.currentTarget.reset();
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-4">
        {list.map((address) => (
          <div key={address.id} className="rounded-lg bg-cream border border-black/10 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-ink">
                <MapPin size={15} strokeWidth={1.8} className="text-nar" />
                {address.label}
              </span>
              {address.isDefault && (
                <span className="inline-flex items-center gap-1 rounded-pill bg-sage text-grove text-[10.5px] font-bold px-2.5 py-1">
                  <Star size={10} className="fill-grove" />
                  Default
                </span>
              )}
            </div>
            <p className="text-[13.5px] text-ink/90 leading-relaxed">
              {address.name}
              <br />
              {address.street}
              <br />
              {address.city}, {address.postal}
              <br />
              {address.country}
              <br />
              {address.phone}
            </p>
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-dashed border-black/10">
              {!address.isDefault && (
                <button
                  onClick={() => setDefault(address.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-pill border-[1.5px] border-olive text-grove text-[12px] font-semibold px-3 py-2 hover:bg-sage transition-colors"
                >
                  <Star size={12} strokeWidth={2} />
                  Set default
                </button>
              )}
              <button className="inline-flex items-center justify-center gap-1.5 rounded-pill bg-sand text-ink text-[12px] font-semibold px-3 py-2 hover:bg-kraft/40 transition-colors">
                <Pencil size={12} strokeWidth={2} />
                Edit
              </button>
              <button
                onClick={() => remove(address.id)}
                aria-label={`Delete ${address.label} address`}
                className="h-8 w-8 shrink-0 inline-flex items-center justify-center rounded-pill bg-sand text-ink hover:bg-nar hover:text-white transition-colors"
              >
                <Trash2 size={13} strokeWidth={1.9} />
              </button>
            </div>
          </div>
        ))}

        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="rounded-lg border-2 border-dashed border-black/15 text-stone hover:border-nar hover:text-nar transition-colors flex flex-col items-center justify-center gap-2 py-10"
          >
            <Plus size={22} strokeWidth={1.6} />
            <span className="text-[13.5px] font-semibold">Add new address</span>
          </button>
        )}
      </div>

      {adding && (
        <form onSubmit={handleAdd} className="rounded-lg bg-cream border border-black/10 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[17px]">New address</h3>
            <button
              type="button"
              onClick={() => setAdding(false)}
              aria-label="Cancel"
              className="text-stone hover:text-nar transition-colors"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <TextField label="Address label" name="new-label" placeholder="Home, Office…" />
            <TextField label="Full name" name="new-name" placeholder="Fidan Xəlilova" />
            <TextField label="Phone number" name="new-phone" type="tel" placeholder="+994 50 123 45 67" />
            <SelectField label="Country" name="new-country" options={COUNTRIES} defaultValue="Azerbaijan" />
            <TextField label="City" name="new-city" placeholder="Baku" />
            <TextField label="Postal code" name="new-postal" placeholder="AZ1000" />
            <TextField label="Street address" name="new-street" placeholder="28 May Street, 12" span="full" />
          </div>
          <button
            type="submit"
            className="inline-flex items-center rounded-sm bg-nar text-white text-[14px] font-semibold px-6 py-3 mt-5 hover:bg-nar-deep transition-colors"
          >
            Save address
          </button>
        </form>
      )}
    </div>
  );
}
