
-- First, let's make sure we have the app_role enum (if it doesn't exist)
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'buyer', 'seller');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Update the user_roles table to use the enum if it's not already
ALTER TABLE public.user_roles 
ALTER COLUMN role TYPE app_role USING role::app_role;

-- Create a function to assign roles to users
CREATE OR REPLACE FUNCTION public.assign_user_role(user_email text, user_role app_role)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    target_user_id uuid;
BEGIN
    -- Find the user by email
    SELECT id INTO target_user_id 
    FROM auth.users 
    WHERE email = user_email;
    
    IF target_user_id IS NULL THEN
        RAISE EXCEPTION 'User with email % not found', user_email;
    END IF;
    
    -- Insert the role (ignore if already exists)
    INSERT INTO public.user_roles (user_id, role)
    VALUES (target_user_id, user_role)
    ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

-- Let's also create a function to check existing profiles and create missing ones
CREATE OR REPLACE FUNCTION public.sync_auth_users_to_profiles()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, role)
    SELECT 
        au.id,
        COALESCE(au.raw_user_meta_data->>'full_name', au.raw_user_meta_data->>'name', au.email),
        'buyer'
    FROM auth.users au
    LEFT JOIN public.profiles p ON au.id = p.id
    WHERE p.id IS NULL;
END;
$$;

-- Run the sync function to catch any missing profiles
SELECT public.sync_auth_users_to_profiles();
