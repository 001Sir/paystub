'use client';

import { useState, useEffect, useRef } from 'react';
import {
  PAY_FREQUENCIES,
  FILING_STATUSES,
  PAYDAYS,
  PayFrequency,
  FilingStatus,
  PaydayNumber,
  PaystubInput,
  MultiPaystubResult,
  generateMultiplePaystubs,
  calculatePayDates,
  formatDate,
  getStateConfig,
} from '@/lib/taxCalculations';
import StateSelector from './StateSelector';

// Export FormData type for parent component
export interface FormData {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  ein: string;
  employeeName: string;
  employeeAddress: string;
  employeeId: string;
  ssn: string;
  employeeStartDate: string;
  payType: 'hourly' | 'salary';
  payRate: number;
  hoursWorked: number;
  overtimeHours: number;
  additionalEarnings: number;
  additionalEarningsDescription: string;
  payFrequency: PayFrequency;
  payPeriodStart: string;
  payPeriodEnd: string;
  payDate: string;
  federalFilingStatus: FilingStatus;
  federalAdditionalWithholding: number;
  state: string;
  stateFilingStatus: FilingStatus;
  stateAllowances: number;
  ytdGross: number;
  numberOfPaystubs: number;
  payday: PaydayNumber;
}

interface PaystubFormProps {
  onCalculate: (results: MultiPaystubResult[], formData: FormData) => void;
  initialData: FormData;
  onAutoSave?: (data: FormData) => void;
  hasSavedData?: boolean;
  onClearData?: () => void;
}

type Step = 'state' | 'employer' | 'employee' | 'pay' | 'taxes' | 'review';

const STEPS: { key: Step; label: string; categoryLabel: string; title: string; description: string }[] = [
  { key: 'state', label: 'State', categoryLabel: 'Tax Location', title: 'Select State', description: 'Choose the state where the employee works for accurate tax calculations' },
  { key: 'employer', label: 'Company', categoryLabel: 'Employer', title: 'Company Information', description: 'Enter the employer details that will appear on the paystub' },
  { key: 'employee', label: 'Employee', categoryLabel: 'Employee', title: 'Employee Information', description: 'Enter the employee details for the paystub' },
  { key: 'pay', label: 'Pay', categoryLabel: 'Compensation', title: 'Pay Details', description: 'Set the pay rate, hours, and pay schedule' },
  { key: 'taxes', label: 'Taxes', categoryLabel: 'Withholding', title: 'Tax Settings', description: 'Configure federal and state tax withholding options' },
  { key: 'review', label: 'Review', categoryLabel: 'Final Step', title: 'Review & Generate', description: 'Review all details before generating the paystub' },
];

