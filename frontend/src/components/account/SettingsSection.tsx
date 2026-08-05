import type { LucideIcon } from "lucide-react";

export default function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg bg-cream border border-black/10 shadow-sm p-6 sm:p-7">
      <div className="flex items-center gap-3 mb-6">
        <span className="h-9 w-9 shrink-0 rounded-pill bg-sand text-ink flex items-center justify-center">
          <Icon size={16} strokeWidth={1.8} />
        </span>
        <div>
          <h2 className="text-[18px] leading-snug">{title}</h2>
          {description && <p className="text-[12.5px] text-stone mt-0.5">{description}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}
