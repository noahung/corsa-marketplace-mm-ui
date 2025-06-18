
import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, Battery, MapPin, TrendingUp, Leaf, DollarSign } from 'lucide-react';

const EVHub = () => {
  const evVehicles = [
    {
      id: 1,
      make: 'Nissan',
      model: 'Leaf',
      price: '280-320',
      range: '270 km',
      chargingTime: '8 hours',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      make: 'BYD',
      model: 'Song Plus',
      price: '450-520',
      range: '505 km',
      chargingTime: '6 hours',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      make: 'Tesla',
      model: 'Model 3',
      price: '800-950',
      range: '448 km',
      chargingTime: '5 hours',
      image: '/placeholder.svg'
    }
  ];

  const chargingStations = [
    { name: 'Yangon City Mall', location: 'Yangon', type: 'Fast Charging', status: 'Available' },
    { name: 'Junction Square', location: 'Yangon', type: 'Standard', status: 'Available' },
    { name: 'Mandalay Bay', location: 'Mandalay', type: 'Fast Charging', status: 'Occupied' },
    { name: 'Naypyitaw Plaza', location: 'Naypyitaw', type: 'Super Fast', status: 'Available' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Electric Vehicle Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the future of mobility in Myanmar. Explore electric vehicles, find charging stations, and learn about the benefits of going electric.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="text-center p-6">
              <Leaf className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-lg font-semibold mb-2">Environmental Benefits</h3>
              <p className="text-gray-600">Zero emissions, reduced air pollution, and contribution to a cleaner Myanmar</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="text-center p-6">
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-semibold mb-2">Cost Savings</h3>
              <p className="text-gray-600">Lower running costs, reduced maintenance, and government incentives</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="text-center p-6">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-lg font-semibold mb-2">Future Technology</h3>
              <p className="text-gray-600">Advanced features, smart connectivity, and cutting-edge automotive technology</p>
            </CardContent>
          </Card>
        </div>

        {/* Available EVs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Electric Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {evVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="overflow-hidden">
                <div className="aspect-[4/3] bg-gray-200">
                  <img 
                    src={vehicle.image} 
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{vehicle.make} {vehicle.model}</h3>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Electric
                    </Badge>
                  </div>
                  <div className="text-xl font-bold text-blue-600 mb-3">
                    {vehicle.price} Lakhs Ks
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Battery className="w-4 h-4" />
                      Range: {vehicle.range}
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Charging: {vehicle.chargingTime}
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Charging Stations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Charging Station Network</h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Available Charging Stations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chargingStations.map((station, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{station.name}</h3>
                      <p className="text-sm text-gray-600">{station.location} • {station.type}</p>
                    </div>
                    <Badge 
                      variant={station.status === 'Available' ? 'default' : 'secondary'}
                      className={station.status === 'Available' ? 'bg-green-600' : 'bg-orange-500'}
                    >
                      {station.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                View All Stations on Map
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Government Incentives */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Government Incentives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Reduced import duty on electric vehicles</li>
                  <li>• Tax exemptions for first 3 years</li>
                  <li>• Lower commercial vehicle registration fees</li>
                  <li>• Subsidies for charging infrastructure</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Infrastructure Support</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Free parking in designated areas</li>
                  <li>• Priority lanes in major cities</li>
                  <li>• Government-funded charging stations</li>
                  <li>• Reduced electricity rates for EV charging</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* EV Guide */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started with Electric Vehicles</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Research Models</h3>
                  <p className="text-sm text-gray-600">Compare different EV models and their specifications</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Calculate Costs</h3>
                  <p className="text-sm text-gray-600">Consider purchase price, running costs, and incentives</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Plan Charging</h3>
                  <p className="text-sm text-gray-600">Identify charging options at home and on the road</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Test Drive</h3>
                  <p className="text-sm text-gray-600">Experience the smooth, quiet driving of electric vehicles</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <div className="pb-20 md:pb-0"></div>
    </div>
  );
};

export default EVHub;
