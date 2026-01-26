'use client';

import Script from 'next/script';

// Replace with your actual Google Analytics ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  // Don't render if no GA ID is set
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Default to denied for GDPR compliance
          gtag('consent', 'default', {
            'analytics_storage': 'denied'
          });

          // Check if user has accepted cookies
          if (localStorage.getItem('cookie-consent') === 'accepted') {
            gtag('consent', 'update', {
              'analytics_storage': 'granted'
            });
          }

          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

// Event tracking helper - can be imported and used throughout the app
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
