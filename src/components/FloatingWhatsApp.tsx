'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { createGeneralConsultationWhatsAppUrl } from '@/utils/whatsapp';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleOpenWhatsApp = () => {
    const url = createGeneralConsultationWhatsAppUrl('Frame inquiry & appointment');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 flex items-center gap-2">
      {/* Friendly Tooltip Bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs font-semibold px-3 py-2 rounded-xl shadow-lg border border-slate-200 animate-fade-in">
          <span>Need help choosing a frame?</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Button in Sajith Blue + White */}
      <button
        onClick={handleOpenWhatsApp}
        aria-label="Chat on WhatsApp with Sajith Eye Care"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-sajith-500 hover:bg-sajith-600 text-white shadow-elevated flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ring-4 ring-white border border-sajith-400/40 relative group"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white/20" />
        
        {/* Pulse ring */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-sajith-500 animate-ping" />
        </span>
      </button>
    </div>
  );
}
