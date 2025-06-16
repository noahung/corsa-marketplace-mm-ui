
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

const SearchFilters = () => {
  const [priceRange, setPriceRange] = useState([50, 500]);
  const [yearRange, setYearRange] = useState([2015, 2024]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const makes = ['Toyota', 'Honda', 'Mazda', 'BMW', 'Mercedes-Benz', 'Audi', 'Nissan', 'Hyundai'];
  const bodyTypes = ['Sedan', 'SUV', 'Hatchback', 'Wagon', 'Coupe', 'Convertible'];
  const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
  const transmissions = ['Manual', 'Automatic', 'CVT'];
  const locations = ['Yangon', 'Mandalay', 'Naypyitaw', 'Bagan', 'Taunggyi'];

  const removeFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setPriceRange([50, 500]);
    setYearRange([2015, 2024]);
  };

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Active Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                  {filter}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => removeFilter(filter)} />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Price Range (Lakhs Ks)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={1000}
            min={10}
            step={10}
            className="w-full"
          />
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label className="text-xs text-gray-500">Min</Label>
              <Input value={`${priceRange[0]} Lakhs`} readOnly className="text-sm" />
            </div>
            <div className="flex-1">
              <Label className="text-xs text-gray-500">Max</Label>
              <Input value={`${priceRange[1]} Lakhs`} readOnly className="text-sm" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Year Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Year</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={yearRange}
            onValueChange={setYearRange}
            max={2024}
            min={2000}
            step={1}
            className="w-full"
          />
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label className="text-xs text-gray-500">From</Label>
              <Input value={yearRange[0]} readOnly className="text-sm" />
            </div>
            <div className="flex-1">
              <Label className="text-xs text-gray-500">To</Label>
              <Input value={yearRange[1]} readOnly className="text-sm" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Make */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Make</CardTitle>
        </CardHeader>
        <CardContent>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select make" />
            </SelectTrigger>
            <SelectContent>
              {makes.map((make) => (
                <SelectItem key={make} value={make.toLowerCase()}>
                  {make}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Body Type */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Body Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {bodyTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={type} />
              <Label htmlFor={type} className="text-sm">{type}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Fuel Type */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Fuel Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {fuelTypes.map((fuel) => (
            <div key={fuel} className="flex items-center space-x-2">
              <Checkbox id={fuel} />
              <Label htmlFor={fuel} className="text-sm">{fuel}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Transmission */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Transmission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {transmissions.map((trans) => (
            <div key={trans} className="flex items-center space-x-2">
              <Checkbox id={trans} />
              <Label htmlFor={trans} className="text-sm">{trans}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Location</CardTitle>
        </CardHeader>
        <CardContent>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location.toLowerCase()}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Seller Type */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Seller Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="dealer" />
            <Label htmlFor="dealer" className="text-sm">Dealer</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="private" />
            <Label htmlFor="private" className="text-sm">Private Seller</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="verified" />
            <Label htmlFor="verified" className="text-sm">Verified Only</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchFilters;
