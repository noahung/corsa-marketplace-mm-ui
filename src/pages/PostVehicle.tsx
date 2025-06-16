
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Camera, CheckCircle } from 'lucide-react';

const PostVehicle = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [vehicleType, setVehicleType] = useState<'car' | 'motorbike'>('car');
  const [formData, setFormData] = useState({
    // Basic Info
    make: '',
    model: '',
    year: '',
    variant: '',
    condition: '',
    mileage: '',
    price: '',
    
    // Details
    bodyType: '',
    fuelType: '',
    transmission: '',
    engine: '',
    color: '',
    doors: '',
    seats: '',
    
    // Location & Contact
    location: '',
    phone: '',
    
    // Description
    title: '',
    description: '',
    features: [] as string[],
    
    // Images
    images: [] as File[]
  });

  const steps = [
    { id: 1, title: 'Vehicle Type', description: 'Choose vehicle category' },
    { id: 2, title: 'Basic Info', description: 'Make, model, year' },
    { id: 3, title: 'Details', description: 'Specifications' },
    { id: 4, title: 'Description', description: 'Title & features' },
    { id: 5, title: 'Photos', description: 'Upload images' },
    { id: 6, title: 'Contact', description: 'Location & contact' },
    { id: 7, title: 'Review', description: 'Final review' }
  ];

  const makes = ['Toyota', 'Honda', 'Mazda', 'BMW', 'Mercedes-Benz', 'Audi', 'Nissan', 'Hyundai'];
  const bodyTypes = ['Sedan', 'SUV', 'Hatchback', 'Wagon', 'Coupe', 'Convertible'];
  const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
  const transmissions = ['Manual', 'Automatic', 'CVT'];
  const locations = ['Yangon', 'Mandalay', 'Naypyitaw', 'Bagan', 'Taunggyi'];
  const carFeatures = [
    'Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Electric Windows',
    'Central Locking', 'Bluetooth', 'Backup Camera', 'Cruise Control', 'Sunroof',
    'Leather Seats', 'Navigation System', 'Parking Sensors', 'Keyless Entry'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 10) // Max 10 images
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const formatPrice = (value: string) => {
    // Convert to lakhs format
    const num = parseInt(value.replace(/[^\d]/g, ''));
    if (isNaN(num)) return '';
    return `${(num / 100000).toFixed(0)} Lakhs`;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">What are you selling?</h2>
              <p className="text-gray-600">Choose the type of vehicle you want to list</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <button
                onClick={() => setVehicleType('car')}
                className={`p-8 border-2 rounded-2xl text-center transition-all ${
                  vehicleType === 'car' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  🚗
                </div>
                <h3 className="font-semibold text-lg mb-2">Car</h3>
                <p className="text-gray-600 text-sm">Sedans, SUVs, Hatchbacks, etc.</p>
              </button>
              
              <button
                onClick={() => setVehicleType('motorbike')}
                className={`p-8 border-2 rounded-2xl text-center transition-all ${
                  vehicleType === 'motorbike' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  🏍️
                </div>
                <h3 className="font-semibold text-lg mb-2">Motorbike</h3>
                <p className="text-gray-600 text-sm">Motorcycles, Scooters, etc.</p>
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
              <p className="text-gray-600">Tell us about your {vehicleType}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="make">Make *</Label>
                <Select value={formData.make} onValueChange={(value) => handleInputChange('make', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    {makes.map((make) => (
                      <SelectItem key={make} value={make}>{make}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model *</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  placeholder="Enter model"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 25 }, (_, i) => 2024 - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="variant">Variant</Label>
                <Input
                  id="variant"
                  value={formData.variant}
                  onChange={(e) => handleInputChange('variant', e.target.value)}
                  placeholder="e.g., LE, Sport, Hybrid"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage (km) *</Label>
                <Input
                  id="mileage"
                  value={formData.mileage}
                  onChange={(e) => handleInputChange('mileage', e.target.value)}
                  placeholder="e.g., 25000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condition *</Label>
                <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="needs-work">Needs Work</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Vehicle Details</h2>
              <p className="text-gray-600">Provide detailed specifications</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bodyType">Body Type</Label>
                <Select value={formData.bodyType} onValueChange={(value) => handleInputChange('bodyType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bodyTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelType">Fuel Type *</Label>
                <Select value={formData.fuelType} onValueChange={(value) => handleInputChange('fuelType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fuelTypes.map((fuel) => (
                      <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission *</Label>
                <Select value={formData.transmission} onValueChange={(value) => handleInputChange('transmission', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    {transmissions.map((trans) => (
                      <SelectItem key={trans} value={trans}>{trans}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="engine">Engine Size</Label>
                <Input
                  id="engine"
                  value={formData.engine}
                  onChange={(e) => handleInputChange('engine', e.target.value)}
                  placeholder="e.g., 2.0L, 1500cc"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  placeholder="e.g., White, Black, Silver"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doors">Number of Doors</Label>
                <Select value={formData.doors} onValueChange={(value) => handleInputChange('doors', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select doors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Doors</SelectItem>
                    <SelectItem value="4">4 Doors</SelectItem>
                    <SelectItem value="5">5 Doors</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seats">Number of Seats</Label>
                <Select value={formData.seats} onValueChange={(value) => handleInputChange('seats', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select seats" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Seats</SelectItem>
                    <SelectItem value="4">4 Seats</SelectItem>
                    <SelectItem value="5">5 Seats</SelectItem>
                    <SelectItem value="7">7 Seats</SelectItem>
                    <SelectItem value="8">8 Seats</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (Kyats) *</Label>
                <div className="relative">
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="Enter price in Kyats"
                  />
                  {formData.price && (
                    <div className="mt-1 text-sm text-blue-600">
                      ≈ {formatPrice(formData.price)} Ks
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Description & Features</h2>
              <p className="text-gray-600">Make your listing stand out</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Listing Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Toyota Camry 2020 Hybrid - Excellent Condition"
                  maxLength={100}
                />
                <div className="text-xs text-gray-500 text-right">
                  {formData.title.length}/100 characters
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your vehicle's condition, history, and any special features..."
                  rows={4}
                  maxLength={1000}
                />
                <div className="text-xs text-gray-500 text-right">
                  {formData.description.length}/1000 characters
                </div>
              </div>

              <div className="space-y-4">
                <Label>Features & Equipment</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {carFeatures.map((feature) => (
                    <label
                      key={feature}
                      className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                        formData.features.includes(feature)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        formData.features.includes(feature) ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                      }`}>
                        {formData.features.includes(feature) && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Upload Photos</h2>
              <p className="text-gray-600">Add up to 10 high-quality photos</p>
            </div>

            <div className="space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Camera className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <div className="text-lg font-medium text-gray-900 mb-2">
                    Click to upload photos
                  </div>
                  <div className="text-sm text-gray-500">
                    JPG, PNG up to 5MB each (max 10 photos)
                  </div>
                </label>
              </div>

              {/* Image Preview Grid */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {index === 0 && (
                        <Badge className="absolute bottom-2 left-2 bg-blue-500">
                          Main
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Photo Tips:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Take photos in good lighting</li>
                  <li>• Include exterior, interior, and engine bay</li>
                  <li>• Show any damage or wear clearly</li>
                  <li>• First photo will be the main listing image</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
              <p className="text-gray-600">How can buyers reach you?</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+95 9 123 456 789"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-2">Privacy & Safety:</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Your contact info is only shown to interested buyers</li>
                  <li>• Meet buyers in safe, public locations</li>
                  <li>• Never share financial information over the phone</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Review Your Listing</h2>
              <p className="text-gray-600">Check everything before publishing</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{formData.title || 'Your Vehicle Listing'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Make:</strong> {formData.make}</div>
                  <div><strong>Model:</strong> {formData.model}</div>
                  <div><strong>Year:</strong> {formData.year}</div>
                  <div><strong>Mileage:</strong> {formData.mileage} km</div>
                  <div><strong>Fuel:</strong> {formData.fuelType}</div>
                  <div><strong>Transmission:</strong> {formData.transmission}</div>
                  <div><strong>Location:</strong> {formData.location}</div>
                  <div><strong>Price:</strong> {formatPrice(formData.price)} Ks</div>
                </div>
                
                {formData.description && (
                  <div>
                    <strong>Description:</strong>
                    <p className="mt-1 text-gray-600">{formData.description}</p>
                  </div>
                )}

                {formData.features.length > 0 && (
                  <div>
                    <strong>Features:</strong>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {formData.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <strong>Photos:</strong> {formData.images.length} uploaded
                </div>
              </CardContent>
            </Card>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Ready to Publish!</h4>
              <p className="text-sm text-green-800">
                Your listing will be reviewed and published within 24 hours.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.id <= currentStep 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.id < currentStep ? '✓' : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    step.id < currentStep ? 'bg-blue-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h3 className="font-semibold">{steps[currentStep - 1]?.title}</h3>
            <p className="text-sm text-gray-600">{steps[currentStep - 1]?.description}</p>
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep === steps.length ? (
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              Publish Listing
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              Next
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Spacing */}
      <div className="pb-20 md:pb-0"></div>
    </div>
  );
};

export default PostVehicle;
