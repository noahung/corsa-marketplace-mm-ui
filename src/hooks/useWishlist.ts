
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  const fetchWishlist = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('listing_id')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setWishlistItems(data.map(item => item.listing_id.toString()));
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const toggleWishlist = async (listingId: string) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to save vehicles to your wishlist.",
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    
    try {
      const isWishlisted = wishlistItems.includes(listingId);
      
      if (isWishlisted) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('listing_id', parseInt(listingId));
        
        if (error) throw error;
        
        setWishlistItems(prev => prev.filter(id => id !== listingId));
        toast({
          title: "Removed from wishlist",
          description: "Vehicle removed from your saved items.",
        });
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            listing_id: parseInt(listingId)
          });
        
        if (error) throw error;
        
        setWishlistItems(prev => [...prev, listingId]);
        toast({
          title: "Added to wishlist",
          description: "Vehicle saved to your wishlist.",
        });
      }
      
      return true;
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to update wishlist. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const isWishlisted = (listingId: string) => wishlistItems.includes(listingId);

  return {
    wishlistItems,
    loading,
    toggleWishlist,
    isWishlisted,
    fetchWishlist
  };
};
