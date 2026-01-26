// States with Progressive Income Tax Brackets
import { StateTaxConfig } from './types';

export const AL: StateTaxConfig = {
  name: 'Alabama',
  abbreviation: 'AL',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 500, rate: 0.02 },
      { min: 500, max: 3000, rate: 0.04 },
      { min: 3000, max: Infinity, rate: 0.05 },
    ],
    married: [
      { min: 0, max: 1000, rate: 0.02 },
      { min: 1000, max: 6000, rate: 0.04 },
      { min: 6000, max: Infinity, rate: 0.05 },
    ],
    marriedSeparate: [
      { min: 0, max: 500, rate: 0.02 },
      { min: 500, max: 3000, rate: 0.04 },
      { min: 3000, max: Infinity, rate: 0.05 },
    ],
    headOfHousehold: [
      { min: 0, max: 500, rate: 0.02 },
      { min: 500, max: 3000, rate: 0.04 },
      { min: 3000, max: Infinity, rate: 0.05 },
    ],
  },
  standardDeductions: {
    single: 3000,
    married: 8500,
    marriedSeparate: 4250,
    headOfHousehold: 4700,
  },
};

export const AR: StateTaxConfig = {
  name: 'Arkansas',
  abbreviation: 'AR',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 5100, rate: 0.02 },
      { min: 5100, max: 10200, rate: 0.04 },
      { min: 10200, max: Infinity, rate: 0.039 },
    ],
    married: [
      { min: 0, max: 5100, rate: 0.02 },
      { min: 5100, max: 10200, rate: 0.04 },
      { min: 10200, max: Infinity, rate: 0.039 },
    ],
    marriedSeparate: [
      { min: 0, max: 5100, rate: 0.02 },
      { min: 5100, max: 10200, rate: 0.04 },
      { min: 10200, max: Infinity, rate: 0.039 },
    ],
    headOfHousehold: [
      { min: 0, max: 5100, rate: 0.02 },
      { min: 5100, max: 10200, rate: 0.04 },
      { min: 10200, max: Infinity, rate: 0.039 },
    ],
  },
  standardDeductions: {
    single: 2340,
    married: 4680,
    marriedSeparate: 2340,
    headOfHousehold: 2340,
  },
};

export const CA: StateTaxConfig = {
  name: 'California',
  abbreviation: 'CA',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 10756, rate: 0.01 },
      { min: 10756, max: 25499, rate: 0.02 },
      { min: 25499, max: 40245, rate: 0.04 },
      { min: 40245, max: 55866, rate: 0.06 },
      { min: 55866, max: 70606, rate: 0.08 },
      { min: 70606, max: 360659, rate: 0.093 },
      { min: 360659, max: 432787, rate: 0.103 },
      { min: 432787, max: 721314, rate: 0.113 },
      { min: 721314, max: Infinity, rate: 0.123 },
    ],
    married: [
      { min: 0, max: 21512, rate: 0.01 },
      { min: 21512, max: 50998, rate: 0.02 },
      { min: 50998, max: 80490, rate: 0.04 },
      { min: 80490, max: 111732, rate: 0.06 },
      { min: 111732, max: 141212, rate: 0.08 },
      { min: 141212, max: 721318, rate: 0.093 },
      { min: 721318, max: 865574, rate: 0.103 },
      { min: 865574, max: 1442628, rate: 0.113 },
      { min: 1442628, max: Infinity, rate: 0.123 },
    ],
    marriedSeparate: [
      { min: 0, max: 10756, rate: 0.01 },
      { min: 10756, max: 25499, rate: 0.02 },
      { min: 25499, max: 40245, rate: 0.04 },
      { min: 40245, max: 55866, rate: 0.06 },
      { min: 55866, max: 70606, rate: 0.08 },
      { min: 70606, max: 360659, rate: 0.093 },
      { min: 360659, max: 432787, rate: 0.103 },
      { min: 432787, max: 721314, rate: 0.113 },
      { min: 721314, max: Infinity, rate: 0.123 },
    ],
    headOfHousehold: [
      { min: 0, max: 21527, rate: 0.01 },
      { min: 21527, max: 51013, rate: 0.02 },
      { min: 51013, max: 65744, rate: 0.04 },
      { min: 65744, max: 81380, rate: 0.06 },
      { min: 81380, max: 96120, rate: 0.08 },
      { min: 96120, max: 490493, rate: 0.093 },
      { min: 490493, max: 588621, rate: 0.103 },
      { min: 588621, max: 980987, rate: 0.113 },
      { min: 980987, max: Infinity, rate: 0.123 },
    ],
  },
  standardDeductions: {
    single: 5540,
    married: 11080,
    marriedSeparate: 5540,
    headOfHousehold: 11080,
  },
  notes: 'Additional 1% Mental Health Services Tax on income over $1M',
};

