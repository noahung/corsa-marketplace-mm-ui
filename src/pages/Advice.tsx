
import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Star, Calendar, User, ArrowRight } from 'lucide-react';

const Advice = () => {
  const expertReviews = [
    {
      id: 1,
      title: 'Toyota Camry 2024: The Perfect Family Sedan for Myanmar Roads',
      excerpt: 'Our comprehensive review of the latest Camry, focusing on its performance in Myanmar\'s urban and rural conditions.',
      rating: 4.5,
      author: 'Automotive Expert',
      date: '2024-01-15',
      category: 'Review',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Honda CR-V vs Mazda CX-5: SUV Comparison for Myanmar Families',
      excerpt: 'A detailed comparison of two popular SUVs, considering local fuel costs, maintenance, and resale value.',
      rating: 4.2,
      author: 'Car Specialist',
      date: '2024-01-10',
      category: 'Comparison',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Best Motorbikes for Yangon City Commuting',
      excerpt: 'Top motorbike recommendations for navigating Yangon traffic efficiently and safely.',
      rating: 4.7,
      author: 'Motorbike Expert',
      date: '2024-01-05',
      category: 'Guide',
      image: '/placeholder.svg'
    }
  ];

  const buyingGuides = [
    {
      title: 'First-Time Car Buyer\'s Guide in Myanmar',
      description: 'Everything you need to know about buying your first car in Myanmar, from budgeting to paperwork.',
      topics: ['Budget Planning', 'Documentation', 'Insurance Requirements', 'Registration Process']
    },
    {
      title: 'Used Car Buying Checklist',
      description: 'Essential checks and tips for buying a reliable used vehicle in Myanmar.',
      topics: ['Vehicle Inspection', 'Test Driving Tips', 'Negotiation Strategies', 'Common Scams to Avoid']
    },
    {
      title: 'Financing Your Vehicle Purchase',
      description: 'Understanding loan options, interest rates, and payment plans available in Myanmar.',
      topics: ['Bank Loans', 'Down Payments', 'Interest Rates', 'Monthly Budget Planning']
    }
  ];

  const sellingGuides = [
    {
      title: 'How to Sell Your Car Quickly in Myanmar',
      description: 'Proven strategies to sell your vehicle at the best price in the shortest time.',
      topics: ['Pricing Strategy', 'Photography Tips', 'Listing Description', 'Negotiation Tactics']
    },
    {
      title: 'Preparing Your Vehicle for Sale',
      description: 'Steps to maximize your vehicle\'s value before putting it on the market.',
      topics: ['Cleaning & Detailing', 'Minor Repairs', 'Service Records', 'Documentation']
    },
    {
      title: 'Legal Requirements for Vehicle Sales',
      description: 'Understanding the legal aspects of vehicle sales in Myanmar.',
      topics: ['Transfer of Ownership', 'Tax Obligations', 'Required Documents', 'Safety Compliance']
    }
  ];

  const maintenanceTips = [
    {
      title: 'Monsoon Car Care Tips',
      description: 'Protecting your vehicle during Myanmar\'s rainy season.',
      image: '/placeholder.svg'
    },
    {
      title: 'Engine Maintenance in Hot Weather',
      description: 'Keeping your engine cool in Myanmar\'s tropical climate.',
      image: '/placeholder.svg'
    },
    {
      title: 'Tire Care for Myanmar Roads',
      description: 'Maintaining tires for both city streets and rural roads.',
      image: '/placeholder.svg'
    },
    {
      title: 'Air Conditioning Maintenance',
      description: 'Essential AC care for year-round comfort.',
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Expert Advice & Reviews
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get expert insights, comprehensive reviews, and practical guides to make informed decisions about buying, selling, and maintaining vehicles in Myanmar.
          </p>
        </div>

        {/* Expert Reviews */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Expert Vehicle Reviews</h2>
            <Button variant="outline">View All Reviews</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertReviews.map((review) => (
              <Card key={review.id} className="overflow-hidden">
                <div className="aspect-[16/10] bg-gray-200">
                  <img 
                    src={review.image} 
                    alt={review.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{review.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{review.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-2 line-clamp-2">{review.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{review.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {review.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    Read Review <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Buying Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Buying Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buyingGuides.map((guide, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    {guide.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{guide.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Topics Covered:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {guide.topics.map((topic, topicIndex) => (
                        <li key={topicIndex}>• {topic}</li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Read Guide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Selling Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Selling Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellingGuides.map((guide, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    {guide.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{guide.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Topics Covered:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {guide.topics.map((topic, topicIndex) => (
                        <li key={topicIndex}>• {topic}</li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Read Guide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Maintenance Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Maintenance Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {maintenanceTips.map((tip, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-[4/3] bg-gray-200">
                  <img 
                    src={tip.image} 
                    alt={tip.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{tip.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Service Centers */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Service Centers</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Toyota Service Center</h3>
                  <p className="text-sm text-gray-600 mb-2">Yangon, Mandalay</p>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.8 (125 reviews)</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">Contact</Button>
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Honda Authorized Service</h3>
                  <p className="text-sm text-gray-600 mb-2">Yangon, Naypyitaw</p>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.6 (98 reviews)</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">Contact</Button>
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Universal Auto Service</h3>
                  <p className="text-sm text-gray-600 mb-2">Multiple Locations</p>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.5 (156 reviews)</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">Contact</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <div className="pb-20 md:pb-0"></div>
    </div>
  );
};

export default Advice;
