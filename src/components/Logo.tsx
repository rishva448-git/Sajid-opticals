'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'badge';
}

export default function Logo({ className = '', variant = 'full' }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group no-select ${className}`}>
      <Image
        src="/images/logo/sajith-logo.svg?v=glasses"
        alt="Eyeglasses"
        width={525}
        height={204}
        priority
        className="h-8 w-[82px] object-contain md:h-10 md:w-[103px]"
      />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="whitespace-nowrap text-[13px] font-black text-sajith-600 md:text-base">SAJITH EYE CARE</span>
        <span className="whitespace-nowrap text-[9px] font-semibold text-slate-500 md:text-[10px]">Opticals &amp; Contact Lens Clinic</span>
      </span>
    </Link>
  );
}
