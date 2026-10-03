'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { PRODUCTS } from '@/data/products';

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  featuredOnly?: boolean;
}

export default function ProductGrid({
  title = 'Featured Eyewear',
  subtitle = 'Find a frame that fits your style.',
  limit,
  featuredOnly = true,
}: ProductGridProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filterTabs = ['All', 'Eyeglasses', 'Sunglasses', 'Computer Glasses', 'Premium Frames'];

  let displayedProducts = PRODUCTS.filter((p) => {
    if (featuredOnly && !p.isFeatured) return false;
    if (selectedFilter !== 'All' && p.category !== selectedFilter) return false;
    return true;
  });

  if (limit) {
    displayedProducts = displayedProducts.slice(0, limit);
  }

  return (
    <section id="collections" className="py-14 md:py-20 bg-sajith-50/30 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sajith-600 uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sajith-500" />
              Direct From Avinashi Clinic
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {title}
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              {subtitle}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`text-xs font-bold px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                  selectedFilter === tab
                    ? 'bg-sajith-500 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200/90 hover:border-blue-200 hover:text-sajith-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 2-column on mobile, 3-column on tablet, 4-column on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA to Shop Page */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-sajith-50 text-sajith-600 font-bold text-sm border-2 border-sajith-500/30 hover:border-sajith-500 shadow-sm transition-all"
          >
            <span>Explore Entire 50+ Frame Catalog</span>
            <ArrowRight className="w-4 h-4 text-sajith-500" />
          </Link>
        </div>

      </div>
    </section>
  );
}
