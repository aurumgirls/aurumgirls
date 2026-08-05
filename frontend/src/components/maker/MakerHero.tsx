import { MapPin, ShieldCheck, Star } from "lucide-react";
import MakerActions from "./MakerActions";
import type { MakerProfile } from "@/lib/makers-data";

export default function MakerHero({
  maker,
  productCount,
}: {
  maker: MakerProfile;
  productCount: number;
}) {
  const stats: { label: string; value: string }[] = [
    { label: "Years of experience", value: `${maker.craftYears}` },
    { label: "Products", value: `${productCount}` },
    { label: "Rating", value: `${maker.rating}` },
    { label: "Member since", value: `${maker.joinedYear}` },
  ];

  return (
    <div className="rounded-xl bg-cream border border-black/10 shadow-sm p-6 sm:p-10">
      <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12 items-center">
        <div className="relative mx-auto lg:mx-0">
          <div
            className="h-56 w-56 sm:h-64 sm:w-64 rounded-xl shadow-md ring-4 ring-cream overflow-hidden relative"
            style={{ background: `linear-gradient(150deg, ${maker.swatch[0]}, ${maker.swatch[1]})` }}
          >
            <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,#fff,transparent_60%)]" />
          </div>
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 lg:left-4 lg:translate-x-0 inline-flex items-center gap-1.5 rounded-pill bg-grove text-linen text-[11px] font-semibold px-3 py-1.5 shadow-sm whitespace-nowrap">
            <ShieldCheck size={13} strokeWidth={2} />
            Verified maker
          </span>
        </div>

        <div>
          <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-aurum">
            Meet the maker
          </span>
          <h1 className="text-[34px] sm:text-[42px] mt-1.5 leading-[1.05]">{maker.personName}</h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5">
            <span className="inline-flex items-center gap-1.5 text-[14px] text-stone">
              <MapPin size={15} strokeWidth={1.8} className="text-nar" />
              {maker.village}, {maker.district}
            </span>
            <span className="inline-flex items-center gap-1 text-[13.5px] text-stone">
              <Star size={14} className="fill-aurum text-aurum" />
              {maker.rating} rating
            </span>
          </div>

          <span className="inline-block mt-3.5 rounded-pill bg-sand text-ink text-[12.5px] font-semibold px-3.5 py-1.5">
            {maker.craft}
          </span>

          <p className="text-[15.5px] text-ink/90 leading-relaxed mt-4 max-w-[62ch]">{maker.bio}</p>

          <div className="mt-6">
            <MakerActions name={maker.personName} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-dashed border-black/10">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-[26px] leading-none">{s.value}</p>
                <p className="text-[11.5px] text-stone mt-1.5 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
