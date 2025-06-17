
-- Drop existing tables to start fresh
DROP TABLE IF EXISTS public.reports CASCADE;
DROP TABLE IF EXISTS public.listing_images CASCADE;
DROP TABLE IF EXISTS public.listings CASCADE;
DROP TABLE IF EXISTS public.dealers CASCADE;
DROP TABLE IF EXISTS public.compare_items CASCADE;
DROP TABLE IF EXISTS public.favorites CASCADE;
DROP TABLE IF EXISTS public.chats CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- Create users table (for custom user management)
CREATE TABLE public.users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create listings table
CREATE TABLE public.listings (
  id BIGSERIAL PRIMARY KEY,
  owner_id BIGINT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  price NUMERIC NOT NULL,
  year INTEGER,
  mileage INTEGER,
  fuel_type TEXT,
  transmission TEXT,
  condition TEXT,
  color TEXT,
  region TEXT,
  township TEXT,
  seller_type TEXT,
  description TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_sold BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create listing_images table
CREATE TABLE public.listing_images (
  id BIGSERIAL PRIMARY KEY,
  listing_id BIGINT REFERENCES public.listings(id) ON DELETE CASCADE,
  url TEXT NOT NULL
);

-- Create favorites table (for wishlist functionality)
CREATE TABLE public.favorites (
  user_id BIGINT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  listing_id BIGINT NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  PRIMARY KEY (user_id, listing_id)
);

-- Create chats table (for enquiries/messages)
CREATE TABLE public.chats (
  id BIGSERIAL PRIMARY KEY,
  sender_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  receiver_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  listing_id BIGINT REFERENCES public.listings(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create dealers table
CREATE TABLE public.dealers (
  user_id BIGINT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE PRIMARY KEY,
  dealership_name TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create compare_items table
CREATE TABLE public.compare_items (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  listing_id BIGINT REFERENCES public.listings(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create reports table
CREATE TABLE public.reports (
  id BIGSERIAL PRIMARY KEY,
  listing_id BIGINT REFERENCES public.listings(id) ON DELETE CASCADE,
  reported_by BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert sample data
INSERT INTO public.users (id, email, password, name, role) VALUES
(1, 'admin@example.com', 'password123', 'Admin User', 'admin'),
(2, 'dealer@example.com', 'password123', 'Dealer User', 'dealer'),
(3, 'user@example.com', 'password123', 'Regular User', 'user');

-- Insert sample listings
INSERT INTO public.listings (
  owner_id, title, make, model, price, year, mileage, fuel_type, 
  transmission, condition, color, region, township, seller_type, description
) VALUES 
-- Sample cars
(1, 'Toyota Camry 2020 Hybrid LE', 'Toyota', 'Camry', 350, 2020, 25000, 'Hybrid', 'CVT', 'Excellent', 'Pearl White', 'Yangon', 'Kamayut', 'Dealer', 'Well maintained hybrid sedan with full service history. Perfect for city driving with excellent fuel economy.'),
(1, 'Honda CR-V 2019 AWD', 'Honda', 'CR-V', 280, 2019, 35000, 'Petrol', 'CVT', 'Good', 'Silver', 'Mandalay', 'Chanayethazan', 'Private', 'Reliable SUV with all-wheel drive. Great for family use.'),
(1, 'Mazda CX-5 2021 Touring', 'Mazda', 'CX-5', 320, 2021, 18000, 'Petrol', 'Automatic', 'Excellent', 'Soul Red', 'Yangon', 'Bahan', 'Dealer', 'Low mileage premium SUV with leather interior and advanced safety features.'),
(1, 'BMW X3 2020 xDrive30i', 'BMW', 'X3', 450, 2020, 22000, 'Petrol', 'Automatic', 'Excellent', 'Alpine White', 'Yangon', 'Mayangon', 'Dealer', 'Luxury SUV with premium features and BMW warranty.'),
(1, 'Nissan Leaf 2022 SV', 'Nissan', 'Leaf', 280, 2022, 15000, 'Electric', 'Automatic', 'Excellent', 'Gun Metallic', 'Naypyitaw', 'Zabuthiri', 'Dealer', 'Electric vehicle with long range battery. Environmentally friendly choice.'),
-- Sample motorbikes
(1, 'Honda CBR 600RR 2021', 'Honda', 'CBR 600RR', 85, 2021, 8000, 'Petrol', 'Manual', 'Excellent', 'Red', 'Yangon', 'Insein', 'Private', 'Sport bike in excellent condition. Perfect for weekend rides.'),
(1, 'Yamaha YZF-R3 2020', 'Yamaha', 'YZF-R3', 45, 2020, 12000, 'Petrol', 'Manual', 'Good', 'Blue', 'Mandalay', 'Mahaaungmye', 'Private', 'Entry level sport bike, great for beginners.'),
(1, 'Kawasaki Ninja 400 2022', 'Kawasaki', 'Ninja 400', 55, 2022, 5000, 'Petrol', 'Manual', 'Excellent', 'Green', 'Yangon', 'Thaketa', 'Dealer', 'Almost new sport bike with low mileage.');

-- Insert corresponding images for listings
INSERT INTO public.listing_images (listing_id, url) VALUES
(1, '/placeholder.svg'),
(2, '/placeholder.svg'),
(3, '/placeholder.svg'),
(4, '/placeholder.svg'),
(5, '/placeholder.svg'),
(6, '/placeholder.svg'),
(7, '/placeholder.svg'),
(8, '/placeholder.svg');

-- Create some dealer profiles
INSERT INTO public.dealers (user_id, dealership_name, logo_url) VALUES
(1, 'Elite Motors Myanmar', '/placeholder.svg'),
(2, 'Premium Auto Yangon', '/placeholder.svg');
