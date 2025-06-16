
import React from 'react';
import { MapPin, Star, Car, Award, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TrustedDealers = () => {
  const dealers = [
    {
      id: '1',
      name: 'Elite Motors Myanmar',
      location: 'Yangon',
      rating: 4.8,
      reviewCount: 234,
      vehicleCount: 45,
      specialties: ['Toyota', 'Honda', 'Mazda'],
      verified: true,
      logo: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Premium Auto Gallery',
      location: 'Mandalay',
      rating: 4.9,
      reviewCount: 189,
      vehicleCount: 32,
      specialties: ['BMW', 'Mercedes', 'Audi'],
      verified: true,
      logo: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'City Car Center',
      location: 'Yangon',
      rating: 4.7,
      reviewCount: 156,
      vehicleCount: 28,
      specialties: ['Nissan', 'Hyundai', 'KIA'],
      verified: true,
      logo: '/placeholder.svg'
    },
    {
      id: '4',
      name: 'Golden Motor Trading',
      location: 'Naypyitaw',
      rating: 4.6,
      reviewCount: 98,
      vehicleCount: 21,
      specialties: ['Suzuki', 'Mitsubishi'],
      verified: true,
      logo: '/placeholder.svg'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Trusted Dealers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Verified dealers with excellent reputation and quality vehicles
          </p>
        </div>

        {/* Dealers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealers.map((dealer) => (
            <div key={dealer.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              {/* Dealer Header */}
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                  <Building className="w-8 h-8 text-blue-600" />
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 text-center">{dealer.name}</h3>
                  {dealer.verified && (
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      <Award className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{dealer.location}</span>
                </div>

                <div className="flex items-center justify-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{dealer.rating}</span>
                  <span className="text-gray-500">({dealer.reviewCount})</span>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gray-50 rounded-xl p-3 mb-4">
                <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                  <Car className="w-4 h-4" />
                  <span>{dealer.vehicleCount} vehicles available</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Specializes in:</p>
                <div className="flex flex-wrap gap-1">
                  {dealer.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action */}
              <Button 
                variant="outline" 
                className="w-full rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                View Inventory
              </Button>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button variant="outline" className="px-8 py-3 rounded-xl">
            View All Dealers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrustedDealers;
