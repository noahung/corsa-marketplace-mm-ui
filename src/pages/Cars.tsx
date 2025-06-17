
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SearchFilters from '@/components/SearchFilters';
import VehicleCard from '@/components/VehicleCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Grid, List } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Cars = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          listing_images (url)
        `)
        .in('make', ['Toyota', 'Honda', 'Mazda', 'BMW', 'Mercedes-Benz', 'Audi', 'Nissan', 'Hyundai', 'Suzuki', 'Mitsubishi'])
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedVehicles = data.map(item => ({
        id: item.id.toString(),
        title: item.title,
        price: `${item.price}`,
        year: item.year,
        mileage: `${item.mileage?.toLocaleString()} km`,
        fuel: item.fuel_type,
        transmission: item.transmission,
        location: `${item.township}, ${item.region}`,
        seller: { 
          type: item.seller_type === 'Dealer' ? 'Dealer' : 'Private',
          name: item.seller_type === 'Dealer' ? 'Dealer' : 'Private Seller',
          verified: item.seller_type === 'Dealer'
        },
        images: item.listing_images?.map((img: any) => img.url) || ['/placeholder.svg'],
        featured: item.is_featured,
        rawData: item
      }));

      setVehicles(formattedVehicles);
      setFilteredVehicles(formattedVehicles);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...vehicles];

    // Apply filters
    if (filters.priceRange) {
      filtered = filtered.filter(v => {
        const price = parseInt(v.price);
        return price >= filters.priceRange[0] && price <= filters.priceRange[1];
      });
    }

    if (filters.yearRange) {
      filtered = filtered.filter(v => 
        v.year >= filters.yearRange[0] && v.year <= filters.yearRange[1]
      );
    }

    if (filters.make) {
      filtered = filtered.filter(v => 
        v.rawData.make.toLowerCase().includes(filters.make.toLowerCase())
      );
    }

    if (filters.fuelType && filters.fuelType.length > 0) {
      filtered = filtered.filter(v => 
        filters.fuelType.some((fuel: string) => 
          v.fuel?.toLowerCase().includes(fuel.toLowerCase())
        )
      );
    }

    if (filters.transmission && filters.transmission.length > 0) {
      filtered = filtered.filter(v => 
        filters.transmission.some((trans: string) => 
          v.transmission?.toLowerCase().includes(trans.toLowerCase())
        )
      );
    }

    if (filters.region) {
      filtered = filtered.filter(v => 
        v.rawData.region?.toLowerCase().includes(filters.region.toLowerCase())
      );
    }

    setFilteredVehicles(filtered);
  };

  const handleSort = (sortType: string) => {
    setSortBy(sortType);
    let sorted = [...filteredVehicles];

    switch (sortType) {
      case 'price-low':
        sorted.sort((a, b) => parseInt(a.price) - parseInt(b.price));
        break;
      case 'price-high':
        sorted.sort((a, b) => parseInt(b.price) - parseInt(a.price));
        break;
      case 'year-new':
        sorted.sort((a, b) => b.year - a.year);
        break;
      case 'year-old':
        sorted.sort((a, b) => a.year - b.year);
        break;
      case 'mileage-low':
        sorted.sort((a, b) => parseInt(a.mileage) - parseInt(b.mileage));
        break;
      default: // newest
        sorted.sort((a, b) => new Date(b.rawData.created_at).getTime() - new Date(a.rawData.created_at).getTime());
    }

    setFilteredVehicles(sorted);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cars for Sale</h1>
            <p className="text-gray-600">
              {loading ? 'Loading...' : `${filteredVehicles.length} vehicles found`}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            
            <Select value={sortBy} onValueChange={handleSort}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="year-new">Year: Newest</SelectItem>
                <SelectItem value="year-old">Year: Oldest</SelectItem>
                <SelectItem value="mileage-low">Mileage: Lowest</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <SearchFilters onFilterChange={handleFilterChange} />
          </div>

          {/* Vehicle Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredVehicles.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    {...vehicle}
                    className={viewMode === 'list' ? 'md:flex md:items-center' : ''}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Grid className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No vehicles found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cars;
