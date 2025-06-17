
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEnquiries } from '@/hooks/useEnquiries';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleId: string;
  sellerId: string;
  vehicleTitle: string;
  enquiryType: 'call' | 'message' | 'loan';
}

const ContactModal = ({ isOpen, onClose, vehicleId, sellerId, vehicleTitle, enquiryType }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    message: '',
    phone: '',
    email: ''
  });
  const { createEnquiry, loading } = useEnquiries();

  const getDefaultMessage = () => {
    switch (enquiryType) {
      case 'call':
        return `Hi, I'm interested in the ${vehicleTitle}. Please call me to discuss.`;
      case 'loan':
        return `Hi, I'm interested in the ${vehicleTitle} and would like to know about financing options.`;
      default:
        return `Hi, I'm interested in the ${vehicleTitle}. Could you provide more details?`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await createEnquiry({
      listingId: vehicleId,
      sellerId,
      message: formData.message || getDefaultMessage(),
      phone: formData.phone,
      email: formData.email,
      enquiryType
    });
    
    if (success) {
      onClose();
      setFormData({ message: '', phone: '', email: '' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {enquiryType === 'call' && 'Request Call Back'}
            {enquiryType === 'loan' && 'Loan Enquiry'}
            {enquiryType === 'message' && 'Send Message'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder={getDefaultMessage()}
              rows={3}
            />
          </div>
          
          {enquiryType === 'call' && (
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+95 9 xxx xxx xxx"
                required
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="your@email.com"
            />
          </div>
          
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Sending...' : 'Send Enquiry'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
