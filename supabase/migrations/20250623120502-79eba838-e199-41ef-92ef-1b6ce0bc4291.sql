
-- Create financial institutions table
CREATE TABLE public.financial_institutions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('bank', 'insurance')),
  logo_url TEXT,
  description TEXT,
  contact_info JSONB,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create loan rates table
CREATE TABLE public.loan_rates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  institution_id UUID REFERENCES public.financial_institutions(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  min_rate DECIMAL(5,2) NOT NULL,
  max_rate DECIMAL(5,2) NOT NULL,
  min_term_months INTEGER NOT NULL,
  max_term_months INTEGER NOT NULL,
  min_amount DECIMAL(15,2),
  max_amount DECIMAL(15,2),
  min_down_payment_percent DECIMAL(5,2),
  vehicle_types TEXT[] DEFAULT ARRAY['new', 'used'],
  special_conditions TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  effective_from DATE NOT NULL DEFAULT CURRENT_DATE,
  effective_until DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create insurance rates table
CREATE TABLE public.insurance_rates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  institution_id UUID REFERENCES public.financial_institutions(id) ON DELETE CASCADE,
  coverage_type TEXT NOT NULL CHECK (coverage_type IN ('third_party', 'comprehensive', 'third_party_fire_theft')),
  base_premium_rate DECIMAL(5,4) NOT NULL, -- percentage of vehicle value
  min_premium DECIMAL(10,2),
  max_premium DECIMAL(10,2),
  age_multipliers JSONB, -- e.g., {"18-25": 1.5, "26-35": 1.0, "36-50": 0.9}
  vehicle_age_multipliers JSONB, -- e.g., {"0-3": 1.0, "4-7": 1.1, "8+": 1.3}
  location_multipliers JSONB, -- e.g., {"Yangon": 1.2, "Mandalay": 1.0}
  is_active BOOLEAN NOT NULL DEFAULT true,
  effective_from DATE NOT NULL DEFAULT CURRENT_DATE,
  effective_until DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.financial_institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insurance_rates ENABLE ROW LEVEL SECURITY;

-- Public read access for active rates
CREATE POLICY "Anyone can view active institutions" ON public.financial_institutions
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view active loan rates" ON public.loan_rates
  FOR SELECT USING (is_active = true AND (effective_until IS NULL OR effective_until >= CURRENT_DATE));

CREATE POLICY "Anyone can view active insurance rates" ON public.insurance_rates
  FOR SELECT USING (is_active = true AND (effective_until IS NULL OR effective_until >= CURRENT_DATE));

-- Admin policies (assuming admin role exists)
CREATE POLICY "Admins can manage institutions" ON public.financial_institutions
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Admins can manage loan rates" ON public.loan_rates
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Admins can manage insurance rates" ON public.insurance_rates
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Insert sample data
INSERT INTO public.financial_institutions (name, type, description, is_active) VALUES
('CB Bank', 'bank', 'One of Myanmar''s leading commercial banks offering competitive vehicle financing', true),
('KBZ Bank', 'bank', 'Large commercial bank with flexible loan terms', true),
('AYA Bank', 'bank', 'Commercial bank known for quick loan approvals', true),
('Myanmar Insurance', 'insurance', 'Leading insurance provider with comprehensive vehicle coverage', true),
('IKBZ Insurance', 'insurance', 'Insurance company with competitive rates for all age groups', true),
('Grand Guardian', 'insurance', 'Specialist in luxury and high-value vehicle insurance', true);

-- Insert sample loan rates
INSERT INTO public.loan_rates (institution_id, product_name, min_rate, max_rate, min_term_months, max_term_months, min_amount, max_amount, min_down_payment_percent, vehicle_types)
SELECT 
  fi.id,
  'Vehicle Loan',
  CASE fi.name 
    WHEN 'CB Bank' THEN 8.5
    WHEN 'KBZ Bank' THEN 9.0
    WHEN 'AYA Bank' THEN 8.8
  END,
  CASE fi.name 
    WHEN 'CB Bank' THEN 12.0
    WHEN 'KBZ Bank' THEN 13.0
    WHEN 'AYA Bank' THEN 12.5
  END,
  12, 84, 5000000, 500000000, 10.0, ARRAY['new', 'used']
FROM public.financial_institutions fi WHERE fi.type = 'bank';

-- Insert sample insurance rates
INSERT INTO public.insurance_rates (institution_id, coverage_type, base_premium_rate, min_premium, max_premium, age_multipliers, vehicle_age_multipliers, location_multipliers)
SELECT 
  fi.id,
  coverage,
  CASE coverage
    WHEN 'third_party' THEN 0.015
    WHEN 'third_party_fire_theft' THEN 0.025
    WHEN 'comprehensive' THEN 0.045
  END,
  50000, 5000000,
  '{"18-25": 1.3, "26-35": 1.0, "36-50": 0.9, "51+": 0.85}'::jsonb,
  '{"0-3": 1.0, "4-7": 1.1, "8-15": 1.3, "16+": 1.5}'::jsonb,
  '{"Yangon": 1.2, "Mandalay": 1.0, "Other": 0.9}'::jsonb
FROM public.financial_institutions fi,
     unnest(ARRAY['third_party', 'third_party_fire_theft', 'comprehensive']) AS coverage
WHERE fi.type = 'insurance';
