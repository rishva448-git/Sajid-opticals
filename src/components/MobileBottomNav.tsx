'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Grid, ShoppingCart, Phone, PackageCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      id: 'shop',
      label: 'Shop',
      href: '/shop',
      icon: ShoppingBag,
      isActive: pathname === '/shop',
    },
    {
      id: 'categories',
      label: 'Categories',
      href: '/#categories',
      icon: Grid,
      isActive: false,
    },
    {
      id: 'cart',
      label: 'Cart',
      onClick: () => setIsCartOpen(true),
      icon: ShoppingCart,
      badge: totalItems > 0 ? (totalItems > 9 ? '9+' : totalItems) : null,
      isActive: false,
    },
    {
      id: 'track',
      label: 'Track',
      href: '/track-order',
      icon: PackageCheck,
      isActive: pathname === '/track-order',
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '/#contact',
      icon: Phone,
      isActive: false,
    },
  ];

  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 safe-bottom"
    >
      <div className="grid grid-cols-6 items-center max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const content = (
            <div className="flex flex-col items-center justify-center py-1 group relative">
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform group-active:scale-90 ${
                    item.isActive ? 'text-sajith-500 stroke-[2.4]' : 'text-slate-500'
                  }`}
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-sajith-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-semibold mt-1 tracking-tight ${
                  item.isActive ? 'text-sajith-500 font-bold' : 'text-slate-500'
                }`}
              >
                {item.label}
              </span>
              {item.isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-sajith-500 absolute -bottom-0.5" />
              )}
            </div>
          );

          if (item.onClick) {
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className="w-full focus:outline-none"
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href!}
              className="w-full focus:outline-none"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