export const CT: StateTaxConfig = {
  name: 'Connecticut',
  abbreviation: 'CT',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 10000, rate: 0.02 },
      { min: 10000, max: 50000, rate: 0.045 },
      { min: 50000, max: 100000, rate: 0.055 },
      { min: 100000, max: 200000, rate: 0.06 },
      { min: 200000, max: 250000, rate: 0.065 },
      { min: 250000, max: 500000, rate: 0.069 },
      { min: 500000, max: Infinity, rate: 0.0699 },
    ],
    married: [
      { min: 0, max: 20000, rate: 0.02 },
      { min: 20000, max: 100000, rate: 0.045 },
      { min: 100000, max: 200000, rate: 0.055 },
      { min: 200000, max: 400000, rate: 0.06 },
      { min: 400000, max: 500000, rate: 0.065 },
      { min: 500000, max: 1000000, rate: 0.069 },
      { min: 1000000, max: Infinity, rate: 0.0699 },
    ],
    marriedSeparate: [
      { min: 0, max: 10000, rate: 0.02 },
      { min: 10000, max: 50000, rate: 0.045 },
      { min: 50000, max: 100000, rate: 0.055 },
      { min: 100000, max: 200000, rate: 0.06 },
      { min: 200000, max: 250000, rate: 0.065 },
      { min: 250000, max: 500000, rate: 0.069 },
      { min: 500000, max: Infinity, rate: 0.0699 },
    ],
    headOfHousehold: [
      { min: 0, max: 16000, rate: 0.02 },
      { min: 16000, max: 80000, rate: 0.045 },
      { min: 80000, max: 160000, rate: 0.055 },
      { min: 160000, max: 320000, rate: 0.06 },
      { min: 320000, max: 400000, rate: 0.065 },
      { min: 400000, max: 800000, rate: 0.069 },
      { min: 800000, max: Infinity, rate: 0.0699 },
    ],
  },
  standardDeductions: {
    single: 0,
    married: 0,
    marriedSeparate: 0,
    headOfHousehold: 0,
  },
  allowanceAmount: 15000,
};

export const DE: StateTaxConfig = {
  name: 'Delaware',
  abbreviation: 'DE',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 2000, rate: 0 },
      { min: 2000, max: 5000, rate: 0.022 },
      { min: 5000, max: 10000, rate: 0.039 },
      { min: 10000, max: 20000, rate: 0.048 },
      { min: 20000, max: 25000, rate: 0.052 },
      { min: 25000, max: 60000, rate: 0.0555 },
      { min: 60000, max: Infinity, rate: 0.066 },
    ],
    married: [
      { min: 0, max: 2000, rate: 0 },
      { min: 2000, max: 5000, rate: 0.022 },
      { min: 5000, max: 10000, rate: 0.039 },
      { min: 10000, max: 20000, rate: 0.048 },
      { min: 20000, max: 25000, rate: 0.052 },
      { min: 25000, max: 60000, rate: 0.0555 },
      { min: 60000, max: Infinity, rate: 0.066 },
    ],
    marriedSeparate: [
      { min: 0, max: 2000, rate: 0 },
      { min: 2000, max: 5000, rate: 0.022 },
      { min: 5000, max: 10000, rate: 0.039 },
      { min: 10000, max: 20000, rate: 0.048 },
      { min: 20000, max: 25000, rate: 0.052 },
      { min: 25000, max: 60000, rate: 0.0555 },
      { min: 60000, max: Infinity, rate: 0.066 },
    ],
    headOfHousehold: [
      { min: 0, max: 2000, rate: 0 },
      { min: 2000, max: 5000, rate: 0.022 },
      { min: 5000, max: 10000, rate: 0.039 },
      { min: 10000, max: 20000, rate: 0.048 },
      { min: 20000, max: 25000, rate: 0.052 },
      { min: 25000, max: 60000, rate: 0.0555 },
      { min: 60000, max: Infinity, rate: 0.066 },
    ],
  },
  standardDeductions: {
    single: 3250,
    married: 6500,
    marriedSeparate: 3250,
    headOfHousehold: 3250,
  },
};

export const HI: StateTaxConfig = {
  name: 'Hawaii',
  abbreviation: 'HI',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 2400, rate: 0.014 },
      { min: 2400, max: 4800, rate: 0.032 },
      { min: 4800, max: 9600, rate: 0.055 },
      { min: 9600, max: 14400, rate: 0.064 },
      { min: 14400, max: 19200, rate: 0.068 },
      { min: 19200, max: 24000, rate: 0.072 },
      { min: 24000, max: 36000, rate: 0.076 },
      { min: 36000, max: 48000, rate: 0.079 },
      { min: 48000, max: 150000, rate: 0.0825 },
      { min: 150000, max: 175000, rate: 0.09 },
      { min: 175000, max: 200000, rate: 0.10 },
      { min: 200000, max: Infinity, rate: 0.11 },
    ],
    married: [
      { min: 0, max: 4800, rate: 0.014 },
      { min: 4800, max: 9600, rate: 0.032 },
      { min: 9600, max: 19200, rate: 0.055 },
      { min: 19200, max: 28800, rate: 0.064 },
      { min: 28800, max: 38400, rate: 0.068 },
      { min: 38400, max: 48000, rate: 0.072 },
      { min: 48000, max: 72000, rate: 0.076 },
      { min: 72000, max: 96000, rate: 0.079 },
      { min: 96000, max: 300000, rate: 0.0825 },
      { min: 300000, max: 350000, rate: 0.09 },
      { min: 350000, max: 400000, rate: 0.10 },
      { min: 400000, max: Infinity, rate: 0.11 },
    ],
    marriedSeparate: [
      { min: 0, max: 2400, rate: 0.014 },
      { min: 2400, max: 4800, rate: 0.032 },
      { min: 4800, max: 9600, rate: 0.055 },
      { min: 9600, max: 14400, rate: 0.064 },
      { min: 14400, max: 19200, rate: 0.068 },
      { min: 19200, max: 24000, rate: 0.072 },
      { min: 24000, max: 36000, rate: 0.076 },
      { min: 36000, max: 48000, rate: 0.079 },
      { min: 48000, max: 150000, rate: 0.0825 },
      { min: 150000, max: 175000, rate: 0.09 },
      { min: 175000, max: 200000, rate: 0.10 },
      { min: 200000, max: Infinity, rate: 0.11 },
    ],
    headOfHousehold: [
      { min: 0, max: 3600, rate: 0.014 },
      { min: 3600, max: 7200, rate: 0.032 },
      { min: 7200, max: 14400, rate: 0.055 },
      { min: 14400, max: 21600, rate: 0.064 },
      { min: 21600, max: 28800, rate: 0.068 },
      { min: 28800, max: 36000, rate: 0.072 },
      { min: 36000, max: 54000, rate: 0.076 },
      { min: 54000, max: 72000, rate: 0.079 },
      { min: 72000, max: 225000, rate: 0.0825 },
      { min: 225000, max: 262500, rate: 0.09 },
      { min: 262500, max: 300000, rate: 0.10 },
      { min: 300000, max: Infinity, rate: 0.11 },
    ],
  },
  standardDeductions: {
    single: 2200,
    married: 4400,
    marriedSeparate: 2200,
    headOfHousehold: 3212,
  },
};

