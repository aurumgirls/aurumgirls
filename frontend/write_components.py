import os

files = {
    "src/components/Hero.tsx": """"use client";
import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/motion/FadeUp";

export function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full bg-forest text-cream overflow-hidden">
      <Image
        src="/images/hero-banner.jpg"
        alt="Painterland Sisters Farm"
        fill
        className="object-cover opacity-60"
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-charcoal/20"></div>
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center">
        <FadeUp>
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-terracotta text-cream rounded-full">
            100% Organic Skyr Yogurt
          </span>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display mb-6">
            Painterland Sisters
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="text-xl md:text-2xl font-body max-w-2xl mx-auto mb-10 text-cream/90">
            Organic skyr yogurt from our Pennsylvania family farm. Real ingredients, pasture-raised cows, and two sisters on a mission.
          </p>
        </FadeUp>
        <FadeUp delay={0.3} className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/shop"
            className="px-8 py-4 bg-terracotta hover:bg-terracotta-light text-cream rounded-full font-medium transition-colors text-lg"
          >
            Shop Yogurt
          </Link>
          <Link 
            href="/#our-story"
            className="px-8 py-4 bg-cream hover:bg-linen text-forest rounded-full font-medium transition-colors text-lg"
          >
            Our Story
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
""",
    "src/components/CommunityIntro.tsx": """"use client";
import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/motion/FadeUp";

export function CommunityIntro() {
  return (
    <section id="our-story" className="py-24 bg-cream text-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-soft-lg">
              <Image 
                src="/images/founders-portrait.jpg" 
                alt="Painterland Sisters Founders"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </FadeUp>
          <div>
            <FadeUp delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-display text-forest mb-6">
                Our Family Farm Story
              </h2>
              <p className="text-lg text-slate mb-6 font-body leading-relaxed">
                We are two sisters from a fourth-generation dairy farm in Pennsylvania. Growing up, our days were defined by the rhythm of the farm, our connection to the land, and the health of our cows. We realized that by making our own organic skyr yogurt, we could preserve our family's legacy and share our nutrient-rich milk directly with you.
              </p>
              <p className="text-lg text-slate mb-8 font-body leading-relaxed">
                Every cup of Painterland Sisters yogurt is crafted with milk from our pasture-raised cows, supporting sustainable agriculture and a deep respect for nature.
              </p>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div>
                  <h4 className="font-display text-xl text-forest mb-2">Organic & Natural</h4>
                  <p className="text-slate text-sm">No artificial flavors, just real ingredients and farm-fresh milk.</p>
                </div>
                <div>
                  <h4 className="font-display text-xl text-forest mb-2">Pasture-Raised</h4>
                  <p className="text-slate text-sm">Our cows spend their days grazing on lush Pennsylvania pastures.</p>
                </div>
                <div>
                  <h4 className="font-display text-xl text-forest mb-2">Family Owned</h4>
                  <p className="text-slate text-sm">4th generation farmers carrying on a legacy of land stewardship.</p>
                </div>
                <div>
                  <h4 className="font-display text-xl text-forest mb-2">High Protein</h4>
                  <p className="text-slate text-sm">Authentic Icelandic-style skyr packed with natural protein.</p>
                </div>
              </div>
            </FadeUp>
            
            <FadeUp delay={0.3}>
              <Link 
                href="/shop"
                className="inline-flex items-center px-8 py-4 bg-forest hover:bg-forest-light text-cream rounded-full font-medium transition-colors"
              >
                Support Our Farm
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
""",
    "src/components/GiftSetBanner.tsx": """"use client";
import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/motion/FadeUp";

export function GiftSetBanner() {
  return (
    <section className="py-24 bg-vanilla text-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-cream rounded-3xl overflow-hidden shadow-soft-lg flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
            <FadeUp>
              <span className="text-terracotta font-medium tracking-wider uppercase text-sm mb-4 block">Best Value</span>
              <h2 className="text-4xl md:text-5xl font-display text-forest mb-4">
                Skyr Yogurt Variety Pack
              </h2>
              <p className="text-lg text-slate mb-6 font-body">
                Strawberry, Blueberry, Vanilla, Meadowberry, and Peach — all your favorite flavors in one box! Taste the rainbow of our organic skyr yogurt.
              </p>
              <div className="flex items-end gap-4 mb-8">
                <span className="text-4xl font-display text-forest">$35.00</span>
                <span className="text-lg text-slate line-through mb-1">$45.00</span>
              </div>
              <Link 
                href="/product/variety-pack"
                className="inline-flex items-center justify-center px-8 py-4 bg-terracotta hover:bg-terracotta-light text-cream rounded-full font-medium transition-colors"
              >
                Order Variety Pack
              </Link>
            </FadeUp>
          </div>
          <div className="w-full md:w-1/2 relative min-h-[400px]">
            <Image 
              src="/images/yogurt-products.jpg"
              alt="Painterland Sisters Variety Pack"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
""",
    "src/components/FeaturedProducts.tsx": """"use client";
import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

const featuredProducts = [
  { slug: 'strawberry-skyr', name: 'Strawberry Skyr', price: 9.00, color: 'bg-strawberry', img: 'yogurt-strawberry.jpg' },
  { slug: 'blueberry-skyr', name: 'Blueberry Skyr', price: 9.00, color: 'bg-blueberry', img: 'yogurt-blueberry.jpg' },
  { slug: 'vanilla-skyr', name: 'Vanilla Bean Skyr', price: 9.00, color: 'bg-vanilla', img: 'yogurt-vanilla.jpg' },
  { slug: 'variety-pack', name: 'Variety Pack', price: 35.00, color: 'bg-cream', img: 'yogurt-products.jpg', badge: 'Save $10' }
];

export function FeaturedProducts() {
  return (
    <section className="py-24 bg-linen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <FadeUp>
            <h2 className="text-4xl font-display text-forest">Farm Fresh Flavors</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Link href="/shop" className="text-terracotta hover:text-terracotta-light font-medium underline underline-offset-4">
              View All
            </Link>
          </FadeUp>
        </div>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.slug} className="group flex flex-col h-full bg-cream rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-shadow">
              <div className={`relative aspect-square w-full p-8 flex items-center justify-center ${product.color}`}>
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-terracotta text-cream text-xs font-bold px-3 py-1 rounded-full z-10">
                    {product.badge}
                  </span>
                )}
                <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                  <Image 
                    src={`/images/${product.img}`} 
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-md"
                    unoptimized
                  />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <Link href={`/product/${product.slug}`} className="block mb-2">
                  <h3 className="text-xl font-display text-forest group-hover:text-terracotta transition-colors">{product.name}</h3>
                </Link>
                <div className="text-lg font-medium text-slate mb-6">${product.price.toFixed(2)}</div>
                
                <button className="mt-auto w-full py-3 bg-forest hover:bg-forest-light text-cream rounded-full font-medium transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
""",
    "src/components/ValuePillars.tsx": """"use client";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { Leaf, Heart, Truck, CreditCard, Recycle } from "lucide-react";

const pillars = [
  { icon: Leaf, title: "100% Organic", desc: "Certified organic ingredients, zero artificial additives." },
  { icon: Heart, title: "Family Farmed", desc: "Made with love on our 4th generation dairy farm." },
  { icon: Truck, title: "Nationwide Shipping", desc: "Cold-shipped directly to your doorstep." },
  { icon: CreditCard, title: "Secure Checkout", desc: "Safe and encrypted online payments." },
  { icon: Recycle, title: "Eco Packaging", desc: "Recyclable containers and sustainable shipping materials." }
];

export function ValuePillars() {
  return (
    <section className="py-16 bg-forest text-cream border-t border-forest-light">
      <div className="max-w-7xl mx-auto px-6">
        <StaggerGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-forest-light rounded-full flex items-center justify-center mb-4 text-honey">
                  <Icon size={24} />
                </div>
                <h4 className="font-display text-lg mb-2">{pillar.title}</h4>
                <p className="text-sm text-cream/70 font-body">{pillar.desc}</p>
              </div>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
""",
    "src/app/page.tsx": """import { Hero } from "@/components/Hero";
import { CommunityIntro } from "@/components/CommunityIntro";
import { GiftSetBanner } from "@/components/GiftSetBanner";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { ValuePillars } from "@/components/ValuePillars";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CommunityIntro />
      <GiftSetBanner />
      <FeaturedProducts />
      <ValuePillars />
    </main>
  );
}
""",
    "src/components/cart/CartItemRow.tsx": """"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

export function CartItemRow() {
  return (
    <div className="flex gap-4 sm:gap-6 py-6 border-b border-sand">
      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-vanilla rounded-xl flex-shrink-0 relative">
        <Image src="/images/yogurt-strawberry.jpg" alt="Strawberry Skyr" fill className="object-contain p-2" unoptimized />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <Link href="/product/strawberry-skyr">
              <h3 className="font-display text-lg sm:text-xl text-forest hover:text-terracotta transition-colors">Strawberry Skyr</h3>
            </Link>
            <p className="text-slate text-sm mt-1">Single Cup</p>
          </div>
          <button className="text-slate hover:text-terracotta transition-colors p-1">
            <Trash2 size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center bg-cream border border-sand rounded-full">
            <button className="w-8 h-8 flex items-center justify-center text-forest hover:text-terracotta transition-colors">
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-medium text-sm">2</span>
            <button className="w-8 h-8 flex items-center justify-center text-forest hover:text-terracotta transition-colors">
              <Plus size={16} />
            </button>
          </div>
          <div className="font-medium text-lg text-forest">$18.00</div>
        </div>
      </div>
    </div>
  );
}
""",
    "src/components/cart/OrderSummary.tsx": """"use client";
import Link from "next/link";

export function OrderSummary() {
  return (
    <div className="bg-cream p-6 sm:p-8 rounded-2xl shadow-soft">
      <h3 className="text-xl font-display text-forest mb-6">Order Summary</h3>
      
      <div className="space-y-4 text-sm font-body mb-6">
        <div className="flex justify-between text-slate">
          <span>Subtotal</span>
          <span>$18.00</span>
        </div>
        <div className="flex justify-between text-slate">
          <span>Standard Shipping</span>
          <span>$5.00</span>
        </div>
      </div>
      
      <div className="border-t border-sand pt-4 mb-8 flex justify-between items-center">
        <span className="font-display text-lg text-forest">Total</span>
        <span className="font-display text-2xl text-forest">$23.00</span>
      </div>
      
      <Link 
        href="/checkout"
        className="w-full block text-center py-4 bg-terracotta hover:bg-terracotta-light text-cream rounded-full font-medium transition-colors text-lg"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
""",
    "src/components/cart/CartExperience.tsx": """"use client";
import { CartItemRow } from "./CartItemRow";
import { OrderSummary } from "./OrderSummary";

export function CartExperience() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
      <h1 className="text-4xl md:text-5xl font-display text-forest mb-12">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-2/3">
          <div className="border-t border-sand">
            <CartItemRow />
            {/* Additional items would render here */}
          </div>
        </div>
        
        <div className="w-full lg:w-1/3">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
""",
    "src/components/checkout/CheckoutSummary.tsx": """"use client";
import Image from "next/image";

export function CheckoutSummary() {
  return (
    <div className="bg-cream p-6 sm:p-8 rounded-2xl shadow-soft h-fit sticky top-8">
      <h3 className="text-xl font-display text-forest mb-6">Order Summary</h3>
      
      <div className="flex gap-4 py-4 border-b border-sand">
        <div className="w-16 h-16 bg-vanilla rounded-lg relative">
          <Image src="/images/yogurt-strawberry.jpg" alt="Strawberry Skyr" fill className="object-contain p-1" unoptimized />
        </div>
        <div className="flex-1 flex justify-between">
          <div>
            <h4 className="font-medium text-forest text-sm">Strawberry Skyr</h4>
            <span className="text-slate text-xs">Qty: 2</span>
          </div>
          <span className="font-medium text-sm">$18.00</span>
        </div>
      </div>
      
      <div className="space-y-3 text-sm font-body py-6 border-b border-sand">
        <div className="flex justify-between text-slate">
          <span>Subtotal</span>
          <span>$18.00</span>
        </div>
        <div className="flex justify-between text-slate">
          <span>Standard Shipping</span>
          <span>$5.00</span>
        </div>
        <div className="flex justify-between text-slate">
          <span>Taxes</span>
          <span>$0.00</span>
        </div>
      </div>
      
      <div className="pt-4 flex justify-between items-center">
        <span className="font-display text-lg text-forest">Total</span>
        <span className="font-display text-2xl text-forest">$23.00</span>
      </div>
    </div>
  );
}
""",
    "src/components/checkout/DeliveryOptions.tsx": """"use client";

export function DeliveryOptions() {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-display text-forest mb-4">Delivery Method</h3>
      <div className="space-y-4">
        <label className="flex items-center justify-between p-4 border border-terracotta bg-terracotta/5 rounded-xl cursor-pointer">
          <div className="flex items-center gap-3">
            <input type="radio" name="delivery" defaultChecked className="text-terracotta focus:ring-terracotta h-4 w-4" />
            <div>
              <div className="font-medium text-forest">Standard Shipping</div>
              <div className="text-xs text-slate">3-5 business days</div>
            </div>
          </div>
          <span className="font-medium text-forest">$5.00</span>
        </label>
        
        <label className="flex items-center justify-between p-4 border border-sand hover:border-forest/30 rounded-xl cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <input type="radio" name="delivery" className="text-terracotta focus:ring-terracotta h-4 w-4" />
            <div>
              <div className="font-medium text-forest">Express Shipping</div>
              <div className="text-xs text-slate">1-2 business days</div>
            </div>
          </div>
          <span className="font-medium text-forest">$12.00</span>
        </label>
      </div>
    </div>
  );
}
""",
    "src/components/checkout/PaymentMethods.tsx": """"use client";

export function PaymentMethods() {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-display text-forest mb-4">Payment Method</h3>
      <div className="space-y-4">
        <label className="flex items-center p-4 border border-terracotta bg-terracotta/5 rounded-xl cursor-pointer">
          <input type="radio" name="payment" defaultChecked className="text-terracotta focus:ring-terracotta h-4 w-4 mr-3" />
          <span className="font-medium text-forest">Credit / Debit Card</span>
        </label>
        
        <label className="flex items-center p-4 border border-sand hover:border-forest/30 rounded-xl cursor-pointer transition-colors">
          <input type="radio" name="payment" className="text-terracotta focus:ring-terracotta h-4 w-4 mr-3" />
          <span className="font-medium text-forest">Apple Pay / Google Pay</span>
        </label>
      </div>
    </div>
  );
}
""",
    "src/components/checkout/CheckoutExperience.tsx": """"use client";
import { CheckoutSummary } from "./CheckoutSummary";
import { DeliveryOptions } from "./DeliveryOptions";
import { PaymentMethods } from "./PaymentMethods";

export function CheckoutExperience() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-display text-forest mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-3/5">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-10">
              <h3 className="text-xl font-display text-forest mb-4">Contact Information</h3>
              <div className="space-y-4">
                <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
              </div>
            </div>
            
            <div className="mb-10">
              <h3 className="text-xl font-display text-forest mb-4">Shipping Address</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
                <input type="text" placeholder="Last Name" className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
                <input type="text" placeholder="Address" className="col-span-2 w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
                <input type="text" placeholder="City" className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
                <input type="text" placeholder="ZIP Code" className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:border-terracotta bg-white" />
              </div>
            </div>
            
            <DeliveryOptions />
            <PaymentMethods />
            
            <button className="w-full py-4 bg-terracotta hover:bg-terracotta-light text-cream rounded-full font-medium transition-colors text-lg mt-6">
              Place Order
            </button>
          </form>
        </div>
        
        <div className="w-full lg:w-2/5">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}
"""
}

def create_directory_if_not_exists(file_path):
    directory = os.path.dirname(file_path)
    if not os.path.exists(directory):
        os.makedirs(directory)

for file_path, content in files.items():
    full_path = os.path.join(r"c:\Users\HP\OneDrive\Рабочий стол\finalProject-holberton\frontend", file_path)
    create_directory_if_not_exists(full_path)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Wrote {full_path}")
