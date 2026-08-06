import React from 'react';
import Link from 'next/link';
import { InstagramIcon, FacebookIcon, TikTokIcon, PinterestIcon } from './SocialIcons';

export default function Footer() {
  return (
    <footer className="bg-forest text-cream">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 lg:px-8 py-16 text-center border-b border-forest-light">
        <h2 className="font-display text-3xl lg:text-4xl font-semibold mb-4 text-cream">Join the Moovement</h2>
        <p className="mb-8 text-cream/80 max-w-md mx-auto">Subscribe for farm updates, new flavor drops, and exclusive offers straight to your inbox.</p>
        <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 px-5 py-3 rounded-full bg-cream text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta"
            required
          />
          <button type="submit" className="px-8 py-3 rounded-full bg-terracotta text-white font-semibold hover:bg-terracotta-light transition-colors whitespace-nowrap">
            Subscribe
          </button>
        </form>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Col 1 */}
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-cream">Painterland Sisters</h3>
            <p className="text-cream/80 text-sm leading-relaxed">
              Organic skyr yogurt from our family farm in Pennsylvania. High in protein, low in sugar, and made with love.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-cream/80 hover:text-terracotta transition-colors"><InstagramIcon /></a>
              <a href="#" className="text-cream/80 hover:text-terracotta transition-colors"><FacebookIcon /></a>
              <a href="#" className="text-cream/80 hover:text-terracotta transition-colors"><TikTokIcon /></a>
              <a href="#" className="text-cream/80 hover:text-terracotta transition-colors"><PinterestIcon /></a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-medium text-lg mb-6 text-cream">Shop</h4>
            <ul className="space-y-3 text-sm text-cream/80">
              <li><Link href="/shop/plain" className="hover:text-terracotta transition-colors">Plain</Link></li>
              <li><Link href="/shop/vanilla-bean" className="hover:text-terracotta transition-colors">Vanilla Bean</Link></li>
              <li><Link href="/shop/blueberry-lemon" className="hover:text-terracotta transition-colors">Blueberry Lemon</Link></li>
              <li><Link href="/shop/strawberry" className="hover:text-terracotta transition-colors">Strawberry</Link></li>
              <li><Link href="/shop/meadow-berry" className="hover:text-terracotta transition-colors">Meadow Berry</Link></li>
              <li><Link href="/shop/peach" className="hover:text-terracotta transition-colors">Peach</Link></li>
              <li><Link href="/shop/passion-fruit" className="hover:text-terracotta transition-colors">Passion Fruit</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-medium text-lg mb-6 text-cream">Discover</h4>
            <ul className="space-y-3 text-sm text-cream/80">
              <li><Link href="/about" className="hover:text-terracotta transition-colors">Our Story</Link></li>
              <li><Link href="/farm" className="hover:text-terracotta transition-colors">Our Farm</Link></li>
              <li><Link href="/recipes" className="hover:text-terracotta transition-colors">Recipes</Link></li>
              <li><Link href="/news" className="hover:text-terracotta transition-colors">In the News</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-medium text-lg mb-6 text-cream">Support</h4>
            <ul className="space-y-3 text-sm text-cream/80">
              <li><Link href="/contact" className="hover:text-terracotta transition-colors">Contact Us</Link></li>
              <li><Link href="/find-us" className="hover:text-terracotta transition-colors">Where to Buy</Link></li>
              <li><Link href="/faq" className="hover:text-terracotta transition-colors">FAQ</Link></li>
              <li><Link href="/accessibility" className="hover:text-terracotta transition-colors">Accessibility</Link></li>
              <li><Link href="/terms" className="hover:text-terracotta transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-terracotta transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-forest-light">
        <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/60">
          <p>&copy; {new Date().getFullYear()} Painterland Sisters. All rights reserved.</p>
          <div className="flex gap-2 opacity-50 grayscale">
            <span className="px-2 py-1 bg-white rounded border border-sand text-charcoal">Visa</span>
            <span className="px-2 py-1 bg-white rounded border border-sand text-charcoal">MC</span>
            <span className="px-2 py-1 bg-white rounded border border-sand text-charcoal">Amex</span>
            <span className="px-2 py-1 bg-white rounded border border-sand text-charcoal">Shop Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
