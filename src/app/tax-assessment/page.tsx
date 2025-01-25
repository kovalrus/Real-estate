'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import ParallaxHero from '@/app/components/ParallaxHero';
import InterestRateWidget from '@/app/components/InterestRateWidget';
import TaxAssessmentChart from '@/app/components/TaxAssessmentChart';

interface DataPoint {
  x: number;  // timestamp
  y: number;  // value
}

interface ChartSeries {
  points: DataPoint[];
  name: string;
}

interface TaxAssessmentResponse {
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
  };
}

export default function TaxAssessmentPage() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TaxAssessmentResponse | null>(null);

  const handleSearch = async () => {
    if (!address.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const encodedAddress = encodeURIComponent(address);
      const response = await fetch(
        `https://zillow-working-api.p.rapidapi.com/graph_charts?byaddress=${encodedAddress}&recent_first=True&which=tax_assessment`, {
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
      console.log('DataPoints structure:', {
        hasDates: Array.isArray(data.DataPoints?.dates),
        hasValues: Array.isArray(data.DataPoints?.values),
        datesLength: data.DataPoints?.dates?.length,
        valuesLength: data.DataPoints?.values?.length,
        sampleDate: data.DataPoints?.dates?.[0],
        sampleValue: data.DataPoints?.values?.[0],
      });

      if (data.message !== "200: Success") {
        throw new Error('Unable to find assessment data for this address');
      }

      setResult(data);
    } catch (err) {
      console.error('Error details:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching the data');
    } finally {
      setIsLoading(false);
    }
  };

  const prepareChartData = (data: TaxAssessmentResponse) => {
    if (!data.DataPoints?.homeValueChartData) {
      console.log('Missing chart data');
      return [];
    }

    // Combine land and structure values
    const chartData = data.DataPoints.homeValueChartData[0].points.map((landPoint, index) => {
      const structurePoint = data.DataPoints.homeValueChartData[1].points[index];
      return {
        date: new Date(landPoint.x).toLocaleDateString(),
        landValue: landPoint.y,
        structureValue: structurePoint.y,
        totalValue: landPoint.y + structurePoint.y
      };
    });

    console.log('Final chart data:', chartData);
    return chartData;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <InterestRateWidget />
      <ParallaxHero
        title="Tax Assessment History"
        description="View historical property tax assessments and valuations"
        imageUrl="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3"
      />

      <main className="py-12 px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Search Input */}
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

          {/* Chart Section */}
          {result && result.DataPoints && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Assessment History</h2>
              <TaxAssessmentChart data={prepareChartData(result)} />
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