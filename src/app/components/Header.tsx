'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  FaHome, 
  FaSearch, 
  FaHistory, 
  FaFileInvoiceDollar, 
  FaChartLine, 
  FaBars, 
  FaTimes, 
  FaWalking,
  FaCalculator 
} from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/property-search', label: 'Property Search', icon: <FaSearch /> },
    { href: '/price-history', label: 'Price History', icon: <FaHistory /> },
    { href: '/tax-info', label: 'Tax Info', icon: <FaFileInvoiceDollar /> },
    { href: '/tax-assessment', label: 'Tax Assessment History', icon: <FaCalculator /> },
    { href: '/rent-zestimate', label: 'Rent Zestimate', icon: <FaHome /> },
    { href: '/walk-score', label: 'Walk Score', icon: <FaWalking /> },
    { href: '/mortgage-rates', label: 'Mortgage Rates', icon: <FaChartLine /> },
  ];

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <FaHome className="text-2xl" />
            <span>RealEstate</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 