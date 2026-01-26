import Link from 'next/link';
import Header from '@/components/Header';

export const metadata = {
  title: 'About Us | Free Pay Stub Generator',
  description: 'Learn about Free Pay Stub Generator - a free tool for creating professional pay stubs with accurate tax calculations for all 50 US states.',
  openGraph: {
    title: 'About Us | Free Pay Stub Generator',
    description: 'Learn about Free Pay Stub Generator - a free tool for creating professional pay stubs with accurate tax calculations.',
    url: 'https://freepaystubgen.com/about',
  },
  alternates: {
    canonical: 'https://freepaystubgen.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 sm:py-12 w-full">
        <div className="bg-white rounded-2xl shadow-lg shadow-stone-200/50 p-6 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-6">About Free Pay Stub Generator</h1>

          <div className="prose prose-stone max-w-none space-y-6 text-stone-600">
            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-3">Our Mission</h2>
              <p className="text-sm leading-relaxed">
                Free Pay Stub Generator was created to provide small business owners, self-employed individuals, and freelancers with a simple, free tool to create professional pay stubs. We believe everyone should have access to essential business tools without unnecessary costs or complexity.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-3">What We Offer</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-stone-800 text-sm mb-1">100% Free</h3>
                  <p className="text-xs text-stone-500">No hidden fees, no subscriptions, no credit card required.</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-stone-800 text-sm mb-1">All 50 States</h3>
                  <p className="text-xs text-stone-500">Accurate state tax calculations for every US state.</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-stone-800 text-sm mb-1">Private & Secure</h3>
                  <p className="text-xs text-stone-500">All data stays in your browser. Nothing is sent to servers.</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-stone-800 text-sm mb-1">Instant PDF</h3>
                  <p className="text-xs text-stone-500">Generate and download professional PDFs instantly.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-3">Tax Calculations</h2>
              <p className="text-sm leading-relaxed">
                Our pay stub generator includes 2026 tax rates for:
              </p>
              <ul className="list-disc list-inside text-sm space-y-2 ml-2 mt-2">
                <li>Federal income tax withholding</li>
                <li>Social Security tax (6.2%)</li>
                <li>Medicare tax (1.45%)</li>
                <li>State income tax for all 50 states</li>
              </ul>
              <p className="text-sm leading-relaxed mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <strong className="text-amber-800">Note:</strong> Tax calculations are estimates. Always verify with a qualified tax professional for official payroll processing.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-3">Who Uses Our Service</h2>
              <ul className="list-disc list-inside text-sm space-y-2 ml-2">
                <li><strong>Small Business Owners:</strong> Create pay stubs for employees quickly and easily</li>
                <li><strong>Freelancers & Contractors:</strong> Document income for personal records</li>
                <li><strong>Self-Employed Individuals:</strong> Generate proof of income documentation</li>
                <li><strong>Household Employers:</strong> Create pay stubs for domestic workers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-3">Questions?</h2>
              <p className="text-sm leading-relaxed">
                Have questions or feedback? We&apos;d love to hear from you. Visit our <Link href="/contact" className="text-amber-600 hover:text-amber-700 underline">Contact page</Link> to get in touch.
              </p>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-stone-100 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/25"
            >
              Create Your Free Pay Stub
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-stone-100 mt-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-stone-500">
            <Link href="/" className="hover:text-stone-700">Home</Link>
            <Link href="/about" className="text-stone-700 font-medium">About</Link>
            <Link href="/contact" className="hover:text-stone-700">Contact</Link>
            <Link href="/privacy" className="hover:text-stone-700">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-stone-700">Terms of Service</Link>
          </div>
          <p className="text-center text-xs text-stone-400 mt-3">
            &copy; {new Date().getFullYear()} Free Pay Stub Generator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
