
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ArrowLeft, Star, Fuel, Settings, Palette, MapPin, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Compare = () => {
  const [compareItems, setCompareItems] = useState([]);
  const { toast } = useToast();

  // Mock data - in real app this would come from localStorage or context
  const mockCompareData = [
    {
      id: 1,
      title: "2023 Toyota Camry Hybrid",
      price: 45000000,
      image: "/placeholder.svg",
      make: "Toyota",
      model: "Camry",
      year: 2023,
      mileage: 15000,
      condition: "Like New",
      fuelType: "Hybrid",
      transmission: "Automatic",
      color: "Silver",
      location: "Yangon",
      rating: 4.8,
      features: ["Navigation System", "Backup Camera", "Bluetooth", "Cruise Control", "Leather Seats"]
    },
    {
      id: 2,
      title: "2022 Honda CR-V",
      price: 38000000,
      image: "/placeholder.svg",
      make: "Honda",
      model: "CR-V",
      year: 2022,
      mileage: 25000,
      condition: "Excellent",
      fuelType: "Petrol",
      transmission: "CVT",
      color: "White",
      location: "Mandalay",
      rating: 4.6,
      features: ["Sunroof", "All-Wheel Drive", "Safety Package", "Apple CarPlay", "Power Seats"]
    },
    {
      id: 3,
      title: "2023 BMW X3",
      price: 65000000,
      image: "/placeholder.svg",
      make: "BMW",
      model: "X3",
      year: 2023,
      mileage: 8000,
      condition: "Like New",
      fuelType: "Petrol",
      transmission: "Automatic",
      color: "Black",
      location: "Yangon",
      rating: 4.9,
      features: ["Premium Sound", "Panoramic Roof", "Heated Seats", "Navigation", "Wireless Charging"]
    }
  ];

  useEffect(() => {
    // In a real app, this would load from localStorage or API
    setCompareItems(mockCompareData);
  }, []);

  const removeFromCompare = (id: number) => {
    setCompareItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Removed from comparison",
      description: "Vehicle has been removed from your comparison list.",
    });
  };

  const clearAll = () => {
    setCompareItems([]);
    toast({
      title: "Comparison cleared",
      description: "All vehicles have been removed from comparison.",
    });
  };

  if (compareItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Vehicle Comparison</h1>
            <p className="text-gray-600 mb-8">You haven't added any vehicles to compare yet.</p>
            <Link to="/cars">
              <Button>Browse Vehicles</Button>
            </Link>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Vehicles</h1>
            <p className="text-gray-600">Compare up to 3 vehicles side by side</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={clearAll}>Clear All</Button>
            <Link to="/cars">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Browse
              </Button>
            </Link>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-w-full">
            {compareItems.map((vehicle) => (
              <Card key={vehicle.id} className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 z-10"
                  onClick={() => removeFromCompare(vehicle.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
                
                <CardContent className="p-6">
                  {/* Vehicle Image */}
                  <div className="relative mb-4">
                    <img src={vehicle.image} alt={vehicle.title} className="w-full h-48 object-cover rounded-lg" />
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary">{vehicle.condition}</Badge>
                    </div>
                  </div>

                  {/* Vehicle Info */}
                  <h3 className="text-xl font-bold mb-2">{vehicle.title}</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-4">
                    {vehicle.price.toLocaleString()} MMK
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(vehicle.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{vehicle.rating}</span>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-4">
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">Specifications</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">Year</span>
                          </div>
                          <span className="font-medium">{vehicle.year}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Mileage</span>
                          </div>
                          <span className="font-medium">{vehicle.mileage.toLocaleString()} km</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Fuel className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">Fuel Type</span>
                          </div>
                          <span className="font-medium">{vehicle.fuelType}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Settings className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">Transmission</span>
                          </div>
                          <span className="font-medium">{vehicle.transmission}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Palette className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">Color</span>
                          </div>
                          <span className="font-medium">{vehicle.color}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">Location</span>
                          </div>
                          <span className="font-medium">{vehicle.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">Key Features</h4>
                      <div className="space-y-2">
                        {vehicle.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-6">
                    <Button className="flex-1">View Details</Button>
                    <Button variant="outline" className="flex-1">Contact Seller</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add More Vehicles */}
        {compareItems.length < 3 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">You can compare up to 3 vehicles</p>
            <Link to="/cars">
              <Button variant="outline">Add More Vehicles</Button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Compare;
