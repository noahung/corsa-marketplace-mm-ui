
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calendar, User, Clock, ArrowLeft, Share2, Heart, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BlogDetail = () => {
  const { id } = useParams();

  // Mock blog data - this would come from Supabase in real implementation
  const article = {
    id: '1',
    title: 'Complete Guide to Buying a Used Car in Myanmar',
    excerpt: 'Everything you need to know before purchasing your next vehicle, from inspection tips to paperwork.',
    content: `
      <h2>Introduction</h2>
      <p>Buying a used car in Myanmar can be both exciting and overwhelming. With the right knowledge and preparation, you can make a smart purchase that serves you well for years to come. This comprehensive guide will walk you through every step of the process.</p>
      
      <h2>1. Setting Your Budget</h2>
      <p>Before you start shopping, determine how much you can afford to spend. Consider not just the purchase price, but also:</p>
      <ul>
        <li>Registration and transfer fees</li>
        <li>Insurance costs</li>
        <li>Immediate repairs or maintenance</li>
        <li>Ongoing fuel and maintenance expenses</li>
      </ul>
      
      <h2>2. Research and Preparation</h2>
      <p>Knowledge is power when it comes to car buying. Research the specific models you're interested in, including:</p>
      <ul>
        <li>Market prices and depreciation rates</li>
        <li>Common problems and maintenance costs</li>
        <li>Parts availability and pricing</li>
        <li>Fuel efficiency and running costs</li>
      </ul>
      
      <h2>3. Vehicle Inspection Checklist</h2>
      <p>When you find a potential purchase, conduct a thorough inspection:</p>
      
      <h3>Exterior Inspection</h3>
      <ul>
        <li>Check for rust, dents, and scratches</li>
        <li>Examine tire condition and wear patterns</li>
        <li>Look for signs of accident damage</li>
        <li>Test all lights and electrical components</li>
      </ul>
      
      <h3>Interior Inspection</h3>
      <ul>
        <li>Test all seats, windows, and controls</li>
        <li>Check air conditioning and heating</li>
        <li>Examine upholstery for excessive wear</li>
        <li>Test all electronic systems</li>
      </ul>
      
      <h3>Engine and Mechanical</h3>
      <ul>
        <li>Check fluid levels and colors</li>
        <li>Listen for unusual noises</li>
        <li>Test the transmission</li>
        <li>Examine belts and hoses</li>
      </ul>
      
      <h2>4. Test Drive</h2>
      <p>A test drive is essential before making any purchase decision. Pay attention to:</p>
      <ul>
        <li>Engine performance and responsiveness</li>
        <li>Transmission shifting (both manual and automatic)</li>
        <li>Steering and handling</li>
        <li>Braking performance</li>
        <li>Unusual noises or vibrations</li>
      </ul>
      
      <h2>5. Documentation and Legal Requirements</h2>
      <p>Ensure all paperwork is in order before finalizing your purchase:</p>
      <ul>
        <li>Vehicle registration documents</li>
        <li>Previous owner's identification</li>
        <li>Maintenance records (if available)</li>
        <li>Import documents (for imported vehicles)</li>
      </ul>
      
      <h2>6. Negotiation Tips</h2>
      <p>Don't be afraid to negotiate, but be reasonable:</p>
      <ul>
        <li>Use your research to justify your offer</li>
        <li>Point out any issues you've discovered</li>
        <li>Be prepared to walk away if the deal isn't right</li>
        <li>Consider the total cost, not just the asking price</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Buying a used car requires patience and diligence, but following this guide will help you make an informed decision. Remember, the cheapest car isn't always the best value – focus on finding a reliable vehicle that meets your needs and budget.</p>
      
      <p>Take your time, do your research, and don't rush into a purchase. With careful consideration and proper inspection, you'll find the perfect used car for your needs in Myanmar's diverse automotive market.</p>
    `,
    category: 'buying-guide',
    author: 'Aung Kyaw',
    publishDate: '2024-01-15',
    readTime: '8 min read',
    image: '/placeholder.svg',
    tags: ['buying', 'used cars', 'inspection', 'negotiation']
  };

  const relatedArticles = [
    {
      id: '2',
      title: 'Top 10 Most Popular Cars in Myanmar 2024',
      image: '/placeholder.svg',
      readTime: '5 min read'
    },
    {
      id: '3',
      title: 'How to Get the Best Price When Selling Your Car',
      image: '/placeholder.svg',
      readTime: '6 min read'
    },
    {
      id: '4',
      title: 'Essential Car Maintenance Schedule',
      image: '/placeholder.svg',
      readTime: '10 min read'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{article.category}</Badge>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
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
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-[16/9] mb-8 rounded-lg overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>

        {/* Related Articles */}
        <section className="border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <Card key={related.id} className="group hover:shadow-lg transition-shadow">
                <div className="aspect-[16/10] overflow-hidden rounded-t-lg">
                  <img 
                    src={related.image} 
                    alt={related.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    <Link to={`/blog/${related.id}`}>{related.title}</Link>
                  </h3>
                  <span className="text-sm text-gray-500">{related.readTime}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </article>

      <Footer />
    </div>
  );
};

export default BlogDetail;
