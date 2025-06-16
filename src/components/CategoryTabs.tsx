
import React, { useState } from 'react';
import { Car, Bike, ShoppingCart, Tag, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoryTabsProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
  className?: string;
}

const CategoryTabs = ({ activeCategory = 'all', onCategoryChange, className = '' }: CategoryTabsProps) => {
  const [active, setActive] = useState(activeCategory);

  const categories = [
    { id: 'all', label: 'All Vehicles', icon: ShoppingCart, count: '12,543' },
    { id: 'cars', label: 'Cars', icon: Car, count: '8,234' },
    { id: 'motorbikes', label: 'Motorbikes', icon: Bike, count: '3,421' },
    { id: 'sell', label: 'Sell', icon: Tag, count: null },
    { id: 'dealers', label: 'Dealers', icon: Building, count: '152' }
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
                {category.count && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {category.count}
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
