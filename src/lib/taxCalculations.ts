// PayStub Generator - Tax Calculations (2026 Rates)
// Supports all 50 US states + DC

import { STATE_TAX_CONFIGS, calculateStateTax, getStatesList, getStateConfig } from './states';

// Re-export state helpers
export { STATE_TAX_CONFIGS, getStatesList, getStateConfig };

// Pay frequency multipliers for annualization
export const PAY_FREQUENCIES = {
  weekly: { label: 'Weekly', periodsPerYear: 52 },
  biweekly: { label: 'Bi-Weekly', periodsPerYear: 26 },
  semimonthly: { label: 'Semi-Monthly', periodsPerYear: 24 },
  monthly: { label: 'Monthly', periodsPerYear: 12 },
} as const;

export type PayFrequency = keyof typeof PAY_FREQUENCIES;

// Filing status options
export const FILING_STATUSES = {
  single: 'Single',
  married: 'Married Filing Jointly',
  marriedSeparate: 'Married Filing Separately',
  headOfHousehold: 'Head of Household',
} as const;

export type FilingStatus = keyof typeof FILING_STATUSES;

// 2025 Federal Tax Constants
const SOCIAL_SECURITY_RATE = 0.062; // 6.2%
const SOCIAL_SECURITY_WAGE_BASE = 176100; // 2025 limit
const MEDICARE_RATE = 0.0145; // 1.45%
const ADDITIONAL_MEDICARE_RATE = 0.009; // 0.9% over $200,000
const ADDITIONAL_MEDICARE_THRESHOLD = 200000;

// 2025 Federal Income Tax Brackets (Single)
const FEDERAL_TAX_BRACKETS_SINGLE = [
  { min: 0, max: 11925, rate: 0.10 },
  { min: 11925, max: 48475, rate: 0.12 },
  { min: 48475, max: 103350, rate: 0.22 },
  { min: 103350, max: 197300, rate: 0.24 },
  { min: 197300, max: 250525, rate: 0.32 },
  { min: 250525, max: 626350, rate: 0.35 },
  { min: 626350, max: Infinity, rate: 0.37 },
];

// 2025 Federal Income Tax Brackets (Married Filing Jointly)
const FEDERAL_TAX_BRACKETS_MARRIED = [
  { min: 0, max: 23850, rate: 0.10 },
  { min: 23850, max: 96950, rate: 0.12 },
  { min: 96950, max: 206700, rate: 0.22 },
  { min: 206700, max: 394600, rate: 0.24 },
  { min: 394600, max: 501050, rate: 0.32 },
  { min: 501050, max: 751600, rate: 0.35 },
  { min: 751600, max: Infinity, rate: 0.37 },
];

// 2025 Federal Standard Deductions
const FEDERAL_STANDARD_DEDUCTIONS: Record<FilingStatus, number> = {
  single: 15000,
  married: 30000,
  marriedSeparate: 15000,
  headOfHousehold: 22500,
};

// State tax calculations are now in stateTaxes.ts

// Calculate gross pay
export function calculateGrossPay(
  payType: 'hourly' | 'salary',
  payRate: number,
  hoursWorked: number,
  overtimeHours: number
): { regularPay: number; overtimePay: number; grossPay: number } {
  if (payType === 'salary') {
    return {
      regularPay: payRate,
      overtimePay: 0,
      grossPay: payRate,
    };
  }

  const regularPay = hoursWorked * payRate;
  const overtimePay = overtimeHours * payRate * 1.5; // Time and a half

  return {
    regularPay,
    overtimePay,
    grossPay: regularPay + overtimePay,
  };
}

// Calculate Social Security tax
export function calculateSocialSecurityTax(
  grossPay: number,
  ytdGross: number = 0
): number {
  const remainingWageBase = Math.max(0, SOCIAL_SECURITY_WAGE_BASE - ytdGross);
  const taxableWages = Math.min(grossPay, remainingWageBase);
  return taxableWages * SOCIAL_SECURITY_RATE;
}

// Calculate Medicare tax (including additional Medicare)
export function calculateMedicareTax(
  grossPay: number,
  ytdGross: number = 0
): { medicareTax: number; additionalMedicareTax: number } {
  const medicareTax = grossPay * MEDICARE_RATE;

  // Additional Medicare tax on wages over $200,000
  let additionalMedicareTax = 0;
  const totalYtdGross = ytdGross + grossPay;

  if (totalYtdGross > ADDITIONAL_MEDICARE_THRESHOLD) {
    const taxableForAdditional = Math.min(
      grossPay,
      totalYtdGross - ADDITIONAL_MEDICARE_THRESHOLD
    );
    if (taxableForAdditional > 0) {
      additionalMedicareTax = Math.max(0, taxableForAdditional) * ADDITIONAL_MEDICARE_RATE;
    }
  }

  return { medicareTax, additionalMedicareTax };
}

