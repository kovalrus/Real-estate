'use client';

import Link from 'next/link';
import { 
  FaHome, FaGithub, FaLinkedin, FaEnvelope,
  FaPaintBrush, FaServer, FaCode, FaBug,
  FaTasks, FaUsers, FaChartBar, FaCogs,
  FaHandshake, FaBullhorn, FaSearchDollar, FaChartLine,
  FaDocker, FaRobot, FaShieldAlt, FaDatabase,
  FaCrown
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl mb-4">
              <FaHome className="text-2xl" />
              <span>RealEstate</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Discover your perfect home with comprehensive property insights and market analysis.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/property-search" className="text-gray-600 hover:text-blue-600 text-sm">
                  Property Search
                </Link>
              </li>
              <li>
                <Link href="/price-history" className="text-gray-600 hover:text-blue-600 text-sm">
                  Price History
                </Link>
              </li>
              <li>
                <Link href="/tax-info" className="text-gray-600 hover:text-blue-600 text-sm">
                  Tax Information
                </Link>
              </li>
              <li>
                <Link href="/mortgage-rates" className="text-gray-600 hover:text-blue-600 text-sm">
                  Mortgage Rates
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600 text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-blue-600 text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                <FaGithub size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                <FaLinkedin size={24} />
              </a>
              <a href="mailto:contact@example.com" className="text-gray-600 hover:text-blue-600">
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="border-t mt-8 pt-8">
          <h3 className="font-semibold text-gray-900 mb-4 text-center">Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm text-gray-600">
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <FaPaintBrush className="text-blue-600" />UI/UX Designer - <span className="font-semibold">Ruslan Kovalchuk</span>
              </p>
              <p className="flex items-center gap-2">
                <FaServer className="text-blue-600" />Backend Developer - <span className="font-semibold">Ruslan Kovalchuk</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCode className="text-blue-600" />Frontend Developer - <span className="font-semibold">Ruslan Kovalchuk</span>
              </p>
              <p className="flex items-center gap-2">
                <FaBug className="text-blue-600" />QA Engineer - <span className="font-semibold">Ruslan Kovalchuk</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <FaTasks className="text-blue-600" />Project Manager - <span className="font-semibold">Ruslan Kovalchuk</span>
              </p>
              <p className="flex items-center gap-2">
                <FaUsers className="text-blue-600" />HR - <span className="font-semibold">Ruslan Kovalchuk</span>
              </p>
              <p className="flex items-center gap-2">
                <FaChartBar className="text-blue-600" />Data Analyst - <span className="font-semibold">Ruslan Kovalchuk</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCogs className="text-blue-600" />Product Architect - <span className="font-semibold">Ruslan Kovalchuk</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <FaHandshake className="text-blue-600" />Sales Manager - <span className="font-semibold">Ruslan Kovalchuk</span>
              </p>
              <p className="flex items-center gap-2">
                <FaBullhorn className="text-blue-600" />Marketing Manager - <span className="font-semibold">Ruslan Kovalchuk</span>
              </p>
              <p className="flex items-center gap-2">
                <FaSearchDollar className="text-blue-600" />SEO Manager - <span className="font-semibold">Ruslan Kovalchuk</span>
              </p>
              <p className="flex items-center gap-2">
                <FaChartLine className="text-blue-600" />Business Analyst - <span className="font-semibold">Ruslan Kovalchuk</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <FaDocker className="text-blue-600" />DevOps Engineer - <span className="font-semibold">Ruslan Kovalchuk</span>
              </p>
              <p className="flex items-center gap-2">
                <FaRobot className="text-blue-600" />AI Prompt Engineer - <span className="font-semibold">Ruslan Kovalchuk</span>
              </p>
              <p className="flex items-center gap-2">
                <FaShieldAlt className="text-blue-600" />Cybersecurity Specialist - <span className="font-semibold">Ruslan Kovalchuk</span>
              </p>
              <p className="flex items-center gap-2">
                <FaDatabase className="text-blue-600" />Big Data Engineer - <span className="font-semibold">Ruslan Kovalchuk</span>
              </p>
            </div>
          </div>
          <p className="text-center text-gray-600 font-semibold mt-4 flex items-center justify-center gap-2">
            <FaCrown className="text-blue-600" />CEO - <span className="font-bold">Ruslan Kovalchuk</span>
          </p>
        </div>

        {/* Copyright section */}
        <div className="border-t mt-8 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} RealEstate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 