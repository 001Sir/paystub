export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Free Pay Stub Generator",
    "url": "https://freepaystubgen.com",
    "description": "Free pay stub generator for all 50 US states. Create professional pay stubs with accurate federal and state tax calculations.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://freepaystubgen.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function SoftwareApplicationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free Pay Stub Generator",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free online pay stub generator with accurate tax calculations for all 50 US states. Create professional pay stubs instantly.",
    "featureList": [
      "Free to use",
      "All 50 US states supported",
      "2026 federal tax rates",
      "State tax calculations",
      "PDF download",
      "No signup required",
      "Privacy-focused - data stays in browser"
    ],
    "screenshot": "https://freepaystubgen.com/og-image.png",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Free Pay Stub Generator",
    "url": "https://freepaystubgen.com",
    "logo": "https://freepaystubgen.com/icon-512.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://freepaystubgen.com/contact"
    },
    "sameAs": []
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FAQJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is this pay stub generator really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Free Pay Stub Generator is completely free with no hidden fees, subscriptions, or credit card required."
        }
      },
      {
        "@type": "Question",
        "name": "Are the tax calculations accurate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our calculations use 2026 federal and state tax rates and are intended as estimates. We recommend verifying with a qualified tax professional for official payroll processing."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. All pay stub data is processed locally in your browser and is never sent to our servers. Your sensitive information stays completely private on your device."
        }
      },
      {
        "@type": "Question",
        "name": "Which states are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support all 50 US states, including states with no income tax (like Texas, Florida, and Washington) and states with complex tax brackets."
        }
      },
      {
        "@type": "Question",
        "name": "Can I generate multiple pay stubs at once?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! You can generate up to 12 consecutive pay stubs at once, with automatic date calculations based on your pay frequency."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
