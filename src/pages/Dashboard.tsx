import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Car, Eye, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Link, useNavigate } from 'react-router-dom';

import VehicleCard from '@/components/VehicleCard';
import ProfileInfo from '@/components/ProfileInfo';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  const [myListings, setMyListings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const userId = user?.id;
      
      // Fetch user's listings
      const { data: listingsData } = await supabase
        .from('listings')
        .select(`
          *,
          listing_images (url)
        `)
        .eq('owner_id', userId);

      if (listingsData) {
        setMyListings(listingsData.map(item => ({
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
            name: 'My Listing',
            verified: item.seller_type === 'Dealer'
          },
          images: item.listing_images?.map((img: any) => img.url) || ['/placeholder.svg']
        })));
      }

      // Fetch wishlist using favorites table
      const { data: wishlistData } = await supabase
        .from('favorites')
        .select(`
          listing_id,
          listings (
            *,
            listing_images (url)
          )
        `)
        .eq('user_id', userId);

      if (wishlistData) {
        setWishlist(wishlistData.map(item => ({
          id: item.listing_id.toString(),
          title: item.listings.title,
          price: `${item.listings.price}`,
          year: item.listings.year,
          mileage: `${item.listings.mileage?.toLocaleString()} km`,
          fuel: item.listings.fuel_type,
          transmission: item.listings.transmission,
          location: `${item.listings.township}, ${item.listings.region}`,
          seller: { 
            type: item.listings.seller_type === 'Dealer' ? 'Dealer' : 'Private',
            name: item.listings.seller_type === 'Dealer' ? 'Dealer' : 'Private Seller',
            verified: item.listings.seller_type === 'Dealer'
          },
          images: item.listings.listing_images?.map((img: any) => img.url) || ['/placeholder.svg']
        })));
      }

      // Fetch enquiries using chats table
      const { data: enquiriesData } = await supabase
        .from('chats')
        .select(`
          *,
          listings (title, id)
        `)
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (enquiriesData) {
        setEnquiries(enquiriesData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditListing = (listingId: string) => {
    navigate(`/edit-listing/${listingId}`);
  };

  const handleDeleteListing = async (listingId: string) => {
    if (!window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('listings').delete().eq('id', listingId);
      if (error) {
        alert('Failed to delete listing: ' + error.message);
      } else {
        setMyListings(prev => prev.filter((l: any) => l.id !== listingId));
      }
    } catch (err) {
      alert('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Please Sign In</h2>
            <p className="text-gray-600 mb-4">You need to sign in to access your dashboard.</p>
            <Link to="/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile Info Section */}
        <ProfileInfo />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600">Manage your listings, wishlist, and enquiries</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="listings" className="flex items-center gap-2">
              <Car className="w-4 h-4" />
              My Listings ({myListings.length})
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Wishlist ({wishlist.length})
            </TabsTrigger>
            <TabsTrigger value="enquiries" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Messages ({enquiries.length})
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Listings</h2>
              <Link to="/post-vehicle">
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Post New Vehicle
                </Button>
              </Link>
            </div>
            
            {myListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myListings.map((vehicle: any) => (
                  <VehicleCard
                    key={vehicle.id}
                    {...vehicle}
                    showActions={true}
                    onEdit={() => handleEditListing(vehicle.id)}
                    onDelete={() => handleDeleteListing(vehicle.id)}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Car className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">No listings yet</h3>
                  <p className="text-gray-600 mb-4">Start by posting your first vehicle listing</p>
                  <Link to="/post-vehicle">
                    <Button>Post Your First Vehicle</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-6">
            <h2 className="text-xl font-semibold">My Wishlist</h2>

            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((vehicle: any) => (
                  <div key={vehicle.id} className="relative group">
                    <VehicleCard {...vehicle} />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-3 right-3 opacity-80 group-hover:opacity-100 z-10"
                      onClick={async () => {
                        // Remove from favorites table
                        await supabase.from('favorites').delete().eq('user_id', user.id).eq('listing_id', vehicle.id);
                        setWishlist((prev: any[]) => prev.filter((v: any) => v.id !== vehicle.id));
                      }}
                    >
                      Remove from Wishlist
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">No saved vehicles</h3>
                  <p className="text-gray-600 mb-4">Start browsing and save vehicles you're interested in</p>
                  <Link to="/cars">
                    <Button>Browse Vehicles</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="enquiries" className="space-y-6">
            <h2 className="text-xl font-semibold">Messages</h2>
            
            {enquiries.length > 0 ? (
              <div className="space-y-4">
                {enquiries.map((enquiry: any) => (
                  <Card key={enquiry.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">{enquiry.listings?.title || 'Vehicle'}</h3>
                          <p className="text-sm text-gray-600">
                            {enquiry.sender_id === parseInt(user.id) ? 'Your message' : 'Received message'}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">
                            Message
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{enquiry.message}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{new Date(enquiry.created_at).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                  <p className="text-gray-600">Messages from buyers will appear here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <h2 className="text-xl font-semibold">Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Total Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{myListings.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Wishlist Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{wishlist.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Total Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{enquiries.length}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="pb-20 md:pb-0"></div>
    </div>
  );
};

export default Dashboard;
