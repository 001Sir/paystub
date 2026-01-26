// State Tax Configuration Module
// Exports all state tax configs and helper functions

import { StateTaxConfig, FilingStatus, calculateStateTaxFromConfig } from './types';

// No Income Tax States (9)
import { AK, FL, NV, NH, SD, TN, TX, WA, WY } from './no-income-tax';

// Flat Tax States (16)
import { AZ, CO, GA, ID, IL, IN, IA, KY, MA, MI, MS, MT, NC, ND, PA, UT } from './flat-tax';

// Progressive Tax States (26 + DC)
import {
  AL, AR, CA, CT, DE, HI, KS, LA, ME, MD, MN, MO, NE, NJ, NM, NY, OH, OK, OR, RI, SC, VT, VA, WV, WI, DC
} from './progressive-tax';

// Export types
export type { StateTaxConfig, FilingStatus, TaxBracket } from './types';

// All state configurations keyed by abbreviation
export const STATE_TAX_CONFIGS: Record<string, StateTaxConfig> = {
  // No Income Tax
  AK, FL, NV, NH, SD, TN, TX, WA, WY,
  // Flat Tax
  AZ, CO, GA, ID, IL, IN, IA, KY, MA, MI, MS, MT, NC, ND, PA, UT,
  // Progressive Tax
  AL, AR, CA, CT, DE, HI, KS, LA, ME, MD, MN, MO, NE, NJ, NM, NY, OH, OK, OR, RI, SC, VT, VA, WV, WI, DC,
};

// Get list of states for dropdown (sorted alphabetically by name)
export function getStatesList(): { code: string; name: string }[] {
  return Object.values(STATE_TAX_CONFIGS)
    .map((config) => ({
      code: config.abbreviation,
      name: config.name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// Get a specific state's config
export function getStateConfig(stateCode: string): StateTaxConfig | undefined {
  return STATE_TAX_CONFIGS[stateCode.toUpperCase()];
}

// Calculate state income tax (returns per-period amount)
export function calculateStateTax(
  stateCode: string,
  grossPay: number,
  periodsPerYear: number,
  filingStatus: FilingStatus,
  allowances: number = 0
): number {
  const config = getStateConfig(stateCode);
  if (!config) {
    console.warn(`Unknown state code: ${stateCode}, defaulting to 0 state tax`);
    return 0;
  }

  const annualizedGross = grossPay * periodsPerYear;
  const annualTax = calculateStateTaxFromConfig(config, annualizedGross, filingStatus, allowances);
  return annualTax / periodsPerYear;
}

// Check if a state has income tax
export function stateHasIncomeTax(stateCode: string): boolean {
  const config = getStateConfig(stateCode);
  return config?.hasIncomeTax ?? false;
}

// Get state's tax notes (if any)
export function getStateTaxNotes(stateCode: string): string | undefined {
  const config = getStateConfig(stateCode);
  return config?.notes;
}
