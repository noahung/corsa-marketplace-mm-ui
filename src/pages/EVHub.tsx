import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Zap, BatteryCharging } from 'lucide-react';

const EVHub = () => {
  const [electricVehicles, setElectricVehicles] = useState([
    {
      id: '1',
      name: "Tesla Model 3",
      image: "/placeholder.svg",
      range: 560,
      batteryCapacity: 75,
      price: 55000000,
      chargingTime: 8,
      description: "The Tesla Model 3 is a compact executive sedan that is known for its performance, range, and technology.",
    },
    {
      id: '2',
      name: "Nissan Leaf",
      image: "/placeholder.svg",
      range: 385,
      batteryCapacity: 62,
      price: 35000000,
      chargingTime: 6,
      description: "The Nissan Leaf is a compact electric hatchback that is known for its affordability and practicality.",
    },
    {
      id: '3',
      name: "BMW iX",
      image: "/placeholder.svg",
      range: 630,
      batteryCapacity: 111.5,
      price: 90000000,
      chargingTime: 10,
      description: "The BMW iX is a luxury electric SUV that is known for its performance, range, and technology.",
    },
  ]);

  const [chargingStations, setChargingStations] = useState([
    {
      id: '1',
      name: "Yangon Central Station",
      location: "Yangon",
      type: "Fast Charging",
      status: "Available",
      pricing: "300 MMK/kWh",
      amenities: ["WiFi", "Restroom", "Coffee"],
    },
    {
      id: '2',
      name: "Mandalay Supercharger",
      location: "Mandalay",
      type: "Supercharger",
      status: "Busy",
      pricing: "400 MMK/kWh",
      amenities: ["Restroom", "Snacks"],
    },
    {
      id: '3',
      name: "Naypyidaw EV Point",
      location: "Naypyidaw",
      type: "Standard Charging",
      status: "Available",
      pricing: "200 MMK/kWh",
      amenities: ["Restroom", "Parking"],
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-pink-50 pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore the Electric Vehicle Revolution in
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-700"> Myanmar</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Discover the latest electric vehicles, charging stations, and resources to make the switch to sustainable driving.
            </p>
          </div>
        </div>
      </section>

      {/* Electric Vehicles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Featured Electric Vehicles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore a selection of popular electric vehicles available in Myanmar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {electricVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img src={vehicle.image} alt={vehicle.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">{vehicle.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{vehicle.description}</p>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-gray-600">Range:</span>
                    <span className="font-medium">{vehicle.range} km</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-gray-600">Battery:</span>
                    <span className="font-medium">{vehicle.batteryCapacity} kWh</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Charging Time:</span>
                    <span className="font-medium">{vehicle.chargingTime} hours</span>
                  </div>
                  <div className="mt-4">
                    <Button className="w-full">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Charging Station Network */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Charging Station Network
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find EV charging stations across Myanmar with real-time availability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chargingStations.map((station) => (
              <Link key={station.id} to={`/ev-hub/charging-station/${station.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{station.name}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {station.location}
                        </p>
                      </div>
                      <Badge variant={station.status === 'Available' ? 'default' : 'secondary'}>
                        <Zap className="w-3 h-3 mr-1" />
                        {station.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{station.type}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Pricing:</span>
                        <span className="font-medium">{station.pricing}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {station.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{amenity}</Badge>
                      ))}
                      {station.amenities.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{station.amenities.length - 3}</Badge>
                      )}
                    </div>

                    <Button className="w-full">View Details</Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resources and Information */}
      <section className="py-16 bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              EV Resources and Information
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay informed about electric vehicle technology, incentives, and infrastructure in Myanmar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Government Incentives</h3>
                  <BatteryCharging className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-gray-600 text-sm">Learn about tax breaks and subsidies for EV purchases.</p>
                <Button variant="link" className="mt-4">Read More</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Charging Guide</h3>
                  <Zap className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-gray-600 text-sm">Find the best charging solutions for your electric vehicle.</p>
                <Button variant="link" className="mt-4">Explore</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">EV News & Updates</h3>
                  <BatteryCharging className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-gray-600 text-sm">Stay up-to-date with the latest EV trends and news in Myanmar.</p>
                <Button variant="link" className="mt-4">Discover</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EVHub;
