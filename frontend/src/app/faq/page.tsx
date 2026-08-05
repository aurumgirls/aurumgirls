import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import FaqExplorer from "@/components/faq/FaqExplorer";
import FaqContactSection from "@/components/faq/FaqContactSection";

export const metadata: Metadata = {
  title: "FAQ — By Aurum Girls",
  description: "Answers to common questions about orders, shipping, payments, returns, and selling on By Aurum Girls.",
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pb-14 lg:pb-0">
        <div className="mx-auto max-w-[1160px] px-5 sm:px-7 pt-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
        </div>

        <section className="mx-auto max-w-[1160px] px-5 sm:px-7 pt-8 pb-10 sm:pt-10 text-center">
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.22em] uppercase text-aurum mb-3">
            <span className="h-px w-6 bg-aurum" />
            Help center
            <span className="h-px w-6 bg-aurum" />
          </span>
          <h1 className="text-[32px] sm:text-[42px] leading-[1.08] tracking-tight max-w-[26ch] mx-auto">
            Frequently asked questions
          </h1>
          <p className="text-stone text-base mt-4 max-w-[52ch] mx-auto">
            Everything you need to know about ordering, shipping, and selling on
            By Aurum Girls — search or browse by topic.
          </p>
        </section>

        <section className="mx-auto max-w-[900px] px-5 sm:px-7 pb-16 sm:pb-20">
          <FaqExplorer />
        </section>

        <section className="mx-auto max-w-[1160px] px-5 sm:px-7 pb-14 sm:pb-16">
          <FaqContactSection />
        </section>
      </main>
      <Footer />
    </>
  );
}
