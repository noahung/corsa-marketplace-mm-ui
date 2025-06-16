
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import VehicleCard from '@/components/VehicleCard';
import SearchFilters from '@/components/SearchFilters';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Cars = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  // Mock cars data
  const cars = [
    {
      id: '1',
      title: 'Toyota Camry 2020 Hybrid',
      price: '350',
      year: 2020,
      mileage: '25,000 km',
      fuel: 'Hybrid',
      transmission: 'CVT',
      location: 'Yangon',
      seller: { type: 'Dealer' as const, name: 'Elite Motors', verified: true },
      images: ['/placeholder.svg'],
      featured: true
    },
    {
      id: '2',
      title: 'Honda CR-V 2019',
      price: '280',
      year: 2019,
      mileage: '35,000 km',
      fuel: 'Petrol',
      transmission: 'CVT',
      location: 'Mandalay',
      seller: { type: 'Private' as const, name: 'John Doe', verified: false },
      images: ['/placeholder.svg']
    },
    {
      id: '3',
      title: 'BMW X3 2020',
      price: '450',
      year: 2020,
      mileage: '22,000 km',
      fuel: 'Petrol',
      transmission: 'Automatic',
      location: 'Yangon',
      seller: { type: 'Dealer' as const, name: 'Luxury Motors', verified: true },
      images: ['/placeholder.svg'],
      featured: true
    },
    {
      id: '4',
      title: 'Mazda CX-5 2021',
      price: '320',
      year: 2021,
      mileage: '18,000 km',
      fuel: 'Petrol',
      transmission: 'Automatic',
      location: 'Yangon',
      seller: { type: 'Dealer' as const, name: 'Premium Auto', verified: true },
      images: ['/placeholder.svg']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cars for Sale</h1>
          <p className="text-gray-600">{cars.length} cars found</p>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <SearchFilters />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                {/* Mobile Filter Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>

                {/* View Mode Toggle */}
                <div className="flex items-center border border-gray-200 rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="mileage">Lowest Mileage</SelectItem>
                      <SelectItem value="year">Newest Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mb-6">
                <SearchFilters />
              </div>
            )}

            {/* Results Grid/List */}
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {cars.map((car) => (
                <VehicleCard
                  key={car.id}
                  {...car}
                  className={viewMode === 'list' ? 'flex flex-row' : ''}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>Previous</Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Spacing */}
      <div className="pb-20 md:pb-0"></div>
    </div>
  );
};

export default Cars;