export const KS: StateTaxConfig = {
  name: 'Kansas',
  abbreviation: 'KS',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 15000, rate: 0.031 },
      { min: 15000, max: 30000, rate: 0.0525 },
      { min: 30000, max: Infinity, rate: 0.057 },
    ],
    married: [
      { min: 0, max: 30000, rate: 0.031 },
      { min: 30000, max: 60000, rate: 0.0525 },
      { min: 60000, max: Infinity, rate: 0.057 },
    ],
    marriedSeparate: [
      { min: 0, max: 15000, rate: 0.031 },
      { min: 15000, max: 30000, rate: 0.0525 },
      { min: 30000, max: Infinity, rate: 0.057 },
    ],
    headOfHousehold: [
      { min: 0, max: 15000, rate: 0.031 },
      { min: 15000, max: 30000, rate: 0.0525 },
      { min: 30000, max: Infinity, rate: 0.057 },
    ],
  },
  standardDeductions: {
    single: 3500,
    married: 8000,
    marriedSeparate: 4000,
    headOfHousehold: 6000,
  },
};

export const LA: StateTaxConfig = {
  name: 'Louisiana',
  abbreviation: 'LA',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 12500, rate: 0.0185 },
      { min: 12500, max: 50000, rate: 0.035 },
      { min: 50000, max: Infinity, rate: 0.0425 },
    ],
    married: [
      { min: 0, max: 25000, rate: 0.0185 },
      { min: 25000, max: 100000, rate: 0.035 },
      { min: 100000, max: Infinity, rate: 0.0425 },
    ],
    marriedSeparate: [
      { min: 0, max: 12500, rate: 0.0185 },
      { min: 12500, max: 50000, rate: 0.035 },
      { min: 50000, max: Infinity, rate: 0.0425 },
    ],
    headOfHousehold: [
      { min: 0, max: 12500, rate: 0.0185 },
      { min: 12500, max: 50000, rate: 0.035 },
      { min: 50000, max: Infinity, rate: 0.0425 },
    ],
  },
  standardDeductions: {
    single: 4500,
    married: 9000,
    marriedSeparate: 4500,
    headOfHousehold: 9000,
  },
};

export const ME: StateTaxConfig = {
  name: 'Maine',
  abbreviation: 'ME',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 26050, rate: 0.058 },
      { min: 26050, max: 61600, rate: 0.0675 },
      { min: 61600, max: Infinity, rate: 0.0715 },
    ],
    married: [
      { min: 0, max: 52100, rate: 0.058 },
      { min: 52100, max: 123250, rate: 0.0675 },
      { min: 123250, max: Infinity, rate: 0.0715 },
    ],
    marriedSeparate: [
      { min: 0, max: 26050, rate: 0.058 },
      { min: 26050, max: 61600, rate: 0.0675 },
      { min: 61600, max: Infinity, rate: 0.0715 },
    ],
    headOfHousehold: [
      { min: 0, max: 39100, rate: 0.058 },
      { min: 39100, max: 92450, rate: 0.0675 },
      { min: 92450, max: Infinity, rate: 0.0715 },
    ],
  },
  standardDeductions: {
    single: 14600,
    married: 29200,
    marriedSeparate: 14600,
    headOfHousehold: 21900,
  },
};

