
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Zap, Phone, Wifi, Coffee, Car, Navigation as NavigationIcon, Star } from 'lucide-react';

const ChargingStationDetail = () => {
  const { id } = useParams();

  // Mock charging station data
  const station = {
    id: id,
    name: "City Center EV Hub",
    address: "123 Downtown Street, Yangon, Myanmar",
    location: "Yangon",
    latitude: 16.8661,
    longitude: 96.1951,
    type: "DC Fast Charging",
    status: "Available",
    pricing: "500 MMK/kWh",
    rating: 4.5,
    reviewCount: 28,
    description: "Modern EV charging facility located in the heart of Yangon. Features multiple charging ports with various connector types to accommodate all electric vehicle models.",
    amenities: ["Free WiFi", "Restroom", "Convenience Store", "Coffee Shop", "Covered Parking", "24/7 Security"],
    chargingPorts: [
      { type: "CCS2", power: "150kW", count: 4, status: "Available" },
      { type: "CHAdeMO", power: "50kW", count: 2, status: "Available" },
      { type: "Type 2", power: "22kW", count: 6, status: "Available" }
    ],
    operatingHours: {
      weekdays: "24/7",
      weekends: "24/7"
    },
    contact: {
      phone: "+95 9 987 654 321",
      email: "info@citycenterev.mm"
    },
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ]
  };

  const mockReviews = [
    {
      id: 1,
      user: "Aung Myat",
      rating: 5,
      date: "2024-01-15",
      comment: "Excellent charging facility! Very fast charging and clean environment. Staff is helpful."
    },
    {
      id: 2,
      user: "Su Su",
      rating: 4,
      date: "2024-01-10",
      comment: "Good location and reliable charging. Coffee shop is a nice touch while waiting."
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
            <li><Link to="/ev-hub" className="hover:text-blue-600">EV Hub</Link></li>
            <li>/</li>
            <li className="text-gray-900">{station.name}</li>
          </ol>
        </nav>

        {/* Station Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Images */}
              <div className="lg:w-1/2">
                <div className="grid grid-cols-1 gap-4">
                  <img src={station.images[0]} alt={station.name} className="w-full h-64 object-cover rounded-lg" />
                  <div className="grid grid-cols-2 gap-4">
                    {station.images.slice(1).map((image, index) => (
                      <img key={index} src={image} alt={`${station.name} ${index + 2}`} className="w-full h-32 object-cover rounded-lg" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Station Info */}
              <div className="lg:w-1/2">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{station.name}</h1>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(station.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                        <span className="ml-2 text-sm font-medium">{station.rating}</span>
                        <span className="ml-1 text-sm text-gray-500">({station.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <Badge variant={station.status === 'Available' ? 'default' : 'secondary'} className="mb-4">
                      {station.status}
                    </Badge>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{station.description}</p>

                {/* Key Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">{station.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">{station.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">24/7 Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Pricing: {station.pricing}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1">
                    <NavigationIcon className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Station
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Charging Ports */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Charging Ports</h3>
              <div className="space-y-4">
                {station.chargingPorts.map((port, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{port.type}</div>
                      <div className="text-sm text-gray-600">{port.power} - {port.count} ports</div>
                    </div>
                    <Badge variant={port.status === 'Available' ? 'default' : 'secondary'}>
                      {port.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {station.amenities.map((amenity, index) => {
                  const getIcon = (amenity: string) => {
                    if (amenity.includes('WiFi')) return <Wifi className="w-4 h-4" />;
                    if (amenity.includes('Coffee')) return <Coffee className="w-4 h-4" />;
                    if (amenity.includes('Parking')) return <Car className="w-4 h-4" />;
                    return <span className="w-4 h-4">•</span>;
                  };

                  return (
                    <div key={index} className="flex items-center gap-2">
                      {getIcon(amenity)}
                      <span className="text-sm">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Google Maps */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Location</h3>
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.0!2d${station.longitude}!3d${station.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDUxJzU4LjAiTiA5NsKwMTEnNDIuNCJF!5e0!3m2!1sen!2smm!4v1234567890`}
                className="rounded-lg"
                allowFullScreen
              ></iframe>
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Reviews ({mockReviews.length})</h3>
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.user}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ChargingStationDetail;
