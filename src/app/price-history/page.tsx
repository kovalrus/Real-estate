'use client';

import { useState } from 'react';
import type { PropertyResponse, PropertyHistoryItem as PriceHistoryItem } from '@/lib/types/property';
import PriceHistoryChart from '@/app/components/PriceHistoryChart';
import Header from '@/app/components/Header';
import ParallaxHero from '@/app/components/ParallaxHero';
import InterestRateWidget from '@/app/components/InterestRateWidget';

interface Statistics {
  price: {
    max: number;
    min: number;
    avg: number;
  };
}

export default function PriceHistoryPage() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PropertyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateStatistics = (priceHistory: PriceHistoryItem[]): Statistics => {
    const validPrices = priceHistory
      .filter((item: PriceHistoryItem) => item.price != null && !isNaN(item.price) && item.price > 0)
      .map((item: PriceHistoryItem) => item.price);

    if (validPrices.length === 0) {
      return {
        price: {
          max: 0,
          min: 0,
          avg: 0
        }
      };
    }

    return {
      price: {
        max: Math.max(...validPrices),
        min: Math.min(...validPrices),
        avg: validPrices.reduce((sum, price) => sum + price, 0) / validPrices.length
      }
    };
  };

  const handleSearch = async () => {
    if (!address.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const encodedAddress = encodeURIComponent(address);
      const response = await fetch(`https://zillow-working-api.p.rapidapi.com/pricehistory?byaddress=${encodedAddress}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'accept-language': 'uk,en-US;q=0.9,en-GB;q=0.8,en;q=0.7,ru;q=0.6',
          'x-rapidapi-host': 'zillow-working-api.p.rapidapi.com',
          'X-RapidAPI-Key': '8a4f7c83femshc4aef8e2542ecc7p124cf7jsn3b7c67944538',
        },
      });

      const data = await response.json();
      console.log('API Response:', data);
      console.log('Price history:', data?.priceHistory);
      console.log('Price values:', data?.priceHistory?.map((item: PriceHistoryItem) => item.price));
      setResult(data);
    } catch (err) {
      console.error('Error details:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <InterestRateWidget />
      <ParallaxHero
        title="Price History"
        description="Track property value changes over time"
        imageUrl="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3"
      />

      <main className="py-12 px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Search Input with shadow */}
          <div className="bg-white rounded-lg shadow-xl p-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address (e.g., 123 Main St, City, State ZIP)"
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
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="p-4 bg-red-50 text-red-600 rounded-md">
                {error}
              </div>
            </div>
          )}

          {/* Statistics Section */}
          {result?.priceHistory && result.priceHistory.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Maximum Values */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Maximum</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="text-xl font-semibold text-blue-600">
                      {formatCurrency(calculateStatistics(result.priceHistory).price.max)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Minimum Values */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Minimum</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="text-xl font-semibold text-blue-600">
                      {formatCurrency(calculateStatistics(result.priceHistory).price.min)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Average Values */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Average</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="text-xl font-semibold text-blue-600">
                      {formatCurrency(calculateStatistics(result.priceHistory).price.avg)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Price History Chart */}
          {result?.priceHistory && result.priceHistory.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-black mb-4">Price History</h2>
              <PriceHistoryChart priceHistory={result.priceHistory} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Helper function to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}; 