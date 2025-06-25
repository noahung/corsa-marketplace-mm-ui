
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Zap, MapPin, Clock, Phone, Navigation as NavIcon, Battery, Leaf, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EVHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const chargingStations = [
    {
      id: '1',
      name: 'Junction Square Charging Hub',
      address: 'Junction Square Mall, Kamayut Township',
      location: 'Yangon',
      type: 'DC Fast Charging',
      status: 'Available',
      distance: '2.5 km',
      pricing: '800 MMK per kWh',
      amenities: ['WiFi', 'Cafe', 'Shopping'],
      latitude: 16.8409,
      longitude: 96.1735
    },
    {
      id: '2',
      name: 'Yangon International Airport EV Station',
      address: 'Yangon International Airport Terminal',
      location: 'Yangon',
      type: 'AC Charging',
      status: 'Available',
      distance: '15.2 km',
      pricing: '600 MMK per kWh',
      amenities: ['24/7', 'Security', 'Restrooms'],
      latitude: 16.9073,
      longitude: 96.1337
    },
    {
      id: '3',
      name: 'Mandalay City Center Charging Point',
      address: 'Downtown Mandalay, 26th Street',
      location: 'Mandalay',
      type: 'DC Fast Charging',
      status: 'Occupied',
      distance: '8.7 km',
      pricing: '750 MMK per kWh',
      amenities: ['Covered', 'CCTV', 'Customer Support'],
      latitude: 21.9588,
      longitude: 96.0891
    }
  ];

  const evModels = [
    {
      name: 'BYD Atto 3',
      price: '65,000,000 MMK',
      range: '420 km',
      chargingTime: '30 min (10-80%)',
      image: '/placeholder.svg'
    },
    {
      name: 'Tesla Model 3',
      price: '85,000,000 MMK',
      range: '448 km',
      chargingTime: '25 min (10-80%)',
      image: '/placeholder.svg'
    },
    {
      name: 'Nissan Leaf',
      price: '45,000,000 MMK',
      range: '363 km',
      chargingTime: '40 min (10-80%)',
      image: '/placeholder.svg'
    }
  ];

  const filteredStations = chargingStations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         station.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === '' || station.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            EV Hub <span className="text-green-600">Myanmar</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your complete guide to electric vehicles in Myanmar - charging stations, EV models, and sustainable transport solutions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">150+</div>
              <div className="text-sm text-gray-600">Charging Stations</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Battery className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">25</div>
              <div className="text-sm text-gray-600">EV Models Available</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Leaf className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">85%</div>
              <div className="text-sm text-gray-600">CO2 Reduction</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">300%</div>
              <div className="text-sm text-gray-600">Growth This Year</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Charging Station Network */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-blue-600" />
                  Charging Station Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Input
                    placeholder="Search stations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Locations</SelectItem>
                      <SelectItem value="Yangon">Yangon</SelectItem>
                      <SelectItem value="Mandalay">Mandalay</SelectItem>
                      <SelectItem value="Naypyidaw">Naypyidaw</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Stations List */}
                <div className="space-y-4">
                  {filteredStations.map((station) => (
                    <Link 
                      key={station.id} 
                      to={`/ev-hub/charging-station/${station.id}`}
                      className="block"
                    >
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-lg">{station.name}</h3>
                                <Badge variant={station.status === 'Available' ? 'default' : 'secondary'}>
                                  {station.status}
                                </Badge>
                              </div>
                              <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  <span>{station.address}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="flex items-center gap-1">
                                    <Zap className="w-4 h-4" />
                                    {station.type}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <NavIcon className="w-4 h-4" />
                                    {station.distance}
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-3">
                                {station.amenities.map((amenity) => (
                                  <Badge key={amenity} variant="outline" className="text-xs">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-semibold text-green-600">
                                {station.pricing}
                              </div>
                              <Button size="sm" className="mt-2">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular EV Models */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Battery className="w-6 h-6 text-green-600" />
                  Popular EV Models
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {evModels.map((model, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img 
                          src={model.image} 
                          alt={model.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{model.name}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Price:</span>
                            <span className="font-semibold text-green-600">{model.price}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Range:</span>
                            <span>{model.range}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Charging:</span>
                            <span>{model.chargingTime}</span>
                          </div>
                        </div>
                        <Button className="w-full mt-4" variant="outline">
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  Find Nearest Station
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Zap className="w-4 h-4 mr-2" />
                  Plan Route
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Report Issue
                </Button>
              </CardContent>
            </Card>

            {/* EV Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Why Choose Electric?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Eco-Friendly</h4>
                    <p className="text-sm text-gray-600">Zero emissions for cleaner air</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Cost Effective</h4>
                    <p className="text-sm text-gray-600">Lower operating costs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Performance</h4>
                    <p className="text-sm text-gray-600">Instant torque and quiet operation</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Latest News */}
            <Card>
              <CardHeader>
                <CardTitle>EV News</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm">New Charging Network Expansion</h4>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Government EV Incentives 2024</h4>
                    <p className="text-xs text-gray-500">1 week ago</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Tesla Opens Service Center</h4>
                    <p className="text-xs text-gray-500">2 weeks ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EVHub;
