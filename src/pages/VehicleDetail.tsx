
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { 
  Calendar, Gauge, Fuel, Car, MapPin, Heart, Share2, 
  Phone, MessageCircle, Shield, Star, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import VehicleCard from '@/components/VehicleCard';

const VehicleDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock vehicle data
  const vehicle = {
    id: '1',
    title: 'Toyota Camry 2020 Hybrid',
    price: '350',
    year: 2020,
    make: 'Toyota',
    model: 'Camry',
    variant: 'Hybrid LE',
    mileage: '25,000 km',
    fuel: 'Hybrid',
    transmission: 'CVT',
    engine: '2.5L 4-Cylinder',
    condition: 'Excellent',
    bodyType: 'Sedan',
    color: 'Pearl White',
    location: 'Yangon',
    doors: 4,
    seats: 5,
    seller: {
      type: 'Dealer' as const,
      name: 'Elite Motors Myanmar',
      verified: true,
      rating: 4.8,
      reviews: 234,
      phone: '+95 9 123 456 789',
      address: 'No. 123, Pyay Road, Kamayut Township, Yangon'
    },
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    features: [
      'Air Conditioning',
      'Power Steering',
      'ABS',
      'Airbags',
      'Electric Windows',
      'Central Locking',
      'Bluetooth',
      'Backup Camera',
      'Lane Keeping Assist',
      'Adaptive Cruise Control'
    ],
    description: 'This 2020 Toyota Camry Hybrid is in excellent condition with low mileage. Well maintained by the previous owner with full service history. Perfect for city driving with excellent fuel economy.',
    serviceHistory: 'Full dealer service history available',
    insuranceStatus: 'Valid until March 2025'
  };

  const similarVehicles = [
    {
      id: '2',
      title: 'Honda Accord 2019 Hybrid',
      price: '320',
      year: 2019,
      mileage: '30,000 km',
      fuel: 'Hybrid',
      transmission: 'CVT',
      location: 'Yangon',
      seller: { type: 'Dealer' as const, name: 'Honda Center', verified: true },
      images: ['/placeholder.svg']
    },
    {
      id: '3',
      title: 'Toyota Camry 2019',
      price: '280',
      year: 2019,
      mileage: '35,000 km',
      fuel: 'Petrol',
      transmission: 'Automatic',
      location: 'Mandalay',
      seller: { type: 'Private' as const, name: 'John Doe', verified: false },
      images: ['/placeholder.svg']
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === vehicle.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? vehicle.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative aspect-[16/10]">
                <img 
                  src={vehicle.images[currentImageIndex]}
                  alt={vehicle.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                  {currentImageIndex + 1} / {vehicle.images.length}
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="sm" variant="outline" className="bg-white/80 hover:bg-white/90">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/80 hover:bg-white/90">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="p-4 flex gap-2 overflow-x-auto">
                {vehicle.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </Card>

            {/* Vehicle Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{vehicle.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {vehicle.location}
                      </span>
                      <Badge variant={vehicle.seller.type === 'Dealer' ? 'default' : 'secondary'}>
                        {vehicle.seller.type}
                      </Badge>
                      {vehicle.seller.verified && (
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{vehicle.price} Lakhs Ks</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Key Specs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 mx-auto mb-2 text-gray-600" />
                    <div className="text-sm text-gray-600">Year</div>
                    <div className="font-semibold">{vehicle.year}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Gauge className="w-5 h-5 mx-auto mb-2 text-gray-600" />
                    <div className="text-sm text-gray-600">Mileage</div>
                    <div className="font-semibold">{vehicle.mileage}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Fuel className="w-5 h-5 mx-auto mb-2 text-gray-600" />
                    <div className="text-sm text-gray-600">Fuel</div>
                    <div className="font-semibold">{vehicle.fuel}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Car className="w-5 h-5 mx-auto mb-2 text-gray-600" />
                    <div className="text-sm text-gray-600">Transmission</div>
                    <div className="font-semibold">{vehicle.transmission}</div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Description */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{vehicle.description}</p>
                </div>

                {/* Specifications Table */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Make</span>
                        <span className="font-medium">{vehicle.make}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Model</span>
                        <span className="font-medium">{vehicle.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Variant</span>
                        <span className="font-medium">{vehicle.variant}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Engine</span>
                        <span className="font-medium">{vehicle.engine}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Body Type</span>
                        <span className="font-medium">{vehicle.bodyType}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Color</span>
                        <span className="font-medium">{vehicle.color}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Doors</span>
                        <span className="font-medium">{vehicle.doors}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Seats</span>
                        <span className="font-medium">{vehicle.seats}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Condition</span>
                        <span className="font-medium">{vehicle.condition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Insurance</span>
                        <span className="font-medium">{vehicle.insuranceStatus}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="font-semibold mb-4">Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {vehicle.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seller Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{vehicle.seller.name}</h4>
                    {vehicle.seller.verified && (
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  {vehicle.seller.type === 'Dealer' && (
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{vehicle.seller.rating} ({vehicle.seller.reviews} reviews)</span>
                    </div>
                  )}
                  <p className="text-sm text-gray-600">{vehicle.seller.address}</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Seller
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Loan Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Loan Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Estimated Monthly Payment</div>
                  <div className="text-2xl font-bold text-blue-600">2.8 Lakhs Ks</div>
                  <div className="text-xs text-gray-500">Based on 20% down payment, 5 years</div>
                </div>
                <Button variant="outline" className="w-full">
                  Calculate Your Loan
                </Button>
              </CardContent>
            </Card>

            {/* Safety Note */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium text-gray-900 mb-1">Safety Tips</div>
                    <div className="text-gray-600">
                      Always inspect the vehicle in person and verify documents before making payment.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Vehicles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} {...vehicle} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Spacing */}
      <div className="pb-20 md:pb-0"></div>
    </div>
  );
};

export default VehicleDetail;