export const MD: StateTaxConfig = {
  name: 'Maryland',
  abbreviation: 'MD',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 1000, rate: 0.02 },
      { min: 1000, max: 2000, rate: 0.03 },
      { min: 2000, max: 3000, rate: 0.04 },
      { min: 3000, max: 100000, rate: 0.0475 },
      { min: 100000, max: 125000, rate: 0.05 },
      { min: 125000, max: 150000, rate: 0.0525 },
      { min: 150000, max: 250000, rate: 0.055 },
      { min: 250000, max: Infinity, rate: 0.0575 },
    ],
    married: [
      { min: 0, max: 1000, rate: 0.02 },
      { min: 1000, max: 2000, rate: 0.03 },
      { min: 2000, max: 3000, rate: 0.04 },
      { min: 3000, max: 150000, rate: 0.0475 },
      { min: 150000, max: 175000, rate: 0.05 },
      { min: 175000, max: 225000, rate: 0.0525 },
      { min: 225000, max: 300000, rate: 0.055 },
      { min: 300000, max: Infinity, rate: 0.0575 },
    ],
    marriedSeparate: [
      { min: 0, max: 1000, rate: 0.02 },
      { min: 1000, max: 2000, rate: 0.03 },
      { min: 2000, max: 3000, rate: 0.04 },
      { min: 3000, max: 100000, rate: 0.0475 },
      { min: 100000, max: 125000, rate: 0.05 },
      { min: 125000, max: 150000, rate: 0.0525 },
      { min: 150000, max: 250000, rate: 0.055 },
      { min: 250000, max: Infinity, rate: 0.0575 },
    ],
    headOfHousehold: [
      { min: 0, max: 1000, rate: 0.02 },
      { min: 1000, max: 2000, rate: 0.03 },
      { min: 2000, max: 3000, rate: 0.04 },
      { min: 3000, max: 150000, rate: 0.0475 },
      { min: 150000, max: 175000, rate: 0.05 },
      { min: 175000, max: 225000, rate: 0.0525 },
      { min: 225000, max: 300000, rate: 0.055 },
      { min: 300000, max: Infinity, rate: 0.0575 },
    ],
  },
  standardDeductions: {
    single: 2550,
    married: 5150,
    marriedSeparate: 2550,
    headOfHousehold: 5150,
  },
  hasLocalTax: true,
  localTaxNotes: 'County taxes apply (2.25% - 3.2%)',
};

export const MN: StateTaxConfig = {
  name: 'Minnesota',
  abbreviation: 'MN',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 31690, rate: 0.0535 },
      { min: 31690, max: 104090, rate: 0.068 },
      { min: 104090, max: 193240, rate: 0.0785 },
      { min: 193240, max: Infinity, rate: 0.0985 },
    ],
    married: [
      { min: 0, max: 46330, rate: 0.0535 },
      { min: 46330, max: 184040, rate: 0.068 },
      { min: 184040, max: 321450, rate: 0.0785 },
      { min: 321450, max: Infinity, rate: 0.0985 },
    ],
    marriedSeparate: [
      { min: 0, max: 23165, rate: 0.0535 },
      { min: 23165, max: 92020, rate: 0.068 },
      { min: 92020, max: 160725, rate: 0.0785 },
      { min: 160725, max: Infinity, rate: 0.0985 },
    ],
    headOfHousehold: [
      { min: 0, max: 39810, rate: 0.0535 },
      { min: 39810, max: 159135, rate: 0.068 },
      { min: 159135, max: 257345, rate: 0.0785 },
      { min: 257345, max: Infinity, rate: 0.0985 },
    ],
  },
  standardDeductions: {
    single: 14950,
    married: 29900,
    marriedSeparate: 14950,
    headOfHousehold: 22450,
  },
  allowanceAmount: 5200,
};

export const MO: StateTaxConfig = {
  name: 'Missouri',
  abbreviation: 'MO',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 1207, rate: 0 },
      { min: 1207, max: 2414, rate: 0.02 },
      { min: 2414, max: 3621, rate: 0.025 },
      { min: 3621, max: 4828, rate: 0.03 },
      { min: 4828, max: 6035, rate: 0.035 },
      { min: 6035, max: 7242, rate: 0.04 },
      { min: 7242, max: 8449, rate: 0.045 },
      { min: 8449, max: Infinity, rate: 0.048 },
    ],
    married: [
      { min: 0, max: 1207, rate: 0 },
      { min: 1207, max: 2414, rate: 0.02 },
      { min: 2414, max: 3621, rate: 0.025 },
      { min: 3621, max: 4828, rate: 0.03 },
      { min: 4828, max: 6035, rate: 0.035 },
      { min: 6035, max: 7242, rate: 0.04 },
      { min: 7242, max: 8449, rate: 0.045 },
      { min: 8449, max: Infinity, rate: 0.048 },
    ],
    marriedSeparate: [
      { min: 0, max: 1207, rate: 0 },
      { min: 1207, max: 2414, rate: 0.02 },
      { min: 2414, max: 3621, rate: 0.025 },
      { min: 3621, max: 4828, rate: 0.03 },
      { min: 4828, max: 6035, rate: 0.035 },
      { min: 6035, max: 7242, rate: 0.04 },
      { min: 7242, max: 8449, rate: 0.045 },
      { min: 8449, max: Infinity, rate: 0.048 },
    ],
    headOfHousehold: [
      { min: 0, max: 1207, rate: 0 },
      { min: 1207, max: 2414, rate: 0.02 },
      { min: 2414, max: 3621, rate: 0.025 },
      { min: 3621, max: 4828, rate: 0.03 },
      { min: 4828, max: 6035, rate: 0.035 },
      { min: 6035, max: 7242, rate: 0.04 },
      { min: 7242, max: 8449, rate: 0.045 },
      { min: 8449, max: Infinity, rate: 0.048 },
    ],
  },
  standardDeductions: {
    single: 14600,
    married: 29200,
    marriedSeparate: 14600,
    headOfHousehold: 21900,
  },
};

