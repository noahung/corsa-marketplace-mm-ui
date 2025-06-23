
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator } from 'lucide-react';
import { useFinancialRates } from '@/hooks/useFinancialRates';

const LoanCalculator = () => {
  const { loanRates, calculateLoanPayment } = useFinancialRates();
  const [formData, setFormData] = useState({
    vehiclePrice: '',
    downPayment: '',
    loanTerm: '60',
    selectedBank: ''
  });
  const [results, setResults] = useState<Array<{
    bankName: string;
    rate: number;
    monthlyPayment: number;
    totalInterest: number;
    totalAmount: number;
  }>>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateLoans = () => {
    const vehiclePrice = parseFloat(formData.vehiclePrice);
    const downPayment = parseFloat(formData.downPayment || '0');
    const loanAmount = vehiclePrice - downPayment;
    const termMonths = parseInt(formData.loanTerm);

    if (!vehiclePrice || loanAmount <= 0) return;

    const relevantRates = formData.selectedBank 
      ? loanRates.filter(rate => rate.institution_id === formData.selectedBank)
      : loanRates;

    const calculatedResults = relevantRates.map(rate => {
      // Use average of min and max rate for calculation
      const avgRate = (rate.min_rate + rate.max_rate) / 2;
      const monthlyPayment = calculateLoanPayment(loanAmount, avgRate, termMonths);
      const totalAmount = monthlyPayment * termMonths;
      const totalInterest = totalAmount - loanAmount;

      return {
        bankName: rate.institution?.name || '',
        rate: avgRate,
        monthlyPayment,
        totalInterest,
        totalAmount
      };
    });

    setResults(calculatedResults.sort((a, b) => a.monthlyPayment - b.monthlyPayment));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Loan Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="vehiclePrice">Vehicle Price (Kyats)</Label>
          <Input
            id="vehiclePrice"
            type="number"
            placeholder="e.g. 30000000"
            value={formData.vehiclePrice}
            onChange={(e) => handleInputChange('vehiclePrice', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="downPayment">Down Payment (Kyats)</Label>
          <Input
            id="downPayment"
            type="number"
            placeholder="e.g. 6000000"
            value={formData.downPayment}
            onChange={(e) => handleInputChange('downPayment', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="loanTerm">Loan Term (months)</Label>
          <Select value={formData.loanTerm} onValueChange={(value) => handleInputChange('loanTerm', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12 months</SelectItem>
              <SelectItem value="24">24 months</SelectItem>
              <SelectItem value="36">36 months</SelectItem>
              <SelectItem value="48">48 months</SelectItem>
              <SelectItem value="60">60 months</SelectItem>
              <SelectItem value="72">72 months</SelectItem>
              <SelectItem value="84">84 months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="bank">Bank (Optional - leave empty to compare all)</Label>
          <Select value={formData.selectedBank} onValueChange={(value) => handleInputChange('selectedBank', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a bank or compare all" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Compare all banks</SelectItem>
              {loanRates.map(rate => rate.institution).filter((inst, index, self) => 
                inst && self.findIndex(i => i?.id === inst.id) === index
              ).map(institution => (
                <SelectItem key={institution!.id} value={institution!.id}>
                  {institution!.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={calculateLoans}
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={!formData.vehiclePrice}
        >
          Calculate Loan Options
        </Button>

        {results.length > 0 && (
          <div className="space-y-3 mt-6">
            <h3 className="font-semibold">Loan Comparison Results</h3>
            {results.map((result, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{result.bankName}</h4>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {result.rate.toFixed(1)}% APR
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Monthly Payment</div>
                    <div className="font-semibold text-green-600">
                      {formatCurrency(result.monthlyPayment)} Ks
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Total Interest</div>
                    <div className="font-semibold">
                      {formatCurrency(result.totalInterest)} Ks
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Total Amount</div>
                    <div className="font-semibold">
                      {formatCurrency(result.totalAmount)} Ks
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LoanCalculator;
