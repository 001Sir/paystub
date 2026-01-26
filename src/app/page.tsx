'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { pdf } from '@react-pdf/renderer';
import PaystubForm, { FormData } from '@/components/PaystubForm';
import PaystubPreview from '@/components/PaystubPreview';
import { PaystubPDF } from '@/components/PaystubPDF';
import Header from '@/components/Header';
import { MultiPaystubResult, calculatePayDates } from '@/lib/taxCalculations';

const STORAGE_KEY = 'paystub-generator-form-data';

// Get initial dates based on default frequency and payday (Friday)
const getInitialDates = () => calculatePayDates('biweekly', 5);

// Initial form data - preserved across navigation
const createInitialFormData = (): FormData => {
  const initialDates = getInitialDates();
  return {
    // Employer
    companyName: '',
    companyAddress: '',
    companyPhone: '',
    ein: '',
    // Employee
    employeeName: '',
    employeeAddress: '',
    employeeId: '',
    ssn: '',
    employeeStartDate: '',
    // Pay
    payType: 'hourly',
    payRate: 0,
    hoursWorked: 80,
    overtimeHours: 0,
    additionalEarnings: 0,
    additionalEarningsDescription: '',
    payFrequency: 'biweekly',
    payPeriodStart: initialDates.payPeriodStart,
    payPeriodEnd: initialDates.payPeriodEnd,
    payDate: initialDates.payDate,
    // Taxes
    federalFilingStatus: 'single',
    federalAdditionalWithholding: 0,
    state: 'MN',
    stateFilingStatus: 'single',
    stateAllowances: 0,
    ytdGross: 0,
    // Extra
    numberOfPaystubs: 1,
    payday: 5,
  };
};

export default function Home() {
  const [view, setView] = useState<'form' | 'preview'>('form');
  const [paystubResults, setPaystubResults] = useState<MultiPaystubResult[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasSavedData, setHasSavedData] = useState(false);

  // Initialize form data - check localStorage on mount
  const [formData, setFormData] = useState<FormData>(() => createInitialFormData());

  // Load saved data from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Update dates to be current if loaded data is old
        const freshDates = getInitialDates();
        setFormData({
          ...parsed,
          payPeriodStart: freshDates.payPeriodStart,
          payPeriodEnd: freshDates.payPeriodEnd,
          payDate: freshDates.payDate,
        });
        setHasSavedData(true);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Auto-save form data to localStorage when it changes
  const saveFormData = useCallback((data: FormData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setHasSavedData(true);
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Clear saved data
  const clearSavedData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setHasSavedData(false);
      setFormData(createInitialFormData());
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleCalculate = (results: MultiPaystubResult[], data: FormData) => {
    setPaystubResults(results);
    setFormData(data);
    saveFormData(data); // Auto-save to localStorage
    setView('preview');
  };

  const handleBack = () => {
    setView('form');
  };

  const handleDownload = async () => {
    if (paystubResults.length === 0) return;

    setIsGenerating(true);
    try {
      const blob = await pdf(
        <PaystubPDF results={paystubResults} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // Generate filename with employee name and date range
      const employeeName = paystubResults[0].input.employeeName.replace(/\s+/g, '_');
      const startDate = paystubResults[0].input.payPeriodStart;
      const endDate = paystubResults[paystubResults.length - 1].input.payPeriodEnd;
      link.download = paystubResults.length > 1
        ? `paystubs_${employeeName}_${startDate}_to_${endDate}.pdf`
        : `paystub_${employeeName}_${endDate}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />

      {/* Main content */}
      <main id="main-content" className="flex-1 max-w-2xl mx-auto px-4 py-4 sm:py-8 w-full">
        {view === 'form' && (
          <PaystubForm
            key={JSON.stringify(formData)}
            onCalculate={handleCalculate}
            initialData={formData}
            onAutoSave={saveFormData}
            hasSavedData={hasSavedData}
            onClearData={clearSavedData}
          />
        )}

        {view === 'preview' && paystubResults.length > 0 && (
          <>
            {isGenerating && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-stone-800"></div>
                    <span className="text-stone-700">Generating PDF...</span>
                  </div>
                </div>
              </div>
            )}
            <PaystubPreview
              results={paystubResults}
              onBack={handleBack}
              onDownload={handleDownload}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-stone-100 mt-auto">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-stone-500 mb-3">
            <Link href="/about" className="hover:text-stone-700">About</Link>
            <Link href="/contact" className="hover:text-stone-700">Contact</Link>
            <Link href="/privacy" className="hover:text-stone-700">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-stone-700">Terms of Service</Link>
          </div>
          <p className="text-center text-xs text-stone-400 mb-2">
            Tax calculations are estimates only. Always consult a qualified tax professional.
          </p>
          <p className="text-center text-xs text-stone-400">
            &copy; {new Date().getFullYear()} Free Pay Stub Generator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
