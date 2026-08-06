"use client";

import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { InstagramIcon, FacebookIcon, TikTokIcon, PinterestIcon } from '@/components/SocialIcons';
import Link from 'next/link';

export default function ContactInfoCard() {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-soft border border-sand">
      <h3 className="text-2xl font-display text-forest mb-8">Contact Information</h3>
      
      <div className="space-y-6">
        <div className="flex items-start gap-4 text-slate">
          <div className="mt-1 text-terracotta shrink-0">
            <MapPin size={24} />
          </div>
          <div>
            <p className="font-medium text-forest">Farm & Creamery</p>
            <p>Tioga County, Pennsylvania</p>
            <p>USA</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 text-slate">
          <div className="mt-1 text-terracotta shrink-0">
            <Mail size={24} />
          </div>
          <div>
            <p className="font-medium text-forest">Email Us</p>
            <a href="mailto:hello@painterlandsisters.com" className="hover:text-terracotta transition-colors">
              hello@painterlandsisters.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4 text-slate">
          <div className="mt-1 text-terracotta shrink-0">
            <Phone size={24} />
          </div>
          <div>
            <p className="font-medium text-forest">Call Us</p>
            <a href="tel:+15705550123" className="hover:text-terracotta transition-colors">
              (570) 555-0123
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4 text-slate">
          <div className="mt-1 text-terracotta shrink-0">
            <Clock size={24} />
          </div>
          <div>
            <p className="font-medium text-forest">Hours</p>
            <p>Mon-Fri, 9:00 AM - 5:00 PM EST</p>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-sand">
        <p className="font-medium text-forest mb-4">Follow Our Farm Journey</p>
        <div className="flex gap-4">
          <Link href="#" className="w-10 h-10 rounded-full bg-linen flex items-center justify-center text-forest hover:bg-terracotta hover:text-cream transition-colors">
            <InstagramIcon className="w-5 h-5" />
          </Link>
          <Link href="#" className="w-10 h-10 rounded-full bg-linen flex items-center justify-center text-forest hover:bg-terracotta hover:text-cream transition-colors">
            <FacebookIcon className="w-5 h-5" />
          </Link>
          <Link href="#" className="w-10 h-10 rounded-full bg-linen flex items-center justify-center text-forest hover:bg-terracotta hover:text-cream transition-colors">
            <TikTokIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
