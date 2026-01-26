'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send to a backend
    // For now, we'll just show a success message
    setSubmitted(true);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-sm";
  const labelClass = "block text-sm font-medium text-stone-700 mb-1.5";

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 w-fit">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-stone-800 to-stone-900 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm sm:text-base">P</span>
            </div>
            <span className="text-stone-800 font-semibold text-sm sm:text-base">Free Pay Stub Generator</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 sm:py-12 w-full">
        <div className="bg-white rounded-2xl shadow-lg shadow-stone-200/50 p-6 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-2">Contact Us</h1>
          <p className="text-stone-500 text-sm mb-8">Have questions or feedback? We&apos;d love to hear from you.</p>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-stone-800 mb-2">Message Sent!</h2>
              <p className="text-stone-600 text-sm mb-6">Thank you for reaching out. We&apos;ll get back to you as soon as possible.</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-stone-800 text-white rounded-lg font-semibold hover:bg-stone-900 transition-colors"
              >
                Return to Generator
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className={labelClass}>Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className={inputClass}
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className={inputClass}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className={labelClass}>Subject</label>
                <select
                  id="subject"
                  required
                  className={inputClass}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Question</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="tax">Tax Calculation Question</option>
                  <option value="business">Business Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className={inputClass + " resize-none"}
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/25 flex items-center justify-center gap-2"
              >
                Send Message
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          )}

          {/* Additional Info */}
          <div className="mt-10 pt-8 border-t border-stone-100">
            <h2 className="text-lg font-semibold text-stone-800 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-stone-50 rounded-lg p-4">
                <h3 className="font-medium text-stone-800 text-sm mb-1">Is this service really free?</h3>
                <p className="text-xs text-stone-600">Yes! Free Pay Stub Generator is completely free with no hidden fees or subscriptions.</p>
              </div>
              <div className="bg-stone-50 rounded-lg p-4">
                <h3 className="font-medium text-stone-800 text-sm mb-1">Are the tax calculations accurate?</h3>
                <p className="text-xs text-stone-600">Our calculations use 2026 tax rates and are intended as estimates. Always verify with a tax professional for official payroll.</p>
              </div>
              <div className="bg-stone-50 rounded-lg p-4">
                <h3 className="font-medium text-stone-800 text-sm mb-1">Is my data secure?</h3>
                <p className="text-xs text-stone-600">All pay stub data is processed locally in your browser and never sent to our servers. Your information stays private.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-stone-100 mt-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-stone-500">
            <Link href="/" className="hover:text-stone-700">Home</Link>
            <Link href="/about" className="hover:text-stone-700">About</Link>
            <Link href="/contact" className="text-stone-700 font-medium">Contact</Link>
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
