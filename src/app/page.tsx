'use client';

import Header from '@/app/components/Header';
import Link from 'next/link';
import { FaSearch, FaHistory, FaFileInvoiceDollar, FaArrowRight } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div 
        className="relative h-[500px] bg-[url('/images/hero-bg.jpg')] bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/75"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Home
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Explore property values, tax history, and market trends
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/property-search"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <FaSearch /> Search Properties
              </Link>
              <Link 
                href="/price-history"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <FaHistory /> View Price History
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow group">
              <div className="text-blue-600 text-3xl mb-4 group-hover:scale-110 transition-transform">
                <FaSearch />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Property Search</h3>
              <p className="text-gray-600 mb-4">Find detailed information about any property in our database.</p>
              <Link href="/property-search" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2">
                Learn more <FaArrowRight className="text-sm" />
              </Link>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow group">
              <div className="text-blue-600 text-3xl mb-4 group-hover:scale-110 transition-transform">
                <FaHistory />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Price History</h3>
              <p className="text-gray-600 mb-4">Track property value changes and market trends over time.</p>
              <Link href="/price-history" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2">
                Learn more <FaArrowRight className="text-sm" />
              </Link>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow group">
              <div className="text-blue-600 text-3xl mb-4 group-hover:scale-110 transition-transform">
                <FaFileInvoiceDollar />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tax Information</h3>
              <p className="text-gray-600 mb-4">Access property tax history and assessment records.</p>
              <Link href="/tax-info" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2">
                Learn more <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to explore property details?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your search now and get comprehensive property insights.
          </p>
          <Link
            href="/property-search"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Started <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
