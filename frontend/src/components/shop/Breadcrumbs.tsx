import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-[13px]">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link href={item.href} className="text-stone hover:text-nar transition-colors font-medium">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-ink font-semibold" : "text-stone font-medium"}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight size={13} className="text-stone/50" strokeWidth={2} />}
          </span>
        );
      })}
    </nav>
  );
}
