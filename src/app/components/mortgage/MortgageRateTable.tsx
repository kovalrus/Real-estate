'use client';

import { MortgageRate, MortgageType } from '@/lib/types/mortgage';

interface MortgageRateTableProps {
  type: MortgageType;
  rates: MortgageRate[];
}

export default function MortgageRateTable({ type, rates }: MortgageRateTableProps) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h2 className="text-xl font-semibold text-gray-800">
          Current {type} Mortgage Rates
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Product
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Interest Rate
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                APR
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rates.map((rate, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {rate.productName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {rate.interestRate.toFixed(2)}%
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {rate.apr.toFixed(2)}%
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    See Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 