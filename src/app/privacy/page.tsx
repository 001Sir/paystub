import Link from 'next/link';
import Header from '@/components/Header';

export const metadata = {
  title: 'Privacy Policy | Free Pay Stub Generator',
  description: 'Privacy Policy for Free Pay Stub Generator. Learn how we handle your data and protect your privacy.',
  openGraph: {
    title: 'Privacy Policy | Free Pay Stub Generator',
    description: 'Privacy Policy for Free Pay Stub Generator. Learn how we handle your data and protect your privacy.',
    url: 'https://freepaystubgen.com/privacy',
  },
  alternates: {
    canonical: 'https://freepaystubgen.com/privacy',
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 sm:py-12 w-full">
        <div className="bg-white rounded-2xl shadow-lg shadow-stone-200/50 p-6 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-2">Privacy Policy</h1>
          <p className="text-stone-500 text-sm mb-8">Last updated: January 2026</p>

          <div className="prose prose-stone max-w-none space-y-6 text-stone-600">
            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-3">1. Introduction</h2>
              <p className="text-sm leading-relaxed">
                Welcome to Free Pay Stub Generator. We respect your privacy and are committed to protecting any information you provide while using our service. This Privacy Policy explains how we collect, use, and safeguard your information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-3">2. Information We Collect</h2>
              <p className="text-sm leading-relaxed mb-3">
                Our pay stub generator operates entirely in your browser. We want to be transparent about data handling:
              </p>
              <ul className="list-disc list-inside text-sm space-y-2 ml-2">
                <li><strong>Data You Enter:</strong> All pay stub information (employer details, employee information, salary data) is processed locally in your browser and is NOT transmitted to or stored on our servers.</li>
                <li><strong>Generated Documents:</strong> PDF pay stubs are generated client-side and downloaded directly to your device. We do not retain copies.</li>
                <li><strong>Analytics Data:</strong> We may collect anonymous usage statistics (page views, browser type, device type) to improve our service.</li>
                <li><strong>Cookies:</strong> We use essential cookies for site functionality and may use analytics cookies with your consent.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-3">3. How We Use Information</h2>
              <p className="text-sm leading-relaxed">
                Any anonymous data collected is used solely to:
              </p>
              <ul className="list-disc list-inside text-sm space-y-2 ml-2 mt-2">
                <li>Improve our service and user experience</li>
                <li>Analyze usage patterns to enhance features</li>
                <li>Ensure technical functionality and security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-3">4. Data Security</h2>
              <p className="text-sm leading-relaxed">
                Since all pay stub data is processed locally in your browser and never transmitted to our servers, your sensitive financial and personal information remains on your device. We recommend:
              </p>
              <ul className="list-disc list-inside text-sm space-y-2 ml-2 mt-2">
                <li>Using the service on a secure, private device</li>
                <li>Storing generated PDFs securely</li>
                <li>Not sharing pay stubs containing sensitive information over unsecured channels</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-3">5. Third-Party Services</h2>
              <p className="text-sm leading-relaxed">
                We may use third-party services such as:
              </p>
              <ul className="list-disc list-inside text-sm space-y-2 ml-2 mt-2">
                <li>Google Analytics for anonymous usage statistics</li>
                <li>Content delivery networks (CDNs) for faster page loading</li>
              </ul>
              <p className="text-sm leading-relaxed mt-2">
                These services have their own privacy policies governing their use of data.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-3">6. Children&apos;s Privacy</h2>
              <p className="text-sm leading-relaxed">
                Our service is not intended for children under 18. We do not knowingly collect information from children.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-3">7. Changes to This Policy</h2>
              <p className="text-sm leading-relaxed">
                We may update this Privacy Policy periodically. Changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-3">8. Contact Us</h2>
              <p className="text-sm leading-relaxed">
                If you have questions about this Privacy Policy, please visit our <Link href="/contact" className="text-amber-600 hover:text-amber-700 underline">Contact page</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-stone-100 mt-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-stone-500">
            <Link href="/" className="hover:text-stone-700">Home</Link>
            <Link href="/about" className="hover:text-stone-700">About</Link>
            <Link href="/contact" className="hover:text-stone-700">Contact</Link>
            <Link href="/privacy" className="text-stone-700 font-medium">Privacy Policy</Link>
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