// Calculate tax using brackets
function calculateBracketTax(
  taxableIncome: number,
  brackets: Array<{ min: number; max: number; rate: number }>
): number {
  let tax = 0;

  for (const bracket of brackets) {
    if (taxableIncome <= bracket.min) break;

    const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
    tax += taxableInBracket * bracket.rate;
  }

  return tax;
}

// Calculate Federal Income Tax withholding
export function calculateFederalIncomeTax(
  grossPay: number,
  payFrequency: PayFrequency,
  filingStatus: FilingStatus,
  additionalWithholding: number = 0
): number {
  const periodsPerYear = PAY_FREQUENCIES[payFrequency].periodsPerYear;
  const annualizedGross = grossPay * periodsPerYear;

  // Apply standard deduction
  const standardDeduction = FEDERAL_STANDARD_DEDUCTIONS[filingStatus];
  const taxableIncome = Math.max(0, annualizedGross - standardDeduction);

  // Select appropriate bracket table
  const brackets = (filingStatus === 'married')
    ? FEDERAL_TAX_BRACKETS_MARRIED
    : FEDERAL_TAX_BRACKETS_SINGLE;

  const annualTax = calculateBracketTax(taxableIncome, brackets);
  const perPeriodTax = annualTax / periodsPerYear;

  return perPeriodTax + additionalWithholding;
}

// Calculate State Income Tax withholding (any state)
export function calculateStateIncomeTax(
  stateCode: string,
  grossPay: number,
  payFrequency: PayFrequency,
  filingStatus: FilingStatus,
  stateAllowances: number = 0
): number {
  const periodsPerYear = PAY_FREQUENCIES[payFrequency].periodsPerYear;
  return calculateStateTax(stateCode, grossPay, periodsPerYear, filingStatus, stateAllowances);
}

// Main calculation function
export interface PaystubInput {
  // Employee info
  employeeName: string;
  employeeAddress?: string;
  employeeId?: string;
  ssn?: string; // Last 4 digits only

  // Employer info
  companyName: string;
  companyAddress: string;
  companyPhone?: string;
  ein?: string;

  // Pay info
  payType: 'hourly' | 'salary';
  payRate: number;
  hoursWorked: number;
  overtimeHours: number;
  additionalEarnings: number; // Bonuses, commissions, holiday pay, etc.
  additionalEarningsDescription?: string; // Optional description (e.g., "Bonus", "Commission")
  payFrequency: PayFrequency;

  // Pay period
  payPeriodStart: string;
  payPeriodEnd: string;
  payDate: string;

  // Tax settings
  federalFilingStatus: FilingStatus;
  federalAdditionalWithholding: number;
  // State tax settings
  state: string; // State code (e.g., 'MN', 'CA', 'TX')
  stateFilingStatus: FilingStatus;
  stateAllowances: number;

  // YTD values (for Social Security cap, Additional Medicare, and display)
  ytdGross: number;
  ytdFederalTax?: number;
  ytdSocialSecurity?: number;
  ytdMedicare?: number;
  ytdStateTax?: number;

  // Employee start date for auto YTD calculation
  employeeStartDate?: string;
}

export interface PaystubOutput {
  // Earnings
  regularPay: number;
  overtimePay: number;
  additionalEarnings: number;
  additionalEarningsDescription?: string;
  grossPay: number;

  // Taxes
  federalIncomeTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  additionalMedicareTax: number;
  stateTax: number;
  totalTaxes: number;

  // Net pay
  netPay: number;

  // YTD values
  ytdGross: number;
  ytdFederalTax: number;
  ytdSocialSecurity: number;
  ytdMedicare: number;
  ytdStateTax: number;
  ytdTotalTaxes: number;
  ytdNetPay: number;
}

