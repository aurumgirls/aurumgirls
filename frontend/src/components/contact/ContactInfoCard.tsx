import { Clock, Mail, MapPin, Phone } from "lucide-react";

const DETAILS = [
  { icon: MapPin, label: "Address", value: "28 Nizami Street, Baku, Azerbaijan" },
  { icon: Mail, label: "Email", value: "hello@byaurumgirls.com" },
  { icon: Phone, label: "Phone", value: "+994 12 345 6789" },
  { icon: Clock, label: "Hours", value: "Mon–Fri, 9:00–18:00 (GMT+4)" },
];

const SOCIALS = [
  { label: "Instagram", short: "IG", swatch: ["#A83A2B", "#C0892E"] as [string, string] },
  { label: "Facebook", short: "FB", swatch: ["#33432A", "#5E6E3A"] as [string, string] },
  { label: "Pinterest", short: "PT", swatch: ["#7E2A20", "#C9A87C"] as [string, string] },
  { label: "TikTok", short: "TT", swatch: ["#26201A", "#877667"] as [string, string] },
];

export default function ContactInfoCard() {
  return (
    <div className="rounded-lg bg-cream border border-black/10 shadow-sm p-6 sm:p-7 flex flex-col gap-6">
      <div>
        <h2 className="text-[20px]">Contact information</h2>
        <p className="text-[13.5px] text-stone mt-1.5">
          Reach us directly, or send a note through the form.
        </p>
      </div>

      <ul className="flex flex-col gap-4">
        {DETAILS.map((d) => (
          <li key={d.label} className="flex items-start gap-3.5">
            <span className="h-10 w-10 shrink-0 rounded-pill bg-sand text-ink flex items-center justify-center">
              <d.icon size={16} strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-[11.5px] font-semibold tracking-[0.1em] uppercase text-aurum">{d.label}</p>
              <p className="text-[14px] text-ink mt-0.5">{d.value}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="pt-5 border-t border-black/8">
        <p className="text-[11.5px] font-semibold tracking-[0.1em] uppercase text-aurum mb-3">
          Follow along
        </p>
        <div className="flex items-center gap-2.5">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href="#"
              aria-label={s.label}
              className="h-10 w-10 rounded-pill flex items-center justify-center text-linen text-[11.5px] font-bold shadow-sm hover:opacity-90 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${s.swatch[0]}, ${s.swatch[1]})` }}
            >
              {s.short}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
