'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Eye, MessageCircle, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { createProductWhatsAppUrl } from '@/utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onOpenQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onOpenQuickView }: ProductCardProps) {
  const { addToCart, setQuickViewProduct } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');

  const handleCardClick = () => {
    if (onOpenQuickView) {
      onOpenQuickView(product);
    } else {
      setQuickViewProduct(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, 1);
  };

  const handleWhatsAppEnquire = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = createProductWhatsAppUrl(product, selectedColor, 1);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-elevated hover:border-blue-200 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer relative"
    >
      {/* Top Badges (New, Best Seller, Clinic Signature) */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
        {product.isBestSeller && (
          <span className="bg-sajith-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            Best Seller
          </span>
        )}
        {product.isNewArrival && (
          <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            New
          </span>
        )}
      </div>

      {/* Quick View Floating Button on Desktop */}
      <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center gap-1.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          title="Quick View"
          className="w-8 h-8 rounded-full bg-white/95 text-slate-700 hover:text-sajith-500 hover:bg-white shadow-md flex items-center justify-center transition-all"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Image Showcase Container */}
      <div className="relative aspect-square w-full bg-slate-50/70 p-3 sm:p-4 overflow-hidden product-image-container flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Subtle Category Pill on mobile image */}
        <span className="absolute bottom-2 left-2 text-[10px] font-semibold text-slate-500 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md border border-slate-100">
          {product.category}
        </span>
      </div>

      {/* Card Content & Details */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow justify-between">
        
        {/* Colors selector dots */}
        <div className="flex items-center gap-1.5 mb-2" onClick={(e) => e.stopPropagation()}>
          {product.colors.map((c) => (
            <button
              key={c.name}
              title={c.name}
              onClick={() => setSelectedColor(c.name)}
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border transition-all ${
                selectedColor === c.name
                  ? 'ring-2 ring-sajith-500 ring-offset-1 scale-110 border-white'
                  : 'border-slate-300 opacity-80 hover:opacity-100'
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
          <span className="text-[10px] text-slate-400 ml-1 font-medium hidden sm:inline">
            {product.colors.length} {product.colors.length > 1 ? 'colors' : 'color'}
          </span>
        </div>

        {/* Product Title & Spec */}
        <div className="mb-2">
          <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-sajith-500 transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
            {product.frameShape} • {product.material}
          </p>
        </div>

        {/* Price & Rating */}
        <div className="flex items-baseline justify-between mt-1 mb-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {product.rating && (
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-blue-50/80 px-1.5 py-0.5 rounded border border-blue-100/50">
              <Star className="w-3 h-3 text-sajith-500 fill-sajith-500" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>

        {/* Action Buttons: Add to Cart + WhatsApp Enquire */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-sajith-500 hover:bg-sajith-600 text-white font-bold text-xs shadow-xs transition-colors active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>

          <button
            onClick={handleWhatsAppEnquire}
            title="Enquire on WhatsApp"
            className="w-full hidden sm:flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg bg-white hover:bg-sajith-50 text-sajith-600 font-bold text-xs border border-sajith-200 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-sajith-500" />
            <span>Enquire</span>
          </button>
        </div>

      </div>
    </div>
  );
}
