'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'cookie-consent';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setShowBanner(false);
    // Here you would initialize analytics if needed
    // e.g., window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-300">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl border border-stone-200 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-1">
            <p className="text-sm text-stone-600">
              We use cookies to improve your experience and analyze site traffic.
              By clicking &quot;Accept&quot;, you consent to our use of cookies.
              See our{' '}
              <Link href="/privacy" className="text-amber-600 hover:text-amber-700 underline">
                Privacy Policy
              </Link>{' '}
              for more information.
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={handleDecline}
              className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-white bg-stone-800 hover:bg-stone-900 rounded-lg transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
