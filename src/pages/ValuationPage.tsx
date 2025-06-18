
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';

const ValuationPage = () => {
  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    condition: ''
  });
  const [valuation, setValuation] = useState(null);

  const handleValuation = () => {
    // Mock valuation calculation
    const basePrice = Math.random() * 400 + 100;
    const privatePrice = Math.round(basePrice * 1.1);
    const tradePrice = Math.round(basePrice * 0.9);
    
    setValuation({
      privateSale: privatePrice,
      tradeIn: tradePrice,
      marketAverage: Math.round(basePrice)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Free Vehicle Valuation
          </h1>
          <p className="text-lg text-gray-600">
            Get an instant valuation for your vehicle based on Myanmar market data
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Valuation Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Vehicle Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="make">Make</Label>
                <Select value={vehicleData.make} onValueChange={(value) => setVehicleData({...vehicleData, make: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="nissan">Nissan</SelectItem>
                    <SelectItem value="mazda">Mazda</SelectItem>
                    <SelectItem value="suzuki">Suzuki</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  placeholder="e.g. Camry, Civic, Altima"
                  value={vehicleData.model}
                  onChange={(e) => setVehicleData({...vehicleData, model: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="year">Year</Label>
                <Select value={vehicleData.year} onValueChange={(value) => setVehicleData({...vehicleData, year: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({length: 25}, (_, i) => 2024 - i).map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="mileage">Mileage (km)</Label>
                <Input
                  id="mileage"
                  type="number"
                  placeholder="e.g. 50000"
                  value={vehicleData.mileage}
                  onChange={(e) => setVehicleData({...vehicleData, mileage: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="condition">Condition</Label>
                <Select value={vehicleData.condition} onValueChange={(value) => setVehicleData({...vehicleData, condition: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleValuation}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!vehicleData.make || !vehicleData.model || !vehicleData.year}
              >
                Get Free Valuation
              </Button>
            </CardContent>
          </Card>

          {/* Valuation Results */}
          {valuation && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Your Vehicle Valuation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Estimated Market Value</div>
                  <div className="text-3xl font-bold text-blue-600">
                    {valuation.marketAverage} Lakhs Ks
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Private Sale Price</div>
                      <div className="text-sm text-gray-600">Selling to individual buyer</div>
                    </div>
                    <div className="text-lg font-semibold text-green-600">
                      {valuation.privateSale} Lakhs Ks
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Trade-in Value</div>
                      <div className="text-sm text-gray-600">Trading with dealer</div>
                    </div>
                    <div className="text-lg font-semibold text-orange-600">
                      {valuation.tradeIn} Lakhs Ks
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  *Prices are estimates based on current market data and may vary based on actual vehicle condition and market demand.
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Valuation Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold mb-2">Accurate Information</h3>
                <p className="text-sm text-gray-600">Provide accurate mileage and condition for the most precise valuation</p>
              </div>
              <div className="text-center p-4">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold mb-2">Market Trends</h3>
                <p className="text-sm text-gray-600">Our valuations are updated regularly based on current market trends</p>
              </div>
              <div className="text-center p-4">
                <Calculator className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold mb-2">Free Service</h3>
                <p className="text-sm text-gray-600">Get unlimited free valuations with no hidden costs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="pb-20 md:pb-0"></div>
    </div>
  );
};

export default ValuationPage;
