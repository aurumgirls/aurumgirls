import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export default function StatCard({
  icon: Icon,
  value,
  label,
  href,
}: {
  icon: LucideIcon;
  value: string | number;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-lg bg-cream border border-black/10 shadow-sm p-5 hover:shadow-md transition-shadow flex items-center gap-4"
    >
      <span className="h-11 w-11 shrink-0 rounded-pill bg-sand text-ink flex items-center justify-center">
        <Icon size={18} strokeWidth={1.8} />
      </span>
      <div>
        <p className="font-serif text-[26px] leading-none">{value}</p>
        <p className="text-[12.5px] text-stone mt-1.5">{label}</p>
      </div>
    </Link>
  );
}
