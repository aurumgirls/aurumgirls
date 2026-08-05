import Link from "next/link";
import { MessageCircle, Star } from "lucide-react";
import type { Seller } from "@/lib/product-detail";

export default function SellerCard({ seller }: { seller: Seller }) {
  return (
    <div className="rounded-lg bg-cream border border-black/10 shadow-sm p-5">
      <div className="flex items-center gap-3.5">
        <div
          className="h-14 w-14 rounded-pill shrink-0"
          style={{ background: `linear-gradient(135deg, ${seller.swatch[0]}, ${seller.swatch[1]})` }}
        />
        <div className="min-w-0">
          <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-aurum">
            Sold &amp; made by
          </p>
          <h3 className="text-[17px] leading-snug truncate">{seller.name}</h3>
          <p className="text-[12.5px] text-stone">{seller.region} · Maker since {seller.since}</p>
        </div>
      </div>

      <p className="text-[13.5px] text-ink/90 leading-relaxed mt-4">{seller.bio}</p>

      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-dashed border-black/10 text-center">
        <div>
          <p className="flex items-center justify-center gap-1 font-serif text-[17px]">
            {seller.rating}
            <Star size={13} className="fill-aurum text-aurum" />
          </p>
          <p className="text-[10.5px] text-stone mt-0.5">Rating</p>
        </div>
        <div>
          <p className="font-serif text-[17px]">{seller.sales.toLocaleString()}</p>
          <p className="text-[10.5px] text-stone mt-0.5">Sales</p>
        </div>
        <div>
          <p className="font-serif text-[13px] leading-tight mt-1.5">{seller.responseTime}</p>
        </div>
      </div>

      <div className="flex gap-2.5 mt-4">
        <Link
          href={seller.slug ? `/makers/${seller.slug}` : "/makers"}
          className="flex-1 inline-flex items-center justify-center rounded-pill border-[1.5px] border-olive text-grove text-[13px] font-semibold px-4 py-2.5 hover:bg-sage transition-colors"
        >
          View shop
        </Link>
        <button
          aria-label={`Message ${seller.name}`}
          className="h-[38px] w-[42px] shrink-0 inline-flex items-center justify-center rounded-pill bg-sand text-ink hover:bg-kraft/40 transition-colors"
        >
          <MessageCircle size={16} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
