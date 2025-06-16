
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VehicleCard from './VehicleCard';

const FeaturedVehicles = () => {
  const featuredVehicles = [
    {
      id: '1',
      title: '2019 Toyota Camry 2.5 Hybrid Premium',
      price: '285 Lakhs',
      year: 2019,
      mileage: '32,000 km',
      fuel: 'Hybrid',
      transmission: 'CVT',
      location: 'Yangon',
      seller: {
        type: 'Dealer' as const,
        name: 'Elite Motors',
        verified: true
      },
      images: ['/placeholder.svg'],
      featured: true
    },
    {
      id: '2',
      title: '2020 Honda CR-V 1.5 Turbo AWD',
      price: '450 Lakhs',
      year: 2020,
      mileage: '28,500 km',
      fuel: 'Petrol',
      transmission: 'CVT',
      location: 'Mandalay',
      seller: {
        type: 'Dealer' as const,
        name: 'Premium Auto',
        verified: true
      },
      images: ['/placeholder.svg'],
      featured: true
    },
    {
      id: '3',
      title: '2018 Suzuki Swift Sport 1.4 Boosterjet',
      price: '175 Lakhs',
      year: 2018,
      mileage: '45,000 km',
      fuel: 'Petrol',
      transmission: 'Manual',
      location: 'Yangon',
      seller: {
        type: 'Private' as const,
        name: 'Ko Thant',
        verified: false
      },
      images: ['/placeholder.svg'],
      featured: true
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Featured Vehicles
            </h2>
            <p className="text-gray-600">
              Hand-picked premium vehicles from trusted sellers
            </p>
          </div>
          
          <div className="hidden md:flex gap-2">
            <Button variant="outline" size="sm" className="rounded-lg">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="rounded-lg">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl">
            View All Featured Vehicles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
