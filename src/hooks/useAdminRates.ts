
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FinancialInstitution, LoanRate, InsuranceRate } from './useFinancialRates';

export const useAdminRates = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const createInstitution = async (institution: Omit<FinancialInstitution, 'id'>) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('financial_institutions')
        .insert(institution);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Institution created successfully",
      });
      return true;
    } catch (error) {
      console.error('Error creating institution:', error);
      toast({
        title: "Error",
        description: "Failed to create institution",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateInstitution = async (id: string, updates: Partial<FinancialInstitution>) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('financial_institutions')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Institution updated successfully",
      });
      return true;
    } catch (error) {
      console.error('Error updating institution:', error);
      toast({
        title: "Error",
        description: "Failed to update institution",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const createLoanRate = async (rate: Omit<LoanRate, 'id' | 'institution'>) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('loan_rates')
        .insert(rate);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Loan rate created successfully",
      });
      return true;
    } catch (error) {
      console.error('Error creating loan rate:', error);
      toast({
        title: "Error",
        description: "Failed to create loan rate",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateLoanRate = async (id: string, updates: Partial<LoanRate>) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('loan_rates')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Loan rate updated successfully",
      });
      return true;
    } catch (error) {
      console.error('Error updating loan rate:', error);
      toast({
        title: "Error",
        description: "Failed to update loan rate",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const createInsuranceRate = async (rate: Omit<InsuranceRate, 'id' | 'institution'>) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('insurance_rates')
        .insert(rate);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Insurance rate created successfully",
      });
      return true;
    } catch (error) {
      console.error('Error creating insurance rate:', error);
      toast({
        title: "Error",
        description: "Failed to create insurance rate",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateInsuranceRate = async (id: string, updates: Partial<InsuranceRate>) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('insurance_rates')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Insurance rate updated successfully",
      });
      return true;
    } catch (error) {
      console.error('Error updating insurance rate:', error);
      toast({
        title: "Error",
        description: "Failed to update insurance rate",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createInstitution,
    updateInstitution,
    createLoanRate,
    updateLoanRate,
    createInsuranceRate,
    updateInsuranceRate,
  };
};
