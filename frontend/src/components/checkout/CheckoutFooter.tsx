import Link from "next/link";

const MAX_WIDTH_CLASS = {
  1160: "max-w-[1160px]",
  1280: "max-w-[1280px]",
  1400: "max-w-[1400px]",
} as const;

export default function CheckoutFooter({
  maxWidth = 1160,
}: {
  maxWidth?: keyof typeof MAX_WIDTH_CLASS;
}) {
  return (
    <div className="border-t border-black/10 mt-auto">
      <div
        className={`mx-auto ${MAX_WIDTH_CLASS[maxWidth]} px-5 sm:px-7 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12.5px] text-stone`}
      >
        <span>© {new Date().getFullYear()} By Aurum Girls. Proudly handmade in Azerbaijan.</span>
        <div className="flex items-center gap-5">
          <Link href="/legal/terms" className="hover:text-nar transition-colors">Terms</Link>
          <Link href="/legal/privacy" className="hover:text-nar transition-colors">Privacy</Link>
          <Link href="/help" className="hover:text-nar transition-colors">Help</Link>
        </div>
      </div>
    </div>
  );
}
