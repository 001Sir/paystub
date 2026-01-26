import Link from 'next/link';

export default function NotFound() {
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
          <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-stone-400">404</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-800 mb-2">Page Not Found</h1>
          <p className="text-stone-500 mb-6 max-w-md">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-stone-800 text-white rounded-lg font-semibold hover:bg-stone-900 transition-colors"
            >
              Go to Generator
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-stone-100 text-stone-700 rounded-lg font-semibold hover:bg-stone-200 transition-colors"
            >
              Contact Us
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
