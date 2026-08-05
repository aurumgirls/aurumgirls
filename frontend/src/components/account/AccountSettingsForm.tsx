"use client";

import { useState } from "react";
import { Bell, Check, Globe2, ShieldCheck, UserRound } from "lucide-react";
import { TextField, SelectField } from "@/components/checkout/Field";
import PasswordStrength from "@/components/auth/PasswordStrength";
import SettingsSection from "./SettingsSection";
import type { currentUser as CurrentUser } from "@/lib/account-data";

const LANGUAGES = ["English", "Azərbaycan dili"];
const CURRENCIES = ["₼ AZN", "$ USD", "€ EUR"];

export default function AccountSettingsForm({ user }: { user: typeof CurrentUser }) {
  const [newPassword, setNewPassword] = useState("");
  const [saved, setSaved] = useState(false);
  const [notifyOrders, setNotifyOrders] = useState(true);
  const [notifyMessages, setNotifyMessages] = useState(true);
  const [notifyPromos, setNotifyPromos] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <SettingsSection icon={UserRound} title="Profile" description="Your personal information.">
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField label="First name" name="firstName" defaultValue={user.firstName} />
          <TextField label="Last name" name="lastName" defaultValue={user.lastName} />
          <TextField label="Email address" name="email" type="email" defaultValue={user.email} span="full" />
          <TextField label="Phone number" name="phone" type="tel" defaultValue={user.phone} span="full" />
        </div>
      </SettingsSection>

      <SettingsSection icon={ShieldCheck} title="Security" description="Update your password.">
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField label="Current password" name="currentPassword" type="password" required={false} placeholder="••••••••" />
          <div className="hidden sm:block" />
          <div>
            <TextField
              label="New password"
              name="newPassword"
              type="password"
              required={false}
              placeholder="••••••••"
              value={newPassword}
              onChange={setNewPassword}
            />
            <PasswordStrength password={newPassword} />
          </div>
          <TextField
            label="Confirm new password"
            name="confirmPassword"
            type="password"
            required={false}
            placeholder="••••••••"
          />
        </div>
      </SettingsSection>

      <SettingsSection icon={Globe2} title="Preferences" description="Language, currency and how we reach you.">
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <SelectField label="Language" name="language" options={LANGUAGES} defaultValue="English" />
          <SelectField label="Currency" name="currency" options={CURRENCIES} defaultValue="₼ AZN" />
        </div>

        <div className="flex flex-col gap-3 pt-5 border-t border-dashed border-black/10">
          {[
            { label: "Order updates", desc: "Shipping, delivery and status changes.", value: notifyOrders, set: setNotifyOrders, icon: Bell },
            { label: "Messages from makers", desc: "Replies to your questions and orders.", value: notifyMessages, set: setNotifyMessages, icon: Bell },
            { label: "Promotions & new arrivals", desc: "Occasional emails about new makers and offers.", value: notifyPromos, set: setNotifyPromos, icon: Bell },
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
        {saved && <span className="text-[13px] text-olive font-medium">Your changes have been saved.</span>}
      </div>
    </form>
  );
}
