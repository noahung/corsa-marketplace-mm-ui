
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calendar, User, Tag, ArrowLeft, Clock, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data - in real app, this would come from Supabase
  const article = {
    id: '1',
    title: 'Complete Guide to Buying a Used Car in Myanmar',
    content: `
      <h2>Introduction</h2>
      <p>Buying a used car in Myanmar can be both exciting and overwhelming. With the right knowledge and preparation, you can find a reliable vehicle that serves you well for years to come. This comprehensive guide will walk you through every step of the process.</p>
      
      <h2>Research and Planning</h2>
      <p>Before you start shopping, it's crucial to determine your budget and needs. Consider factors such as:</p>
      <ul>
        <li>Your maximum budget including insurance and registration</li>
        <li>Fuel efficiency requirements</li>
        <li>Size and seating capacity needed</li>
        <li>Intended use (city driving, long trips, etc.)</li>
      </ul>
      
      <h2>Vehicle Inspection Checklist</h2>
      <p>When you find a potential vehicle, conduct a thorough inspection:</p>
      
      <h3>Exterior Inspection</h3>
      <ul>
        <li>Check for rust, dents, and paint inconsistencies</li>
        <li>Inspect tires for even wear patterns</li>
        <li>Ensure all lights function properly</li>
        <li>Verify all doors, windows, and locks work</li>
      </ul>
      
      <h3>Interior Inspection</h3>
      <ul>
        <li>Test all electrical components</li>
        <li>Check seat condition and adjustments</li>
        <li>Verify air conditioning and heating systems</li>
        <li>Inspect dashboard for warning lights</li>
      </ul>
      
      <h3>Engine and Mechanical</h3>
      <ul>
        <li>Listen for unusual noises when running</li>
        <li>Check fluid levels and colors</li>
        <li>Inspect belts and hoses for wear</li>
        <li>Test brakes and steering responsiveness</li>
      </ul>
      
      <h2>Documentation and Legal Considerations</h2>
      <p>Ensure all paperwork is in order before finalizing the purchase:</p>
      <ul>
        <li>Vehicle registration documents</li>
        <li>Insurance papers</li>
        <li>Maintenance records</li>
        <li>Bill of sale</li>
      </ul>
      
      <h2>Negotiation Tips</h2>
      <p>Don't be afraid to negotiate the price. Research similar vehicles to understand market value, and be prepared to walk away if the seller won't meet your reasonable offer.</p>
      
      <h2>Final Steps</h2>
      <p>Once you've agreed on a price:</p>
      <ul>
        <li>Arrange financing if needed</li>
        <li>Schedule a professional inspection</li>
        <li>Transfer ownership documents</li>
        <li>Update insurance coverage</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Buying a used car requires patience and diligence, but following this guide will help you make an informed decision and find a vehicle that meets your needs and budget.</p>
    `,
    excerpt: 'Everything you need to know before purchasing your next vehicle, from inspection tips to paperwork.',
    category: 'buying-guide',
    author: 'Aung Kyaw',
    publishDate: '2024-01-15',
    readTime: '8 min read',
    image: '/placeholder.svg',
    tags: ['buying', 'used cars', 'inspection']
  };

  const relatedArticles = [
    {
      id: '2',
      title: 'Top 10 Most Popular Cars in Myanmar 2024',
      excerpt: 'Discover which vehicles are dominating the Myanmar automotive market this year.',
      image: '/placeholder.svg',
      readTime: '5 min read'
    },
    {
      id: '3',
      title: 'How to Get the Best Price When Selling Your Car',
      excerpt: 'Proven strategies to maximize your vehicle\'s selling price and attract serious buyers.',
      image: '/placeholder.svg',
      readTime: '6 min read'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/advice" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Link>

        {/* Article Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary">Buying Guide</Badge>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              {article.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.publishDate).toLocaleDateString()}
                </span>
              </div>
              
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* Tags */}
          <div className="mt-8 pt-8 border-t">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <Card key={relatedArticle.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={relatedArticle.image} 
                    alt={relatedArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    <Link to={`/blog/${relatedArticle.id}`}>{relatedArticle.title}</Link>
                  </h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedArticle.excerpt}</p>
                  <span className="text-xs text-gray-500">{relatedArticle.readTime}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;
