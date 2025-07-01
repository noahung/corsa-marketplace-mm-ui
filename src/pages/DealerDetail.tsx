
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Globe, Star, Car, Users, Clock, CheckCircle } from 'lucide-react';

const DealerDetail = () => {
  const { id } = useParams();

  // Mock dealer data - this would come from Supabase in a real implementation
  const dealer = {
    id: id,
    name: "Premium Motors Myanmar",
    logo: "/placeholder.svg",
    rating: 4.8,
    reviewCount: 156,
    address: "123 Yangon Street, Yangon, Myanmar",
    phone: "+95 9 123 456 789",
    email: "info@premiummotors.mm",
    website: "www.premiummotors.mm",
    description: "Premium Motors Myanmar is one of the leading automotive dealers in Myanmar, specializing in luxury and premium vehicles. We've been serving customers for over 15 years with exceptional service and quality vehicles.",
    establishedYear: 2008,
    totalVehicles: 245,
    specialties: ["Luxury Cars", "SUVs", "Electric Vehicles", "Certified Pre-owned"],
    workingHours: {
      weekdays: "9:00 AM - 6:00 PM",
      weekends: "9:00 AM - 5:00 PM"
    },
    services: [
      "Vehicle Sales",
      "Trade-in Services",
      "Vehicle Financing",
      "After-sales Service",
      "Vehicle Insurance",
      "Extended Warranty"
    ],
    certifications: ["Authorized Dealer", "ISO 9001 Certified", "Customer Service Excellence"],
    gallery: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ]
  };

  const mockVehicles = [
    {
      id: 1,
      title: "2023 Toyota Camry Hybrid",
      price: 45000000,
      image: "/placeholder.svg",
      year: 2023,
      mileage: 15000,
      condition: "Like New"
    },
    {
      id: 2,
      title: "2022 Honda CR-V",
      price: 38000000,
      image: "/placeholder.svg",
      year: 2022,
      mileage: 25000,
      condition: "Excellent"
    },
    {
      id: 3,
      title: "2023 BMW X3",
      price: 65000000,
      image: "/placeholder.svg",
      year: 2023,
      mileage: 8000,
      condition: "Like New"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/dealers" className="hover:text-blue-600">Dealers</Link></li>
            <li>/</li>
            <li className="text-gray-900">{dealer.name}</li>
          </ol>
        </nav>

        {/* Dealer Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-24 h-24 bg-white rounded-lg shadow-md flex items-center justify-center flex-shrink-0">
                <img src={dealer.logo} alt={dealer.name} className="w-16 h-16 object-contain" />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{dealer.name}</h1>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(dealer.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                        <span className="ml-2 text-sm font-medium">{dealer.rating}</span>
                        <span className="ml-1 text-sm text-gray-500">({dealer.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {dealer.certifications.map((cert, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                    <Button>
                      <Mail className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{dealer.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{dealer.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{dealer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{dealer.website}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dealer Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Stats */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Dealer Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Total Vehicles</span>
                  </div>
                  <span className="font-semibold">{dealer.totalVehicles}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Established</span>
                  </div>
                  <span className="font-semibold">{dealer.establishedYear}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm">Reviews</span>
                  </div>
                  <span className="font-semibold">{dealer.reviewCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Services Offered</h3>
              <div className="space-y-2">
                {dealer.services.map((service, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Working Hours */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm font-medium">Monday - Friday</div>
                    <div className="text-sm text-gray-600">{dealer.workingHours.weekdays}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-sm font-medium">Saturday - Sunday</div>
                    <div className="text-sm text-gray-600">{dealer.workingHours.weekends}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Specialties */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {dealer.specialties.map((specialty, index) => (
                <Badge key={index} variant="outline">{specialty}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Vehicles */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Available Vehicles</h3>
              <Button variant="outline">View All Vehicles</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <img src={vehicle.image} alt={vehicle.title} className="w-full h-48 object-cover rounded-lg mb-3" />
                    <h4 className="font-semibold mb-2">{vehicle.title}</h4>
                    <div className="text-lg font-bold text-blue-600 mb-2">
                      {vehicle.price.toLocaleString()} MMK
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-3">
                      <span>{vehicle.year}</span>
                      <span>{vehicle.mileage.toLocaleString()} km</span>
                      <span>{vehicle.condition}</span>
                    </div>
                    <Button className="w-full">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default DealerDetail;
