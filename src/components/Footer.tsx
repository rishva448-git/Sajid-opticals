'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import Logo from './Logo';
import { STORE_INFO, CATEGORIES } from '@/data/products';
import { createGeneralConsultationWhatsAppUrl } from '@/utils/whatsapp';

export default function Footer() {
  const handleOpenWhatsApp = () => {
    const url = createGeneralConsultationWhatsAppUrl('Inquiry from website footer');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer id="contact" className="bg-slate-50 border-t border-slate-200/80 pt-14 pb-24 md:pb-14 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-slate-200/70">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Logo />
            
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
              Your neighborhood optical &amp; contact lens clinic in Avinashi. Delivering 
              precision prescription lenses, digital blue-cut eyewear, and designer frames.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-sajith-500 hover:border-sajith-400 transition-colors shadow-2xs"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <button
                onClick={handleOpenWhatsApp}
                aria-label="WhatsApp chat"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-sajith-500 hover:border-sajith-400 transition-colors shadow-2xs"
              >
                <MessageCircle className="w-4 h-4" />
              </button>

              <a
                href={`tel:${STORE_INFO.phone}`}
                aria-label="Call store"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-sajith-500 hover:border-sajith-400 transition-colors shadow-2xs"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Eyewear Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Eyewear Collections
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/shop?category=${encodeURIComponent(cat.id)}`}
                    className="hover:text-sajith-500 transition-colors flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-sajith-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-sajith-500 transition-colors">
                  All Eyewear
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-sajith-500 transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-sajith-500 transition-colors">
                  Our Eye Clinic
                </Link>
              </li>
              <li>
                <Link href="/#location" className="hover:text-sajith-500 transition-colors">
                  Store Directions
                </Link>
              </li>
              <li>
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sajith-500 transition-colors"
                >
                  Google Maps
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Clinic Contact
            </h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sajith-500 shrink-0 mt-0.5" />
                <span>Post Office St, Near Old Bus Stand, Avinashi - 641654</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sajith-500 shrink-0" />
                <a href={`tel:${STORE_INFO.phone}`} className="font-semibold text-slate-900 hover:text-sajith-500">
                  {STORE_INFO.displayPhone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-sajith-500 shrink-0 mt-0.5" />
                <div>
                  <p>Mon - Sat: 9:00 AM – 9:00 PM</p>
                  <p className="text-slate-400">Sunday: 9:00 AM – 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Sajith Eye Care Opticals. All rights reserved.</p>
          <div className="flex items-center gap-3 text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sajith-500" />
              Verified Optical Clinic
            </span>
            <span>•</span>
            <span>Avinashi, Tamil Nadu</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
