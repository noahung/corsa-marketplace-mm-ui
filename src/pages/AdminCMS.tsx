
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author_name: string;
  is_published: boolean;
  created_at: string;
  image_url?: string;
}

const AdminCMS = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Complete Guide to Buying a Used Car in Myanmar',
      excerpt: 'Everything you need to know before purchasing your next vehicle, from inspection tips to paperwork.',
      content: 'Full article content here...',
      category: 'buying-guide',
      author_name: 'Aung Kyaw',
      is_published: true,
      created_at: '2024-01-15',
      image_url: '/placeholder.svg'
    }
  ]);

  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const categories = [
    { value: 'buying-guide', label: 'Buying Guide' },
    { value: 'selling-tips', label: 'Selling Tips' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'market-news', label: 'Market News' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'reviews', label: 'Reviews' }
  ];

  const handleCreatePost = () => {
    setIsCreating(true);
    setEditingPost({
      id: '',
      title: '',
      excerpt: '',
      content: '',
      category: '',
      author_name: user?.email || '',
      is_published: false,
      created_at: new Date().toISOString(),
      image_url: ''
    });
  };

  const handleSavePost = () => {
    if (!editingPost) return;

    if (isCreating) {
      const newPost = {
        ...editingPost,
        id: Date.now().toString()
      };
      setPosts([newPost, ...posts]);
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
    } else {
      setPosts(posts.map(post => 
        post.id === editingPost.id ? editingPost : post
      ));
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
    }

    setEditingPost(null);
    setIsCreating(false);
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
    toast({
      title: "Success",
      description: "Blog post deleted successfully",
    });
  };

  const handleTogglePublish = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, is_published: !post.is_published }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Management System</h1>
            <p className="text-gray-600 mt-2">Manage blog posts and articles</p>
          </div>
          <Button onClick={handleCreatePost} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create New Post
          </Button>
        </div>

        {editingPost && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {isCreating ? 'Create New Post' : 'Edit Post'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({
                    ...editingPost,
                    title: e.target.value
                  })}
                  placeholder="Enter post title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select
                  value={editingPost.category}
                  onValueChange={(value) => setEditingPost({
                    ...editingPost,
                    category: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <Textarea
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({
                    ...editingPost,
                    excerpt: e.target.value
                  })}
                  placeholder="Brief description of the post"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <Textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({
                    ...editingPost,
                    content: e.target.value
                  })}
                  placeholder="Full post content (HTML supported)"
                  rows={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <Input
                  value={editingPost.image_url}
                  onChange={(e) => setEditingPost({
                    ...editingPost,
                    image_url: e.target.value
                  })}
                  placeholder="Enter image URL"
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSavePost} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Post
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditingPost(null);
                    setIsCreating(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
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
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                      <Badge variant={post.is_published ? 'default' : 'secondary'}>
                        {post.is_published ? 'Published' : 'Draft'}
                      </Badge>
                      <Badge variant="outline">
                        {categories.find(c => c.value === post.category)?.label}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{post.excerpt}</p>
                    <div className="text-sm text-gray-500">
                      By {post.author_name} • {new Date(post.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/blog/${post.id}`, '_blank')}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingPost(post)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePublish(post.id)}
                    >
                      {post.is_published ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminCMS;
