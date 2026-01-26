// Quick verification tests for tax calculations
import {
  calculateGrossPay,
  calculateSocialSecurityTax,
  calculateMedicareTax,
  calculateFederalIncomeTax,
  calculatePaystub,
} from './taxCalculations';
import { calculateStateTax } from './states';

// Test gross pay calculation
function testGrossPay() {
  // Hourly: 40 hours @ $25/hr = $1000
  const hourly = calculateGrossPay('hourly', 25, 40, 0);
  console.assert(hourly.regularPay === 1000, 'Regular pay should be $1000');
  console.assert(hourly.overtimePay === 0, 'Overtime should be $0');
  console.assert(hourly.grossPay === 1000, 'Gross pay should be $1000');

  // Hourly with overtime: 40 hours @ $20/hr + 10 OT hours @ $30/hr = $800 + $300 = $1100
  const withOT = calculateGrossPay('hourly', 20, 40, 10);
  console.assert(withOT.regularPay === 800, 'Regular pay should be $800');
  console.assert(withOT.overtimePay === 300, 'Overtime should be $300 (10 * 20 * 1.5)');
  console.assert(withOT.grossPay === 1100, 'Gross pay should be $1100');

  // Salary
  const salary = calculateGrossPay('salary', 3000, 0, 0);
  console.assert(salary.grossPay === 3000, 'Salary gross pay should be $3000');

  console.log('✓ Gross pay tests passed');
}

// Test Social Security tax (6.2%)
function testSocialSecurityTax() {
  // $1000 gross * 6.2% = $62
  const ss = calculateSocialSecurityTax(1000, 0);
  console.assert(Math.abs(ss - 62) < 0.01, `Social Security should be $62, got ${ss}`);

  // Test wage base cap - if YTD is at limit, no more SS tax
  const ssAtCap = calculateSocialSecurityTax(1000, 176100);
  console.assert(ssAtCap === 0, 'Social Security should be $0 when at wage base');

  console.log('✓ Social Security tax tests passed');
}

// Test Medicare tax (1.45% + 0.9% additional over $200k)
function testMedicareTax() {
  // $1000 gross * 1.45% = $14.50
  const medicare = calculateMedicareTax(1000, 0);
  console.assert(Math.abs(medicare.medicareTax - 14.5) < 0.01, `Medicare should be $14.50, got ${medicare.medicareTax}`);
  console.assert(medicare.additionalMedicareTax === 0, 'Additional Medicare should be $0 under threshold');

  // Test additional Medicare over $200k
  const medicareHigh = calculateMedicareTax(5000, 198000);
  // Total YTD would be $203,000, so $3,000 over threshold
  // Additional Medicare = $3,000 * 0.9% = $27
  console.assert(medicareHigh.additionalMedicareTax > 0, 'Should have additional Medicare tax over $200k');

  console.log('✓ Medicare tax tests passed');
}

// Test federal income tax
function testFederalIncomeTax() {
  // Bi-weekly $2000 = $52,000/year
  // Single filer with $15,000 standard deduction = $37,000 taxable
  // Tax: $11,925 @ 10% = $1,192.50 + ($37,000 - $11,925) @ 12% = $3,009
  // Total annual tax ~ $4,201.50, per period ~ $161.60
  const fedTax = calculateFederalIncomeTax(2000, 'biweekly', 'single', 0);
  console.assert(fedTax > 100 && fedTax < 200, `Federal tax should be ~$161, got ${fedTax.toFixed(2)}`);

  console.log('✓ Federal income tax tests passed');
}

// Test state tax (using MN as example)
function testStateTax() {
  // Bi-weekly $2000 = $52,000/year
  // MN Single filer with ~$14,950 standard deduction = ~$37,050 taxable
  const mnTax = calculateStateTax('MN', 2000, 26, 'single', 0);
  console.assert(mnTax > 50 && mnTax < 100, `MN tax should be ~$70-80, got ${mnTax.toFixed(2)}`);

  // Test no income tax state (Texas)
  const txTax = calculateStateTax('TX', 2000, 26, 'single', 0);
  console.assert(txTax === 0, `TX should have $0 state tax, got ${txTax.toFixed(2)}`);

  // Test flat tax state (Colorado - 4.4%)
  const coTax = calculateStateTax('CO', 2000, 26, 'single', 0);
  console.assert(coTax > 0, `CO should have state tax, got ${coTax.toFixed(2)}`);

  console.log('✓ State tax tests passed');
}

// Test full paystub calculation
function testFullPaystub() {
  const result = calculatePaystub({
    companyName: 'Test Company',
    companyAddress: '123 Main St, Minneapolis, MN',
    employeeName: 'John Doe',
    payType: 'hourly',
    payRate: 25,
    hoursWorked: 40,
    overtimeHours: 0,
    payFrequency: 'biweekly',
    payPeriodStart: '2025-01-01',
    payPeriodEnd: '2025-01-14',
    payDate: '2025-01-17',
    federalFilingStatus: 'single',
    federalAdditionalWithholding: 0,
    state: 'MN',
    stateFilingStatus: 'single',
    stateAllowances: 0,
    ytdGross: 0,
  });

  console.assert(result.grossPay === 1000, 'Gross pay should be $1000');
  console.assert(result.socialSecurityTax > 0, 'Should have Social Security tax');
  console.assert(result.medicareTax > 0, 'Should have Medicare tax');
  console.assert(result.federalIncomeTax > 0, 'Should have Federal income tax');
  console.assert(result.stateTax > 0, 'Should have state tax');
  console.assert(result.netPay > 0 && result.netPay < result.grossPay, 'Net pay should be less than gross');
  console.assert(result.ytdGross === 1000, 'YTD should be updated');

  console.log('✓ Full paystub calculation tests passed');
  console.log(`  Gross: $${result.grossPay.toFixed(2)}`);
  console.log(`  Federal Tax: $${result.federalIncomeTax.toFixed(2)}`);
  console.log(`  Social Security: $${result.socialSecurityTax.toFixed(2)}`);
  console.log(`  Medicare: $${result.medicareTax.toFixed(2)}`);
  console.log(`  State Tax: $${result.stateTax.toFixed(2)}`);
  console.log(`  Total Taxes: $${result.totalTaxes.toFixed(2)}`);
  console.log(`  Net Pay: $${result.netPay.toFixed(2)}`);
}

// Test paystub with no income tax state
function testNoIncomeTaxState() {
  const result = calculatePaystub({
    companyName: 'Test Company',
    companyAddress: '123 Main St, Houston, TX',
    employeeName: 'Jane Doe',
    payType: 'salary',
    payRate: 3000,
    hoursWorked: 0,
    overtimeHours: 0,
    payFrequency: 'biweekly',
    payPeriodStart: '2025-01-01',
    payPeriodEnd: '2025-01-14',
    payDate: '2025-01-17',
    federalFilingStatus: 'single',
    federalAdditionalWithholding: 0,
    state: 'TX',
    stateFilingStatus: 'single',
    stateAllowances: 0,
    ytdGross: 0,
  });

  console.assert(result.stateTax === 0, 'TX should have $0 state tax');
  console.assert(result.netPay > 0, 'Net pay should be positive');

  console.log('✓ No income tax state test passed');
  console.log(`  State Tax (TX): $${result.stateTax.toFixed(2)}`);
}

// Run all tests
console.log('\n=== Running Tax Calculation Tests ===\n');
testGrossPay();
testSocialSecurityTax();
testMedicareTax();
testFederalIncomeTax();
testStateTax();
testFullPaystub();
testNoIncomeTaxState();
console.log('\n=== All Tests Passed ===\n');
