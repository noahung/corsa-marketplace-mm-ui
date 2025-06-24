import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import SearchFilters from '@/components/SearchFilters';
import CategoryTabs from '@/components/CategoryTabs';
import FeaturedVehicles from '@/components/FeaturedVehicles';
import TrustedDealers from '@/components/TrustedDealers';
import { ShieldCheck, Zap, Users, Calculator, CreditCard, BookOpen, Battery } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    minPrice: 0,
    maxPrice: 10000,
    minYear: 2000,
    maxYear: 2024,
    fuelType: '',
    transmission: '',
    location: ''
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      make: '',
      model: '',
      minPrice: 0,
      maxPrice: 10000,
      minYear: 2000,
      maxYear: 2024,
      fuelType: '',
      transmission: '',
      location: ''
    });
  };

  const handleSearch = () => {
    console.log('Searching with filters:', filters);
    // Implement search logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect
            <span className="text-yellow-400"> Vehicle</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Myanmar's trusted automotive marketplace
          </p>
          
          <SearchBar />
          
          <div className="mt-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-blue-200 hover:text-white underline"
            >
              {showFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
            </button>
          </div>
        </div>
      </section>

      {/* Advanced Filters */}
      {showFilters && (
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              onSearch={handleSearch}
            />
          </div>
        </section>
      )}

      {/* Category Navigation */}
      <CategoryTabs />

      {/* Featured Vehicles */}
      <FeaturedVehicles />

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Complete Automotive Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need for your vehicle journey in Myanmar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/valuation">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="text-center p-6">
                  <Calculator className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Free Valuation</h3>
                  <p className="text-sm text-gray-600">Get instant vehicle valuations based on Myanmar market data</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/finance">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="text-center p-6">
                  <CreditCard className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <h3 className="font-semibold mb-2">Finance & Insurance</h3>
                  <p className="text-sm text-gray-600">Compare loans and insurance from trusted partners</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/ev-hub">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="text-center p-6">
                  <Battery className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="font-semibold mb-2">EV Hub</h3>
                  <p className="text-sm text-gray-600">Explore electric vehicles and charging stations in Myanmar</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/advice">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="text-center p-6">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                  <h3 className="font-semibold mb-2">Expert Advice</h3>
                  <p className="text-sm text-gray-600">Get expert reviews and buying guides for informed decisions</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted Dealers */}
      <TrustedDealers />

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Myanmar's Leading Vehicle Marketplace
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Trusted by thousands of buyers and sellers across the country
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">12.5K+</div>
              <div className="text-blue-100">Vehicles Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">152</div>
              <div className="text-blue-100">Trusted Dealers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">8.7K+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">45</div>
              <div className="text-blue-100">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Spacing for Mobile Navigation */}
      <div className="pb-20 md:pb-0"></div>
    </div>
  );
};

export default Index;
