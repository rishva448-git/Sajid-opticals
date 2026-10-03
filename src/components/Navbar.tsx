'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Phone, MapPin, X } from 'lucide-react';
import Logo from './Logo';
import { useCart } from '@/context/CartContext';
import { STORE_INFO } from '@/data/products';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Track Order', href: '/track-order' },
    { name: 'Collections', href: '/#collections' },
    { name: 'Why Us', href: '/#about' },
    { name: 'Location', href: '/#location' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      {/* Top Clinical Announcement Bar (Avinashi Location & Direct Calling) */}
      <div className="bg-sajith-50 border-b border-blue-100 text-xs text-slate-700 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-sajith-500" />
              Post Office Street, Near Old Bus Stand, Avinashi
            </span>
            <span className="text-blue-200">|</span>
            <span className="text-sajith-600 font-medium">
              Free Computerized Vision Checkup with Frame Purchase
            </span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="flex items-center gap-1.5 text-slate-700 hover:text-sajith-600 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sajith-500" />
              <span>Call: {STORE_INFO.displayPhone}</span>
            </a>
            <span className="text-xs bg-white px-2 py-0.5 rounded border border-blue-200 text-sajith-700">
              Open Daily 9 AM – 9 PM
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors relative py-1 ${
                    isActive
                      ? 'text-sajith-500'
                      : 'text-slate-600 hover:text-sajith-500'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sajith-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search frames"
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:text-sajith-500 hover:bg-sajith-50 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View shopping cart"
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 hover:text-sajith-500 hover:bg-sajith-50 transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-sajith-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Desktop Primary CTA Button */}
            <Link
              href="/shop"
              className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-sajith-500 hover:bg-sajith-600 text-white text-sm font-bold shadow-sm transition-all hover:shadow"
            >
              Shop Collection
            </Link>
          </div>
        </div>

        {/* Global Search Overlay Dropdown */}
        {isSearchOpen && (
          <div className="border-t border-slate-100 bg-white px-4 py-3 shadow-lg animate-fade-in">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-sajith-500 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search by frame name, shape (e.g. Round, Rectangle), or category..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    window.location.href = `/shop?q=${encodeURIComponent(searchVal)}`;
                  }
                }}
                className="w-full text-sm text-slate-800 focus:outline-none placeholder:text-slate-400 py-1"
              />
              {searchVal && (
                <button
                  onClick={() => setSearchVal('')}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
              <Link
                href={`/shop?q=${encodeURIComponent(searchVal)}`}
                onClick={() => setIsSearchOpen(false)}
                className="px-3 py-1.5 rounded-md bg-sajith-500 text-white text-xs font-semibold"
              >
                Search
              </Link>
              <button
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
