import React, { useState, useEffect } from 'react';
import { Car, Bike, ShoppingCart, Tag, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface CategoryTabsProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
  className?: string;
}

const CategoryTabs = ({ activeCategory = 'all', onCategoryChange, className = '' }: CategoryTabsProps) => {
  const [active, setActive] = useState(activeCategory);
  const [counts, setCounts] = useState({ all: 0, cars: 0, motorbikes: 0, dealers: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      // All vehicles
      const { count: allCount } = await supabase.from('listings').select('*', { count: 'exact', head: true });
      // Cars
      const { count: carCount } = await supabase.from('listings').select('*', { count: 'exact', head: true }).eq('category', 'car');
      // Motorbikes
      const { count: bikeCount } = await supabase.from('listings').select('*', { count: 'exact', head: true }).eq('category', 'motorbike');
      // Dealers
      const { count: dealerCount } = await supabase.from('dealers').select('*', { count: 'exact', head: true });
      setCounts({
        all: allCount || 0,
        cars: carCount || 0,
        motorbikes: bikeCount || 0,
        dealers: dealerCount || 0,
      });
    };
    fetchCounts();
  }, []);

  const categories = [
    { id: 'all', label: 'All Vehicles', icon: ShoppingCart, count: counts.all },
    { id: 'cars', label: 'Cars', icon: Car, count: counts.cars },
    { id: 'motorbikes', label: 'Motorbikes', icon: Bike, count: counts.motorbikes },
    { id: 'sell', label: 'Sell', icon: Tag, count: null },
    { id: 'dealers', label: 'Dealers', icon: Building, count: counts.dealers }
  ];

  const handleCategoryClick = (categoryId: string) => {
    setActive(categoryId);
    onCategoryChange?.(categoryId);
  };

  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 overflow-x-auto py-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = active === category.id;
            
            return (
              <Button
                key={category.id}
                variant={isActive ? "default" : "ghost"}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{category.label}</span>
                {category.count !== null && category.count !== undefined && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {category.count.toLocaleString()}
                  </span>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
