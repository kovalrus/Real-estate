'use client';

import { useState, useEffect } from 'react';
import { FaChartLine, FaHome } from 'react-icons/fa';

interface RateData {
  rate15yr: number;
  rate30yr: number;
  lastUpdated: string;
}

export default function InterestRateWidget() {
  const [rateData, setRateData] = useState<RateData>({
    rate15yr: 6.34,
    rate30yr: 7.12,
    lastUpdated: '2024-02-15'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch this from an API
    // For now, using static data
    setIsLoading(false);
  }, []);

  return (
    <div className="fixed top-20 right-4 z-50 bg-white rounded-lg shadow-xl p-4 border border-gray-200 w-72 backdrop-blur-sm bg-white/90">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaHome className="text-blue-600" />
          <h3 className="text-sm font-semibold text-gray-800">Current Mortgage Rates</h3>
        </div>
        <FaChartLine className="text-blue-600" />
      </div>
      {isLoading ? (
        <div className="space-y-3">
          <div className="animate-pulse h-8 bg-gray-200 rounded w-full" />
          <div className="animate-pulse h-8 bg-gray-200 rounded w-full" />
        </div>
      ) : (
        <>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-600 mb-1">30-Year Fixed</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-blue-600">{rateData.rate30yr}</span>
                <span className="text-sm text-gray-600">%</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-600 mb-1">15-Year Fixed</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-blue-600">{rateData.rate15yr}</span>
                <span className="text-sm text-gray-600">%</span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Last updated: {new Date(rateData.lastUpdated).toLocaleDateString()}
            </p>
            <span className="text-xs text-blue-600 hover:underline cursor-pointer">
              More details →
            </span>
          </div>
        </>
      )}
    </div>
  );
} 