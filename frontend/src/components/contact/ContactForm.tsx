"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { TextField, SelectField } from "@/components/checkout/Field";

const TOPICS = ["General question", "Order support", "Become a seller", "Press & partnerships"];

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
    window.setTimeout(() => setSent(false), 3200);
  };

  return (
    <div className="rounded-lg bg-cream border border-black/10 shadow-sm p-6 sm:p-7">
      <h2 className="text-[20px]">Send us a message</h2>
      <p className="text-[13.5px] text-stone mt-1.5 mb-6">
        We typically reply within one business day.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField label="Full name" name="name" placeholder="Leyla Həsənova" />
          <TextField label="Email" name="email" type="email" placeholder="you@example.com" />
        </div>
        <SelectField label="Topic" name="topic" options={TOPICS} />
        <div>
          <label htmlFor="message" className="block text-[12.5px] font-semibold text-stone mb-1.5">
            Message <span className="text-nar">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="How can we help?"
            className="w-full rounded-sm bg-linen border border-black/15 px-3.5 py-2.5 text-[14px] text-ink placeholder:text-stone/70 outline-none focus:ring-2 focus:ring-aurum focus:border-aurum transition-shadow resize-none"
          />
        </div>

        <div className="flex items-center gap-4 mt-1">
          <button
            type="submit"
            className={`inline-flex items-center gap-2 rounded-sm text-white text-[14.5px] font-semibold px-6 py-3 transition-colors ${
              sent ? "bg-olive" : "bg-nar hover:bg-nar-deep"
            }`}
          >
            {sent ? <Check size={16} strokeWidth={2.4} /> : <Send size={15} strokeWidth={2} />}
            {sent ? "Message sent" : "Send message"}
          </button>
          {sent && (
            <span className="text-[13px] text-olive font-medium">
              Thanks — we&rsquo;ll be in touch soon.
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
