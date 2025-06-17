
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Calendar, Gauge, Fuel, Car, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Compare = () => {
  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    loadCompareList();
    
    // Listen for compare list updates
    const handleCompareUpdate = () => {
      loadCompareList();
    };
    
    window.addEventListener('compareListUpdated', handleCompareUpdate);
    return () => window.removeEventListener('compareListUpdated', handleCompareUpdate);
  }, []);

  const loadCompareList = () => {
    const list = JSON.parse(localStorage.getItem('compareList') || '[]');
    setCompareList(list);
  };

  const removeFromCompare = (vehicleId: string) => {
    const updatedList = compareList.filter((item: any) => item.id !== vehicleId);
    localStorage.setItem('compareList', JSON.stringify(updatedList));
    setCompareList(updatedList);
    window.dispatchEvent(new Event('compareListUpdated'));
  };

  const clearAll = () => {
    localStorage.removeItem('compareList');
    setCompareList([]);
    window.dispatchEvent(new Event('compareListUpdated'));
  };

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Car className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h1 className="text-2xl font-bold mb-2">No vehicles to compare</h1>
            <p className="text-gray-600 mb-6">
              Add vehicles to your compare list to see them side by side.
            </p>
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Compare Vehicles</h1>
              <p className="text-gray-600">Compare up to 3 vehicles side by side</p>
            </div>
            <Button variant="outline" onClick={clearAll}>
              Clear All
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {compareList.map((vehicle: any) => (
            <Card key={vehicle.id} className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromCompare(vehicle.id)}
                className="absolute top-2 right-2 z-10 w-8 h-8 p-0 bg-white/80 hover:bg-white/90"
              >
                <X className="w-4 h-4" />
              </Button>
              
              <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                <img 
                  src={vehicle.images?.[0] || '/placeholder.svg'} 
                  alt={vehicle.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg">{vehicle.title}</CardTitle>
                <div className="text-2xl font-bold text-blue-600">{vehicle.price} Lakhs Ks</div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{vehicle.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Gauge className="w-4 h-4 text-gray-500" />
                    <span>{vehicle.mileage}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Fuel className="w-4 h-4 text-gray-500" />
                    <span>{vehicle.fuel}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Car className="w-4 h-4 text-gray-500" />
                    <span>{vehicle.transmission}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{vehicle.location}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant={vehicle.seller?.type === 'Dealer' ? 'default' : 'secondary'}>
                    {vehicle.seller?.type}
                  </Badge>
                  {vehicle.seller?.verified && (
                    <Badge variant="outline" className="text-green-600">
                      Verified
                    </Badge>
                  )}
                </div>
                
                <Link to={`/vehicle/${vehicle.id}`} className="block">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {compareList.length < 3 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              You can add {3 - compareList.length} more vehicle{3 - compareList.length !== 1 ? 's' : ''} to compare.
            </p>
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
