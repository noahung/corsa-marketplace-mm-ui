
import React from 'react';
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import CategoryTabs from '@/components/CategoryTabs';
import FeaturedVehicles from '@/components/FeaturedVehicles';
import TrustedDealers from '@/components/TrustedDealers';
import { ShieldCheck, Zap, Users } from 'lucide-react';

const Index = () => {
  const handleSearch = (filters: any) => {
    console.log('Search filters:', filters);
    // Navigate to search results page
  };

  const handleCategoryChange = (category: string) => {
    console.log('Category changed:', category);
    // Handle category navigation
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Your Perfect Vehicle in 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700"> Myanmar</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Discover thousands of cars and motorbikes from trusted dealers and private sellers across Myanmar.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Verified Sellers</h3>
              <p className="text-sm text-gray-600">All dealers and sellers are verified for your safety</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Instant Search</h3>
              <p className="text-sm text-gray-600">Find your ideal vehicle in seconds with smart filters</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Trusted Community</h3>
              <p className="text-sm text-gray-600">Join thousands of satisfied buyers and sellers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <CategoryTabs onCategoryChange={handleCategoryChange} />

      {/* Featured Vehicles */}
      <FeaturedVehicles />

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
