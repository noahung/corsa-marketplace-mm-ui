
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/useWishlist';

interface WishlistButtonProps {
  vehicleId: string;
  className?: string;
}

const WishlistButton = ({ vehicleId, className = '' }: WishlistButtonProps) => {
  const { toggleWishlist, isWishlisted, loading } = useWishlist();

  const handleClick = () => {
    toggleWishlist(vehicleId);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      size="sm"
      variant="ghost"
      className={`w-8 h-8 p-0 bg-white/80 hover:bg-white/90 backdrop-blur-sm ${className}`}
    >
      <Heart 
        className={`w-4 h-4 ${isWishlisted(vehicleId) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
      />
    </Button>
  );
};

export default WishlistButton;
