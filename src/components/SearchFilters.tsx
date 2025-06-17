
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

interface SearchFiltersProps {
  onFilterChange?: (filters: any) => void;
}

const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const [priceRange, setPriceRange] = useState([50, 500]);
  const [yearRange, setYearRange] = useState([2015, 2024]);
  const [mileageRange, setMileageRange] = useState([0, 100000]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    bodyType: [],
    fuelType: [],
    transmission: [],
    condition: '',
    color: '',
    region: '',
    sellerType: [],
    financeAvailable: false
  });

  const makes = ['Toyota', 'Honda', 'Mazda', 'BMW', 'Mercedes-Benz', 'Audi', 'Nissan', 'Hyundai', 'Suzuki', 'Mitsubishi', 'Kawasaki', 'Yamaha'];
  const bodyTypes = ['Sedan', 'SUV', 'Hatchback', 'Wagon', 'Coupe', 'Convertible', 'Sport Bike', 'Cruiser', 'Touring'];
  const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
  const transmissions = ['Manual', 'Automatic', 'CVT', 'Semi-Automatic'];
  const conditions = ['New', 'Excellent', 'Good', 'Fair'];
  const colors = ['White', 'Black', 'Silver', 'Blue', 'Red', 'Green', 'Gray', 'Gold'];
  const regions = ['Yangon', 'Mandalay', 'Naypyitaw', 'Bagan', 'Taunggyi', 'Mawlamyine', 'Pathein'];
  const sellerTypes = ['Private', 'Dealer', 'Business'];

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const allFilters = {
      ...newFilters,
      priceRange,
      yearRange,
      mileageRange
    };
    
    onFilterChange?.(allFilters);
  };

  const updateArrayFilter = (key: string, value: string) => {
    const currentArray = filters[key as keyof typeof filters] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    updateFilter(key, newArray);
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setPriceRange([50, 500]);
    setYearRange([2015, 2024]);
    setMileageRange([0, 100000]);
    setFilters({
      make: '',
      model: '',
      bodyType: [],
      fuelType: [],
      transmission: [],
      condition: '',
      color: '',
      region: '',
      sellerType: [],
      financeAvailable: false
    });
    onFilterChange?.({});
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
            onValueChange={(value) => {
              setPriceRange(value);
              onFilterChange?.({ ...filters, priceRange: value, yearRange, mileageRange });
            }}
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
            onValueChange={(value) => {
              setYearRange(value);
              onFilterChange?.({ ...filters, priceRange, yearRange: value, mileageRange });
            }}
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

      {/* Mileage Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Mileage (km)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={mileageRange}
            onValueChange={(value) => {
              setMileageRange(value);
              onFilterChange?.({ ...filters, priceRange, yearRange, mileageRange: value });
            }}
            max={200000}
            min={0}
            step={5000}
            className="w-full"
          />
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label className="text-xs text-gray-500">Min</Label>
              <Input value={`${mileageRange[0].toLocaleString()} km`} readOnly className="text-sm" />
            </div>
            <div className="flex-1">
              <Label className="text-xs text-gray-500">Max</Label>
              <Input value={`${mileageRange[1].toLocaleString()} km`} readOnly className="text-sm" />
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
          <Select value={filters.make} onValueChange={(value) => updateFilter('make', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Makes</SelectItem>
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
              <Checkbox 
                id={type} 
                checked={filters.bodyType.includes(type)}
                onCheckedChange={() => updateArrayFilter('bodyType', type)}
              />
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
              <Checkbox 
                id={fuel} 
                checked={filters.fuelType.includes(fuel)}
                onCheckedChange={() => updateArrayFilter('fuelType', fuel)}
              />
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
              <Checkbox 
                id={trans} 
                checked={filters.transmission.includes(trans)}
                onCheckedChange={() => updateArrayFilter('transmission', trans)}
              />
              <Label htmlFor={trans} className="text-sm">{trans}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Condition */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Condition</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.condition} onValueChange={(value) => updateFilter('condition', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Conditions</SelectItem>
              {conditions.map((condition) => (
                <SelectItem key={condition} value={condition.toLowerCase()}>
                  {condition}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Color */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Color</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.color} onValueChange={(value) => updateFilter('color', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Colors</SelectItem>
              {colors.map((color) => (
                <SelectItem key={color} value={color.toLowerCase()}>
                  {color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Region</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.region} onValueChange={(value) => updateFilter('region', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Regions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region.toLowerCase()}>
                  {region}
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
          {sellerTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox 
                id={type} 
                checked={filters.sellerType.includes(type)}
                onCheckedChange={() => updateArrayFilter('sellerType', type)}
              />
              <Label htmlFor={type} className="text-sm">{type}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Finance Available */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Additional Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="finance" 
              checked={filters.financeAvailable}
              onCheckedChange={(checked) => updateFilter('financeAvailable', checked)}
            />
            <Label htmlFor="finance" className="text-sm">Finance Available</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchFilters;
