// State Tax Configuration Types

export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export type FilingStatus = 'single' | 'married' | 'marriedSeparate' | 'headOfHousehold';

export interface StateTaxConfig {
  name: string;
  abbreviation: string;
  hasIncomeTax: boolean;
  // Flat tax rate (if applicable)
  flatRate?: number;
  // Progressive brackets by filing status
  brackets?: {
    single: TaxBracket[];
    married: TaxBracket[];
    marriedSeparate: TaxBracket[];
    headOfHousehold: TaxBracket[];
  };
  // Standard deductions by filing status
  standardDeductions?: {
    single: number;
    married: number;
    marriedSeparate: number;
    headOfHousehold: number;
  };
  // Per-allowance/exemption amount
  allowanceAmount?: number;
  // Special notes for display
  notes?: string;
  // Local taxes info (for future expansion)
  hasLocalTax?: boolean;
  localTaxNotes?: string;
}

// Calculate tax using progressive brackets
export function calculateBracketTax(
  taxableIncome: number,
  brackets: TaxBracket[]
): number {
  let tax = 0;
  for (const bracket of brackets) {
    if (taxableIncome <= bracket.min) break;
    const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
    tax += taxableInBracket * bracket.rate;
  }
  return tax;
}

// Calculate state tax from config
export function calculateStateTaxFromConfig(
  config: StateTaxConfig,
  annualizedGross: number,
  filingStatus: FilingStatus,
  allowances: number = 0
): number {
  if (!config.hasIncomeTax) {
    return 0;
  }

  // Apply allowances if applicable
  const allowanceDeduction = (config.allowanceAmount || 0) * allowances;

  // Apply standard deduction
  const standardDeduction = config.standardDeductions?.[filingStatus] || 0;

  const taxableIncome = Math.max(0, annualizedGross - allowanceDeduction - standardDeduction);

  // Flat tax calculation
  if (config.flatRate !== undefined) {
    return taxableIncome * config.flatRate;
  }

  // Progressive tax calculation
  if (config.brackets) {
    const brackets = config.brackets[filingStatus];
    return calculateBracketTax(taxableIncome, brackets);
  }

  return 0;
}
