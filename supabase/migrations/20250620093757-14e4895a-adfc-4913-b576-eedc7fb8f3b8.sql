
-- First, we need to drop existing foreign key constraints and recreate tables with proper UUID references
-- Since we can't directly alter the column types due to foreign key constraints, we'll recreate the tables

-- Drop existing foreign key constraints and recreate tables with UUID user references
DROP TABLE IF EXISTS public.favorites CASCADE;
DROP TABLE IF EXISTS public.compare_items CASCADE;
DROP TABLE IF EXISTS public.chats CASCADE;
DROP TABLE IF EXISTS public.reports CASCADE;

-- Update listings table to use UUID for owner_id
ALTER TABLE public.listings DROP CONSTRAINT IF EXISTS listings_owner_id_fkey;
ALTER TABLE public.listings ALTER COLUMN owner_id TYPE UUID USING gen_random_uuid();

-- Update dealers table to use UUID for user_id  
ALTER TABLE public.dealers DROP CONSTRAINT IF EXISTS dealers_user_id_fkey;
ALTER TABLE public.dealers ALTER COLUMN user_id TYPE UUID USING gen_random_uuid();

-- Recreate favorites table with proper UUID reference
CREATE TABLE public.favorites (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_id BIGINT NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, listing_id)
);

-- Recreate compare_items table with proper UUID reference
CREATE TABLE public.compare_items (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_id BIGINT REFERENCES public.listings(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recreate chats table with proper UUID references
CREATE TABLE public.chats (
  id BIGSERIAL PRIMARY KEY,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_id BIGINT REFERENCES public.listings(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recreate reports table with proper UUID reference
CREATE TABLE public.reports (
  id BIGSERIAL PRIMARY KEY,
  listing_id BIGINT REFERENCES public.listings(id) ON DELETE CASCADE,
  reported_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table to store additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'buyer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compare_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dealers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles table
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create RLS policies for other tables
CREATE POLICY "Users can manage their own favorites" ON public.favorites
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own compare items" ON public.compare_items
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view chats they are part of" ON public.chats
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send messages" ON public.chats
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can create reports" ON public.reports
  FOR INSERT WITH CHECK (auth.uid() = reported_by);

CREATE POLICY "Anyone can view active listings" ON public.listings
  FOR SELECT USING (NOT is_sold);
CREATE POLICY "Users can manage their own listings" ON public.listings
  FOR ALL USING (auth.uid() = owner_id);

CREATE POLICY "Users can view their own dealer profile" ON public.dealers
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own dealer profile" ON public.dealers
  FOR ALL USING (auth.uid() = user_id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'buyer')
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
