'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/data/products';

export default function CategorySection() {
  return (
    <section id="categories" className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sajith-600 uppercase tracking-widest mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sajith-500" />
              Categorized Eyewear
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Explore Our Collection
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-lg">
              Tailored optical solutions from everyday reading spectacles to prescription sunglasses.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm font-bold text-sajith-500 hover:text-sajith-600 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid (Mobile: 2 columns, Tablet: 3 columns, Desktop: 6 columns or 3x2) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${encodeURIComponent(cat.id)}`}
              className="group bg-white rounded-2xl p-3 border border-slate-200/90 shadow-card hover:shadow-elevated hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container with subtle hover zoom */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-50 mb-3">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
                
                {/* Count badge */}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-600 px-1.5 py-0.5 rounded shadow-xs">
                  {cat.count}+
                </div>
              </div>

              {/* Title & Explore CTA */}
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-sajith-500 transition-colors leading-tight">
                    {cat.name}
                  </h3>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sajith-500">
                  <span>Explore</span>
                  <span className="w-6 h-6 rounded-full bg-sajith-50 flex items-center justify-center group-hover:bg-sajith-500 group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
