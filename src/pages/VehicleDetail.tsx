import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ContactModal from '@/components/ContactModal';
import { 
  Calendar, Gauge, Fuel, Car, MapPin, Heart, Share2, 
  Phone, MessageCircle, Shield, Star, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import VehicleCard from '@/components/VehicleCard';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import WishlistButton from '@/components/WishlistButton';

interface VehicleListing {
  id: number;
  title: string;
  make: string;
  model: string;
  price: number;
  year: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  condition: string;
  color: string;
  region: string;
  township: string;
  seller_type: string;
  description: string;
  owner_id: number; // Changed to number to match database
  listing_images: { url: string }[];
}

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<VehicleListing | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [contactModal, setContactModal] = useState<{ isOpen: boolean; type: 'call' | 'message' | 'loan' | null }>({
    isOpen: false,
    type: null
  });
  const [similarVehicles, setSimilarVehicles] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchVehicleDetails();
    }
  }, [id]);

  const fetchVehicleDetails = async () => {
    try {
      const { data: vehicleData, error } = await supabase
        .from('listings')
        .select(`
          *,
          listing_images (url)
        `)
        .eq('id', parseInt(id!)) // Convert string to number
        .single();

      if (error) throw error;

      setVehicle(vehicleData);
      
      // Fetch similar vehicles
      const { data: similarData } = await supabase
        .from('listings')
        .select(`
          *,
          listing_images (url)
        `)
        .eq('make', vehicleData.make)
        .neq('id', parseInt(id!)) // Convert string to number
        .limit(3);

      if (similarData) {
        setSimilarVehicles(similarData.map(item => ({
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
          images: item.listing_images?.map((img: any) => img.url) || ['/placeholder.svg']
        })));
      }
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
      toast({
        title: "Error",
        description: "Failed to load vehicle details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (vehicle?.listing_images) {
      setCurrentImageIndex((prev) => 
        prev === vehicle.listing_images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (vehicle?.listing_images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? vehicle.listing_images.length - 1 : prev - 1
      );
    }
  };

  const handleContact = (type: 'call' | 'message' | 'loan') => {
    setContactModal({ isOpen: true, type });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: vehicle?.title,
        text: `Check out this ${vehicle?.title} for ${vehicle?.price} Lakhs Ks`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Vehicle link copied to clipboard.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Vehicle Not Found</h2>
            <p className="text-gray-600 mb-4">The vehicle you're looking for doesn't exist.</p>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const images = vehicle.listing_images?.length > 0 
    ? vehicle.listing_images 
    : [{ url: '/placeholder.svg' }];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative aspect-[16/10]">
                <img 
                  src={images[currentImageIndex]?.url || '/placeholder.svg'}
                  alt={vehicle.title}
                  className="w-full h-full object-cover"
                />
                
                {images.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}

                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>

                <div className="absolute top-4 right-4 flex gap-2">
                  <WishlistButton vehicleId={vehicle.id.toString()} />
                  <Button size="sm" variant="outline" onClick={handleShare} className="bg-white/80 hover:bg-white/90">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img src={image.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </Card>

            {/* Vehicle Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{vehicle.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {vehicle.township}, {vehicle.region}
                      </span>
                      <Badge variant={vehicle.seller_type === 'Dealer' ? 'default' : 'secondary'}>
                        {vehicle.seller_type}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{vehicle.price} Lakhs Ks</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Key Specs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 mx-auto mb-2 text-gray-600" />
                    <div className="text-sm text-gray-600">Year</div>
                    <div className="font-semibold">{vehicle.year}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Gauge className="w-5 h-5 mx-auto mb-2 text-gray-600" />
                    <div className="text-sm text-gray-600">Mileage</div>
                    <div className="font-semibold">{vehicle.mileage?.toLocaleString()} km</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Fuel className="w-5 h-5 mx-auto mb-2 text-gray-600" />
                    <div className="text-sm text-gray-600">Fuel</div>
                    <div className="font-semibold">{vehicle.fuel_type}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Car className="w-5 h-5 mx-auto mb-2 text-gray-600" />
                    <div className="text-sm text-gray-600">Transmission</div>
                    <div className="font-semibold">{vehicle.transmission}</div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{vehicle.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Make</span>
                        <span className="font-medium">{vehicle.make}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Model</span>
                        <span className="font-medium">{vehicle.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Condition</span>
                        <span className="font-medium">{vehicle.condition}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Color</span>
                        <span className="font-medium">{vehicle.color}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Seller Type</span>
                        <span className="font-medium">{vehicle.seller_type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Seller</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    onClick={() => handleContact('call')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Request Call Back
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleContact('message')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Loan Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Loan Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Estimated Monthly Payment</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(vehicle.price * 0.008)} Lakhs Ks
                  </div>
                  <div className="text-xs text-gray-500">Based on 20% down payment, 5 years</div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleContact('loan')}
                >
                  Get Loan Quote
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Vehicles */}
        {similarVehicles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Vehicles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} {...vehicle} />
              ))}
            </div>
          </div>
        )}
      </div>

      <ContactModal
        isOpen={contactModal.isOpen}
        onClose={() => setContactModal({ isOpen: false, type: null })}
        vehicleId={vehicle.id.toString()}
        sellerId={vehicle.owner_id.toString()} // Convert number to string
        vehicleTitle={vehicle.title}
        enquiryType={contactModal.type!}
      />

      <div className="pb-20 md:pb-0"></div>
    </div>
  );
};

export default VehicleDetail;
