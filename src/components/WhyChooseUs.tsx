'use client';

import React from 'react';
import {
  ShieldCheck,
  Glasses,
  UserCheck,
  Eye,
  Award,
  Store,
} from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Quality Eyewear',
      description:
        'Certified impact-resistant lenses and premium hypoallergenic frames manufactured for lasting clarity and durability.',
    },
    {
      icon: Glasses,
      title: 'Wide Frame Collection',
      description:
        'Extensive selection of over 500+ trending frames across classical, rimless, metal, and lightweight TR90 acetate shapes.',
    },
    {
      icon: UserCheck,
      title: 'Personalized Assistance',
      description:
        'Experienced eye-care specialists to advise on pupil distance, frame-face matching, and progressive lens measurements.',
    },
    {
      icon: Eye,
      title: 'Contact Lens Support',
      description:
        'Professional contact lens consultation, hygienic trial fitting, and guidance for astigmatism or daily disposable use.',
    },
    {
      icon: Award,
      title: 'Trusted Service',
      description:
        'Proudly serving Avinashi families with honest recommendations, accurate computer testing, and transparent pricing.',
    },
    {
      icon: Store,
      title: 'In-Store Experience',
      description:
        'Comfortable clinic environment on Post Office Street with instant frame adjustments, ultrasonic cleaning, and repair.',
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sajith-600 uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sajith-500" />
            Our Clinical Standards
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why Choose Sajith Eye Care?
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Committed to accurate vision correction and contemporary eyewear fashion in Avinashi.
          </p>
        </div>

        {/* 6 Feature Cards with White Cards and Blue Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-card hover:shadow-elevated hover:border-blue-200 transition-all duration-300 flex flex-col items-start group"
              >
                {/* Blue Icon container */}
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-sajith-500 flex items-center justify-center mb-4 group-hover:bg-sajith-500 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 group-hover:text-sajith-500 transition-colors">
                  {feat.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
