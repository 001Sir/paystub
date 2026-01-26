'use client';

import Link from 'next/link';
import USFlag from './USFlag';

export default function Header() {
  return (
    <header className="bg-white border-b border-stone-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-stone-800 to-stone-900 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm sm:text-base">P</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-stone-800 font-semibold leading-tight text-sm sm:text-base">Free Pay Stub Generator</h1>
              <span className="text-xs text-stone-400 leading-tight hidden sm:block">Professional paystubs for all 50 states</span>
            </div>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <USFlag size="sm" className="rounded-sm shadow-sm" />
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-stone-500">2026</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
