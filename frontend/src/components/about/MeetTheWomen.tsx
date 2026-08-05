import Link from "next/link";
import { Quote } from "lucide-react";
import { makerProfiles, getMakerProducts } from "@/lib/makers-data";

export default function MeetTheWomen() {
  return (
    <div>
      <div className="flex items-end justify-between mb-7">
        <div>
          <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-aurum">
            The women behind the work
          </span>
          <h2 className="text-[26px] sm:text-[34px] mt-1">Meet the women</h2>
        </div>
        <Link href="/makers" className="text-sm font-semibold text-nar hover:text-nar-deep hidden sm:inline-block">
          View all makers →
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {makerProfiles.map((m) => (
          <Link
            key={m.slug}
            href={`/makers/${m.slug}`}
            className="rounded-lg overflow-hidden bg-linen border border-black/10 shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            <div
              className="h-28 sm:h-32 relative"
              style={{ background: `linear-gradient(135deg, ${m.swatch[0]}, ${m.swatch[1]})` }}
            >
              <div
                className="absolute -bottom-6 left-4 h-12 w-12 rounded-pill flex items-center justify-center text-linen font-serif text-[16px] border-4 border-linen shadow-sm"
                style={{ background: `linear-gradient(135deg, ${m.swatch[0]}, ${m.swatch[1]})` }}
              >
                {m.personName.charAt(0)}
              </div>
            </div>
            <div className="p-4 pt-8 flex-1 flex flex-col">
              <h3 className="text-[15px] font-medium leading-snug">{m.personName}</h3>
              <p className="text-[12px] text-stone mt-0.5">
                {m.craft} · {m.village}
              </p>
              <p className="text-[11.5px] text-aurum font-semibold mt-2 tracking-wide uppercase">
                {m.craftYears} years of craft · {getMakerProducts(m.shopName).length} products
              </p>
              <div className="mt-3 pt-3 border-t border-black/8 flex-1">
                <p className="text-[12.5px] text-ink leading-relaxed flex gap-1.5">
                  <Quote size={13} strokeWidth={2} className="text-aurum shrink-0 mt-0.5" />
                  <span className="italic">{m.pullQuote}</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/makers"
        className="sm:hidden inline-flex items-center text-[13.5px] font-semibold text-nar hover:text-nar-deep mt-6"
      >
        View all makers →
      </Link>
    </div>
  );
}
