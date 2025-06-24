
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, MapPin, Phone, Mail, Clock, Zap, Star, Navigation2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

const ChargingStationDetail = () => {
  const { id } = useParams();
  const [userLocation, setUserLocation] = useState('');

  // Mock data - this would come from Supabase
  const station = {
    id: '1',
    name: 'Yangon City Mall',
    location: 'Yangon',
    address: 'Pyay Road, Kamayut Township, Yangon',
    latitude: 16.817780,
    longitude: 96.135480,
    type: 'Fast Charging',
    status: 'Available',
    amenities: ['Shopping Mall', 'Food Court', 'Parking', 'WiFi', 'Restroom'],
    pricing: '500 MMK/kWh',
    contact: {
      phone: '+95 9 123 456 789',
      email: 'info@ycm.mm',
      hours: '24/7'
    },
    rating: 4.5,
    reviews: 23,
    chargers: [
      { id: 1, type: 'DC Fast', power: '50kW', status: 'Available', connector: 'CCS' },
      { id: 2, type: 'DC Fast', power: '50kW', status: 'Occupied', connector: 'CHAdeMO' },
      { id: 3, type: 'AC', power: '22kW', status: 'Available', connector: 'Type 2' },
      { id: 4, type: 'AC', power: '7kW', status: 'Available', connector: 'Type 1' }
    ],
    photos: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg']
  };

  const getDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;
    window.open(url, '_blank');
  };

  const getDirectionsFromLocation = () => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${encodeURIComponent(userLocation)}/${station.latitude},${station.longitude}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/ev-hub" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to EV Hub
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Station Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{station.name}</h1>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{station.address}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{station.rating}</span>
                        <span className="text-gray-500">({station.reviews} reviews)</span>
                      </div>
                      <Badge 
                        variant={station.status === 'Available' ? 'default' : 'secondary'}
                        className={station.status === 'Available' ? 'bg-green-600' : 'bg-orange-500'}
                      >
                        {station.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Charging Rate</div>
                    <div className="text-lg font-semibold text-blue-600">{station.pricing}</div>
                  </div>
                </div>

                {/* Station Photos */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {station.photos.map((photo, index) => (
                    <div key={index} className="aspect-[4/3] rounded-lg overflow-hidden">
                      <img 
                        src={photo} 
                        alt={`${station.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="flex gap-3">
                  <Button onClick={getDirections} className="flex-1">
                    <Navigation2 className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Station
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="chargers" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="chargers">Chargers</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="directions">Directions</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="chargers">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Available Chargers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {station.chargers.map((charger) => (
                        <div key={charger.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{charger.type} - {charger.power}</div>
                            <div className="text-sm text-gray-600">Connector: {charger.connector}</div>
                          </div>
                          <Badge 
                            variant={charger.status === 'Available' ? 'default' : 'secondary'}
                            className={charger.status === 'Available' ? 'bg-green-600' : 'bg-orange-500'}
                          >
                            {charger.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="amenities">
                <Card>
                  <CardHeader>
                    <CardTitle>Amenities & Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {station.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="directions">
                <Card>
                  <CardHeader>
                    <CardTitle>Get Directions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">From (optional)</label>
                      <Input
                        placeholder="Enter your starting location"
                        value={userLocation}
                        onChange={(e) => setUserLocation(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Button 
                        onClick={getDirectionsFromLocation}
                        disabled={!userLocation}
                        className="w-full"
                      >
                        Get Directions from Location
                      </Button>
                      <Button 
                        onClick={getDirections}
                        variant="outline"
                        className="w-full"
                      >
                        Open in Google Maps
                      </Button>
                    </div>
                    
                    {/* Embedded Map */}
                    <div className="aspect-[16/9] rounded-lg overflow-hidden">
                      <iframe
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.7268842814595!2d${station.longitude}!3d${station.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDQ5JzA0LjAiTiA5NsKwMDgnMDcuNyJF!5e0!3m2!1sen!2smm!4v1642000000000!5m2!1sen!2smm`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Mock reviews */}
                      <div className="border-b pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[1,2,3,4,5].map((star) => (
                              <Star key={star} className="w-4 h-4 text-yellow-500 fill-current" />
                            ))}
                          </div>
                          <span className="font-medium">Aung Kyaw</span>
                          <span className="text-sm text-gray-500">2 days ago</span>
                        </div>
                        <p className="text-gray-700">Great location with fast charging. The mall has everything you need while waiting.</p>
                      </div>
                      
                      <div className="border-b pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[1,2,3,4].map((star) => (
                              <Star key={star} className="w-4 h-4 text-yellow-500 fill-current" />
                            ))}
                            <Star className="w-4 h-4 text-gray-300" />
                          </div>
                          <span className="font-medium">Ma Thin</span>
                          <span className="text-sm text-gray-500">1 week ago</span>
                        </div>
                        <p className="text-gray-700">Convenient location but can get busy during weekends. Charging speed is good.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="font-medium">{station.contact.phone}</div>
                    <div className="text-sm text-gray-500">Phone</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="font-medium">{station.contact.email}</div>
                    <div className="text-sm text-gray-500">Email</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="font-medium">{station.contact.hours}</div>
                    <div className="text-sm text-gray-500">Operating Hours</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Station Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{station.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Chargers:</span>
                  <span className="font-medium">{station.chargers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available:</span> 
                  <span className="font-medium text-green-600">
                    {station.chargers.filter(c => c.status === 'Available').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pricing:</span>
                  <span className="font-medium">{station.pricing}</span>
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

export default ChargingStationDetail;
