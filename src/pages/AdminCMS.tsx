
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminCMS = () => {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // Mock data - this would come from Supabase
  const [posts, setPosts] = useState([
    {
      id: '1',
      title: 'Complete Guide to Buying a Used Car in Myanmar',
      excerpt: 'Everything you need to know before purchasing your next vehicle...',
      category: 'buying-guide',
      status: 'published',
      author: 'Aung Kyaw',
      createdAt: '2024-01-15',
      views: 1250
    },
    {
      id: '2',
      title: 'Top 10 Most Popular Cars in Myanmar 2024',
      excerpt: 'Discover which vehicles are dominating the Myanmar automotive market...',
      category: 'market-news',
      status: 'published',
      author: 'Ma Thin',
      createdAt: '2024-01-12',
      views: 980
    },
    {
      id: '3',
      title: 'Electric Vehicle Trends in Southeast Asia',
      excerpt: 'The future of electric mobility in our region...',
      category: 'market-news',
      status: 'draft',
      author: 'Ko Zaw',
      createdAt: '2024-01-10',
      views: 0
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    imageUrl: '',
    status: 'draft'
  });

  const categories = [
    { id: 'buying-guide', name: 'Buying Guide' },
    { id: 'selling-tips', name: 'Selling Tips' },
    { id: 'maintenance', name: 'Maintenance' },
    { id: 'market-news', name: 'Market News' },
    { id: 'insurance', name: 'Insurance' }
  ];

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content || !newPost.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const post = {
      ...newPost,
      id: Date.now().toString(),
      author: 'Current User',
      createdAt: new Date().toISOString().split('T')[0],
      views: 0
    };

    setPosts([post, ...posts]);
    setNewPost({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      imageUrl: '',
      status: 'draft'
    });
    setIsCreating(false);

    toast({
      title: "Success",
      description: "Blog post created successfully"
    });
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: "Success",
      description: "Blog post deleted successfully"
    });
  };

  const handlePublishPost = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status: 'published' } : post
    ));
    toast({
      title: "Success",
      description: "Blog post published successfully"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
            <p className="text-gray-600 mt-2">Manage blog posts and articles</p>
          </div>
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>

        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="posts">All Posts</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            {/* Create/Edit Post Modal */}
            {(isCreating || editingPost) && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>
                      {isCreating ? 'Create New Post' : 'Edit Post'}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsCreating(false);
                        setEditingPost(null);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title *</label>
                    <Input
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      placeholder="Enter post title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Excerpt</label>
                    <Textarea
                      value={newPost.excerpt}
                      onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                      placeholder="Brief description of the post"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category *</label>
                      <Select
                        value={newPost.category}
                        onValueChange={(value) => setNewPost({...newPost, category: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <Select
                        value={newPost.status}
                        onValueChange={(value) => setNewPost({...newPost, status: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                    <Input
                      value={newPost.imageUrl}
                      onChange={(e) => setNewPost({...newPost, imageUrl: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Content *</label>
                    <Textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      placeholder="Write your post content here..."
                      rows={12}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleCreatePost} className="bg-blue-600 hover:bg-blue-700">
                      <Save className="w-4 h-4 mr-2" />
                      {isCreating ? 'Create Post' : 'Update Post'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsCreating(false);
                        setEditingPost(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Posts List */}
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{post.title}</h3>
                          <Badge 
                            variant={post.status === 'published' ? 'default' : 'secondary'}
                          >
                            {post.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>By {post.author}</span>
                          <span>{post.createdAt}</span>
                          <span>{post.views} views</span>
                          <Badge variant="outline">
                            {categories.find(c => c.id === post.category)?.name}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        {post.status === 'draft' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handlePublishPost(post.id)}
                          >
                            Publish
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="published">
            <div className="space-y-4">
              {posts.filter(post => post.status === 'published').map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{post.views} views</span>
                      <span>Published {post.createdAt}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="drafts">
            <div className="space-y-4">
              {posts.filter(post => post.status === 'draft').map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                        <div className="text-xs text-gray-500">
                          Draft created {post.createdAt}
                        </div>
                      </div>
                      <Button 
                        onClick={() => handlePublishPost(post.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Publish
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-blue-600">{posts.length}</div>
                  <div className="text-sm text-gray-600">Total Posts</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {posts.filter(p => p.status === 'published').length}
                  </div>
                  <div className="text-sm text-gray-600">Published</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {posts.reduce((sum, post) => sum + post.views, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminCMS;
