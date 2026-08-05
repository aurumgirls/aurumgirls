import type { LucideIcon } from "lucide-react";

export default function SectionCard({
  icon: Icon,
  step,
  title,
  description,
  children,
  action,
}: {
  icon: LucideIcon;
  step: number;
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-lg bg-cream border border-black/10 shadow-sm p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="h-9 w-9 shrink-0 rounded-pill bg-sand text-ink flex items-center justify-center">
            <Icon size={16} strokeWidth={1.8} />
          </span>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-aurum">
              Step {step}
            </p>
            <h2 className="text-[19px] leading-snug">{title}</h2>
            {description && <p className="text-[12.5px] text-stone mt-0.5">{description}</p>}
          </div>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
