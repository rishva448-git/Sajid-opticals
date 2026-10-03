'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, ArrowUpDown, Sparkles, RotateCcw } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { Product, ProductCategory } from '@/types';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialQuery = searchParams.get('q') || '';

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedShape, setSelectedShape] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync with searchParams if url changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Shapes list
  const shapes = ['All', 'Rectangle', 'Round', 'Square', 'Aviator', 'Geometric'];
  const genders = ['All', 'Unisex', 'Men', 'Women', 'Kids'];
  const materials = ['All', 'Italian Acetate', 'TR90 Ultra-light', 'Titanium', 'Stainless Steel', 'Flexible Polymer'];
  const priceRanges = [
    { label: 'All Prices', value: 'All' },
    { label: 'Under ₹1,200', value: 'under-1200' },
    { label: '₹1,200 – ₹1,800', value: '1200-1800' },
    { label: 'Above ₹1,800', value: 'above-1800' },
  ];

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedShape('All');
    setSelectedGender('All');
    setSelectedMaterial('All');
    setSelectedPriceRange('All');
    setSortBy('featured');
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'All') count++;
    if (selectedShape !== 'All') count++;
    if (selectedGender !== 'All') count++;
    if (selectedMaterial !== 'All') count++;
    if (selectedPriceRange !== 'All') count++;
    if (searchQuery.trim().length > 0) count++;
    return count;
  }, [selectedCategory, selectedShape, selectedGender, selectedMaterial, selectedPriceRange, searchQuery]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchCategory = p.category.toLowerCase().includes(q);
        const matchShape = p.frameShape.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        if (!matchName && !matchCategory && !matchShape && !matchDesc) return false;
      }

      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

      // Shape
      if (selectedShape !== 'All' && p.frameShape !== selectedShape) return false;

      // Gender
      if (selectedGender !== 'All' && p.gender !== selectedGender && p.gender !== 'Unisex') return false;

      // Material
      if (selectedMaterial !== 'All' && p.material !== selectedMaterial) return false;

      // Price Range
      if (selectedPriceRange === 'under-1200' && p.price >= 1200) return false;
      if (selectedPriceRange === '1200-1800' && (p.price < 1200 || p.price > 1800)) return false;
      if (selectedPriceRange === 'above-1800' && p.price <= 1800) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      // default: featured
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, selectedShape, selectedGender, selectedMaterial, selectedPriceRange, sortBy]);

  return (
    <div className="bg-white min-h-screen py-8 md:py-12 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Top Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sajith-600 uppercase tracking-widest mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sajith-500" />
            Sajith Online Eyewear Store
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Shop Eyewear
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse our full catalog of handcrafted frames, optical lenses, and sunglasses available in Avinashi.
          </p>
        </div>

        {/* Search Bar & Mobile Filter Trigger Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200/80">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search frames by name, shape, or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-sajith-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs shadow-2xs hover:border-sajith-400 active:scale-95"
            >
              <SlidersHorizontal className="w-4 h-4 text-sajith-500" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-sajith-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent focus:outline-none text-xs font-semibold text-slate-800 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
              selectedCategory === 'All'
                ? 'bg-sajith-500 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-200 hover:text-sajith-500'
            }`}
          >
            All Categories ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-sajith-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-200 hover:text-sajith-500'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Main Layout: Left Desktop Sidebar Filters + Right Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-sajith-500" />
                <h3 className="font-bold text-sm text-slate-900">Filter Products</h3>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-sajith-600 hover:underline font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Frame Shape */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">
                Frame Shape
              </label>
              <div className="space-y-1.5">
                {shapes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedShape(s)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                      selectedShape === s
                        ? 'bg-blue-50 text-sajith-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{s}</span>
                    {selectedShape === s && <span className="w-1.5 h-1.5 rounded-full bg-sajith-500" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">
                Gender
              </label>
              <div className="flex flex-wrap gap-1.5">
                {genders.map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                      selectedGender === g
                        ? 'bg-sajith-500 border-sajith-500 text-white font-bold'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Frame Material */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">
                Frame Material
              </label>
              <div className="space-y-1">
                {materials.map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMaterial(m)}
                    className={`w-full text-left px-2 py-1 rounded-md text-xs transition-colors ${
                      selectedMaterial === m
                        ? 'text-sajith-600 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    • {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">
                Price Range
              </label>
              <div className="space-y-1.5">
                {priceRanges.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setSelectedPriceRange(p.value)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                      selectedPriceRange === p.value
                        ? 'bg-blue-50 text-sajith-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Right Product Grid Area */}
          <div className="lg:col-span-9">
            
            {/* Active Result Bar */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'frame' : 'frames'}
              </span>

              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-sajith-600 hover:underline font-semibold"
                >
                  Clear all filters ({activeFiltersCount})
                </button>
              )}
            </div>

            {/* Products Grid (Mobile 2 columns, tablet 3 columns, desktop 3 columns in 9-col container) */}
            {filteredProducts.length === 0 ? (
              <div className="bg-slate-50 rounded-3xl p-10 text-center border border-slate-200">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-sajith-500 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  No matching frames found
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5">
                  Try adjusting your search terms, changing the category, or resetting your active filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl bg-sajith-500 text-white text-xs font-bold shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Mobile Filter Bottom Sheet Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 backdrop-blur-xs animate-fade-in lg:hidden">
          <div
            className="fixed inset-0"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full bg-white rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col z-10 overflow-hidden">
            
            <div className="flex items-center justify-between p-4 border-b border-slate-100 sticky top-0 bg-white">
              <h3 className="font-bold text-sm text-slate-900">
                Filter Eyewear ({filteredProducts.length} results)
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-5 flex-1 text-xs">
              {/* Category */}
              <div>
                <label className="font-bold text-slate-800 block mb-2">Category</label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`px-3 py-1.5 rounded-lg border font-semibold ${
                      selectedCategory === 'All'
                        ? 'bg-sajith-500 border-sajith-500 text-white'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    All
                  </button>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`px-3 py-1.5 rounded-lg border font-semibold ${
                        selectedCategory === c.id
                          ? 'bg-sajith-500 border-sajith-500 text-white'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shape */}
              <div>
                <label className="font-bold text-slate-800 block mb-2">Frame Shape</label>
                <div className="flex flex-wrap gap-1.5">
                  {shapes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedShape(s)}
                      className={`px-3 py-1.5 rounded-lg border font-semibold ${
                        selectedShape === s
                          ? 'bg-sajith-500 border-sajith-500 text-white'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="font-bold text-slate-800 block mb-2">Gender</label>
                <div className="flex flex-wrap gap-1.5">
                  {genders.map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGender(g)}
                      className={`px-3 py-1.5 rounded-lg border font-semibold ${
                        selectedGender === g
                          ? 'bg-sajith-500 border-sajith-500 text-white'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="font-bold text-slate-800 block mb-2">Price</label>
                <div className="flex flex-wrap gap-1.5">
                  {priceRanges.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setSelectedPriceRange(p.value)}
                      className={`px-3 py-1.5 rounded-lg border font-semibold ${
                        selectedPriceRange === p.value
                          ? 'bg-sajith-500 border-sajith-500 text-white'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 flex items-center gap-2 bg-white sticky bottom-0">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 rounded-xl border border-slate-200 font-bold text-slate-700 text-xs"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-xl bg-sajith-500 text-white font-bold text-xs"
              >
                Apply Filters
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Loading eyewear store...</div>}>
      <ShopContent />
    </Suspense>
  );
}