export const NE: StateTaxConfig = {
  name: 'Nebraska',
  abbreviation: 'NE',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 3700, rate: 0.0246 },
      { min: 3700, max: 22170, rate: 0.0351 },
      { min: 22170, max: 35730, rate: 0.0401 },
      { min: 35730, max: Infinity, rate: 0.0455 }, // 4.55% top rate (2026)
    ],
    married: [
      { min: 0, max: 7390, rate: 0.0246 },
      { min: 7390, max: 44350, rate: 0.0351 },
      { min: 44350, max: 71460, rate: 0.0401 },
      { min: 71460, max: Infinity, rate: 0.0455 }, // 4.55% top rate (2026)
    ],
    marriedSeparate: [
      { min: 0, max: 3700, rate: 0.0246 },
      { min: 3700, max: 22170, rate: 0.0351 },
      { min: 22170, max: 35730, rate: 0.0401 },
      { min: 35730, max: Infinity, rate: 0.0455 }, // 4.55% top rate (2026)
    ],
    headOfHousehold: [
      { min: 0, max: 6620, rate: 0.0246 },
      { min: 6620, max: 33100, rate: 0.0351 },
      { min: 33100, max: 53600, rate: 0.0401 },
      { min: 53600, max: Infinity, rate: 0.0455 }, // 4.55% top rate (2026)
    ],
  },
  standardDeductions: {
    single: 8050,
    married: 16100,
    marriedSeparate: 8050,
    headOfHousehold: 11450,
  },
};

export const NJ: StateTaxConfig = {
  name: 'New Jersey',
  abbreviation: 'NJ',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 20000, rate: 0.014 },
      { min: 20000, max: 35000, rate: 0.0175 },
      { min: 35000, max: 40000, rate: 0.035 },
      { min: 40000, max: 75000, rate: 0.05525 },
      { min: 75000, max: 500000, rate: 0.0637 },
      { min: 500000, max: 1000000, rate: 0.0897 },
      { min: 1000000, max: Infinity, rate: 0.1075 },
    ],
    married: [
      { min: 0, max: 20000, rate: 0.014 },
      { min: 20000, max: 50000, rate: 0.0175 },
      { min: 50000, max: 70000, rate: 0.0245 },
      { min: 70000, max: 80000, rate: 0.035 },
      { min: 80000, max: 150000, rate: 0.05525 },
      { min: 150000, max: 500000, rate: 0.0637 },
      { min: 500000, max: 1000000, rate: 0.0897 },
      { min: 1000000, max: Infinity, rate: 0.1075 },
    ],
    marriedSeparate: [
      { min: 0, max: 20000, rate: 0.014 },
      { min: 20000, max: 35000, rate: 0.0175 },
      { min: 35000, max: 40000, rate: 0.035 },
      { min: 40000, max: 75000, rate: 0.05525 },
      { min: 75000, max: 500000, rate: 0.0637 },
      { min: 500000, max: 1000000, rate: 0.0897 },
      { min: 1000000, max: Infinity, rate: 0.1075 },
    ],
    headOfHousehold: [
      { min: 0, max: 20000, rate: 0.014 },
      { min: 20000, max: 50000, rate: 0.0175 },
      { min: 50000, max: 70000, rate: 0.0245 },
      { min: 70000, max: 80000, rate: 0.035 },
      { min: 80000, max: 150000, rate: 0.05525 },
      { min: 150000, max: 500000, rate: 0.0637 },
      { min: 500000, max: 1000000, rate: 0.0897 },
      { min: 1000000, max: Infinity, rate: 0.1075 },
    ],
  },
  standardDeductions: {
    single: 0,
    married: 0,
    marriedSeparate: 0,
    headOfHousehold: 0,
  },
  allowanceAmount: 1000,
};

export const NM: StateTaxConfig = {
  name: 'New Mexico',
  abbreviation: 'NM',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 5500, rate: 0.017 },
      { min: 5500, max: 11000, rate: 0.032 },
      { min: 11000, max: 16000, rate: 0.047 },
      { min: 16000, max: 210000, rate: 0.049 },
      { min: 210000, max: Infinity, rate: 0.059 },
    ],
    married: [
      { min: 0, max: 8000, rate: 0.017 },
      { min: 8000, max: 16000, rate: 0.032 },
      { min: 16000, max: 24000, rate: 0.047 },
      { min: 24000, max: 315000, rate: 0.049 },
      { min: 315000, max: Infinity, rate: 0.059 },
    ],
    marriedSeparate: [
      { min: 0, max: 4000, rate: 0.017 },
      { min: 4000, max: 8000, rate: 0.032 },
      { min: 8000, max: 12000, rate: 0.047 },
      { min: 12000, max: 157500, rate: 0.049 },
      { min: 157500, max: Infinity, rate: 0.059 },
    ],
    headOfHousehold: [
      { min: 0, max: 8000, rate: 0.017 },
      { min: 8000, max: 16000, rate: 0.032 },
      { min: 16000, max: 24000, rate: 0.047 },
      { min: 24000, max: 315000, rate: 0.049 },
      { min: 315000, max: Infinity, rate: 0.059 },
    ],
  },
  standardDeductions: {
    single: 14600,
    married: 29200,
    marriedSeparate: 14600,
    headOfHousehold: 21900,
  },
};

