import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import ContactInfoCard from "@/components/contact/ContactInfoCard";
import ContactForm from "@/components/contact/ContactForm";
import MapPlaceholder from "@/components/contact/MapPlaceholder";
import FaqPreview from "@/components/contact/FaqPreview";

export const metadata: Metadata = {
  title: "Contact Us — By Aurum Girls",
  description: "Get in touch with the By Aurum Girls team — questions, orders, press, or selling with us.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pb-14 lg:pb-0">
        <div className="mx-auto max-w-[1160px] px-5 sm:px-7 pt-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />
        </div>

        <section className="mx-auto max-w-[1160px] px-5 sm:px-7 pt-8 pb-10 sm:pt-10 text-center">
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.22em] uppercase text-aurum mb-3">
            <span className="h-px w-6 bg-aurum" />
            Get in touch
            <span className="h-px w-6 bg-aurum" />
          </span>
          <h1 className="text-[32px] sm:text-[42px] leading-[1.08] tracking-tight max-w-[24ch] mx-auto">
            We&rsquo;d love to hear from you.
          </h1>
          <p className="text-stone text-base mt-4 max-w-[52ch] mx-auto">
            Questions about an order, a maker, or selling your own craft — reach us however
            is easiest.
          </p>
        </section>

        <section className="mx-auto max-w-[1160px] px-5 sm:px-7 pb-14 sm:pb-16">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-6">
            <ContactInfoCard />
            <ContactForm />
          </div>
        </section>

        <section className="mx-auto max-w-[1160px] px-5 sm:px-7 pb-14 sm:pb-16">
          <MapPlaceholder />
        </section>

        <section className="bg-cream border-y border-black/10">
          <div className="mx-auto max-w-[1160px] px-5 sm:px-7 py-14 sm:py-16">
            <FaqPreview />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
