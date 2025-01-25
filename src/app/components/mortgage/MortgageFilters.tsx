'use client';

import type { MortgageFilters } from '@/lib/types/mortgage';
import { useState } from 'react';

interface MortgageFiltersProps {
  filters: MortgageFilters;
  onFilterChange: (filters: MortgageFilters) => void;
}

export default function MortgageFilters({ filters, onFilterChange }: MortgageFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Customize Your Rate</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-blue-600 hover:text-blue-700"
        >
          {isOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Purchase Price
            </label>
            <input
              type="number"
              value={filters.purchasePrice}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  purchasePrice: Number(e.target.value),
                })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Down Payment
            </label>
            <input
              type="number"
              value={filters.downPayment}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  downPayment: Number(e.target.value),
                })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Credit Score
            </label>
            <select
              value={filters.creditScore}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  creditScore: Number(e.target.value),
                })
              }
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="740">Excellent (740+)</option>
              <option value="700">Good (700-739)</option>
              <option value="680">Fair (680-699)</option>
              <option value="620">Poor (620-679)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              ZIP Code
            </label>
            <input
              type="text"
              value={filters.zipCode}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  zipCode: e.target.value,
                })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
} 