export const NY: StateTaxConfig = {
  name: 'New York',
  abbreviation: 'NY',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 8500, rate: 0.04 },
      { min: 8500, max: 11700, rate: 0.045 },
      { min: 11700, max: 13900, rate: 0.0525 },
      { min: 13900, max: 80650, rate: 0.0585 },
      { min: 80650, max: 215400, rate: 0.0625 },
      { min: 215400, max: 1077550, rate: 0.0685 },
      { min: 1077550, max: 5000000, rate: 0.0965 },
      { min: 5000000, max: 25000000, rate: 0.103 },
      { min: 25000000, max: Infinity, rate: 0.109 },
    ],
    married: [
      { min: 0, max: 17150, rate: 0.04 },
      { min: 17150, max: 23600, rate: 0.045 },
      { min: 23600, max: 27900, rate: 0.0525 },
      { min: 27900, max: 161550, rate: 0.0585 },
      { min: 161550, max: 323200, rate: 0.0625 },
      { min: 323200, max: 2155350, rate: 0.0685 },
      { min: 2155350, max: 5000000, rate: 0.0965 },
      { min: 5000000, max: 25000000, rate: 0.103 },
      { min: 25000000, max: Infinity, rate: 0.109 },
    ],
    marriedSeparate: [
      { min: 0, max: 8500, rate: 0.04 },
      { min: 8500, max: 11700, rate: 0.045 },
      { min: 11700, max: 13900, rate: 0.0525 },
      { min: 13900, max: 80650, rate: 0.0585 },
      { min: 80650, max: 215400, rate: 0.0625 },
      { min: 215400, max: 1077550, rate: 0.0685 },
      { min: 1077550, max: 5000000, rate: 0.0965 },
      { min: 5000000, max: 25000000, rate: 0.103 },
      { min: 25000000, max: Infinity, rate: 0.109 },
    ],
    headOfHousehold: [
      { min: 0, max: 12800, rate: 0.04 },
      { min: 12800, max: 17650, rate: 0.045 },
      { min: 17650, max: 20900, rate: 0.0525 },
      { min: 20900, max: 107650, rate: 0.0585 },
      { min: 107650, max: 269300, rate: 0.0625 },
      { min: 269300, max: 1616450, rate: 0.0685 },
      { min: 1616450, max: 5000000, rate: 0.0965 },
      { min: 5000000, max: 25000000, rate: 0.103 },
      { min: 25000000, max: Infinity, rate: 0.109 },
    ],
  },
  standardDeductions: {
    single: 8000,
    married: 16050,
    marriedSeparate: 8000,
    headOfHousehold: 11200,
  },
  hasLocalTax: true,
  localTaxNotes: 'NYC residents pay additional 3.078% - 3.876%',
};

export const OH: StateTaxConfig = {
  name: 'Ohio',
  abbreviation: 'OH',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 26050, rate: 0 },
      { min: 26050, max: Infinity, rate: 0.0275 }, // 2.75% flat rate above $26,050 (2026)
    ],
    married: [
      { min: 0, max: 26050, rate: 0 },
      { min: 26050, max: Infinity, rate: 0.0275 }, // 2.75% flat rate above $26,050 (2026)
    ],
    marriedSeparate: [
      { min: 0, max: 26050, rate: 0 },
      { min: 26050, max: Infinity, rate: 0.0275 }, // 2.75% flat rate above $26,050 (2026)
    ],
    headOfHousehold: [
      { min: 0, max: 26050, rate: 0 },
      { min: 26050, max: Infinity, rate: 0.0275 }, // 2.75% flat rate above $26,050 (2026)
    ],
  },
  standardDeductions: {
    single: 0,
    married: 0,
    marriedSeparate: 0,
    headOfHousehold: 0,
  },
  hasLocalTax: true,
  localTaxNotes: 'Most cities have local income taxes (1% - 3%)',
};

export const OK: StateTaxConfig = {
  name: 'Oklahoma',
  abbreviation: 'OK',
  hasIncomeTax: true,
  brackets: {
    // 2026: Simplified to 3 brackets with 4.5% top rate
    single: [
      { min: 0, max: 1000, rate: 0.0025 },
      { min: 1000, max: 7200, rate: 0.0275 },
      { min: 7200, max: Infinity, rate: 0.045 }, // 4.5% top rate (2026)
    ],
    married: [
      { min: 0, max: 2000, rate: 0.0025 },
      { min: 2000, max: 12200, rate: 0.0275 },
      { min: 12200, max: Infinity, rate: 0.045 }, // 4.5% top rate (2026)
    ],
    marriedSeparate: [
      { min: 0, max: 1000, rate: 0.0025 },
      { min: 1000, max: 7200, rate: 0.0275 },
      { min: 7200, max: Infinity, rate: 0.045 }, // 4.5% top rate (2026)
    ],
    headOfHousehold: [
      { min: 0, max: 2000, rate: 0.0025 },
      { min: 2000, max: 12200, rate: 0.0275 },
      { min: 12200, max: Infinity, rate: 0.045 }, // 4.5% top rate (2026)
    ],
  },
  standardDeductions: {
    single: 6350,
    married: 12700,
    marriedSeparate: 6350,
    headOfHousehold: 9350,
  },
};

