
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface SearchFiltersProps {
  filters: {
    make: string;
    model: string;
    minPrice: number;
    maxPrice: number;
    minYear: number;
    maxYear: number;
    fuelType: string;
    transmission: string;
    location: string;
  };
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
  onSearch: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  onSearch
}) => {
  const makes = ['Toyota', 'Honda', 'Nissan', 'Suzuki', 'Mazda', 'BMW', 'Mercedes-Benz', 'Audi'];
  const locations = ['Yangon', 'Mandalay', 'Naypyitaw', 'Mawlamyine', 'Taunggyi', 'Pathein'];

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'minPrice' && value === 0) return false;
    if (key === 'maxPrice' && value === 10000) return false;
    if (key === 'minYear' && value === 2000) return false;
    if (key === 'maxYear' && value === 2024) return false;
    return value && value !== '';
  }).length;

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Search Filters</CardTitle>
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{activeFiltersCount} active</Badge>
              <Button variant="ghost" size="sm" onClick={onClearFilters}>
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Make</label>
            <Select value={filters.make} onValueChange={(value) => onFilterChange('make', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Makes</SelectItem>
                {makes.map((make) => (
                  <SelectItem key={make} value={make}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Model</label>
            <Input
              placeholder="Enter model"
              value={filters.model}
              onChange={(e) => onFilterChange('model', e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Location</label>
            <Select value={filters.location} onValueChange={(value) => onFilterChange('location', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Fuel Type</label>
            <Select value={filters.fuelType} onValueChange={(value) => onFilterChange('fuelType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select fuel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="petrol">Petrol</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Transmission</label>
            <Select value={filters.transmission} onValueChange={(value) => onFilterChange('transmission', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select transmission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="automatic">Automatic</SelectItem>
                <SelectItem value="cvt">CVT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Price Range: {filters.minPrice} - {filters.maxPrice} Lakhs Ks
          </label>
          <Slider
            value={[filters.minPrice, filters.maxPrice]}
            onValueChange={([min, max]) => {
              onFilterChange('minPrice', min);
              onFilterChange('maxPrice', max);
            }}
            min={0}
            max={10000}
            step={50}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Year Range: {filters.minYear} - {filters.maxYear}
          </label>
          <Slider
            value={[filters.minYear, filters.maxYear]}
            onValueChange={([min, max]) => {
              onFilterChange('minYear', min);
              onFilterChange('maxYear', max);
            }}
            min={2000}
            max={2024}
            step={1}
            className="w-full"
          />
        </div>

        <Button onClick={onSearch} className="w-full bg-blue-600 hover:bg-blue-700">
          Search Vehicles
        </Button>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
