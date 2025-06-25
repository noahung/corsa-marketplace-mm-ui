
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, MapPin, Phone, Clock, Zap, Car, Wifi, Coffee, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ChargingStationDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data - in real app, this would come from Supabase
  const station = {
    id: '1',
    name: 'Junction Square Charging Hub',
    address: 'Junction Square Mall, Kamayut Township, Yangon',
    location: 'Yangon',
    latitude: 16.8409,
    longitude: 96.1735,
    type: 'DC Fast Charging',
    status: 'Available',
    pricing: '800 MMK per kWh',
    amenities: ['WiFi', 'Cafe', 'Shopping', 'Restrooms', 'Security'],
    contact_info: {
      phone: '+95 9 123 456 789',
      email: 'contact@junctioncharging.com'
    },
    description: 'Premium charging facility located in Junction Square Mall with multiple DC fast chargers and convenient amenities for a comfortable charging experience.',
    operatingHours: '24/7',
    chargerTypes: [
      { type: 'DC Fast Charger', power: '150kW', connectors: ['CCS2', 'CHAdeMO'], quantity: 4 },
      { type: 'AC Charger', power: '22kW', connectors: ['Type 2'], quantity: 6 }
    ],
    features: [
      'Real-time availability tracking',
      'Mobile app payment',
      'Covered charging bays',
      'Security cameras',
      'Customer support hotline'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/ev-hub" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to EV Hub
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Details */}
          <div className="space-y-6">
            {/* Station Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{station.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{station.address}</span>
                    </div>
                  </div>
                  <Badge variant={station.status === 'Available' ? 'default' : 'secondary'}>
                    {station.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{station.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Charging Type</p>
                      <p className="text-sm text-gray-600">{station.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">Operating Hours</p>
                      <p className="text-sm text-gray-600">{station.operatingHours}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="font-medium">Contact</p>
                      <p className="text-sm text-gray-600">{station.contact_info.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium">Pricing</p>
                      <p className="text-sm text-gray-600">{station.pricing}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Charger Types */}
            <Card>
              <CardHeader>
                <CardTitle>Available Chargers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {station.chargerTypes.map((charger, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{charger.type}</h4>
                        <Badge variant="outline">{charger.quantity} units</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Power: {charger.power}</p>
                      <div className="flex flex-wrap gap-2">
                        {charger.connectors.map((connector) => (
                          <Badge key={connector} variant="secondary" className="text-xs">
                            {connector}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {station.amenities.map((amenity) => {
                    const iconMap: { [key: string]: any } = {
                      'WiFi': Wifi,
                      'Cafe': Coffee,
                      'Shopping': ShoppingCart,
                      'Restrooms': MapPin,
                      'Security': MapPin
                    };
                    const Icon = iconMap[amenity] || MapPin;
                    
                    return (
                      <div key={amenity} className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {station.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Map */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.936805097586!2d${station.longitude}!3d${station.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDUwJzI3LjIiTiA5NsKwMTAnMjQuNiJF!5e0!3m2!1sen!2smm!4v1639000000000!5m2!1sen!2smm`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Charging Station Location"
                  ></iframe>
                </div>
                <div className="mt-4 space-y-2">
                  <Button className="w-full" variant="default">
                    Get Directions
                  </Button>
                  <Button className="w-full" variant="outline">
                    Check Availability
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Station
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  Report Issue
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Zap className="w-4 h-4 mr-2" />
                  Reserve Charger
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChargingStationDetail;
