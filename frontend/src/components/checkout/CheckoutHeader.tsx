import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function CheckoutHeader() {
  return (
    <div className="sticky top-0 z-40 bg-linen/95 backdrop-blur-md border-b border-black/10">
      <div className="mx-auto max-w-[1160px] px-5 sm:px-7 h-[64px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label="By Aurum Girls — Home">
          <Image src="/images/logo-color.png" alt="By Aurum Girls" width={32} height={32} className="h-8 w-8" />
          <span className="hidden sm:block font-serif text-[17px] leading-none">By Aurum Girls</span>
        </Link>

        <span className="hidden sm:inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-olive">
          <ShieldCheck size={15} strokeWidth={1.8} />
          Secure Checkout
        </span>

        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-stone hover:text-nar transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={2} />
          Back to cart
        </Link>
      </div>
    </div>
  );
}
