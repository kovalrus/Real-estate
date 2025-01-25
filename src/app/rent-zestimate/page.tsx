'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import ParallaxHero from '@/app/components/ParallaxHero';
import InterestRateWidget from '@/app/components/InterestRateWidget';
import RentHistoryChart from '../components/RentHistoryChart';
import { FaHome, FaHistory, FaChartLine } from 'react-icons/fa';

interface DataPoint {
  x: number;  // timestamp
  y: number;  // rent value
}

interface ChartSeries {
  points: DataPoint[];
  name: string;
}

interface RentZestimateResponse {
  message: string;
  source: string;
  GraphType: string;
  RecentFirst: boolean;
  DataPoints: {
    city: string;
    state: string;
    streetAddress: string;
    zipcode: string;
    homeValueChartData: ChartSeries[];
    Current_Rent_Zestimate: number;
  };
}

export default function RentZestimatePage() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RentZestimateResponse | null>(null);

  const handleSearch = async () => {
    if (!address.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const encodedAddress = encodeURIComponent(address);
      const response = await fetch(
        `https://zillow-working-api.p.rapidapi.com/graph_charts?byaddress=${encodedAddress}&recent_first=True&which=rent_zestimate_history`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'accept-language': 'uk,en-US;q=0.9,en-GB;q=0.8,en;q=0.7,ru;q=0.6',
          'x-rapidapi-host': 'zillow-working-api.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
        },
      });

      const data = await response.json();
      console.log('Full API Response:', JSON.stringify(data, null, 2));
      console.log('Current Rent Data:', data?.DataPoints?.Current_Rent_Zestimate);

      if (data.message !== "200: Success") {
        throw new Error('Unable to find rent history data');
      }

      setResult(data);
    } catch (err) {
      console.error('Error details:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const prepareChartData = (data: RentZestimateResponse) => {
    if (!data.DataPoints?.homeValueChartData) {
      console.log('Missing chart data');
      return [];
    }

    // Transform the data points
    return data.DataPoints.homeValueChartData[0].points.map(point => ({
      date: new Date(point.x).toISOString(),
      rent: point.y
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <InterestRateWidget />
      <ParallaxHero
        title="Rent Zestimate History"
        description="Track rental value trends and history"
        imageUrl="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3"
      />

      <main className="py-12 px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Search Input */}
          <div className="bg-white rounded-lg shadow-xl p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Rent History Search</h2>
              <p className="text-gray-600">Enter an address to view rental value history</p>
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address (e.g., 123 Main St, City, State ZIP)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
              />
              <button
                onClick={handleSearch}
                disabled={isLoading || !address.trim()}
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Searching...
                  </span>
                ) : (
                  'Search'
                )}
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

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Current Rent Overview */}
              {result?.DataPoints?.Current_Rent_Zestimate && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Rent Estimate</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FaHome className="text-blue-600" />
                        <p className="text-sm text-gray-600">Current Zestimate</p>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">
                        {formatCurrency(result.DataPoints.Current_Rent_Zestimate)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Rent History Chart */}
              {result && result.DataPoints && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Rent History</h3>
                  <RentHistoryChart rentHistory={prepareChartData(result)} />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 