export const OR: StateTaxConfig = {
  name: 'Oregon',
  abbreviation: 'OR',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 4300, rate: 0.0475 },
      { min: 4300, max: 10750, rate: 0.0675 },
      { min: 10750, max: 125000, rate: 0.0875 },
      { min: 125000, max: Infinity, rate: 0.099 },
    ],
    married: [
      { min: 0, max: 8600, rate: 0.0475 },
      { min: 8600, max: 21500, rate: 0.0675 },
      { min: 21500, max: 250000, rate: 0.0875 },
      { min: 250000, max: Infinity, rate: 0.099 },
    ],
    marriedSeparate: [
      { min: 0, max: 4300, rate: 0.0475 },
      { min: 4300, max: 10750, rate: 0.0675 },
      { min: 10750, max: 125000, rate: 0.0875 },
      { min: 125000, max: Infinity, rate: 0.099 },
    ],
    headOfHousehold: [
      { min: 0, max: 8600, rate: 0.0475 },
      { min: 8600, max: 21500, rate: 0.0675 },
      { min: 21500, max: 250000, rate: 0.0875 },
      { min: 250000, max: Infinity, rate: 0.099 },
    ],
  },
  standardDeductions: {
    single: 2745,
    married: 5495,
    marriedSeparate: 2745,
    headOfHousehold: 4420,
  },
};

export const RI: StateTaxConfig = {
  name: 'Rhode Island',
  abbreviation: 'RI',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 77450, rate: 0.0375 },
      { min: 77450, max: 176050, rate: 0.0475 },
      { min: 176050, max: Infinity, rate: 0.0599 },
    ],
    married: [
      { min: 0, max: 77450, rate: 0.0375 },
      { min: 77450, max: 176050, rate: 0.0475 },
      { min: 176050, max: Infinity, rate: 0.0599 },
    ],
    marriedSeparate: [
      { min: 0, max: 77450, rate: 0.0375 },
      { min: 77450, max: 176050, rate: 0.0475 },
      { min: 176050, max: Infinity, rate: 0.0599 },
    ],
    headOfHousehold: [
      { min: 0, max: 77450, rate: 0.0375 },
      { min: 77450, max: 176050, rate: 0.0475 },
      { min: 176050, max: Infinity, rate: 0.0599 },
    ],
  },
  standardDeductions: {
    single: 10550,
    married: 21150,
    marriedSeparate: 10550,
    headOfHousehold: 15825,
  },
};

export const SC: StateTaxConfig = {
  name: 'South Carolina',
  abbreviation: 'SC',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 3460, rate: 0 },
      { min: 3460, max: 17330, rate: 0.03 },
      { min: 17330, max: Infinity, rate: 0.064 },
    ],
    married: [
      { min: 0, max: 3460, rate: 0 },
      { min: 3460, max: 17330, rate: 0.03 },
      { min: 17330, max: Infinity, rate: 0.064 },
    ],
    marriedSeparate: [
      { min: 0, max: 3460, rate: 0 },
      { min: 3460, max: 17330, rate: 0.03 },
      { min: 17330, max: Infinity, rate: 0.064 },
    ],
    headOfHousehold: [
      { min: 0, max: 3460, rate: 0 },
      { min: 3460, max: 17330, rate: 0.03 },
      { min: 17330, max: Infinity, rate: 0.064 },
    ],
  },
  standardDeductions: {
    single: 14600,
    married: 29200,
    marriedSeparate: 14600,
    headOfHousehold: 21900,
  },
};

export const VT: StateTaxConfig = {
  name: 'Vermont',
  abbreviation: 'VT',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 45400, rate: 0.0335 },
      { min: 45400, max: 110050, rate: 0.066 },
      { min: 110050, max: 229550, rate: 0.076 },
      { min: 229550, max: Infinity, rate: 0.0875 },
    ],
    married: [
      { min: 0, max: 75850, rate: 0.0335 },
      { min: 75850, max: 183400, rate: 0.066 },
      { min: 183400, max: 279450, rate: 0.076 },
      { min: 279450, max: Infinity, rate: 0.0875 },
    ],
    marriedSeparate: [
      { min: 0, max: 37950, rate: 0.0335 },
      { min: 37950, max: 91700, rate: 0.066 },
      { min: 91700, max: 139725, rate: 0.076 },
      { min: 139725, max: Infinity, rate: 0.0875 },
    ],
    headOfHousehold: [
      { min: 0, max: 60600, rate: 0.0335 },
      { min: 60600, max: 146700, rate: 0.066 },
      { min: 146700, max: 254500, rate: 0.076 },
      { min: 254500, max: Infinity, rate: 0.0875 },
    ],
  },
  standardDeductions: {
    single: 7000,
    married: 14050,
    marriedSeparate: 7000,
    headOfHousehold: 10575,
  },
};

export const VA: StateTaxConfig = {
  name: 'Virginia',
  abbreviation: 'VA',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 3000, rate: 0.02 },
      { min: 3000, max: 5000, rate: 0.03 },
      { min: 5000, max: 17000, rate: 0.05 },
      { min: 17000, max: Infinity, rate: 0.0575 },
    ],
    married: [
      { min: 0, max: 3000, rate: 0.02 },
      { min: 3000, max: 5000, rate: 0.03 },
      { min: 5000, max: 17000, rate: 0.05 },
      { min: 17000, max: Infinity, rate: 0.0575 },
    ],
    marriedSeparate: [
      { min: 0, max: 3000, rate: 0.02 },
      { min: 3000, max: 5000, rate: 0.03 },
      { min: 5000, max: 17000, rate: 0.05 },
      { min: 17000, max: Infinity, rate: 0.0575 },
    ],
    headOfHousehold: [
      { min: 0, max: 3000, rate: 0.02 },
      { min: 3000, max: 5000, rate: 0.03 },
      { min: 5000, max: 17000, rate: 0.05 },
      { min: 17000, max: Infinity, rate: 0.0575 },
    ],
  },
  standardDeductions: {
    single: 8500,
    married: 17000,
    marriedSeparate: 8500,
    headOfHousehold: 8500,
  },
};

