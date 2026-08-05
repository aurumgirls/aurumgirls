import Link from "next/link";
import { journalPosts } from "@/lib/data";

export default function JournalTeasers() {
  return (
    <section className="bg-cream border-t border-black/10">
      <div className="mx-auto max-w-[1160px] px-5 sm:px-7 py-12 sm:py-16">
        <div className="flex items-end justify-between mb-7">
          <div>
            <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-aurum">
              Journal
            </span>
            <h2 className="text-[26px] sm:text-[32px] mt-1">Stories, recipes &amp; craft</h2>
          </div>
          <Link href="/journal" className="text-sm font-semibold text-nar hover:text-nar-deep hidden sm:inline-block">
            Read the journal →
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {journalPosts.map((post) => (
            <Link
              key={post.title}
              href="/journal"
              className="rounded-lg overflow-hidden bg-linen border border-black/10 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className="h-36 sm:h-40"
                style={{ background: `linear-gradient(135deg, ${post.swatch[0]}, ${post.swatch[1]})` }}
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-aurum">
                  <span>{post.tag}</span>
                  <span className="text-stone/50">·</span>
                  <span className="text-stone normal-case font-medium">{post.readTime}</span>
                </div>
                <h3 className="text-[16.5px] mt-2 leading-snug">{post.title}</h3>
                <p className="text-[13px] text-stone mt-2 leading-relaxed">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