export function calculatePaystub(input: PaystubInput): PaystubOutput {
  // Calculate gross pay
  const { regularPay, overtimePay, grossPay: basePay } = calculateGrossPay(
    input.payType,
    input.payRate,
    input.hoursWorked,
    input.overtimeHours
  );

  // Add additional earnings to gross pay
  const additionalEarnings = input.additionalEarnings || 0;
  const grossPay = basePay + additionalEarnings;

  // Calculate taxes
  const socialSecurityTax = calculateSocialSecurityTax(grossPay, input.ytdGross);
  const { medicareTax, additionalMedicareTax } = calculateMedicareTax(grossPay, input.ytdGross);
  const federalIncomeTax = calculateFederalIncomeTax(
    grossPay,
    input.payFrequency,
    input.federalFilingStatus,
    input.federalAdditionalWithholding
  );
  const stateTax = calculateStateIncomeTax(
    input.state,
    grossPay,
    input.payFrequency,
    input.stateFilingStatus,
    input.stateAllowances
  );

  const totalTaxes = federalIncomeTax + socialSecurityTax + medicareTax + additionalMedicareTax + stateTax;
  const netPay = grossPay - totalTaxes;

  // Calculate YTD totals (previous YTD + current period)
  const ytdGross = (input.ytdGross || 0) + grossPay;
  const ytdFederalTax = (input.ytdFederalTax || 0) + federalIncomeTax;
  const ytdSocialSecurity = (input.ytdSocialSecurity || 0) + socialSecurityTax;
  const ytdMedicare = (input.ytdMedicare || 0) + medicareTax + additionalMedicareTax;
  const ytdStateTax = (input.ytdStateTax || 0) + stateTax;
  const ytdTotalTaxes = ytdFederalTax + ytdSocialSecurity + ytdMedicare + ytdStateTax;
  const ytdNetPay = ytdGross - ytdTotalTaxes;

  return {
    regularPay,
    overtimePay,
    additionalEarnings,
    additionalEarningsDescription: input.additionalEarningsDescription,
    grossPay,
    federalIncomeTax,
    socialSecurityTax,
    medicareTax,
    additionalMedicareTax,
    stateTax,
    totalTaxes,
    netPay,
    ytdGross,
    ytdFederalTax,
    ytdSocialSecurity,
    ytdMedicare,
    ytdStateTax,
    ytdTotalTaxes,
    ytdNetPay,
  };
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Format date
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Format date compact (for PDF where space is limited)
export function formatDateCompact(dateString: string): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
  });
}

// Calculate days between pay periods based on frequency
function getPayPeriodDays(frequency: PayFrequency): number {
  switch (frequency) {
    case 'weekly': return 7;
    case 'biweekly': return 14;
    case 'semimonthly': return 15; // Approximate
    case 'monthly': return 30; // Approximate
    default: return 14;
  }
}

// Days of the week for payday selection
export const PAYDAYS = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
} as const;

export type PaydayNumber = keyof typeof PAYDAYS;

// Find the most recent occurrence of a specific day of the week
function getMostRecentPayday(paydayNumber: PaydayNumber): Date {
  const today = new Date();
  const currentDay = today.getDay();
  let daysAgo = currentDay - paydayNumber;

  if (daysAgo < 0) {
    daysAgo += 7;
  }

  const mostRecent = new Date(today);
  mostRecent.setDate(today.getDate() - daysAgo);

  return mostRecent;
}

// Auto-calculate pay period dates based on payday and frequency
export function calculatePayDates(
  frequency: PayFrequency,
  paydayNumber: PaydayNumber = 5 // Default to Friday
): {
  payPeriodStart: string;
  payPeriodEnd: string;
  payDate: string;
} {
  const periodDays = getPayPeriodDays(frequency);

  // Find the most recent payday
  const payDate = getMostRecentPayday(paydayNumber);

  // Pay period typically ends a few days before payday (processing time)
  // For simplicity, we'll say period ends 5 days before payday
  const payPeriodEnd = new Date(payDate);
  payPeriodEnd.setDate(payDate.getDate() - 5);

  // Pay period start is periodDays before end
  const payPeriodStart = new Date(payPeriodEnd);
  payPeriodStart.setDate(payPeriodEnd.getDate() - periodDays + 1);

  return {
    payPeriodStart: payPeriodStart.toISOString().split('T')[0],
    payPeriodEnd: payPeriodEnd.toISOString().split('T')[0],
    payDate: payDate.toISOString().split('T')[0],
  };
}

// Subtract days from a date string
function subtractDays(dateString: string, days: number): string {
  const date = new Date(dateString);
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

// Calculate number of pay periods between two dates
function getPayPeriodsBetween(startDate: string, endDate: string, frequency: PayFrequency): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const daysDiff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const periodDays = getPayPeriodDays(frequency);
  return Math.max(0, Math.floor(daysDiff / periodDays));
}

// Generate multiple paystubs going backwards in time
export interface MultiPaystubResult {
  input: PaystubInput;
  output: PaystubOutput;
  payPeriodNumber: number;
}