export const WV: StateTaxConfig = {
  name: 'West Virginia',
  abbreviation: 'WV',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 10000, rate: 0.0236 },
      { min: 10000, max: 25000, rate: 0.0315 },
      { min: 25000, max: 40000, rate: 0.0354 },
      { min: 40000, max: 60000, rate: 0.0472 },
      { min: 60000, max: Infinity, rate: 0.0512 },
    ],
    married: [
      { min: 0, max: 10000, rate: 0.0236 },
      { min: 10000, max: 25000, rate: 0.0315 },
      { min: 25000, max: 40000, rate: 0.0354 },
      { min: 40000, max: 60000, rate: 0.0472 },
      { min: 60000, max: Infinity, rate: 0.0512 },
    ],
    marriedSeparate: [
      { min: 0, max: 10000, rate: 0.0236 },
      { min: 10000, max: 25000, rate: 0.0315 },
      { min: 25000, max: 40000, rate: 0.0354 },
      { min: 40000, max: 60000, rate: 0.0472 },
      { min: 60000, max: Infinity, rate: 0.0512 },
    ],
    headOfHousehold: [
      { min: 0, max: 10000, rate: 0.0236 },
      { min: 10000, max: 25000, rate: 0.0315 },
      { min: 25000, max: 40000, rate: 0.0354 },
      { min: 40000, max: 60000, rate: 0.0472 },
      { min: 60000, max: Infinity, rate: 0.0512 },
    ],
  },
  standardDeductions: {
    single: 0,
    married: 0,
    marriedSeparate: 0,
    headOfHousehold: 0,
  },
  allowanceAmount: 2000,
};

export const WI: StateTaxConfig = {
  name: 'Wisconsin',
  abbreviation: 'WI',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 14320, rate: 0.0354 },
      { min: 14320, max: 28640, rate: 0.0465 },
      { min: 28640, max: 315310, rate: 0.053 },
      { min: 315310, max: Infinity, rate: 0.0765 },
    ],
    married: [
      { min: 0, max: 19090, rate: 0.0354 },
      { min: 19090, max: 38190, rate: 0.0465 },
      { min: 38190, max: 420420, rate: 0.053 },
      { min: 420420, max: Infinity, rate: 0.0765 },
    ],
    marriedSeparate: [
      { min: 0, max: 9550, rate: 0.0354 },
      { min: 9550, max: 19090, rate: 0.0465 },
      { min: 19090, max: 210210, rate: 0.053 },
      { min: 210210, max: Infinity, rate: 0.0765 },
    ],
    headOfHousehold: [
      { min: 0, max: 14320, rate: 0.0354 },
      { min: 14320, max: 28640, rate: 0.0465 },
      { min: 28640, max: 315310, rate: 0.053 },
      { min: 315310, max: Infinity, rate: 0.0765 },
    ],
  },
  standardDeductions: {
    single: 13230,
    married: 24550,
    marriedSeparate: 11410,
    headOfHousehold: 16790,
  },
};

export const DC: StateTaxConfig = {
  name: 'District of Columbia',
  abbreviation: 'DC',
  hasIncomeTax: true,
  brackets: {
    single: [
      { min: 0, max: 10000, rate: 0.04 },
      { min: 10000, max: 40000, rate: 0.06 },
      { min: 40000, max: 60000, rate: 0.065 },
      { min: 60000, max: 250000, rate: 0.085 },
      { min: 250000, max: 500000, rate: 0.0925 },
      { min: 500000, max: 1000000, rate: 0.0975 },
      { min: 1000000, max: Infinity, rate: 0.1075 },
    ],
    married: [
      { min: 0, max: 10000, rate: 0.04 },
      { min: 10000, max: 40000, rate: 0.06 },
      { min: 40000, max: 60000, rate: 0.065 },
      { min: 60000, max: 250000, rate: 0.085 },
      { min: 250000, max: 500000, rate: 0.0925 },
      { min: 500000, max: 1000000, rate: 0.0975 },
      { min: 1000000, max: Infinity, rate: 0.1075 },
    ],
    marriedSeparate: [
      { min: 0, max: 10000, rate: 0.04 },
      { min: 10000, max: 40000, rate: 0.06 },
      { min: 40000, max: 60000, rate: 0.065 },
      { min: 60000, max: 250000, rate: 0.085 },
      { min: 250000, max: 500000, rate: 0.0925 },
      { min: 500000, max: 1000000, rate: 0.0975 },
      { min: 1000000, max: Infinity, rate: 0.1075 },
    ],
    headOfHousehold: [
      { min: 0, max: 10000, rate: 0.04 },
      { min: 10000, max: 40000, rate: 0.06 },
      { min: 40000, max: 60000, rate: 0.065 },
      { min: 60000, max: 250000, rate: 0.085 },
      { min: 250000, max: 500000, rate: 0.0925 },
      { min: 500000, max: 1000000, rate: 0.0975 },
      { min: 1000000, max: Infinity, rate: 0.1075 },
    ],
  },
  standardDeductions: {
    single: 14600,
    married: 29200,
    marriedSeparate: 14600,
    headOfHousehold: 21900,
  },
};
