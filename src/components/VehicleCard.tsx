import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Gauge, Fuel, Eye, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import WishlistButton from './WishlistButton';
import CompareButton from './CompareButton';

interface VehicleCardProps {
  id: string;
  title: string;
  price: string;
  year: number;
  mileage: string;
  fuel: string;
  transmission: string;
  location: string;
  seller: {
    type: 'Private' | 'Dealer' | 'Business';
    name: string;
    verified: boolean;
  };
  images: string[];
  featured?: boolean;
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

const VehicleCard = ({ 
  id, 
  title, 
  price, 
  year, 
  mileage, 
  fuel, 
  transmission, 
  location, 
  seller, 
  images, 
  featured = false,
  className = '' ,
  onEdit,
  onDelete,
  showActions = false
}: VehicleCardProps) => {
  
  const vehicleData = {
    title, price, year, mileage, fuel, transmission, location, seller, images
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: `Check out this ${title} for ${price} Ks`,
        url: `${window.location.origin}/vehicle/${id}`
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/vehicle/${id}`);
    }
  };

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 ${featured ? 'ring-2 ring-blue-100' : ''} ${className}`}>
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={images[0] || '/placeholder.svg'} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {featured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              Featured
            </Badge>
          )}
          <Badge 
            variant={seller.type === 'Dealer' ? 'default' : 'secondary'}
            className={seller.type === 'Dealer' ? 'bg-blue-600 text-white' : ''}
          >
            {seller.type}
          </Badge>
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <WishlistButton vehicleId={id} />
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleShare}
            className="w-8 h-8 p-0 bg-white/80 hover:bg-white/90 backdrop-blur-sm"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* View Count */}
        <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
          <Eye className="w-3 h-3" />
          <span>234</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title & Price */}
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{title}</h3>
          <p className="text-lg font-bold text-blue-600">{price} Ks</p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="w-4 h-4" />
            <span>{mileage}</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="w-4 h-4" />
            <span>{fuel}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🔧</span>
            <span>{transmission}</span>
          </div>
        </div>

        {/* Location & Seller */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{seller.name}</span>
            {seller.verified && <span className="text-green-500">✓</span>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link to={`/vehicle/${id}`} className="flex-1">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl">
              View Details
            </Button>
          </Link>
          <CompareButton vehicleId={id} vehicleData={vehicleData} />
          {showActions && (
            <>
              <Button variant="outline" size="sm" onClick={onEdit} className="rounded-xl border-blue-500 text-blue-600 hover:bg-blue-50">Edit</Button>
              <Button variant="destructive" size="sm" onClick={onDelete} className="rounded-xl">Delete</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