export default function PaystubForm({ onCalculate, initialData, onAutoSave, hasSavedData, onClearData }: PaystubFormProps) {
  const [currentStep, setCurrentStep] = useState<Step>('state');
  const [formData, setFormData] = useState<FormData>(() => initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced auto-save when form data changes
  useEffect(() => {
    if (!onAutoSave) return;

    // Clear previous timeout
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    // Set new timeout for auto-save (debounce 1 second)
    autoSaveTimeoutRef.current = setTimeout(() => {
      onAutoSave(formData);
    }, 1000);

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [formData, onAutoSave]);

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePayFrequencyChange = (frequency: PayFrequency) => {
    const newDates = calculatePayDates(frequency, formData.payday);
    const defaultHours = frequency === 'weekly' ? 40 : frequency === 'biweekly' ? 80 : frequency === 'semimonthly' ? 86.67 : 173.33;
    setFormData((prev) => ({
      ...prev,
      payFrequency: frequency,
      payPeriodStart: newDates.payPeriodStart,
      payPeriodEnd: newDates.payPeriodEnd,
      payDate: newDates.payDate,
      hoursWorked: prev.payType === 'hourly' ? defaultHours : prev.hoursWorked,
    }));
  };

  const handlePaydayChange = (newPayday: PaydayNumber) => {
    const newDates = calculatePayDates(formData.payFrequency, newPayday);
    setFormData((prev) => ({
      ...prev,
      payday: newPayday,
      payPeriodStart: newDates.payPeriodStart,
      payPeriodEnd: newDates.payPeriodEnd,
      payDate: newDates.payDate,
    }));
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 'employer') {
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!formData.companyAddress.trim()) newErrors.companyAddress = 'Company address is required';
      // EIN format validation (XX-XXXXXXX)
      if (formData.ein && !/^\d{2}-\d{7}$/.test(formData.ein)) {
        newErrors.ein = 'EIN must be in format XX-XXXXXXX';
      }
    }
    if (currentStep === 'employee') {
      if (!formData.employeeName.trim()) newErrors.employeeName = 'Employee name is required';
      // SSN last 4 validation
      if (formData.ssn && formData.ssn.length > 0 && formData.ssn.length !== 4) {
        newErrors.ssn = 'Enter exactly 4 digits';
      }
    }
    if (currentStep === 'pay') {
      if (formData.payRate <= 0) newErrors.payRate = 'Pay rate must be greater than 0';
      if (formData.payType === 'hourly') {
        if (formData.hoursWorked <= 0) newErrors.hoursWorked = 'Hours must be greater than 0';
        if (formData.overtimeHours < 0) newErrors.overtimeHours = 'Overtime cannot be negative';
      }
      // Date validation
      if (formData.payPeriodStart && formData.payPeriodEnd) {
        const start = new Date(formData.payPeriodStart);
        const end = new Date(formData.payPeriodEnd);
        if (start >= end) {
          newErrors.payPeriodStart = 'Start date must be before end date';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep()) return;
    const stepIndex = STEPS.findIndex((s) => s.key === currentStep);
    if (stepIndex < STEPS.length - 1) setCurrentStep(STEPS[stepIndex + 1].key);
  };

  const goBack = () => {
    const stepIndex = STEPS.findIndex((s) => s.key === currentStep);
    if (stepIndex > 0) setCurrentStep(STEPS[stepIndex - 1].key);
  };

  const handleSubmit = () => {
    const paystubInput: PaystubInput = {
      companyName: formData.companyName,
      companyAddress: formData.companyAddress,
      companyPhone: formData.companyPhone,
      ein: formData.ein,
      employeeName: formData.employeeName,
      employeeAddress: formData.employeeAddress,
      employeeId: formData.employeeId,
      ssn: formData.ssn,
      payType: formData.payType,
      payRate: formData.payRate,
      hoursWorked: formData.hoursWorked,
      overtimeHours: formData.overtimeHours,
      additionalEarnings: formData.additionalEarnings,
      additionalEarningsDescription: formData.additionalEarningsDescription || undefined,
      payFrequency: formData.payFrequency,
      payPeriodStart: formData.payPeriodStart,
      payPeriodEnd: formData.payPeriodEnd,
      payDate: formData.payDate,
      federalFilingStatus: formData.federalFilingStatus,
      federalAdditionalWithholding: formData.federalAdditionalWithholding,
      state: formData.state,
      stateFilingStatus: formData.stateFilingStatus,
      stateAllowances: formData.stateAllowances,
      ytdGross: formData.ytdGross,
      employeeStartDate: formData.employeeStartDate || undefined,
    };

    const results = generateMultiplePaystubs(paystubInput, formData.numberOfPaystubs);
    onCalculate(results, formData);
  };

  const currentStepIndex = STEPS.findIndex((s) => s.key === currentStep);
  const currentStepData = STEPS[currentStepIndex];
  const stateConfig = getStateConfig(formData.state);

  // Styling classes
  const inputClass = "w-full h-12 px-4 bg-stone-50 rounded-lg border border-stone-200 hover:border-stone-400 focus:border-stone-800 focus:outline-none focus:ring-0 text-stone-800 transition-colors";
  const inputErrorClass = "w-full h-12 px-4 bg-stone-50 rounded-lg border border-red-400 hover:border-red-500 focus:border-red-500 focus:outline-none focus:ring-0 text-stone-800 transition-colors";
  const labelClass = "block text-stone-600 text-sm font-medium mb-2";
  const selectClass = "w-full h-12 px-4 bg-stone-50 rounded-lg border border-stone-200 hover:border-stone-400 focus:border-stone-800 focus:outline-none focus:ring-0 text-stone-800 transition-colors appearance-none cursor-pointer";

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-stone-200/50 max-w-2xl mx-auto overflow-hidden">
      {/* Patriotic stripe accent */}
      <div className="h-1 flex">
        <div className="flex-1 bg-red-600"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-blue-700"></div>
      </div>

      <div className="p-4 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-stone-800 flex items-center justify-center">
            <span className="text-white font-bold text-sm sm:text-base">P</span>
          </div>
          <div>
            <span className="text-stone-800 font-semibold text-base sm:text-lg">Free Pay Stub</span>
            <span className="text-stone-400 text-xs sm:text-sm ml-1 sm:ml-2 hidden sm:inline">Generator</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {hasSavedData && onClearData && (
            <button
              type="button"
              onClick={onClearData}
              className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
              aria-label="Start new paystub and clear saved data"
            >
              Start New
            </button>
          )}
          <div className="flex items-center gap-1.5 sm:gap-2 text-sm">
            <span className="text-stone-400 hidden sm:inline">Step</span>
            <span className="bg-stone-800 text-white px-2 py-0.5 rounded-md font-medium text-xs sm:text-sm">
              {currentStepIndex + 1}/{STEPS.length}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="mb-6 sm:mb-8"
        role="progressbar"
        aria-valuenow={currentStepIndex + 1}
        aria-valuemin={1}
        aria-valuemax={STEPS.length}
        aria-label={`Step ${currentStepIndex + 1} of ${STEPS.length}: ${currentStepData.title}`}
      >
        <div className="flex items-center gap-1 mb-2 sm:mb-3">
          {STEPS.map((step, index) => (
            <button
              key={step.key}
              onClick={() => index < currentStepIndex && setCurrentStep(step.key)}
              disabled={index > currentStepIndex}
              aria-label={`${index < currentStepIndex ? 'Go to' : ''} Step ${index + 1}: ${step.label}${index === currentStepIndex ? ' (current)' : ''}`}
              className={`flex-1 h-1.5 sm:h-2 rounded-full transition-all ${
                index < currentStepIndex
                  ? 'bg-amber-500 cursor-pointer hover:bg-amber-600'
                  : index === currentStepIndex
                    ? 'bg-stone-800'
                    : 'bg-stone-200'
              }`}
            />
          ))}
        </div>
        {/* Step labels - hidden on mobile, visible on sm+ */}
        <div className="hidden sm:flex justify-between text-xs">
          {STEPS.map((step, index) => (
            <span
              key={step.key}
              className={`${
                index === currentStepIndex
                  ? 'text-stone-800 font-semibold'
                  : index < currentStepIndex
                    ? 'text-amber-600 font-medium'
                    : 'text-stone-400'
              }`}
            >
              {step.label}
            </span>
          ))}
        </div>
        {/* Mobile: show current step name */}
        <p className="sm:hidden text-xs text-stone-500 text-center">
          {currentStepData.label}
        </p>
      </div>

      {/* Section Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-amber-600 text-xs sm:text-sm font-medium mb-1">{currentStepData.categoryLabel}</p>
        <h2 className="text-xl sm:text-2xl font-bold text-stone-800 mb-1">{currentStepData.title}</h2>
        <p className="text-stone-500 text-xs sm:text-sm">{currentStepData.description}</p>
      </div>

      {/* Step Content */}
      <div className="mb-6 sm:mb-8 min-h-[240px] sm:min-h-[280px]">
        {/* STEP 1: State Selection */}
        {currentStep === 'state' && (
          <div className="space-y-6">
            <StateSelector
              value={formData.state}
              onChange={(stateCode) => updateField('state', stateCode)}
            />

            {/* Number of paystubs */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
              <label className="block text-stone-700 text-sm font-medium mb-3">
                How many paystubs do you need to generate?
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => updateField('numberOfPaystubs', Math.max(1, formData.numberOfPaystubs - 1))}
                    className="px-4 py-2 text-stone-600 hover:bg-stone-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-semibold text-stone-800 min-w-[3rem] text-center">
                    {formData.numberOfPaystubs}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateField('numberOfPaystubs', Math.min(12, formData.numberOfPaystubs + 1))}
                    className="px-4 py-2 text-stone-600 hover:bg-stone-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-stone-500">
                  {formData.numberOfPaystubs === 1 ? 'Single paystub' : `${formData.numberOfPaystubs} consecutive paystubs`}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Company Info */}
        {currentStep === 'employer' && (
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Company Name *</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => {
                  updateField('companyName', e.target.value);
                  if (errors.companyName) setErrors((prev) => ({ ...prev, companyName: '' }));
                }}
                className={errors.companyName ? inputErrorClass : inputClass}
                placeholder="Acme Corporation"
              />
              {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
            </div>
            <div>
              <label className={labelClass}>Company Address *</label>
              <input
                type="text"
                value={formData.companyAddress}
                onChange={(e) => {
                  updateField('companyAddress', e.target.value);
                  if (errors.companyAddress) setErrors((prev) => ({ ...prev, companyAddress: '' }));
                }}
                className={errors.companyAddress ? inputErrorClass : inputClass}
                placeholder="123 Business Ave, City, State 12345"
              />
              {errors.companyAddress && <p className="text-red-500 text-xs mt-1">{errors.companyAddress}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>EIN (Optional)</label>
                <input
                  type="text"
                  value={formData.ein}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 9);
                    let formatted = digits;
                    if (digits.length > 2) formatted = `${digits.slice(0, 2)}-${digits.slice(2)}`;
                    updateField('ein', formatted);
                    if (errors.ein) setErrors((prev) => ({ ...prev, ein: '' }));
                  }}
                  className={errors.ein ? inputErrorClass : inputClass}
                  placeholder="12-3456789"
                  maxLength={10}
                />
                {errors.ein && <p className="text-red-500 text-xs mt-1">{errors.ein}</p>}
              </div>
              <div>
                <label className={labelClass}>Phone (Optional)</label>
                <input
                  type="text"
                  value={formData.companyPhone}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                    let formatted = digits;
                    if (digits.length > 6) formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
                    else if (digits.length > 3) formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
                    else if (digits.length > 0) formatted = `(${digits}`;
                    updateField('companyPhone', formatted);
                  }}
                  className={inputClass}
                  placeholder="(555) 123-4567"
                  maxLength={14}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Employee Info */}
        {currentStep === 'employee' && (
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Full Name *</label>
              <input
                type="text"
                value={formData.employeeName}
                onChange={(e) => {
                  updateField('employeeName', e.target.value);
                  if (errors.employeeName) setErrors((prev) => ({ ...prev, employeeName: '' }));
                }}
                className={errors.employeeName ? inputErrorClass : inputClass}
                placeholder="John Smith"
              />
              {errors.employeeName && <p className="text-red-500 text-xs mt-1">{errors.employeeName}</p>}
            </div>
            <div>
              <label className={labelClass}>Address (Optional)</label>
              <input
                type="text"
                value={formData.employeeAddress}
                onChange={(e) => updateField('employeeAddress', e.target.value)}
                className={inputClass}
                placeholder="456 Home St, City, State 12345"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Employee ID (Optional)</label>
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => updateField('employeeId', e.target.value)}
                  className={inputClass}
                  placeholder="EMP-001"
                />
              </div>
              <div>
                <label className={labelClass}>SSN (Last 4)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">***-**-</span>
                  <input
                    type="text"
                    maxLength={4}
                    value={formData.ssn}
                    onChange={(e) => {
                      updateField('ssn', e.target.value.replace(/\D/g, '').slice(0, 4));
                      if (errors.ssn) setErrors((prev) => ({ ...prev, ssn: '' }));
                    }}
                    className={`${errors.ssn ? inputErrorClass : inputClass} pl-16`}
                    placeholder="1234"
                  />
                </div>
                {errors.ssn && <p className="text-red-500 text-xs mt-1">{errors.ssn}</p>}
              </div>
            </div>
            <div>
              <label className={labelClass}>Start Date (Optional)</label>
              <input
                type="date"
                value={formData.employeeStartDate}
                onChange={(e) => updateField('employeeStartDate', e.target.value)}
                className={inputClass}
              />
              <p className="text-xs text-stone-400 mt-1">Used to automatically calculate year-to-date totals</p>
            </div>
          </div>
        )}

        {/* STEP 4: Pay Details */}
        {currentStep === 'pay' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className={labelClass}>Pay Type</label>
                <select
                  value={formData.payType}
                  onChange={(e) => updateField('payType', e.target.value as 'hourly' | 'salary')}
                  className={selectClass}
                >
                  <option value="hourly">Hourly</option>
                  <option value="salary">Salary</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Frequency</label>
                <select
                  value={formData.payFrequency}
                  onChange={(e) => handlePayFrequencyChange(e.target.value as PayFrequency)}
                  className={selectClass}
                >
                  {Object.entries(PAY_FREQUENCIES).map(([key, value]) => (
                    <option key={key} value={key}>{value.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Payday</label>
                <select
                  value={formData.payday}
                  onChange={(e) => handlePaydayChange(parseInt(e.target.value) as PaydayNumber)}
                  className={selectClass}
                >
                  {Object.entries(PAYDAYS).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>
                {formData.payType === 'hourly' ? 'Hourly Rate' : 'Salary per Period'} *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.payRate || ''}
                  onChange={(e) => {
                    updateField('payRate', parseFloat(e.target.value) || 0);
                    if (errors.payRate) setErrors((prev) => ({ ...prev, payRate: '' }));
                  }}
                  className={`${errors.payRate ? inputErrorClass : inputClass} pl-8`}
                  placeholder={formData.payType === 'hourly' ? '25.00' : '3000.00'}
                />
              </div>
              {errors.payRate && <p className="text-red-500 text-xs mt-1">{errors.payRate}</p>}
            </div>

            {formData.payType === 'hourly' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Regular Hours *</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={formData.hoursWorked || ''}
                    onChange={(e) => {
                      updateField('hoursWorked', parseFloat(e.target.value) || 0);
                      if (errors.hoursWorked) setErrors((prev) => ({ ...prev, hoursWorked: '' }));
                    }}
                    className={errors.hoursWorked ? inputErrorClass : inputClass}
                    placeholder="80"
                  />
                  {errors.hoursWorked && <p className="text-red-500 text-xs mt-1">{errors.hoursWorked}</p>}
                </div>
                <div>
                  <label className={labelClass}>Overtime Hours</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={formData.overtimeHours || ''}
                    onChange={(e) => {
                      updateField('overtimeHours', parseFloat(e.target.value) || 0);
                      if (errors.overtimeHours) setErrors((prev) => ({ ...prev, overtimeHours: '' }));
                    }}
                    className={errors.overtimeHours ? inputErrorClass : inputClass}
                    placeholder="0"
                  />
                  {errors.overtimeHours ? (
                    <p className="text-red-500 text-xs mt-1">{errors.overtimeHours}</p>
                  ) : (
                    <p className="text-xs text-stone-400 mt-1">Paid at 1.5x rate</p>
                  )}
                </div>
              </div>
            )}

            {/* Additional Earnings */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm font-medium text-amber-700 mb-3">
                Additional Earnings (Optional)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className={labelClass}>Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.additionalEarnings || ''}
                      onChange={(e) => updateField('additionalEarnings', parseFloat(e.target.value) || 0)}
                      className={`${inputClass} pl-8`}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Description</label>
                  <select
                    value={formData.additionalEarningsDescription}
                    onChange={(e) => updateField('additionalEarningsDescription', e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select type...</option>
                    <option value="Bonus">Bonus</option>
                    <option value="Commission">Commission</option>
                    <option value="Holiday Pay">Holiday Pay</option>
                    <option value="PTO Payout">PTO Payout</option>
                    <option value="Reimbursement">Reimbursement</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <p className="text-xs text-amber-600 mt-2">
                Include bonuses, commissions, holiday pay, or other supplemental earnings
              </p>
            </div>

            <div className="bg-stone-50 rounded-lg p-3 sm:p-4 border border-stone-200">
              <p className="text-xs sm:text-sm font-medium text-stone-600 mb-2">
                Pay Period ({PAYDAYS[formData.payday]} payday)
              </p>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-stone-400">Start</span>
                  <p className="font-medium text-stone-800">{formatDate(formData.payPeriodStart)}</p>
                </div>
                <div>
                  <span className="text-stone-400">End</span>
                  <p className="font-medium text-stone-800">{formatDate(formData.payPeriodEnd)}</p>
                </div>
                <div>
                  <span className="text-stone-400">Pay Date</span>
                  <p className="font-medium text-stone-800">{formatDate(formData.payDate)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Tax Settings */}
        {currentStep === 'taxes' && (
          <div className="space-y-5">
            {/* Federal Tax Section */}
            <div>
              <h3 className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded flex items-center justify-center text-xs">F</span>
                Federal Tax
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Filing Status</label>
                  <select
                    value={formData.federalFilingStatus}
                    onChange={(e) => updateField('federalFilingStatus', e.target.value as FilingStatus)}
                    className={selectClass}
                  >
                    {Object.entries(FILING_STATUSES).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Additional Withholding</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.federalAdditionalWithholding || ''}
                      onChange={(e) => updateField('federalAdditionalWithholding', parseFloat(e.target.value) || 0)}
                      className={`${inputClass} pl-8`}
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* State Tax Section */}
            <div className="border-t border-stone-200 pt-4 sm:pt-5">
              <h3 className="text-xs sm:text-sm font-semibold text-stone-700 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 sm:w-6 sm:h-6 bg-amber-100 text-amber-700 rounded flex items-center justify-center text-xs">{formData.state}</span>
                {stateConfig?.name || formData.state} State Tax
              </h3>

              {!stateConfig?.hasIncomeTax ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                  <p className="text-green-700 font-medium text-sm">No state income tax</p>
                  <p className="text-xs sm:text-sm text-green-600 mt-1">
                    {stateConfig?.name} does not have a state income tax. Only federal taxes will be withheld.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>State Filing Status</label>
                    <select
                      value={formData.stateFilingStatus}
                      onChange={(e) => updateField('stateFilingStatus', e.target.value as FilingStatus)}
                      className={selectClass}
                    >
                      {Object.entries(FILING_STATUSES).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>State Allowances</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={formData.stateAllowances}
                      onChange={(e) => updateField('stateAllowances', parseInt(e.target.value) || 0)}
                      className={inputClass}
                      placeholder="0"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* YTD Section */}
            <div className="border-t border-stone-200 pt-5">
              <h3 className="text-sm font-semibold text-stone-700 mb-3">Year-to-Date</h3>
              {formData.employeeStartDate ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-700 font-medium">Auto-calculating YTD</p>
                  <p className="text-sm text-green-600 mt-1">
                    Based on employee start date: {formatDate(formData.employeeStartDate)}
                  </p>
                </div>
              ) : (
                <div>
                  <label className={labelClass}>Prior YTD Gross Earnings</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.ytdGross || ''}
                      onChange={(e) => updateField('ytdGross', parseFloat(e.target.value) || 0)}
                      className={`${inputClass} pl-8`}
                      placeholder="0.00"
                    />
                  </div>
                  <p className="text-xs text-stone-400 mt-1">
                    Enter total gross earnings before this pay period (affects tax bracket calculations)
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 6: Review */}
        {currentStep === 'review' && (
          <div className="space-y-3 sm:space-y-4">
            {formData.numberOfPaystubs > 1 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                <p className="text-amber-800 font-medium text-sm">
                  Generating {formData.numberOfPaystubs} paystubs
                </p>
                <p className="text-xs sm:text-sm text-amber-600 mt-1">
                  From {formatDate(formData.payDate)} going back {formData.numberOfPaystubs - 1} pay periods
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Company */}
              <div className="bg-stone-50 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-stone-800 mb-2 text-xs sm:text-sm">Company</h3>
                <div className="text-xs sm:text-sm text-stone-600 space-y-1">
                  <p className="font-medium text-stone-800">{formData.companyName}</p>
                  <p className="text-xs">{formData.companyAddress}</p>
                  {formData.ein && <p className="text-xs">EIN: {formData.ein}</p>}
                </div>
              </div>

              {/* Employee */}
              <div className="bg-stone-50 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-stone-800 mb-2 text-xs sm:text-sm">Employee</h3>
                <div className="text-xs sm:text-sm text-stone-600 space-y-1">
                  <p className="font-medium text-stone-800">{formData.employeeName}</p>
                  {formData.ssn && <p className="text-xs">SSN: ***-**-{formData.ssn}</p>}
                  {formData.employeeId && <p className="text-xs">ID: {formData.employeeId}</p>}
                </div>
              </div>

              {/* Pay */}
              <div className="bg-stone-50 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-stone-800 mb-2 text-xs sm:text-sm">Pay Details</h3>
                <div className="text-xs sm:text-sm text-stone-600 space-y-1">
                  <p>
                    {formData.payType === 'hourly'
                      ? `$${formData.payRate.toFixed(2)}/hr`
                      : `$${formData.payRate.toFixed(2)}/period`
                    }
                  </p>
                  {formData.payType === 'hourly' && (
                    <p className="text-xs">{formData.hoursWorked} hrs + {formData.overtimeHours} OT</p>
                  )}
                  {formData.additionalEarnings > 0 && (
                    <p className="text-xs text-amber-600">
                      +${formData.additionalEarnings.toFixed(2)} {formData.additionalEarningsDescription || 'Additional'}
                    </p>
                  )}
                  <p className="text-xs">{PAY_FREQUENCIES[formData.payFrequency].label}</p>
                </div>
              </div>

              {/* Taxes */}
              <div className="bg-stone-50 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-stone-800 mb-2 text-xs sm:text-sm">Taxes</h3>
                <div className="text-xs sm:text-sm text-stone-600 space-y-1">
                  <p>State: {stateConfig?.name}</p>
                  <p className="text-xs">Federal: {FILING_STATUSES[formData.federalFilingStatus]}</p>
                  {!stateConfig?.hasIncomeTax && (
                    <p className="text-xs text-green-600">No state income tax</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex justify-between pt-4 sm:pt-6 border-t border-stone-100" aria-label="Form navigation">
        <button
          type="button"
          onClick={goBack}
          disabled={currentStepIndex === 0}
          aria-disabled={currentStepIndex === 0}
          aria-label={`Go back to ${currentStepIndex > 0 ? STEPS[currentStepIndex - 1].label : 'previous'} step`}
          className={`px-3 sm:px-5 py-2 sm:py-2.5 font-medium flex items-center gap-1 sm:gap-2 rounded-lg transition-colors text-sm ${
            currentStepIndex === 0
              ? 'text-stone-300 cursor-not-allowed'
              : 'text-stone-600 hover:text-stone-800 hover:bg-stone-100'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Back</span>
        </button>

        {currentStep === 'review' ? (
          <button
            type="button"
            onClick={handleSubmit}
            aria-label={`Generate ${formData.numberOfPaystubs} paystub${formData.numberOfPaystubs > 1 ? 's' : ''}`}
            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-amber-600 text-white rounded-lg font-semibold flex items-center gap-1 sm:gap-2 hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/25 text-sm"
          >
            Generate {formData.numberOfPaystubs > 1 ? `${formData.numberOfPaystubs}` : ''}
            <span className="hidden sm:inline">{formData.numberOfPaystubs > 1 ? 'Paystubs' : 'Paystub'}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            aria-label={`Continue to ${currentStepIndex < STEPS.length - 1 ? STEPS[currentStepIndex + 1].label : 'next'} step`}
            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-stone-800 text-white rounded-lg font-semibold flex items-center gap-1 sm:gap-2 hover:bg-stone-900 transition-colors text-sm"
          >
            <span className="hidden sm:inline">Continue</span>
            <span className="sm:hidden">Next</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </nav>
      </div>
    </div>
  );
}
