import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Upload, X } from 'lucide-react';

interface VehicleFormData {
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  condition: string;
  color: string;
  region: string;
  township: string;
  seller_type: string;
  description: string;
}

const PostVehicle = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id: editId } = useParams<{ id?: string }>();

  const form = useForm<VehicleFormData>({
    defaultValues: {
      seller_type: 'Private',
      condition: 'Used',
      fuel_type: 'Petrol',
      transmission: 'Manual',
    },
  });

  useEffect(() => {
    const fetchListing = async () => {
      if (!editId) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('listings')
        .select('*, listing_images (url)')
        .eq('id', editId)
        .single();
      if (data) {
        form.reset({
          ...data,
          price: Number(data.price),
          year: Number(data.year),
          mileage: Number(data.mileage),
        });
        setExistingImages(data.listing_images?.map((img: any) => img.url) || []);
      }
      setLoading(false);
    };

    fetchListing();
  }, [editId, form]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImages(prev => [...prev, ...files].slice(0, 8));
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (url: string) => {
    setExistingImages(prev => prev.filter(img => img !== url));
  };

  const onSubmit = async (data: VehicleFormData) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please login to post a vehicle listing.',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }
    setIsSubmitting(true);
    try {
      let listingId = editId;
      if (editId) {
        // Only send editable fields
        const updateData = {
          title: data.title,
          make: data.make,
          model: data.model,
          year: data.year,
          price: data.price,
          mileage: data.mileage,
          fuel_type: data.fuel_type,
          transmission: data.transmission,
          condition: data.condition,
          color: data.color,
          region: data.region,
          township: data.township,
          seller_type: data.seller_type,
          description: data.description,
        };
        const { error } = await supabase
          .from('listings')
          .update(updateData)
          .eq('id', editId);
        if (error) throw error;
      } else {
        // Insert new listing
        const { data: listing, error: listingError } = await supabase
          .from('listings')
          .insert({ ...data, owner_id: user.id })
          .select()
          .single();
        if (listingError) throw listingError;
        listingId = listing.id;
      }
      // Remove deleted images
      if (editId) {
        const { data: oldImages } = await supabase
          .from('listing_images')
          .select('url')
          .eq('listing_id', editId);
        for (const img of oldImages || []) {
          if (!existingImages.includes(img.url)) {
            await supabase.from('listing_images').delete().eq('url', img.url);
          }
        }
      }
      // Upload new images
      if (images.length > 0) {
        const imagePromises = images.map(async (image, index) => {
          const fileName = `${listingId}-${index}-${Date.now()}`;
          const { error: uploadError } = await supabase.storage
            .from('vehicle-images')
            .upload(fileName, image);
          if (uploadError) throw uploadError;
          const publicUrlResult = supabase.storage
            .from('vehicle-images')
            .getPublicUrl(fileName);
          const publicUrl = publicUrlResult.data.publicUrl;
          if (!publicUrl) throw new Error('Failed to get public URL for image.');
          const { error: insertError } = await supabase
            .from('listing_images')
            .insert({ listing_id: listingId, url: publicUrl });
          if (insertError) throw insertError;
        });
        await Promise.all(imagePromises);
      }
      toast({
        title: editId ? 'Listing updated!' : 'Success!',
        description: editId ? 'Your vehicle listing has been updated.' : 'Your vehicle listing has been posted successfully.',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save your vehicle listing. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{editId ? 'Edit Your Vehicle' : 'Post Your Vehicle'}</h1>
          <p className="text-gray-600 mt-2">Fill in the details below to {editId ? 'update' : 'create'} your vehicle listing</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Listing Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 2020 Toyota Camry" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (MMK)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="25000000" 
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="make"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Make</FormLabel>
                        <FormControl>
                          <Input placeholder="Toyota" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                          <Input placeholder="Camry" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="2020" 
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Details */}
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="mileage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mileage (km)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="50000" 
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <Input placeholder="White" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="fuel_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fuel Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Petrol">Petrol</SelectItem>
                            <SelectItem value="Diesel">Diesel</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                            <SelectItem value="Electric">Electric</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="transmission"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transmission</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Manual">Manual</SelectItem>
                            <SelectItem value="Automatic">Automatic</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condition</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="New">New</SelectItem>
                            <SelectItem value="Used">Used</SelectItem>
                            <SelectItem value="Reconditioned">Reconditioned</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location & Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle>Location & Seller Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region</FormLabel>
                        <FormControl>
                          <Input placeholder="Yangon" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="township"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Township</FormLabel>
                        <FormControl>
                          <Input placeholder="Kamayut" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="seller_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seller Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Private">Private Seller</SelectItem>
                            <SelectItem value="Dealer">Dealer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your vehicle's condition, features, and any additional information..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <Label htmlFor="images" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-500">Upload photos</span>
                        <Input
                          id="images"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </Label>
                      <p className="text-gray-500 text-sm mt-1">
                        Add up to 8 photos (JPG, PNG)
                      </p>
                    </div>
                  </div>

                  {/* Existing Images */}
                  {existingImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {existingImages.map((url, index) => (
                        <div key={index} className="relative">
                          <img
                            src={url}
                            alt={`Existing Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(url)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* New Images */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (editId ? 'Updating...' : 'Posting...') : (editId ? 'Update Vehicle' : 'Post Vehicle')}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <Footer />
    </div>
  );
};

export default PostVehicle;
