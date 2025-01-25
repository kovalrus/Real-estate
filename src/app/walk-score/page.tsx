'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import ParallaxHero from '@/app/components/ParallaxHero';
import InterestRateWidget from '@/app/components/InterestRateWidget';
import { FaWalking, FaBus, FaBicycle } from 'react-icons/fa';

interface WalkScoreData {
  walkScore: {
    walkscore: number;
    description: string;
    ws_link?: string;
  };
  transitScore: {
    transit_score: number;
    description: string;
    ws_link?: string;
  };
  bikeScore: {
    bikescore: number;
    description: string;
  };
}

const transformApiResponse = (data: any): WalkScoreData => {
  const walkTransitBike = data.walk_transit_bike || {};
  return {
    walkScore: {
      walkscore: walkTransitBike.walkScore?.walkscore ?? 0,
      description: walkTransitBike.walkScore?.description ?? 'No data available',
      ws_link: walkTransitBike.walkScore?.ws_link
    },
    transitScore: {
      transit_score: walkTransitBike.transitScore?.transit_score ?? 0,
      description: walkTransitBike.transitScore?.description ?? 'No data available',
      ws_link: walkTransitBike.transitScore?.ws_link
    },
    bikeScore: {
      bikescore: walkTransitBike.bikeScore?.bikescore ?? 0,
      description: walkTransitBike.bikeScore?.description ?? 'No data available'
    }
  };
};

export default function WalkScorePage() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<WalkScoreData | null>(null);

  const handleSearch = async () => {
    if (!address.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const encodedAddress = encodeURIComponent(address);
      const response = await fetch(`https://zillow-working-api.p.rapidapi.com/walk_transit_bike?byaddress=${encodedAddress}`, {
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

      if (data.message !== "200: Success") {
        throw new Error('Unable to find data for this address');
      }

      const transformedData = transformApiResponse(data);

      // Check if we have at least one valid score
      if (transformedData.walkScore.walkscore === 0 && 
          transformedData.transitScore.transit_score === 0 && 
          transformedData.bikeScore.bikescore === 0) {
        throw new Error('No walk, transit, or bike score data available for this address');
      }

      setResult(transformedData);
    } catch (err) {
      console.error('Error details:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching the data');
    } finally {
      setIsLoading(false);
    }
  };

  const ScoreCard = ({ 
    scoreData, 
    label, 
    icon,
    scoreKey
  }: { 
    scoreData: { [key: string]: any }; 
    label: string; 
    icon: React.ReactNode;
    scoreKey: 'walkscore' | 'transit_score' | 'bikescore';
  }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl text-blue-600">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
      </div>
      <div className="relative h-4 bg-gray-200 rounded-full mb-3">
        <div 
          className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
          style={{ width: `${scoreData[scoreKey]}%` }}
        />
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-3xl font-bold text-blue-600">{scoreData[scoreKey]}</span>
        <span className="text-sm text-gray-600">out of 100</span>
      </div>
      <p className="text-sm text-gray-600">{scoreData.description}</p>
      {scoreData.ws_link && (
        <a 
          href={scoreData.ws_link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline mt-2 inline-block"
        >
          View Details →
        </a>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <InterestRateWidget />
      <ParallaxHero
        title="Walk Score"
        description="Discover how walkable your neighborhood is"
        imageUrl="https://images.unsplash.com/photo-1581622558663-b2e33377dfb2?ixlib=rb-4.0.3"
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

          {/* Results */}
          {result && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ScoreCard 
                  scoreData={result.walkScore}
                  label="Walk Score"
                  icon={<FaWalking />}
                  scoreKey="walkscore"
                />
                <ScoreCard 
                  scoreData={result.transitScore}
                  label="Transit Score"
                  icon={<FaBus />}
                  scoreKey="transit_score"
                />
                <ScoreCard 
                  scoreData={result.bikeScore}
                  label="Bike Score"
                  icon={<FaBicycle />}
                  scoreKey="bikescore"
                />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
} 