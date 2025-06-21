
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface CreateEnquiryParams {
  listingId: string;
  sellerId: string;
  message: string;
  phone?: string;
  email?: string;
  enquiryType: 'call' | 'message' | 'email' | 'loan';
}

export const useEnquiries = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const createEnquiry = async (params: CreateEnquiryParams) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to contact sellers.",
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('chats')
        .insert({
          listing_id: parseInt(params.listingId),
          sender_id: user.id,
          receiver_id: params.sellerId,
          message: `${params.enquiryType.toUpperCase()}: ${params.message}${params.phone ? ` (Phone: ${params.phone})` : ''}${params.email ? ` (Email: ${params.email})` : ''}`
        });
      
      if (error) throw error;
      
      toast({
        title: "Enquiry sent",
        description: "Your message has been sent to the seller.",
      });
      
      return true;
    } catch (error) {
      console.error('Error creating enquiry:', error);
      toast({
        title: "Error",
        description: "Failed to send enquiry. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createEnquiry
  };
};
