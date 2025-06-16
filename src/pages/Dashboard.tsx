
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { 
  Car, Eye, Heart, MessageSquare, TrendingUp, Plus, 
  Edit, Trash2, BarChart3, Users, Clock, DollarSign 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data
  const stats = {
    totalListings: 8,
    activeListings: 6,
    totalViews: 1234,
    totalInquiries: 45,
    totalEarnings: '2.1M'
  };

  const listings = [
    {
      id: '1',
      title: 'Toyota Camry 2020 Hybrid',
      price: '350',
      status: 'active',
      views: 234,
      inquiries: 12,
      favorites: 8,
      image: '/placeholder.svg',
      createdAt: '2024-01-15',
      location: 'Yangon'
    },
    {
      id: '2',
      title: 'Honda CR-V 2019',
      price: '280',
      status: 'active',
      views: 156,
      inquiries: 8,
      favorites: 5,
      image: '/placeholder.svg',
      createdAt: '2024-01-10',
      location: 'Yangon'
    },
    {
      id: '3',
      title: 'Mazda CX-5 2021',
      price: '320',
      status: 'sold',
      views: 342,
      inquiries: 25,
      favorites: 15,
      image: '/placeholder.svg',
      createdAt: '2024-01-05',
      location: 'Mandalay'
    }
  ];

  const recentInquiries = [
    {
      id: '1',
      listing: 'Toyota Camry 2020 Hybrid',
      buyer: 'Aung Kyaw',
      message: 'Is the car still available? Can I schedule a viewing?',
      time: '2 hours ago',
      phone: '+95 9 123 456 789'
    },
    {
      id: '2',
      listing: 'Honda CR-V 2019',
      buyer: 'Ma Thin',
      message: 'What is the lowest price you can accept?',
      time: '5 hours ago',
      phone: '+95 9 987 654 321'
    },
    {
      id: '3',
      listing: 'Toyota Camry 2020 Hybrid',
      buyer: 'Ko Zaw',
      message: 'Does it come with warranty?',
      time: '1 day ago',
      phone: '+95 9 555 666 777'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'sold':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Sold</Badge>;
      case 'expired':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Manage your vehicle listings and track performance</p>
            </div>
            <div className="flex gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 3 months</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Listing
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Car className="w-8 h-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Listings</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalListings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeListings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Eye className="w-8 h-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <MessageSquare className="w-8 h-8 text-orange-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Inquiries</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalInquiries}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Value</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalEarnings} Ks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-96">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Listings Tab */}
          <TabsContent value="listings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Vehicle Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {listings.map((listing) => (
                    <div key={listing.id} className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                      <img 
                        src={listing.image} 
                        alt={listing.title}
                        className="w-20 h-16 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 ml-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                            <p className="text-sm text-gray-600">{listing.location} • Posted {listing.createdAt}</p>
                            <p className="text-lg font-bold text-blue-600 mt-1">{listing.price} Lakhs Ks</p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {getStatusBadge(listing.status)}
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {listing.views}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                {listing.inquiries}
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {listing.favorites}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{inquiry.buyer}</h4>
                          <p className="text-sm text-gray-600">Interested in: {inquiry.listing}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{inquiry.time}</p>
                          <p className="text-sm font-medium text-blue-600">{inquiry.phone}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{inquiry.message}</p>
                      
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600">
                          Reply
                        </Button>
                        <Button size="sm" variant="outline">
                          Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Views Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Chart visualization would go here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Top Performing Listings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {listings.slice(0, 3).map((listing, index) => (
                      <div key={listing.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-yellow-100 text-yellow-700' :
                            index === 1 ? 'bg-gray-100 text-gray-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="font-medium">{listing.title}</span>
                        </div>
                        <span className="text-sm text-gray-600">{listing.views} views</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Mobile Navigation Spacing */}
      <div className="pb-20 md:pb-0"></div>
    </div>
  );
};

export default Dashboard;
