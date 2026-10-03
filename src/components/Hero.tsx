'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, ShieldCheck, Eye, Sparkles } from 'lucide-react';
import { STORE_INFO } from '@/data/products';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-6 pb-12 md:pt-14 md:pb-20 border-b border-slate-100">
      {/* Subtle Blue Ambient Gradient Glows (Strictly adhering to Blue + White) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-sajith-50 blur-3xl pointer-events-none opacity-80" />
      <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-blue-50/60 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-sajith-200/60 text-sajith-700 text-xs font-bold mb-5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-sajith-500 animate-pulse" />
              <span className="tracking-wide">AVINASHI, TAMIL NADU</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-5">
              See Better.
              <br />
              <span className="text-sajith-500">Look Better.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8 max-w-xl">
              Discover stylish eyewear and trusted eye care at{' '}
              <strong className="font-semibold text-slate-800">
                Sajith Eye Care Opticals
              </strong>
              . Explore premium frames, precision blue-cut lenses, and computerized testing right here in Avinashi.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-sajith-500 hover:bg-sajith-600 text-white font-bold text-base shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
              >
                <span>SHOP COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#location"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-sajith-50 text-sajith-600 font-bold text-base border-2 border-sajith-500/40 hover:border-sajith-500 transition-all active:scale-[0.98]"
              >
                <MapPin className="w-4 h-4 text-sajith-500" />
                <span>VISIT OUR STORE</span>
              </a>
            </div>

            {/* Trust Highlights Strip */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 w-full">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-sajith-600 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-sajith-500" />
                  <span>100% Quality</span>
                </div>
                <span className="text-xs text-slate-500 mt-0.5">Certified Lenses</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-sajith-600 font-bold text-sm">
                  <Eye className="w-4 h-4 text-sajith-500" />
                  <span>Computerized</span>
                </div>
                <span className="text-xs text-slate-500 mt-0.5">Eye Examination</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-sajith-600 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-sajith-500" />
                  <span>500+ Frames</span>
                </div>
                <span className="text-xs text-slate-500 mt-0.5">Curated Styles</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Eyewear Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Crisp Product Visual Card */}
              <div className="relative bg-white rounded-3xl p-3 sm:p-5 border border-slate-200/80 shadow-[0_12px_36px_-6px_rgba(0,102,204,0.12)] overflow-hidden group">
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-50">
                  <Image
                    src="/images/hero/hero-eyewear.jpg"
                    alt="Sajith Eye Care Premium Eyewear Frame"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle brand blue accent tag on the visual */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-sajith-600 shadow-sm border border-blue-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sajith-500" />
                    Signature Clinic Collection
                  </div>
                </div>

                {/* Micro Product Info bar on card */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between px-1">
                  <div>
                    <h3 className="font-bold text-sm text-slate-800">Classic Italian Tortoise Acetate</h3>
                    <p className="text-xs text-slate-500">Anti-reflective blue-coat lenses</p>
                  </div>
                  <Link
                    href="/shop"
                    className="text-xs font-bold text-sajith-500 hover:text-sajith-600 flex items-center gap-1 bg-sajith-50 px-2.5 py-1.5 rounded-lg"
                  >
                    View Frame &rarr;
                  </Link>
                </div>
              </div>

              {/* Floating Review / In-Store Experience Card */}
              <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-200 shadow-elevated items-center gap-3 max-w-xs">
                <div className="w-10 h-10 rounded-xl bg-sajith-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  4.9★
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Rated Top Optical in Avinashi</p>
                  <p className="text-[11px] text-slate-500">Fast prescription lens delivery &amp; custom fitting</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
