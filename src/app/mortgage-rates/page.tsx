'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import MortgageRateTable from '../components/mortgage/MortgageRateTable';
import MortgageFilters from '../components/mortgage/MortgageFilters';
import { MortgageFilters as MortgageFiltersType, MortgageRate } from '@/lib/types/mortgage';
import { FaChartLine, FaInfoCircle, FaRegClock } from 'react-icons/fa';

const SAMPLE_RATES: MortgageRate[] = [
  { productName: '30-Year Fixed', interestRate: 7.11, apr: 7.16 },
  { productName: '20-Year Fixed', interestRate: 6.91, apr: 6.97 },
  { productName: '15-Year Fixed', interestRate: 6.39, apr: 6.47 },
  { productName: '10-Year Fixed', interestRate: 6.30, apr: 6.38 },
  { productName: '5/1 ARM', interestRate: 6.56, apr: 7.11 },
  { productName: '30-Year FHA', interestRate: 7.07, apr: 7.12 },
  { productName: '30-Year VA', interestRate: 6.88, apr: 6.92 },
  { productName: '30-Year Jumbo', interestRate: 7.14, apr: 7.19 },
];

export default function MortgageRatesPage() {
  const [filters, setFilters] = useState<MortgageFiltersType>({
    mortgageType: 'Purchase',
    purchasePrice: 489450,
    downPayment: 391560,
    creditScore: 780,
    propertyType: 'SingleFamily',
    propertyUse: 'PrimaryResidence',
    zipCode: '29010',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Today's Mortgage Rates
            </h1>
            <p className="text-xl text-blue-100">
              Compare current rates and find the best mortgage option for you
            </p>
          </div>
        </div>
      </div>

      {/* Today's Rates Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Featured Rate Card */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FaChartLine className="text-blue-600 text-xl" />
                  <h3 className="text-lg font-semibold text-gray-900">30-Year Fixed</h3>
                </div>
                <span className="text-sm text-blue-600 font-medium">Most Popular</span>
              </div>
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-blue-600">7.11</span>
                  <span className="text-xl text-gray-600">%</span>
                </div>
                <p className="text-sm text-gray-600">Interest Rate</p>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-700">7.16</span>
                  <span className="text-base text-gray-600">% APR</span>
                </div>
              </div>
            </div>

            {/* Quick Rate Cards */}
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">15-Year Fixed</h4>
                  <p className="text-sm text-gray-600">Lower total interest</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-blue-600">6.39%</p>
                  <p className="text-sm text-gray-600">6.47% APR</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">5/1 ARM</h4>
                  <p className="text-sm text-gray-600">Adjustable rate</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-blue-600">6.56%</p>
                  <p className="text-sm text-gray-600">7.11% APR</p>
                </div>
              </div>
            </div>

            {/* Rate Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaRegClock className="text-blue-600" />
                <p className="text-sm text-gray-600">Last updated: February 19, 2024</p>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <FaInfoCircle className="text-blue-600 mt-1 flex-shrink-0" />
                <p>Rates shown are based on a $489,450 loan amount with 20% down payment and excellent credit score.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MortgageFilters filters={filters} onFilterChange={setFilters} />
        <MortgageRateTable type="Purchase" rates={SAMPLE_RATES} />

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Understanding Today's Mortgage Rates
          </h2>
          <p className="text-gray-600 mb-4">
            Mortgage rates change daily and vary by your location, loan type, credit score, and
            other factors. The rates shown above are national averages based on the assumptions
            shown in your filters.
          </p>
        </div>
      </div>
    </div>
  );
} 