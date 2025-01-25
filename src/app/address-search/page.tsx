'use client';

import { useState } from 'react';
import { ZillowResponse } from '@/lib/types/zillow';
import PriceHistoryChart from '../components/PriceHistoryChart';

export default function AddressSearchPage() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!address.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/zillow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      const data: ZillowResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch data');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Property Search
          </h1>
          <p className="text-black">
            Enter an address to find property information
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
            />
            <button
              onClick={handleSearch}
              disabled={isLoading || !address.trim()}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Searching...' : 'Find'}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-md mb-4">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-6 space-y-6">
              <h2 className="text-xl font-semibold text-black mb-4">Price History</h2>
              
              {result.data && result.data.priceHistory && (
                <PriceHistoryChart priceHistory={result.data.priceHistory} />
              )}

              <div>
                <h2 className="text-xl font-semibold text-black mb-4">Raw Data</h2>
                <pre className="bg-gray-50 p-4 rounded-md overflow-auto text-black">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 