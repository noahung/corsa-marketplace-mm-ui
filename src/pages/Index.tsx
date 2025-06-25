
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import CategoryTabs from '@/components/CategoryTabs';
import FeaturedVehicles from '@/components/FeaturedVehicles';
import TrustedDealers from '@/components/TrustedDealers';
import Footer from '@/components/Footer';
import { Zap, Shield, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [searchFilters, setSearchFilters] = useState({
    make: '',
    model: '',
    minPrice: '',
    maxPrice: '',
    year: '',
    location: ''
  });

  const handleSearch = (filters: any) => {
    console.log('Search filters:', filters);
    setSearchFilters(filters);
    // In a real app, this would trigger a search and navigate to results
  };

  const stats = [
    { icon: TrendingUp, label: "Vehicles Listed", value: "50,000+" },
    { icon: Users, label: "Happy Customers", value: "25,000+" },
    { icon: Shield, label: "Verified Dealers", value: "500+" },
    { icon: Zap, label: "Quick Sales", value: "95%" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect Vehicle in <span className="text-blue-200">Myanmar</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Discover thousands of cars and motorbikes from trusted dealers across the country
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryTabs />
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Vehicles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium vehicles from verified dealers
            </p>
          </div>
          <FeaturedVehicles />
        </div>
      </section>

      {/* Trusted Dealers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted Dealers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with Myanmar's most reliable automotive dealers
            </p>
          </div>
          <TrustedDealers />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Sell Your Vehicle?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            List your car or motorbike for free and reach thousands of potential buyers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
              Sell Your Vehicle
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
