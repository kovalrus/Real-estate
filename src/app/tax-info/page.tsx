'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import TaxInfoChart from '@/app/components/TaxInfoChart';
import ParallaxHero from '@/app/components/ParallaxHero';
import InterestRateWidget from '@/app/components/InterestRateWidget';

interface TaxHistoryItem {
  time: number;
  taxPaid: number;
  value: number | null;
  taxIncreaseRate: number;
  valueIncreaseRate: number;
}

interface TaxInfoResponse {
  message: string;
  source: string;
  taxHistory: TaxHistoryItem[];
}

interface Statistics {
  tax: {
    max: number;
    min: number;
    avg: number;
  };
  value: {
    max: number;
    min: number;
    avg: number;
  };
}

export default function TaxInfoPage() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TaxInfoResponse | null>(null);

  const calculateStatistics = (taxHistory: TaxHistoryItem[]): Statistics => {
    const validValues = taxHistory.filter(item => item.value !== null);
    
    return {
      tax: {
        max: Math.max(...taxHistory.map(item => item.taxPaid)),
        min: Math.min(...taxHistory.map(item => item.taxPaid)),
        avg: taxHistory.reduce((sum, item) => sum + item.taxPaid, 0) / taxHistory.length
      },
      value: {
        max: Math.max(...validValues.map(item => item.value as number)),
        min: Math.min(...validValues.map(item => item.value as number)),
        avg: validValues.reduce((sum, item) => sum + (item.value as number), 0) / validValues.length
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
      const response = await fetch(`https://zillow-working-api.p.rapidapi.com/taxinfo?byaddress=${encodedAddress}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'accept-language': 'uk,en-US;q=0.9,en-GB;q=0.8,en;q=0.7,ru;q=0.6',
          'x-rapidapi-host': 'zillow-working-api.p.rapidapi.com',
          'X-RapidAPI-Key': '8a4f7c83femshc4aef8e2542ecc7p124cf7jsn3b7c67944538',
        },
      });

      const data = await response.json();
      console.log('Full API Response:', JSON.stringify(data, null, 2));
      console.log('Response structure:', {
        hasData: Boolean(data?.data),
        dataKeys: data?.data ? Object.keys(data.data) : [],
        hasProperty: Boolean(data?.data?.property),
        propertyKeys: data?.data?.property ? Object.keys(data.data.property) : [],
        hasTaxHistory: Boolean(data?.data?.property?.taxHistory),
      });

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
        title="Tax Information"
        description="View property tax history and assessment details"
        imageUrl="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3"
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
          {result?.taxHistory && result.taxHistory.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Maximum Values */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Maximum</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Tax Paid</p>
                    <p className="text-xl font-semibold text-blue-600">
                      {formatCurrency(calculateStatistics(result.taxHistory).tax.max)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Property Value</p>
                    <p className="text-xl font-semibold text-green-600">
                      {formatCurrency(calculateStatistics(result.taxHistory).value.max)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Minimum Values */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Minimum</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Tax Paid</p>
                    <p className="text-xl font-semibold text-blue-600">
                      {formatCurrency(calculateStatistics(result.taxHistory).tax.min)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Property Value</p>
                    <p className="text-xl font-semibold text-green-600">
                      {formatCurrency(calculateStatistics(result.taxHistory).value.min)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Average Values */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Average</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Tax Paid</p>
                    <p className="text-xl font-semibold text-blue-600">
                      {formatCurrency(calculateStatistics(result.taxHistory).tax.avg)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Property Value</p>
                    <p className="text-xl font-semibold text-green-600">
                      {formatCurrency(calculateStatistics(result.taxHistory).value.avg)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tax History Chart */}
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">Loading tax history...</p>
            </div>
          ) : result?.taxHistory ? (
            result.taxHistory.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-black mb-4">Tax History</h2>
                <TaxInfoChart taxHistory={result.taxHistory} />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600">No tax history available for this property.</p>
              </div>
            )
          ) : null}

          {/* Raw Data Display */}
          
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