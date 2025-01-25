'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import ParallaxHero from '@/app/components/ParallaxHero';
import InterestRateWidget from '@/app/components/InterestRateWidget';
import PropertyMap from '@/app/components/PropertyMap';
import { 
  FaMapMarkerAlt, 
  FaCity, 
  FaFlag, 
  FaMapPin, 
  FaBuilding, 
  FaStreetView,
  FaDollarSign,
  FaChartLine,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCalendarAlt,
  FaIdCard,
  FaExternalLinkAlt,
  FaHome
} from 'react-icons/fa';

interface PropertyAddress {
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;
  neighborhood: string | null;
  community: string | null;
  subdivision: string | null;
}

interface ApiResponse {
  message: string;
  Source: string;
  PropertyAddress: PropertyAddress;
  zestimate: number | null;
  Bedrooms: number | null;
  Bathrooms: number | null;
  'Area(sqft)': number | null;
  PropertyZPID: number;
  Price: number;
  yearBuilt: number | null;
  daysOnZillow: number;
  PropertyZillowURL: string;
}

export default function PropertySearchPage() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResponse | null>(null);

  const handleSearch = async () => {
    if (!address.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const encodedAddress = encodeURIComponent(address);
      const response = await fetch(`https://zillow-working-api.p.rapidapi.com/byaddress?address=${encodedAddress}`, {
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
        throw new Error('Unable to find property data');
      }

      setResult(data);
    } catch (err) {
      console.error('Error details:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = (propertyAddress: PropertyAddress): string => {
    const parts = [
      propertyAddress.streetAddress,
      propertyAddress.city,
      propertyAddress.state,
      propertyAddress.zipcode
    ].filter(Boolean);
    return parts.join(', ');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <InterestRateWidget />
      
      {/* Enhanced Hero Section with Larger Background */}
      <div className="relative h-[500px] bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/75" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">
              Find Your Dream Home
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover detailed property information, market values, and neighborhood insights
            </p>
          </div>
        </div>
      </div>

      {/* Search Section with Floating Card */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 mb-12">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Property Search</h2>
            <p className="text-gray-600">Enter an address to get comprehensive property details</p>
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
      </div>

      {/* Results Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mb-12">
        {/* Error Message */}
        {error && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="p-4 bg-red-50 text-red-600 rounded-md">
              {error}
            </div>
          </div>
        )}

        {/* Property Details */}
        {result && (
          <div className="space-y-6">
            {/* Source Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Property Details</h2>
                  <p className="text-sm text-gray-600 mt-1">Source: {result.Source}</p>
                </div>
                <div className="text-sm text-gray-600">
                  {result.daysOnZillow > 0 && 
                    <p>Listed for {result.daysOnZillow} days on Zillow</p>
                  }
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-600" />
                Location Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <FaMapMarkerAlt className="text-blue-600" />
                    <p>Street Address</p>
                  </div>
                  <p className="text-lg font-medium text-gray-900">{result.PropertyAddress.streetAddress}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <FaCity className="text-blue-600" />
                    <p>City</p>
                  </div>
                  <p className="text-lg font-medium text-gray-900">{result.PropertyAddress.city}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <FaFlag className="text-blue-600" />
                    <p>State</p>
                  </div>
                  <p className="text-lg font-medium text-gray-900">{result.PropertyAddress.state}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <FaMapPin className="text-blue-600" />
                    <p>ZIP Code</p>
                  </div>
                  <p className="text-lg font-medium text-gray-900">{result.PropertyAddress.zipcode}</p>
                </div>
                {result.PropertyAddress.subdivision && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <FaBuilding className="text-blue-600" />
                      <p>Subdivision</p>
                    </div>
                    <p className="text-lg font-medium text-gray-900">{result.PropertyAddress.subdivision}</p>
                  </div>
                )}
                {result.PropertyAddress.neighborhood && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <FaStreetView className="text-blue-600" />
                      <p>Neighborhood</p>
                    </div>
                    <p className="text-lg font-medium text-gray-900">{result.PropertyAddress.neighborhood}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaHome className="text-blue-600" />
                Property Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <FaDollarSign className="text-blue-600" />
                    <p>Price</p>
                  </div>
                  <p className="text-lg font-medium text-gray-900">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    }).format(result.Price)}
                  </p>
                </div>
                {result.zestimate && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <FaChartLine className="text-blue-600" />
                      <p>Zestimate</p>
                    </div>
                    <p className="text-lg font-medium text-gray-900">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      }).format(result.zestimate)}
                    </p>
                  </div>
                )}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <FaBed className="text-blue-600" />
                    <p>Bedrooms</p>
                  </div>
                  <p className="text-lg font-medium text-gray-900">{result.Bedrooms || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <FaBath className="text-blue-600" />
                    <p>Bathrooms</p>
                  </div>
                  <p className="text-lg font-medium text-gray-900">{result.Bathrooms || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <FaRulerCombined className="text-blue-600" />
                    <p>Square Footage</p>
                  </div>
                  <p className="text-lg font-medium text-gray-900">
                    {result['Area(sqft)'] ? `${new Intl.NumberFormat('en-US').format(result['Area(sqft)'])} sq ft` : 'N/A'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <FaCalendarAlt className="text-blue-600" />
                    <p>Year Built</p>
                  </div>
                  <p className="text-lg font-medium text-gray-900">{result.yearBuilt || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <FaIdCard className="text-blue-600" />
                    <p>Zillow Property ID</p>
                  </div>
                  <p className="text-lg font-medium text-gray-900">{result.PropertyZPID}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <FaExternalLinkAlt className="text-blue-600" />
                    <p>Zillow Link</p>
                  </div>
                  <a 
                    href={result.PropertyZillowURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    View on Zillow <FaExternalLinkAlt className="text-sm" />
                  </a>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Location</h3>
              <PropertyMap 
                address={result.PropertyAddress.streetAddress}
                city={result.PropertyAddress.city}
                state={result.PropertyAddress.state}
                zipcode={result.PropertyAddress.zipcode}
              />
            </div>
          </div>
        )}
      </div>

      {/* Background Design Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-gray-100 opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>
    </div>
  );
} 