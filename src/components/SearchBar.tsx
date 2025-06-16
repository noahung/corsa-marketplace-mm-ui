
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
  className?: string;
}

interface SearchFilters {
  query: string;
  make: string;
  budget: string;
  year: string;
  condition: string;
}

const SearchBar = ({ onSearch, className = '' }: SearchBarProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    make: '',
    budget: '',
    year: '',
    condition: ''
  });

  const handleSearch = () => {
    onSearch?.(filters);
  };

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-100 ${className}`}>
      <div className="space-y-4">
        {/* Main Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search cars, motorbikes, or brands..."
            value={filters.query}
            onChange={(e) => updateFilter('query', e.target.value)}
            className="pl-10 pr-4 py-3 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Quick Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Select value={filters.make} onValueChange={(value) => updateFilter('make', value)}>
            <SelectTrigger className="rounded-xl border-gray-200">
              <SelectValue placeholder="Make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="toyota">Toyota</SelectItem>
              <SelectItem value="honda">Honda</SelectItem>
              <SelectItem value="nissan">Nissan</SelectItem>
              <SelectItem value="suzuki">Suzuki</SelectItem>
              <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
              <SelectItem value="mazda">Mazda</SelectItem>
              <SelectItem value="hyundai">Hyundai</SelectItem>
              <SelectItem value="kia">KIA</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.budget} onValueChange={(value) => updateFilter('budget', value)}>
            <SelectTrigger className="rounded-xl border-gray-200">
              <SelectValue placeholder="Budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-50">Under 50 Lakhs</SelectItem>
              <SelectItem value="50-100">50-100 Lakhs</SelectItem>
              <SelectItem value="100-200">100-200 Lakhs</SelectItem>
              <SelectItem value="200-500">200-500 Lakhs</SelectItem>
              <SelectItem value="500+">500+ Lakhs</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.year} onValueChange={(value) => updateFilter('year', value)}>
            <SelectTrigger className="rounded-xl border-gray-200">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2020+">2020 & Newer</SelectItem>
              <SelectItem value="2015-2019">2015-2019</SelectItem>
              <SelectItem value="2010-2014">2010-2014</SelectItem>
              <SelectItem value="2005-2009">2005-2009</SelectItem>
              <SelectItem value="2000-2004">2000-2004</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.condition} onValueChange={(value) => updateFilter('condition', value)}>
            <SelectTrigger className="rounded-xl border-gray-200">
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button 
          onClick={handleSearch}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl font-medium"
        >
          <Search className="w-5 h-5 mr-2" />
          Search Vehicles
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
