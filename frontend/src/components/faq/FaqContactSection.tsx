import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";

const CHANNELS = [
  { icon: Mail, label: "Email us", value: "hello@byaurumgirls.com", href: "mailto:hello@byaurumgirls.com" },
  { icon: Phone, label: "Call us", value: "+994 12 345 6789", href: "tel:+994123456789" },
  { icon: MessageCircle, label: "Message us", value: "Contact form", href: "/contact" },
];

export default function FaqContactSection() {
  return (
    <div className="rounded-xl bg-grove text-linen px-6 sm:px-12 py-12 sm:py-14 text-center">
      <span className="text-[11.5px] font-semibold tracking-[0.2em] uppercase text-aurum-soft">
        Still have questions?
      </span>
      <h2 className="text-linen text-[26px] sm:text-[34px] mt-2 max-w-[30ch] mx-auto">
        Our support team is happy to help.
      </h2>
      <p className="text-sage/85 text-[15px] sm:text-[16px] mt-4 max-w-[52ch] mx-auto leading-relaxed">
        Can&rsquo;t find what you&rsquo;re looking for? Reach out and we&rsquo;ll typically
        reply within one business day.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mt-10 max-w-[720px] mx-auto">
        {CHANNELS.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-lg bg-linen/10 border border-sage/15 px-5 py-6 flex flex-col items-center gap-2.5 hover:bg-linen/15 transition-colors"
          >
            <span className="h-11 w-11 rounded-pill bg-aurum-soft/20 text-aurum-soft flex items-center justify-center">
              <c.icon size={18} strokeWidth={1.8} />
            </span>
            <span className="text-[13px] font-semibold text-linen">{c.label}</span>
            <span className="text-[12.5px] text-sage/80">{c.value}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
