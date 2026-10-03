'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ShoppingBag, MessageCircle, ShieldCheck, Check, Plus, Minus, Star, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { createProductWhatsAppUrl } from '@/utils/whatsapp';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colors[0]?.name || 'Standard');
      setQuantity(1);
      // Lock background scrolling
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity);
    setQuickViewProduct(null);
  };

  const handleWhatsAppEnquire = () => {
    const url = createProductWhatsAppUrl(product, selectedColor, quantity);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in">
      
      {/* Backdrop tap to close */}
      <div
        className="fixed inset-0"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog (Bottom sheet on mobile, rounded card on tablet/desktop) */}
      <div className="relative w-full max-w-3xl bg-white rounded-t-3xl sm:rounded-3xl shadow-modal overflow-hidden max-h-[90vh] sm:max-h-[85vh] flex flex-col z-10">
        
        {/* Modal Header Bar with Close Button */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sajith-500" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {product.category}
            </span>
          </div>
          <button
            onClick={() => setQuickViewProduct(null)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-7 flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left: Product Image Gallery */}
            <div className="md:col-span-6 flex flex-col items-center">
              <div className="relative aspect-square w-full rounded-2xl bg-slate-50 p-4 border border-slate-100 overflow-hidden flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain p-4"
                  priority
                />
              </div>

              {/* Clinic Guarantee Badges */}
              <div className="w-full mt-4 p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-600 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-sajith-500 shrink-0" />
                <span>Genuine Optical Grade • Free in-store prescription fitting in Avinashi</span>
              </div>
            </div>

            {/* Right: Product Details & Options */}
            <div className="md:col-span-6 flex flex-col">
              
              <div className="flex items-center justify-between gap-2 mb-1">
                {product.rating && (
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                    <Star className="w-3.5 h-3.5 text-sajith-500 fill-sajith-500" />
                    {product.rating} ({product.ratingCount} reviews)
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-2.5 mt-2 mb-4">
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-bold text-sajith-600 bg-sajith-50 px-2 py-0.5 rounded">
                  All Taxes Included
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Frame Specifications Matrix */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs mb-5">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Frame Type</span>
                  <span className="font-bold text-slate-800">{product.frameType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Shape</span>
                  <span className="font-bold text-slate-800">{product.frameShape}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Material</span>
                  <span className="font-bold text-slate-800">{product.material}</span>
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-5">
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Select Frame Color: <span className="text-sajith-600 font-semibold">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                        selectedColor === c.name
                          ? 'border-sajith-500 bg-blue-50/50 text-sajith-700 shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-slate-300"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold text-slate-700">Quantity:</span>
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-slate-500 hover:bg-slate-50 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-slate-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-slate-500 hover:bg-slate-50 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Help & Direct Advice */}
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center justify-between mb-4">
                <span>Need help choosing your power or frame?</span>
                <button
                  onClick={handleWhatsAppEnquire}
                  className="font-bold text-sajith-500 hover:underline"
                >
                  Chat with us &rarr;
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Sticky Purchase / Enquiry CTA Bar */}
        <div className="p-4 border-t border-slate-100 bg-white sticky bottom-0 z-20 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 px-4 rounded-xl bg-sajith-500 hover:bg-sajith-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ADD TO CART (₹{(product.price * quantity).toLocaleString('en-IN')})</span>
          </button>

          <button
            onClick={handleWhatsAppEnquire}
            className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-sajith-50 text-sajith-600 font-bold text-sm border-2 border-sajith-500/40 hover:border-sajith-500 flex items-center justify-center gap-2 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-sajith-500" />
            <span>ENQUIRE ON WHATSAPP</span>
          </button>
        </div>

      </div>
    </div>
  );
}
