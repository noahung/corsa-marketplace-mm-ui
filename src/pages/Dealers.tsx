
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Phone, Star, Car, Filter } from 'lucide-react';

const Dealers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  // Mock dealers data
  const dealers = [
    {
      id: '1',
      name: "Premium Motors Myanmar",
      logo: "/placeholder.svg",
      rating: 4.8,
      reviewCount: 156,
      location: "Yangon",
      address: "123 Yangon Street, Yangon",
      phone: "+95 9 123 456 789",
      vehicleCount: 245,
      specialties: ["Luxury Cars", "SUVs", "Electric Vehicles"],
      verified: true,
      description: "Leading automotive dealer specializing in premium and luxury vehicles."
    },
    {
      id: '2',
      name: "City Auto Center",
      logo: "/placeholder.svg",
      rating: 4.6,
      reviewCount: 89,
      location: "Mandalay",
      address: "456 Mandalay Road, Mandalay",
      phone: "+95 9 234 567 890",
      vehicleCount: 178,
      specialties: ["Sedans", "Hatchbacks", "Commercial"],
      verified: true,
      description: "Trusted dealer with wide selection of affordable quality vehicles."
    },
    {
      id: '3',
      name: "Green Drive Motors",
      logo: "/placeholder.svg",
      rating: 4.7,
      reviewCount: 112,
      location: "Yangon",
      address: "789 Green Street, Yangon",
      phone: "+95 9 345 678 901",
      vehicleCount: 156,
      specialties: ["Hybrid", "Electric", "Eco-Friendly"],
      verified: true,
      description: "Myanmar's first eco-friendly vehicle dealership."
    },
    {
      id: '4',
      name: "Speed Zone Auto",
      logo: "/placeholder.svg",
      rating: 4.5,
      reviewCount: 67,
      location: "Naypyidaw",
      address: "321 Capital Avenue, Naypyidaw",
      phone: "+95 9 456 789 012",
      vehicleCount: 134,
      specialties: ["Sports Cars", "Performance", "Imports"],
      verified: false,
      description: "Performance vehicle specialist with imported cars."
    }
  ];

  const filteredDealers = dealers.filter(dealer => {
    const matchesSearch = dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dealer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'all' || dealer.location === locationFilter;
    
    return matchesSearch && matchesLocation;
  });

  const sortedDealers = [...filteredDealers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'vehicles':
        return b.vehicleCount - a.vehicleCount;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted Dealers</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find verified automotive dealers across Myanmar. All our partner dealers are carefully vetted to ensure quality service.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search dealers or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Yangon">Yangon</SelectItem>
                  <SelectItem value="Mandalay">Mandalay</SelectItem>
                  <SelectItem value="Naypyidaw">Naypyidaw</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="vehicles">Most Vehicles</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {sortedDealers.length} of {dealers.length} dealers
          </p>
        </div>

        {/* Dealers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDealers.map((dealer) => (
            <Link key={dealer.id} to={`/dealers/${dealer.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0">
                      <img src={dealer.logo} alt={dealer.name} className="w-12 h-12 object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{dealer.name}</h3>
                        {dealer.verified && (
                          <Badge variant="secondary" className="text-xs">Verified</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(dealer.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{dealer.rating} ({dealer.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{dealer.description}</p>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{dealer.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{dealer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Car className="w-4 h-4" />
                      <span>{dealer.vehicleCount} vehicles available</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {dealer.specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">{specialty}</Badge>
                    ))}
                    {dealer.specialties.length > 2 && (
                      <Badge variant="outline" className="text-xs">+{dealer.specialties.length - 2} more</Badge>
                    )}
                  </div>

                  {/* Action */}
                  <Button className="w-full">View Dealer</Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {sortedDealers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No dealers found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('all');
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dealers;
