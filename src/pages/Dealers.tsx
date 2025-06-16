
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { MapPin, Star, Phone, Globe, Car, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Dealers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Mock dealers data
  const dealers = [
    {
      id: '1',
      name: 'Elite Motors',
      rating: 4.8,
      reviews: 156,
      location: 'Yangon',
      address: 'No. 45, Pyay Road, Kamayut Township',
      phone: '+95 9 123 456 789',
      website: 'www.elitemotors.mm',
      logo: '/placeholder.svg',
      totalListings: 25,
      verified: true,
      specialties: ['Luxury Cars', 'SUVs', 'Sedans'],
      description: 'Premium vehicle dealer specializing in luxury cars and SUVs. Over 10 years of experience in the automotive industry.'
    },
    {
      id: '2',
      name: 'City Auto Center',
      rating: 4.5,
      reviews: 89,
      location: 'Mandalay',
      address: 'No. 123, 30th Street, Chan Aye Thar Zan Township',
      phone: '+95 9 987 654 321',
      website: 'www.cityauto.mm',
      logo: '/placeholder.svg',
      totalListings: 18,
      verified: true,
      specialties: ['Economy Cars', 'Compact Cars', 'Hatchbacks'],
      description: 'Affordable and reliable vehicles for city driving. Excellent customer service and after-sales support.'
    },
    {
      id: '3',
      name: 'Premium Auto',
      rating: 4.9,
      reviews: 203,
      location: 'Yangon',
      address: 'No. 78, Inya Road, Bahan Township',
      phone: '+95 9 555 666 777',
      website: 'www.premiumauto.mm',
      logo: '/placeholder.svg',
      totalListings: 32,
      verified: true,
      specialties: ['BMW', 'Mercedes', 'Audi', 'Luxury SUVs'],
      description: 'Authorized dealer for premium European brands. Certified pre-owned vehicles with warranty.'
    },
    {
      id: '4',
      name: 'Speed Motors',
      rating: 4.3,
      reviews: 67,
      location: 'Naypyidaw',
      address: 'No. 12, Thapye Chaung Road, Ottarathiri Township',
      phone: '+95 9 444 555 666',
      website: 'www.speedmotors.mm',
      logo: '/placeholder.svg',
      totalListings: 15,
      verified: false,
      specialties: ['Sports Cars', 'Motorbikes', 'Performance Vehicles'],
      description: 'Specialized in high-performance vehicles and motorcycles. Custom modifications available.'
    }
  ];

  const filteredDealers = dealers.filter(dealer => {
    const matchesSearch = dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dealer.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || dealer.location === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Trusted Dealers</h1>
          <p className="text-gray-600">Find verified dealers across Myanmar</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search dealers by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="md:w-48">
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="Yangon">Yangon</SelectItem>
                  <SelectItem value="Mandalay">Mandalay</SelectItem>
                  <SelectItem value="Naypyidaw">Naypyidaw</SelectItem>
                  <SelectItem value="Taunggyi">Taunggyi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDealers.map((dealer) => (
            <Card key={dealer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={dealer.logo} 
                      alt={dealer.name}
                      className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{dealer.name}</CardTitle>
                        {dealer.verified && (
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200 flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{dealer.rating}</span>
                          <span>({dealer.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                      <Car className="w-4 h-4" />
                      <span>{dealer.totalListings} listings</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4">{dealer.description}</p>
                
                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {dealer.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{dealer.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{dealer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Globe className="w-4 h-4" />
                    <span>{dealer.website}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button className="flex-1">View Inventory</Button>
                  <Button variant="outline">Contact</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDealers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No dealers found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Mobile Navigation Spacing */}
      <div className="pb-20 md:pb-0"></div>
    </div>
  );
};

export default Dealers;
