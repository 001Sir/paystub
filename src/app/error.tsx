'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-stone-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 w-fit">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-stone-800 to-stone-900 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm sm:text-base">P</span>
            </div>
            <span className="text-stone-800 font-semibold text-sm sm:text-base">Free Pay Stub Generator</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-stone-800 mb-2">Something Went Wrong</h1>
          <p className="text-stone-500 mb-6 max-w-md">
            We encountered an unexpected error. Please try again or contact us if the problem persists.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-stone-800 text-white rounded-lg font-semibold hover:bg-stone-900 transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-stone-100 text-stone-700 rounded-lg font-semibold hover:bg-stone-200 transition-colors"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-stone-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-stone-500">
            <Link href="/" className="hover:text-stone-700">Home</Link>
            <Link href="/about" className="hover:text-stone-700">About</Link>
            <Link href="/contact" className="hover:text-stone-700">Contact</Link>
            <Link href="/privacy" className="hover:text-stone-700">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-stone-700">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
