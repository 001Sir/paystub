// States with Flat Income Tax Rate
import { StateTaxConfig } from './types';

export const AZ: StateTaxConfig = {
  name: 'Arizona',
  abbreviation: 'AZ',
  hasIncomeTax: true,
  flatRate: 0.025, // 2.5%
  standardDeductions: {
    single: 14600,
    married: 29200,
    marriedSeparate: 14600,
    headOfHousehold: 21900,
  },
};

export const CO: StateTaxConfig = {
  name: 'Colorado',
  abbreviation: 'CO',
  hasIncomeTax: true,
  flatRate: 0.044, // 4.4%
  standardDeductions: {
    single: 15000,
    married: 30000,
    marriedSeparate: 15000,
    headOfHousehold: 22500,
  },
};

export const GA: StateTaxConfig = {
  name: 'Georgia',
  abbreviation: 'GA',
  hasIncomeTax: true,
  flatRate: 0.0509, // 5.09% (2026 rate)
  standardDeductions: {
    single: 12000,
    married: 24000,
    marriedSeparate: 12000,
    headOfHousehold: 18000,
  },
};

export const ID: StateTaxConfig = {
  name: 'Idaho',
  abbreviation: 'ID',
  hasIncomeTax: true,
  flatRate: 0.058, // 5.8%
  standardDeductions: {
    single: 14600,
    married: 29200,
    marriedSeparate: 14600,
    headOfHousehold: 21900,
  },
};

export const IL: StateTaxConfig = {
  name: 'Illinois',
  abbreviation: 'IL',
  hasIncomeTax: true,
  flatRate: 0.0495, // 4.95%
  standardDeductions: {
    single: 0,
    married: 0,
    marriedSeparate: 0,
    headOfHousehold: 0,
  },
  allowanceAmount: 2850, // 2025 personal exemption
};

export const IN: StateTaxConfig = {
  name: 'Indiana',
  abbreviation: 'IN',
  hasIncomeTax: true,
  flatRate: 0.0295, // 2.95% (2026 rate)
  standardDeductions: {
    single: 0,
    married: 0,
    marriedSeparate: 0,
    headOfHousehold: 0,
  },
  allowanceAmount: 1000,
  hasLocalTax: true,
  localTaxNotes: 'County taxes apply (0.5% - 3%)',
};

export const IA: StateTaxConfig = {
  name: 'Iowa',
  abbreviation: 'IA',
  hasIncomeTax: true,
  flatRate: 0.039, // 3.9% (2026 flat rate)
  standardDeductions: {
    single: 14600,
    married: 29200,
    marriedSeparate: 14600,
    headOfHousehold: 21900,
  },
};

export const KY: StateTaxConfig = {
  name: 'Kentucky',
  abbreviation: 'KY',
  hasIncomeTax: true,
  flatRate: 0.035, // 3.5% (2026 rate)
  standardDeductions: {
    single: 3160,
    married: 6320,
    marriedSeparate: 3160,
    headOfHousehold: 3160,
  },
};

export const MA: StateTaxConfig = {
  name: 'Massachusetts',
  abbreviation: 'MA',
  hasIncomeTax: true,
  flatRate: 0.05, // 5.0%
  standardDeductions: {
    single: 0,
    married: 0,
    marriedSeparate: 0,
    headOfHousehold: 0,
  },
  allowanceAmount: 4400,
  notes: '4% surtax on income over $1M',
};

export const MI: StateTaxConfig = {
  name: 'Michigan',
  abbreviation: 'MI',
  hasIncomeTax: true,
  flatRate: 0.0425, // 4.25%
  standardDeductions: {
    single: 0,
    married: 0,
    marriedSeparate: 0,
    headOfHousehold: 0,
  },
  allowanceAmount: 5600,
};

export const MS: StateTaxConfig = {
  name: 'Mississippi',
  abbreviation: 'MS',
  hasIncomeTax: true,
  flatRate: 0.047, // 4.7%
  standardDeductions: {
    single: 2300,
    married: 4600,
    marriedSeparate: 2300,
    headOfHousehold: 3400,
  },
};

export const MT: StateTaxConfig = {
  name: 'Montana',
  abbreviation: 'MT',
  hasIncomeTax: true,
  flatRate: 0.0565, // 5.65% (2026 rate)
  standardDeductions: {
    single: 14600,
    married: 29200,
    marriedSeparate: 14600,
    headOfHousehold: 21900,
  },
};

export const NC: StateTaxConfig = {
  name: 'North Carolina',
  abbreviation: 'NC',
  hasIncomeTax: true,
  flatRate: 0.0399, // 3.99% (2026 rate)
  standardDeductions: {
    single: 12750,
    married: 25500,
    marriedSeparate: 12750,
    headOfHousehold: 19125,
  },
};

export const ND: StateTaxConfig = {
  name: 'North Dakota',
  abbreviation: 'ND',
  hasIncomeTax: true,
  flatRate: 0.0195, // 1.95%
  standardDeductions: {
    single: 14600,
    married: 29200,
    marriedSeparate: 14600,
    headOfHousehold: 21900,
  },
};

export const PA: StateTaxConfig = {
  name: 'Pennsylvania',
  abbreviation: 'PA',
  hasIncomeTax: true,
  flatRate: 0.0307, // 3.07%
  standardDeductions: {
    single: 0,
    married: 0,
    marriedSeparate: 0,
    headOfHousehold: 0,
  },
  hasLocalTax: true,
  localTaxNotes: 'Local Earned Income Tax applies (0.5% - 3.9%)',
};

export const UT: StateTaxConfig = {
  name: 'Utah',
  abbreviation: 'UT',
  hasIncomeTax: true,
  flatRate: 0.0465, // 4.65%
  standardDeductions: {
    single: 0,
    married: 0,
    marriedSeparate: 0,
    headOfHousehold: 0,
  },
  notes: 'Uses taxpayer credit system',
};
