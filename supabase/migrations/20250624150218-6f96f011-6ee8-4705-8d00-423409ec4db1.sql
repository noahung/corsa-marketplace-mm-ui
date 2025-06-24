
-- Create user roles table with enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id) NOT NULL,
  author_name TEXT NOT NULL,
  image_url TEXT,
  rating DECIMAL(2,1),
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on blog posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Blog posts policies
CREATE POLICY "Anyone can view published blog posts" 
  ON public.blog_posts 
  FOR SELECT 
  USING (is_published = true);

CREATE POLICY "Authors can view their own posts" 
  ON public.blog_posts 
  FOR SELECT 
  USING (auth.uid() = author_id);

CREATE POLICY "Admins and moderators can view all posts" 
  ON public.blog_posts 
  FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

CREATE POLICY "Admins and moderators can create posts" 
  ON public.blog_posts 
  FOR INSERT 
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

CREATE POLICY "Authors can update their own posts" 
  ON public.blog_posts 
  FOR UPDATE 
  USING (auth.uid() = author_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete any post" 
  ON public.blog_posts 
  FOR DELETE 
  USING (public.has_role(auth.uid(), 'admin'));

-- Create charging stations table
CREATE TABLE public.charging_stations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Available',
  amenities TEXT[],
  pricing TEXT,
  contact_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on charging stations (public read access)
ALTER TABLE public.charging_stations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view charging stations" 
  ON public.charging_stations 
  FOR SELECT 
  USING (true);

-- Insert sample charging stations data
INSERT INTO public.charging_stations (name, location, address, latitude, longitude, type, status, amenities, pricing, contact_info) VALUES
('Yangon City Mall', 'Yangon', 'Pyay Road, Kamayut Township, Yangon', 16.817780, 96.135480, 'Fast Charging', 'Available', ARRAY['Shopping Mall', 'Food Court', 'Parking'], '500 MMK/kWh', '{"phone": "+95 9 123 456 789", "email": "info@ycm.mm"}'),
('Junction Square', 'Yangon', 'Bogyoke Aung San Road, Pabedan Township, Yangon', 16.779160, 96.148220, 'Standard', 'Available', ARRAY['Shopping Center', 'Restaurants'], '400 MMK/kWh', '{"phone": "+95 9 987 654 321", "email": "support@junction.mm"}'),
('Mandalay Bay', 'Mandalay', 'Between 26th & 27th Street, Mandalay', 21.976065, 96.085762, 'Fast Charging', 'Occupied', ARRAY['Hotel', 'Restaurant', 'Spa'], '550 MMK/kWh', '{"phone": "+95 2 123 456", "email": "charging@mandalaybay.mm"}'),
('Naypyitaw Plaza', 'Naypyitaw', 'Thapye Chaung Road, Ottarathiri Township', 19.745210, 96.129240, 'Super Fast', 'Available', ARRAY['Shopping Mall', 'Cinema', 'Food Court'], '600 MMK/kWh', '{"phone": "+95 67 123 456", "email": "info@naypyitawplaza.mm"}');
