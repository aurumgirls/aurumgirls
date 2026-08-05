import Image from "next/image";
import Link from "next/link";
import { Bell, ExternalLink, ShieldCheck } from "lucide-react";

export default function AdminTopbar() {
  return (
    <div className="sticky top-0 z-40 bg-linen/95 backdrop-blur-md border-b border-black/10">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-7 h-[64px] flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="By Aurum Girls — Home">
          <Image src="/images/logo-color.png" alt="By Aurum Girls" width={30} height={30} className="h-[30px] w-[30px]" />
          <span className="hidden sm:block font-serif text-[16px] leading-none">By Aurum Girls</span>
        </Link>

        <span className="hidden md:inline-flex items-center gap-1.5 rounded-pill bg-ink text-linen text-[11.5px] font-semibold px-3 py-1.5 ml-1">
          <ShieldCheck size={12} strokeWidth={2} />
          Admin Console
        </span>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-semibold text-stone hover:text-nar transition-colors"
          >
            View live site
            <ExternalLink size={13} strokeWidth={2} />
          </Link>

          <button
            aria-label="Notifications"
            className="relative h-9 w-9 inline-flex items-center justify-center rounded-pill hover:bg-sand transition-colors text-ink"
          >
            <Bell size={17} strokeWidth={1.8} />
            <span className="absolute top-1 right-1.5 h-2 w-2 rounded-pill bg-nar" />
          </button>

          <div
            className="h-9 w-9 rounded-pill flex items-center justify-center text-linen text-[13px] font-serif shrink-0"
            style={{ background: "linear-gradient(135deg, #33432A, #DCE3CE)" }}
          >
            G
          </div>
        </div>
      </div>
    </div>
  );
}
