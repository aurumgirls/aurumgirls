import { Compass, HeartHandshake } from "lucide-react";

export default function MissionVision() {
  return (
    <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
      <div className="rounded-lg bg-cream border border-black/10 shadow-sm p-7 sm:p-9">
        <span className="h-12 w-12 rounded-pill bg-nar-soft text-nar-deep flex items-center justify-center">
          <HeartHandshake size={20} strokeWidth={1.8} />
        </span>
        <h3 className="text-[22px] sm:text-[25px] mt-5">Our mission</h3>
        <p className="text-stone text-[15px] mt-3 leading-relaxed">
          To give rural women artisans in Azerbaijan direct access to buyers who value their
          craft — so the income from every sale goes to the hands that made it, not to
          layers of middlemen in between.
        </p>
      </div>

      <div className="rounded-lg bg-cream border border-black/10 shadow-sm p-7 sm:p-9">
        <span className="h-12 w-12 rounded-pill bg-sage text-grove flex items-center justify-center">
          <Compass size={20} strokeWidth={1.8} />
        </span>
        <h3 className="text-[22px] sm:text-[25px] mt-5">Our vision</h3>
        <p className="text-stone text-[15px] mt-3 leading-relaxed">
          A future where centuries-old crafts — kəlağayı weaving, wild-herb foraging,
          copper-pot preserving — survive and thrive because the women carrying them forward
          can build a real livelihood from the work.
        </p>
      </div>
    </div>
  );
}