export function generateMultiplePaystubs(
  baseInput: PaystubInput,
  numberOfPaystubs: number
): MultiPaystubResult[] {
  const results: MultiPaystubResult[] = [];
  const periodDays = getPayPeriodDays(baseInput.payFrequency);

  // First, generate all the dates from oldest to newest
  const periods: { start: string; end: string; payDate: string }[] = [];
  for (let i = numberOfPaystubs - 1; i >= 0; i--) {
    const daysBack = i * periodDays;
    periods.push({
      start: subtractDays(baseInput.payPeriodStart, daysBack),
      end: subtractDays(baseInput.payPeriodEnd, daysBack),
      payDate: subtractDays(baseInput.payDate, daysBack),
    });
  }

  // Calculate a single period to get amounts for YTD estimation
  const sampleOutput = calculatePaystub({
    ...baseInput,
    ytdGross: 0,
    ytdFederalTax: 0,
    ytdSocialSecurity: 0,
    ytdMedicare: 0,
    ytdStateTax: 0,
  });

  // Calculate initial YTD based on employee start date or user-provided values
  let runningYtdGross = 0;
  let runningYtdFederalTax = 0;
  let runningYtdSocialSecurity = 0;
  let runningYtdMedicare = 0;
  let runningYtdStateTax = 0;

  const oldestPeriodStart = periods[0].start;

  if (baseInput.employeeStartDate) {
    // If start date is before the oldest generated period, calculate prior YTD
    const startDate = new Date(baseInput.employeeStartDate);
    const oldestStart = new Date(oldestPeriodStart);
    const currentYear = oldestStart.getFullYear();

    // Only count periods from start of current year (YTD resets each year)
    const yearStart = `${currentYear}-01-01`;
    const effectiveStart = startDate < new Date(yearStart) ? yearStart : baseInput.employeeStartDate;

    if (new Date(effectiveStart) < oldestStart) {
      // Calculate how many periods occurred between effective start and oldest generated period
      const priorPeriods = getPayPeriodsBetween(effectiveStart, oldestPeriodStart, baseInput.payFrequency);

      // Estimate prior YTD based on number of periods
      runningYtdGross = priorPeriods * sampleOutput.grossPay;
      runningYtdFederalTax = priorPeriods * sampleOutput.federalIncomeTax;
      runningYtdSocialSecurity = priorPeriods * sampleOutput.socialSecurityTax;
      runningYtdMedicare = priorPeriods * (sampleOutput.medicareTax + sampleOutput.additionalMedicareTax);
      runningYtdStateTax = priorPeriods * sampleOutput.stateTax;
    }
  } else {
    // Use user-provided base YTD (for prior periods not in this batch)
    runningYtdGross = baseInput.ytdGross || 0;
    runningYtdFederalTax = baseInput.ytdFederalTax || 0;
    runningYtdSocialSecurity = baseInput.ytdSocialSecurity || 0;
    runningYtdMedicare = baseInput.ytdMedicare || 0;
    runningYtdStateTax = baseInput.ytdStateTax || 0;
  }

  // Generate paystubs from oldest to newest, accumulating YTD
  for (let i = 0; i < numberOfPaystubs; i++) {
    // Check if employee started in this period (reset YTD if so)
    if (baseInput.employeeStartDate) {
      const periodStart = new Date(periods[i].start);
      const periodEnd = new Date(periods[i].end);
      const empStart = new Date(baseInput.employeeStartDate);

      // If employee started during this period, reset YTD to 0
      if (empStart >= periodStart && empStart <= periodEnd) {
        runningYtdGross = 0;
        runningYtdFederalTax = 0;
        runningYtdSocialSecurity = 0;
        runningYtdMedicare = 0;
        runningYtdStateTax = 0;
      }
      // If employee started after this period, skip it (shouldn't generate paystub)
      else if (empStart > periodEnd) {
        continue;
      }
    }

    const periodInput: PaystubInput = {
      ...baseInput,
      payPeriodStart: periods[i].start,
      payPeriodEnd: periods[i].end,
      payDate: periods[i].payDate,
      // Pass in the YTD BEFORE this period (so calculatePaystub adds current period to it)
      ytdGross: runningYtdGross,
      ytdFederalTax: runningYtdFederalTax,
      ytdSocialSecurity: runningYtdSocialSecurity,
      ytdMedicare: runningYtdMedicare,
      ytdStateTax: runningYtdStateTax,
    };

    const periodOutput = calculatePaystub(periodInput);

    results.push({
      input: periodInput,
      output: periodOutput,
      payPeriodNumber: results.length + 1, // Use results.length since we might skip periods
    });

    // Update running YTD with this period's values for the next iteration
    runningYtdGross = periodOutput.ytdGross;
    runningYtdFederalTax = periodOutput.ytdFederalTax;
    runningYtdSocialSecurity = periodOutput.ytdSocialSecurity;
    runningYtdMedicare = periodOutput.ytdMedicare;
    runningYtdStateTax = periodOutput.ytdStateTax;
  }

  return results;
}
