'use client';

import { useState, useRef, useEffect } from 'react';
import { getStatesList, getStateConfig } from '@/lib/taxCalculations';
import USFlag from './USFlag';

const STATES_LIST = getStatesList();

// Group states by tax type for better organization
const NO_TAX_STATES = ['AK', 'FL', 'NV', 'NH', 'SD', 'TN', 'TX', 'WA', 'WY'];

interface StateSelectorProps {
  value: string;
  onChange: (stateCode: string) => void;
}

export default function StateSelector({ value, onChange }: StateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filterNoTax, setFilterNoTax] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedState = STATES_LIST.find(s => s.code === value);

  // Filter states based on search and tax filter
  const filteredStates = STATES_LIST.filter(state => {
    const matchesSearch = state.name.toLowerCase().includes(search.toLowerCase()) ||
      state.code.toLowerCase().includes(search.toLowerCase());
    const matchesTaxFilter = !filterNoTax || NO_TAX_STATES.includes(state.code);
    return matchesSearch && matchesTaxFilter;
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch('');
        setFilterNoTax(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (stateCode: string) => {
    onChange(stateCode);
    setIsOpen(false);
    setSearch('');
    setFilterNoTax(false);
  };

  const stateConfig = getStateConfig(value);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* US States Header */}
      <div className="flex items-center gap-2 mb-3">
        <USFlag size="sm" className="rounded-sm" />
        <span className="text-xs sm:text-sm font-medium text-stone-600">Select U.S. State</span>
      </div>

      {/* Selected State Display / Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-stone-50 border border-stone-200 rounded-xl p-3 sm:p-4 hover:border-stone-400 focus:border-stone-800 focus:outline-none transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-base sm:text-lg">{value}</span>
            </div>
            <div>
              <p className="font-semibold text-stone-800 text-base sm:text-lg">{selectedState?.name || 'Select State'}</p>
              {stateConfig && (
                <p className="text-xs sm:text-sm text-stone-500">
                  {stateConfig.hasIncomeTax
                    ? stateConfig.flatRate
                      ? `${(stateConfig.flatRate * 100).toFixed(2)}% flat rate`
                      : 'Progressive tax'
                    : 'No state income tax'
                  }
                </p>
              )}
            </div>
          </div>
          <svg
            className={`w-5 h-5 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-stone-200 rounded-xl shadow-xl overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-stone-100">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search states..."
                className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-400"
              />
            </div>
          </div>

          {/* States List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredStates.length === 0 ? (
              <div className="p-4 text-center text-stone-500">No states found</div>
            ) : (
              filteredStates.map((state) => {
                const config = getStateConfig(state.code);
                const isNoTax = NO_TAX_STATES.includes(state.code);
                const isSelected = state.code === value;

                return (
                  <button
                    key={state.code}
                    type="button"
                    onClick={() => handleSelect(state.code)}
                    className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-stone-50 transition-colors ${
                      isSelected ? 'bg-amber-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                        isSelected
                          ? 'bg-amber-600 text-white'
                          : isNoTax
                            ? 'bg-green-100 text-green-700'
                            : 'bg-stone-100 text-stone-600'
                      }`}>
                        {state.code}
                      </span>
                      <div>
                        <p className={`font-medium ${isSelected ? 'text-amber-700' : 'text-stone-800'}`}>
                          {state.name}
                        </p>
                        <p className="text-xs text-stone-500">
                          {config?.hasIncomeTax
                            ? config.flatRate
                              ? `${(config.flatRate * 100).toFixed(2)}% flat`
                              : 'Progressive'
                            : 'No income tax'
                          }
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Quick Filter Buttons */}
          <div className="p-3 border-t border-stone-100 bg-stone-50">
            <p className="text-xs text-stone-500 mb-2">Quick filter:</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFilterNoTax(false)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  !filterNoTax
                    ? 'bg-stone-800 text-white'
                    : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                }`}
              >
                All States
              </button>
              <button
                type="button"
                onClick={() => setFilterNoTax(true)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  filterNoTax
                    ? 'bg-green-600 text-white'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                No Income Tax
              </button>
            </div>
          </div>
        </div>
      )}

      {/* State Info Banner */}
      {stateConfig && (
        <div className={`mt-2 sm:mt-3 p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${
          !stateConfig.hasIncomeTax
            ? 'bg-green-50 border border-green-200 text-green-700'
            : stateConfig.notes || stateConfig.hasLocalTax
              ? 'bg-amber-50 border border-amber-200 text-amber-700'
              : 'bg-stone-50 border border-stone-200 text-stone-600'
        }`}>
          {!stateConfig.hasIncomeTax ? (
            <p><span className="font-medium">{stateConfig.name}</span> has no state income tax.</p>
          ) : (
            <>
              {stateConfig.notes && <p>{stateConfig.notes}</p>}
              {stateConfig.hasLocalTax && (
                <p className={stateConfig.notes ? 'mt-1' : ''}>{stateConfig.localTaxNotes}</p>
              )}
              {!stateConfig.notes && !stateConfig.hasLocalTax && (
                <p>Standard {stateConfig.flatRate ? 'flat rate' : 'progressive'} income tax applies.</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
