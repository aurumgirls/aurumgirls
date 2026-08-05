"use client";

import { useState } from "react";
import { Bell, Check, Landmark, Store } from "lucide-react";
import { TextField, SelectField } from "@/components/checkout/Field";
import SettingsSection from "@/components/account/SettingsSection";
import type { MakerProfile } from "@/lib/makers-data";

const REGIONS = ["Sheki", "Basqal", "Lahıc", "Ismayıllı", "Gakh", "Quba", "Ganja"];

export default function SellerSettingsForm({ profile }: { profile: MakerProfile }) {
  const [saved, setSaved] = useState(false);
  const [notifyOrders, setNotifyOrders] = useState(true);
  const [notifyMessages, setNotifyMessages] = useState(true);
  const [notifyMarketing, setNotifyMarketing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <SettingsSection icon={Store} title="Shop profile" description="How buyers see your shop.">
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField label="Shop name" name="shopName" defaultValue={profile.shopName} />
          <TextField label="Your name" name="personName" defaultValue={profile.personName} />
          <SelectField label="Village / region" name="village" options={REGIONS} defaultValue={profile.village} />
          <TextField label="Craft" name="craft" defaultValue={profile.craft} />
          <div className="sm:col-span-2">
            <label htmlFor="bio" className="block text-[12.5px] font-semibold text-stone mb-1.5">
              Shop bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              defaultValue={profile.bio}
              className="w-full rounded-sm bg-linen border border-black/15 px-3.5 py-2.5 text-[14px] text-ink outline-none focus:ring-2 focus:ring-aurum focus:border-aurum transition-shadow resize-none"
            />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection icon={Landmark} title="Payout & bank details" description="Where your earnings are sent.">
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField label="Bank name" name="bankName" placeholder="Kapital Bank" required={false} />
          <TextField label="Account holder" name="accountHolder" defaultValue={profile.personName} />
          <TextField label="IBAN" name="iban" placeholder="AZ21 NABZ 0000 0000 1944 4000 01" span="full" required={false} />
        </div>
      </SettingsSection>

      <SettingsSection icon={Bell} title="Notifications" description="How we reach you about your shop.">
        <div className="flex flex-col gap-3">
          {[
            { label: "New orders", desc: "Get notified the moment a buyer orders.", value: notifyOrders, set: setNotifyOrders },
            { label: "Buyer messages", desc: "Questions from buyers about your products.", value: notifyMessages, set: setNotifyMessages },
            { label: "Marketing tips", desc: "Occasional emails on growing your shop.", value: notifyMarketing, set: setNotifyMarketing },
          ].map((item) => (
            <label key={item.label} className="flex items-center justify-between gap-4 cursor-pointer">
              <span>
                <span className="block text-[13.5px] font-medium text-ink">{item.label}</span>
                <span className="block text-[12px] text-stone">{item.desc}</span>
              </span>
              <span className="relative inline-flex h-6 w-11 shrink-0">
                <input
                  type="checkbox"
                  checked={item.value}
                  onChange={(e) => item.set(e.target.checked)}
                  className="peer sr-only"
                />
                <span className="absolute inset-0 rounded-pill bg-sand peer-checked:bg-olive transition-colors" />
                <span className="absolute top-0.5 left-0.5 h-5 w-5 rounded-pill bg-cream shadow-sm transition-transform peer-checked:translate-x-5" />
              </span>
            </label>
          ))}
        </div>
      </SettingsSection>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-sm bg-nar text-white text-[14.5px] font-semibold px-6 py-3 hover:bg-nar-deep transition-colors"
        >
          {saved && <Check size={16} strokeWidth={2.4} />}
          {saved ? "Saved" : "Save changes"}
        </button>
        {saved && <span className="text-[13px] text-olive font-medium">Your shop settings have been updated.</span>}
      </div>
    </form>
  );
}
