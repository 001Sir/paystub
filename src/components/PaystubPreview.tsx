'use client';

import { useState } from 'react';
import {
  MultiPaystubResult,
  PAY_FREQUENCIES,
  formatCurrency,
  formatDate,
  getStateConfig,
} from '@/lib/taxCalculations';

interface PaystubPreviewProps {
  results: MultiPaystubResult[];
  onBack: () => void;
  onDownload: () => void;
}

export default function PaystubPreview({
  results,
  onBack,
  onDownload,
}: PaystubPreviewProps) {
  const [isPrintMode, setIsPrintMode] = useState(false);

  const handlePrint = () => {
    setIsPrintMode(true);
    // Small delay to ensure print mode styles are applied
    setTimeout(() => {
      window.print();
      // Reset after print dialog closes
      setTimeout(() => setIsPrintMode(false), 100);
    }, 100);
  };

  return (
    <div className={`max-w-3xl mx-auto ${isPrintMode ? 'print-mode' : ''}`}>
      {/* Action buttons - hidden when printing */}
      <div className={`flex flex-wrap justify-between gap-2 mb-4 ${isPrintMode ? 'hidden' : ''}`}>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          &larr; Edit Information
        </button>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-stone-600 text-white rounded-md hover:bg-stone-700 font-medium flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Preview
          </button>
          <button
            onClick={onDownload}
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 font-medium flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF {results.length > 1 && `(${results.length})`}
          </button>
        </div>
      </div>

      {/* Summary if multiple paystubs - hidden when printing */}
      {results.length > 1 && (
        <div className={`bg-green-50 border border-green-200 rounded-md p-4 mb-4 ${isPrintMode ? 'hidden' : ''}`}>
          <h3 className="font-medium text-green-800">
            Generated {results.length} Paystubs
          </h3>
          <p className="text-sm text-green-700 mt-1">
            Pay periods from {formatDate(results[0].input.payPeriodStart)} to {formatDate(results[results.length - 1].input.payPeriodEnd)}
          </p>
        </div>
      )}

      {/* Paystub previews */}
      <div className={`space-y-6 ${isPrintMode ? 'space-y-0' : ''}`}>
        {results.map((result, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200 paystub-card ${isPrintMode ? 'shadow-none border-0 rounded-none p-4' : ''}`}
            style={isPrintMode ? { pageBreakAfter: index < results.length - 1 ? 'always' : 'auto' } : {}}
          >
            {/* Page indicator for multiple paystubs */}
            {results.length > 1 && (
              <div className="text-xs text-gray-500 mb-3 text-right">
                Paystub {index + 1} of {results.length}
              </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-gray-800 pb-3 mb-4">
              <div>
                <h1 className="text-xl font-bold text-gray-800">{result.input.companyName}</h1>
                <p className="text-sm text-gray-600">{result.input.companyAddress}</p>
                {result.input.ein && <p className="text-xs text-gray-500">EIN: {result.input.ein}</p>}
              </div>
              <div className="text-right">
                <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Earnings Statement</h2>
                <div className="bg-gray-100 p-2 rounded text-xs">
                  <p className="text-gray-600">
                    <span className="text-gray-500">Period:</span> {formatDate(result.input.payPeriodStart)} - {formatDate(result.input.payPeriodEnd)}
                  </p>
                  <p className="text-gray-600">
                    <span className="text-gray-500">Pay Date:</span> {formatDate(result.input.payDate)}
                  </p>
                  <p className="text-gray-600">
                    <span className="text-gray-500">Frequency:</span> {PAY_FREQUENCIES[result.input.payFrequency].label}
                  </p>
                </div>
              </div>
            </div>

            {/* Employee info */}
            <div className="mb-4 pb-3 border-b border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Employee</p>
                  <p className="font-semibold text-gray-800">{result.input.employeeName}</p>
                  {result.input.employeeAddress && (
                    <p className="text-sm text-gray-600">{result.input.employeeAddress}</p>
                  )}
                </div>
                <div className="text-right text-sm">
                  {result.input.employeeId && (
                    <p className="text-gray-600">ID: {result.input.employeeId}</p>
                  )}
                  {result.input.ssn && (
                    <p className="text-gray-600">SSN: ***-**-{result.input.ssn}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Main content - Earnings and Deductions with YTD */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Earnings column */}
              <div className="border border-gray-800 rounded overflow-hidden">
                <div className="bg-gray-800 text-white px-3 py-2 flex justify-between text-xs font-semibold uppercase">
                  <span>Earnings</span>
                  <div className="flex gap-4">
                    <span className="w-16 text-right">Current</span>
                    <span className="w-16 text-right">YTD</span>
                  </div>
                </div>
                <div className="text-sm">
                  {result.input.payType === 'hourly' ? (
                    <>
                      <div className="flex justify-between px-3 py-2 border-b border-gray-200">
                        <span className="text-gray-700 text-xs">
                          Regular ({result.input.hoursWorked} hrs @ {formatCurrency(result.input.payRate)})
                        </span>
                        <div className="flex gap-4">
                          <span className="w-16 text-right text-gray-700">{formatCurrency(result.output.regularPay)}</span>
                          <span className="w-16 text-right text-gray-400">-</span>
                        </div>
                      </div>
                      {result.output.overtimePay > 0 && (
                        <div className="flex justify-between px-3 py-2 border-b border-gray-200 bg-gray-50">
                          <span className="text-gray-700 text-xs">
                            OT ({result.input.overtimeHours} hrs @ {formatCurrency(result.input.payRate * 1.5)})
                          </span>
                          <div className="flex gap-4">
                            <span className="w-16 text-right text-gray-700">{formatCurrency(result.output.overtimePay)}</span>
                            <span className="w-16 text-right text-gray-400">-</span>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex justify-between px-3 py-2 border-b border-gray-200">
                      <span className="text-gray-700 text-xs">Salary</span>
                      <div className="flex gap-4">
                        <span className="w-16 text-right text-gray-700">{formatCurrency(result.output.regularPay)}</span>
                        <span className="w-16 text-right text-gray-400">-</span>
                      </div>
                    </div>
                  )}
                  {result.output.additionalEarnings > 0 && (
                    <div className="flex justify-between px-3 py-2 border-b border-gray-200 bg-amber-50">
                      <span className="text-amber-700 text-xs">
                        {result.output.additionalEarningsDescription || 'Additional Earnings'}
                      </span>
                      <div className="flex gap-4">
                        <span className="w-16 text-right text-amber-700">{formatCurrency(result.output.additionalEarnings)}</span>
                        <span className="w-16 text-right text-gray-400">-</span>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between px-3 py-2 bg-gray-100 font-semibold border-t border-gray-800">
                    <span className="text-gray-800 text-xs">Gross Pay</span>
                    <div className="flex gap-4">
                      <span className="w-16 text-right text-gray-800">{formatCurrency(result.output.grossPay)}</span>
                      <span className="w-16 text-right text-gray-800">{formatCurrency(result.output.ytdGross)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deductions column */}
              <div className="border border-gray-800 rounded overflow-hidden">
                <div className="bg-gray-800 text-white px-3 py-2 flex justify-between text-xs font-semibold uppercase">
                  <span>Deductions</span>
                  <div className="flex gap-4">
                    <span className="w-16 text-right">Current</span>
                    <span className="w-16 text-right">YTD</span>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="flex justify-between px-3 py-2 border-b border-gray-200">
                    <span className="text-gray-700 text-xs">Federal Income Tax</span>
                    <div className="flex gap-4">
                      <span className="w-16 text-right text-gray-700">{formatCurrency(result.output.federalIncomeTax)}</span>
                      <span className="w-16 text-right text-gray-700">{formatCurrency(result.output.ytdFederalTax)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between px-3 py-2 border-b border-gray-200 bg-gray-50">
                    <span className="text-gray-700 text-xs">Social Security</span>
                    <div className="flex gap-4">
                      <span className="w-16 text-right text-gray-700">{formatCurrency(result.output.socialSecurityTax)}</span>
                      <span className="w-16 text-right text-gray-700">{formatCurrency(result.output.ytdSocialSecurity)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between px-3 py-2 border-b border-gray-200">
                    <span className="text-gray-700 text-xs">Medicare</span>
                    <div className="flex gap-4">
                      <span className="w-16 text-right text-gray-700">{formatCurrency(result.output.medicareTax + result.output.additionalMedicareTax)}</span>
                      <span className="w-16 text-right text-gray-700">{formatCurrency(result.output.ytdMedicare)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between px-3 py-2 border-b border-gray-200 bg-gray-50">
                    <span className="text-gray-700 text-xs">{getStateConfig(result.input.state)?.name || result.input.state} State Tax</span>
                    <div className="flex gap-4">
                      <span className="w-16 text-right text-gray-700">{formatCurrency(result.output.stateTax)}</span>
                      <span className="w-16 text-right text-gray-700">{formatCurrency(result.output.ytdStateTax)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between px-3 py-2 bg-gray-100 font-semibold border-t border-gray-800">
                    <span className="text-gray-800 text-xs">Total Deductions</span>
                    <div className="flex gap-4">
                      <span className="w-16 text-right text-gray-800">{formatCurrency(result.output.totalTaxes)}</span>
                      <span className="w-16 text-right text-gray-800">{formatCurrency(result.output.ytdTotalTaxes)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Pay and YTD Summary */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* YTD Summary */}
              <div className="border border-gray-300 rounded overflow-hidden">
                <div className="bg-gray-200 px-3 py-2">
                  <h3 className="text-xs font-semibold text-gray-700 uppercase">Year-to-Date Summary</h3>
                </div>
                <div className="p-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">YTD Gross:</span>
                    <span className="font-medium text-gray-800">{formatCurrency(result.output.ytdGross)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">YTD Taxes:</span>
                    <span className="font-medium text-gray-800">{formatCurrency(result.output.ytdTotalTaxes)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">YTD Net:</span>
                    <span className="font-medium text-gray-800">{formatCurrency(result.output.ytdNetPay)}</span>
                  </div>
                </div>
              </div>

              {/* Net Pay Box */}
              <div className="border-2 border-gray-800 rounded overflow-hidden bg-gray-50">
                <div className="bg-gray-800 px-3 py-2 text-center">
                  <h3 className="text-sm font-bold text-white uppercase">Net Pay</h3>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-gray-800">{formatCurrency(result.output.netPay)}</p>
                  <p className="text-xs text-gray-500 mt-1">This Period</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-gray-200 text-center text-xs text-gray-500">
              <p>This is an earnings statement. Please retain for your records.</p>
              {isPrintMode && (
                <p className="mt-1 text-gray-400">
                  Generated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
