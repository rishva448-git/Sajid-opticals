'use client';

import React from 'react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function NotificationToast() {
  const { notification, setIsCartOpen } = useCart();

  if (!notification) return null;

  return (
    <div className="fixed top-20 right-4 left-4 sm:left-auto sm:right-6 z-50 animate-fade-in max-w-sm">
      <div className="bg-white rounded-xl p-3.5 shadow-elevated border border-blue-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-blue-50 text-sajith-500 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-sajith-500" />
          </div>
          <span className="text-xs font-bold text-slate-800">{notification}</span>
        </div>
        <button
          onClick={() => setIsCartOpen(true)}
          className="text-xs font-bold text-sajith-500 hover:text-sajith-600 bg-sajith-50 px-2.5 py-1 rounded-md shrink-0 flex items-center gap-1"
        >
          <ShoppingBag className="w-3 h-3" />
          <span>View Cart</span>
        </button>
      </div>
    </div>
  );
}
