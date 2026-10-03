'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { STORE_INFO } from '@/data/products';

export default function InstagramSection() {
  const feedImages = [
    {
      src: '/images/instagram/insta-1.jpg',
      tag: '#EyewearTrends',
      alt: 'Customer in stylish acetate glasses',
    },
    {
      src: '/images/instagram/insta-2.jpg',
      tag: '#BlueCutProtection',
      alt: 'Modern computer glasses frame',
    },
    {
      src: '/images/instagram/insta-3.jpg',
      tag: '#SajithEyeCare',
      alt: 'Customer wearing round metal frame',
    },
    {
      src: '/images/instagram/insta-4.jpg',
      tag: '#SunglassesCollection',
      alt: 'UV protected polarized sunglasses',
    },
    {
      src: '/images/instagram/insta-5.jpg',
      tag: '#AvinashiOpticals',
      alt: 'Classic rectangle executive frame',
    },
    {
      src: '/images/instagram/insta-6.jpg',
      tag: '#ClearVision',
      alt: 'Optical prescription fitting session',
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sajith-600 uppercase tracking-widest mb-1.5">
              <InstagramIcon className="w-3.5 h-3.5 text-sajith-500" />
              Community &amp; Styles
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              See What&apos;s New
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-lg">
              Explore trending frame styles and satisfied patrons from our Avinashi showroom.
            </p>
          </div>

          <a
            href={STORE_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-sajith-50 text-sajith-600 font-bold text-xs border border-sajith-200 shadow-xs hover:border-sajith-500 transition-all self-start sm:self-auto"
          >
            <InstagramIcon className="w-4 h-4 text-sajith-500" />
            <span>Follow Us on Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* 6-image Grid (3 cols on mobile, 6 cols on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {feedImages.map((img, idx) => (
            <a
              key={idx}
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-200 border border-slate-200/80 shadow-xs block"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Hover Overlay with Instagram icon and tag */}
              <div className="absolute inset-0 bg-sajith-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center text-white">
                <InstagramIcon className="w-6 h-6 mb-1 text-white" />
                <span className="text-[11px] font-semibold text-blue-100">{img.tag}</span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
