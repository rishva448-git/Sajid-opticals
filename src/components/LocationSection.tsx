'use client';

import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation, CheckCircle2 } from 'lucide-react';
import { STORE_INFO } from '@/data/products';
import { createGeneralConsultationWhatsAppUrl } from '@/utils/whatsapp';

export default function LocationSection() {
  const handleOpenWhatsApp = () => {
    const url = createGeneralConsultationWhatsAppUrl('Clinic Visit & Location Inquiry');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="location" className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sajith-600 uppercase tracking-widest mb-2">
            <MapPin className="w-3.5 h-3.5 text-sajith-500" />
            Physical Showroom &amp; Clinic
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Visit Our Store
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Step in for personalized frame try-ons, high-precision computerized testing, and instant consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Business Details & 3 Action Buttons */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card flex flex-col justify-between">
            <div>
              {/* Store Title */}
              <div className="mb-6">
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  {STORE_INFO.name}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  {STORE_INFO.tagline} • Avinashi
                </p>
              </div>

              {/* Address Card */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-sajith-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Address</h4>
                    <p className="mt-0.5 leading-relaxed">
                      {STORE_INFO.address.street},<br />
                      {STORE_INFO.address.landmark},<br />
                      {STORE_INFO.address.town}, {STORE_INFO.address.district} District,<br />
                      {STORE_INFO.address.state} – {STORE_INFO.address.pincode}
                    </p>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-sajith-500 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Business Hours</h4>
                    <p className="mt-0.5">{STORE_INFO.timings.weekdays}</p>
                    <p className="text-slate-500">{STORE_INFO.timings.sunday}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-sajith-500 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Direct Phone</h4>
                    <p className="mt-0.5 font-semibold text-sajith-600">
                      {STORE_INFO.displayPhone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Explicit Action Buttons: GET DIRECTIONS, CALL NOW, WHATSAPP */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100">
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-sajith-500 hover:bg-sajith-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>GET DIRECTIONS</span>
              </a>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="py-3 px-3 rounded-xl bg-white hover:bg-sajith-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-sajith-500" />
                  <span>CALL NOW</span>
                </a>

                <button
                  onClick={handleOpenWhatsApp}
                  className="py-3 px-3 rounded-xl bg-white hover:bg-sajith-50 text-sajith-600 font-bold text-xs flex items-center justify-center gap-1.5 border border-sajith-200 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-sajith-500" />
                  <span>WHATSAPP</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Map & Clinic Overview Card */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Embedded Google Maps Container */}
            <div className="w-full h-72 sm:h-80 lg:h-96 rounded-3xl overflow-hidden border border-slate-200/90 shadow-card relative bg-slate-100">
              <iframe
                title="Sajith Eye Care Opticals Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15655.438258284568!2d77.2600!3d11.1925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9067b5e40e8b1%3A0x6b3f7e61e0bb5660!2sAvinashi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-md border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sajith-500 animate-pulse" />
                <span>Live Location • Avinashi Center</span>
              </div>
            </div>

            {/* In-Clinic Highlights Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-sajith-50/60 border border-blue-100 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sajith-500 shrink-0" />
                <span className="text-slate-700 font-medium">Free Parking Near Old Bus Stand</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-sajith-50/60 border border-blue-100 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sajith-500 shrink-0" />
                <span className="text-slate-700 font-medium">Instant 20-Min Frame Glazing</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-sajith-50/60 border border-blue-100 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sajith-500 shrink-0" />
                <span className="text-slate-700 font-medium">Tamil &amp; English Speaking Staff</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
