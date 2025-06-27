
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Calendar, User, Tag, ArrowRight, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Articles', count: 24 },
    { id: 'buying-guide', name: 'Buying Guide', count: 8 },
    { id: 'selling-tips', name: 'Selling Tips', count: 6 },
    { id: 'maintenance', name: 'Maintenance', count: 5 },
    { id: 'market-news', name: 'Market News', count: 3 },
    { id: 'insurance', name: 'Insurance', count: 2 }
  ];

  const articles = [
    {
      id: '1',
      title: 'Complete Guide to Buying a Used Car in Myanmar',
      excerpt: 'Everything you need to know before purchasing your next vehicle, from inspection tips to paperwork.',
      content: 'Learn the essential steps...',
      category: 'buying-guide',
      author: 'Aung Kyaw',
      publishDate: '2024-01-15',
      readTime: '8 min read',
      image: '/placeholder.svg',
      featured: true,
      tags: ['buying', 'used cars', 'inspection']
    },
    {
      id: '2',
      title: 'Top 10 Most Popular Cars in Myanmar 2024',
      excerpt: 'Discover which vehicles are dominating the Myanmar automotive market this year.',
      content: 'Based on sales data...',
      category: 'market-news',
      author: 'Ma Thin',
      publishDate: '2024-01-12',
      readTime: '5 min read',
      image: '/placeholder.svg',
      featured: true,
      tags: ['trends', 'popular cars', '2024']
    },
    {
      id: '3',
      title: 'How to Get the Best Price When Selling Your Car',
      excerpt: 'Proven strategies to maximize your vehicle\'s selling price and attract serious buyers.',
      content: 'Selling your car...',
      category: 'selling-tips',
      author: 'Ko Zaw',
      publishDate: '2024-01-10',
      readTime: '6 min read',
      image: '/placeholder.svg',
      featured: false,
      tags: ['selling', 'pricing', 'tips']
    },
    {
      id: '4',
      title: 'Essential Car Maintenance Schedule',
      excerpt: 'Keep your vehicle running smoothly with this comprehensive maintenance timeline.',
      content: 'Regular maintenance...',
      category: 'maintenance',
      author: 'Dr. Thant',
      publishDate: '2024-01-08',
      readTime: '10 min read',
      image: '/placeholder.svg',
      featured: false,
      tags: ['maintenance', 'schedule', 'care']
    },
    {
      id: '5',
      title: 'Understanding Car Insurance in Myanmar',
      excerpt: 'Navigate the complexities of vehicle insurance and choose the right coverage for your needs.',
      content: 'Car insurance...',
      category: 'insurance',
      author: 'Ma Hnin',
      publishDate: '2024-01-05',
      readTime: '7 min read',
      image: '/placeholder.svg',
      featured: false,
      tags: ['insurance', 'coverage', 'legal']
    },
    {
      id: '6',
      title: 'Electric Vehicles: The Future of Myanmar Transportation',
      excerpt: 'Exploring the growing electric vehicle market and what it means for Myanmar drivers.',
      content: 'Electric vehicles...',
      category: 'market-news',
      author: 'Kyaw Min',
      publishDate: '2024-01-03',
      readTime: '9 min read',
      image: '/placeholder.svg',
      featured: false,
      tags: ['electric', 'future', 'environment']
    }
  ];

  const trendingArticles = articles.filter(article => article.featured);
  
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Corsa <span className="text-blue-600">Blog</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert insights, buying guides, and the latest news from Myanmar's automotive market
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-xl"
            >
              {category.name}
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Articles */}
            {selectedCategory === 'all' && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  Featured Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {trendingArticles.map((article) => (
                    <Card key={article.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary">{categories.find(c => c.id === article.category)?.name}</Badge>
                          <span className="text-sm text-gray-500">{article.readTime}</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                          <Link to={`/blog/${article.id}`}>{article.title}</Link>
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {article.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(article.publishDate).toLocaleDateString()}
                            </span>
                          </div>
                          <Link to={`/blog/${article.id}`}>
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                              Read More
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Articles */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {selectedCategory === 'all' ? 'Latest Articles' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <div className="space-y-6">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-80 aspect-[16/10] md:aspect-[4/3] overflow-hidden">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="flex-1 p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary">{categories.find(c => c.id === article.category)?.name}</Badge>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </span>
                        </div>
                        <h3 className="font-bold text-xl mb-3 group-hover:text-blue-600 transition-colors">
                          <Link to={`/blog/${article.id}`}>{article.title}</Link>
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {article.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(article.publishDate).toLocaleDateString()}
                            </span>
                          </div>
                          <Link to={`/blog/${article.id}`}>
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                              Read More
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stay Updated</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Get the latest automotive news and buying guides delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <Input placeholder="Enter your email" />
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['buying guide', 'selling tips', 'maintenance', 'insurance', 'market trends', 'electric cars', 'financing'].map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-blue-50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Articles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {articles.slice(0, 4).map((article) => (
                  <div key={article.id} className="flex gap-3">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2 hover:text-blue-600">
                        <Link to={`/blog/${article.id}`}>{article.title}</Link>
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(article.publishDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Spacing */}
      <div className="pb-20 md:pb-0"></div>
    </div>
  );
};

export default Blog;
