
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface WishlistButtonProps {
  vehicleId: string;
  className?: string;
}

const WishlistButton = ({ vehicleId, className = '' }: WishlistButtonProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleWishlistToggle = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to save vehicles to your wishlist.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsWishlisted(!isWishlisted);
      
      toast({
        title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
        description: isWishlisted 
          ? "Vehicle removed from your saved items." 
          : "Vehicle saved to your wishlist.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update wishlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleWishlistToggle}
      disabled={loading}
      size="sm"
      variant="ghost"
      className={`w-8 h-8 p-0 bg-white/80 hover:bg-white/90 backdrop-blur-sm ${className}`}
    >
      <Heart 
        className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
      />
    </Button>
  );
};

export default WishlistButton;
