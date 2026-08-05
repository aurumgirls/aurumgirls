import { Star } from "lucide-react";
import type { MakerProfile } from "@/lib/makers-data";

const AVATAR_PALETTE: [string, string][] = [
  ["#A83A2B", "#EBD3CB"],
  ["#5E6E3A", "#DCE3CE"],
  ["#C0892E", "#EFE4D0"],
  ["#33432A", "#C9A87C"],
  ["#7E2A20", "#C0892E"],
];

export default function MakerReviews({ maker }: { maker: MakerProfile }) {
  const reviews = maker.reviews;
  const total = reviews.length;
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));

  return (
    <div>
      <div className="mb-7">
        <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-aurum">
          Customer reviews
        </span>
        <h2 className="text-[28px] sm:text-[34px] mt-1.5">What buyers are saying</h2>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-10">
        <div className="rounded-lg bg-cream border border-black/10 shadow-sm p-6 h-fit">
          <p className="font-serif text-[46px] leading-none">{maker.rating}</p>
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.round(maker.rating) ? "fill-aurum text-aurum" : "text-sand"}
              />
            ))}
          </div>
          <p className="text-[13px] text-stone mt-1.5">Based on {total} recent reviews</p>

          <div className="flex flex-col gap-2 mt-5">
            {distribution.map((d) => (
              <div key={d.star} className="flex items-center gap-2.5">
                <span className="text-[11.5px] text-stone w-8 shrink-0">{d.star} star</span>
                <div className="h-1.5 flex-1 rounded-pill bg-sand overflow-hidden">
                  <div
                    className="h-full bg-aurum rounded-pill"
                    style={{ width: total ? `${(d.count / total) * 100}%` : "0%" }}
                  />
                </div>
                <span className="text-[11px] text-stone w-4 text-right shrink-0">{d.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {reviews.map((review, i) => (
            <div
              key={review.id}
              className="rounded-lg bg-cream border border-black/10 shadow-sm p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-pill shrink-0 flex items-center justify-center text-linen text-[14px] font-semibold"
                    style={{
                      background: `linear-gradient(135deg, ${AVATAR_PALETTE[i % AVATAR_PALETTE.length][0]}, ${AVATAR_PALETTE[i % AVATAR_PALETTE.length][1]})`,
                    }}
                  >
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-ink">{review.author}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          size={11}
                          className={s < review.rating ? "fill-aurum text-aurum" : "text-sand"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-[12px] text-stone shrink-0">{review.date}</span>
              </div>

              <p className="text-[14px] text-ink/90 leading-relaxed mt-3.5">{review.text}</p>

              <span className="inline-block mt-3.5 rounded-pill bg-linen border border-black/10 text-[11.5px] text-stone px-3 py-1">
                {review.productName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
