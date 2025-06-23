
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface FinancialInstitution {
  id: string;
  name: string;
  type: 'bank' | 'insurance';
  logo_url?: string;
  description?: string;
  contact_info?: any;
  is_active: boolean;
}

export interface LoanRate {
  id: string;
  institution_id: string;
  institution?: FinancialInstitution;
  product_name: string;
  min_rate: number;
  max_rate: number;
  min_term_months: number;
  max_term_months: number;
  min_amount?: number;
  max_amount?: number;
  min_down_payment_percent?: number;
  vehicle_types?: string[];
  special_conditions?: string;
  is_active: boolean;
  effective_from: string;
  effective_until?: string;
}

export interface InsuranceRate {
  id: string;
  institution_id: string;
  institution?: FinancialInstitution;
  coverage_type: 'third_party' | 'comprehensive' | 'third_party_fire_theft';
  base_premium_rate: number;
  min_premium?: number;
  max_premium?: number;
  age_multipliers?: Record<string, number>;
  vehicle_age_multipliers?: Record<string, number>;
  location_multipliers?: Record<string, number>;
  is_active: boolean;
  effective_from: string;
  effective_until?: string;
}

export const useFinancialRates = () => {
  const [institutions, setInstitutions] = useState<FinancialInstitution[]>([]);
  const [loanRates, setLoanRates] = useState<LoanRate[]>([]);
  const [insuranceRates, setInsuranceRates] = useState<InsuranceRate[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchInstitutions = async () => {
    try {
      const { data, error } = await supabase
        .from('financial_institutions')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setInstitutions(data || []);
    } catch (error) {
      console.error('Error fetching institutions:', error);
    }
  };

  const fetchLoanRates = async () => {
    try {
      const { data, error } = await supabase
        .from('loan_rates')
        .select(`
          *,
          institution:financial_institutions(*)
        `)
        .eq('is_active', true)
        .order('min_rate');

      if (error) throw error;
      setLoanRates(data || []);
    } catch (error) {
      console.error('Error fetching loan rates:', error);
    }
  };

  const fetchInsuranceRates = async () => {
    try {
      const { data, error } = await supabase
        .from('insurance_rates')
        .select(`
          *,
          institution:financial_institutions(*)
        `)
        .eq('is_active', true)
        .order('base_premium_rate');

      if (error) throw error;
      setInsuranceRates(data || []);
    } catch (error) {
      console.error('Error fetching insurance rates:', error);
    }
  };

  const calculateLoanPayment = (
    principal: number,
    annualRate: number,
    termMonths: number
  ) => {
    const monthlyRate = annualRate / 100 / 12;
    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                   (Math.pow(1 + monthlyRate, termMonths) - 1);
    return Math.round(payment);
  };

  const calculateInsurancePremium = (
    vehicleValue: number,
    coverageType: string,
    driverAge: number,
    vehicleAge: number,
    location: string,
    rates: InsuranceRate[]
  ) => {
    const rate = rates.find(r => r.coverage_type === coverageType);
    if (!rate) return 0;

    let premium = vehicleValue * rate.base_premium_rate;

    // Apply age multipliers
    if (rate.age_multipliers) {
      const ageKey = getAgeKey(driverAge);
      const ageMultiplier = rate.age_multipliers[ageKey] || 1;
      premium *= ageMultiplier;
    }

    // Apply vehicle age multipliers
    if (rate.vehicle_age_multipliers) {
      const vehicleAgeKey = getVehicleAgeKey(vehicleAge);
      const vehicleAgeMultiplier = rate.vehicle_age_multipliers[vehicleAgeKey] || 1;
      premium *= vehicleAgeMultiplier;
    }

    // Apply location multipliers
    if (rate.location_multipliers) {
      const locationMultiplier = rate.location_multipliers[location] || rate.location_multipliers['Other'] || 1;
      premium *= locationMultiplier;
    }

    // Apply min/max limits
    if (rate.min_premium && premium < rate.min_premium) premium = rate.min_premium;
    if (rate.max_premium && premium > rate.max_premium) premium = rate.max_premium;

    return Math.round(premium);
  };

  const getAgeKey = (age: number): string => {
    if (age >= 18 && age <= 25) return '18-25';
    if (age >= 26 && age <= 35) return '26-35';
    if (age >= 36 && age <= 50) return '36-50';
    return '51+';
  };

  const getVehicleAgeKey = (age: number): string => {
    if (age >= 0 && age <= 3) return '0-3';
    if (age >= 4 && age <= 7) return '4-7';
    if (age >= 8 && age <= 15) return '8-15';
    return '16+';
  };

  useEffect(() => {
    fetchInstitutions();
    fetchLoanRates();
    fetchInsuranceRates();
  }, []);

  return {
    institutions,
    loanRates,
    insuranceRates,
    loading,
    calculateLoanPayment,
    calculateInsurancePremium,
    fetchInstitutions,
    fetchLoanRates,
    fetchInsuranceRates
  };
};
