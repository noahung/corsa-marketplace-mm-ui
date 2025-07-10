import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VehicleCard from './VehicleCard';
import { supabase } from '@/integrations/supabase/client';

const FeaturedVehicles = () => {
  const [featuredVehicles, setFeaturedVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('listings')
        .select('*, listing_images (url)')
        .eq('is_featured', true)
        .limit(6);
      if (!error && data) {
        setFeaturedVehicles(
          data.map((item: any) => ({
            id: item.id.toString(),
            title: item.title,
            price: item.price,
            year: item.year,
            mileage: `${item.mileage?.toLocaleString()} km`,
            fuel: item.fuel_type,
            transmission: item.transmission,
            location: `${item.township}, ${item.region}`,
            seller: {
              type: item.seller_type === 'Dealer' ? 'Dealer' : 'Private',
              name: item.seller_type === 'Dealer' ? 'Dealer' : 'Private Seller',
              verified: item.seller_type === 'Dealer',
            },
            images: item.listing_images?.map((img: any) => img.url) || ['/placeholder.svg'],
            featured: item.is_featured,
          }))
        );
      }
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Featured Vehicles
            </h2>
            <p className="text-gray-600">
              Hand-picked premium vehicles from trusted sellers
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <Button variant="outline" size="sm" className="rounded-lg">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="rounded-lg">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 text-center">Loading...</div>
          ) : featuredVehicles.length > 0 ? (
            featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} {...vehicle} />
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">No featured vehicles found.</div>
          )}
        </div>
        {/* View All Button */}
        <div className="text-center mt-8">
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl">
            View All Featured Vehicles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
