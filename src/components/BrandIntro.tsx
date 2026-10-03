'use client';

import React from 'react';
import { Eye, Shield, CheckCircle2 } from 'lucide-react';
import { STORE_INFO } from '@/data/products';

export default function BrandIntro() {
  return (
    <section id="about" className="py-12 md:py-16 bg-sajith-50/50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-slate-200/80 shadow-card relative overflow-hidden">
          
          {/* Subtle blue accent line on top */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-sajith-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Brand Monogram & Highlights */}
            <div className="lg:col-span-4 flex flex-col items-start">
              {/* Blue Brand Emblem */}
              <div className="w-16 h-16 rounded-2xl bg-sajith-500 flex items-center justify-center text-white mb-5 shadow-sm">
                <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none" stroke="currentColor">
                  <circle cx="34" cy="50" r="18" stroke="currentColor" strokeWidth="6" />
                  <circle cx="66" cy="50" r="18" stroke="currentColor" strokeWidth="6" />
                  <path d="M47 46 Q50 43 53 46" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="34" cy="50" r="5" fill="currentColor" />
                  <circle cx="66" cy="50" r="5" fill="currentColor" />
                </svg>
              </div>

              <div className="inline-block px-3 py-1 rounded bg-blue-50 text-sajith-700 text-xs font-bold uppercase tracking-wider mb-2">
                Trusted Optical Clinic
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Your Vision.
                <br />
                <span className="text-sajith-500">Our Care.</span>
              </h2>

            </div>

            {/* Right: Explanatory Content & Trust Pillars */}
            <div className="lg:col-span-8 space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                At <strong className="text-slate-900 font-semibold">{STORE_INFO.name}</strong>, 
                we combine accurate optometric vision diagnostics with an extensive, modern curation of 
                designer frames and international lens technologies. Located centrally in Avinashi on Post Office Street, 
                our clinic is committed to delivering comfortable, personalized eye care for the entire family.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-sajith-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Computerized Eye Testing</h4>
                    <p className="text-xs text-slate-500">Accurate power determination and astigmatic correction.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-sajith-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Certified Optical Dispensary</h4>
                    <p className="text-xs text-slate-500">Blue-cut, anti-glare, bifocal, and progressive lenses.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-sajith-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Contact Lens Fitting</h4>
                    <p className="text-xs text-slate-500">Daily and monthly disposables with trial counseling.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-sajith-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">In-Store Frame Fitting &amp; Service</h4>
                    <p className="text-xs text-slate-500">Free ultrasonic frame adjustments &amp; nose-pad replacement.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
