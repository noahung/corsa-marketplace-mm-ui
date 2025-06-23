
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield } from 'lucide-react';
import { useFinancialRates } from '@/hooks/useFinancialRates';

const InsuranceCalculator = () => {
  const { insuranceRates, calculateInsurancePremium } = useFinancialRates();
  const [formData, setFormData] = useState({
    vehicleValue: '',
    driverAge: '',
    vehicleAge: '',
    location: 'Yangon',
    coverageType: 'comprehensive'
  });
  const [results, setResults] = useState<Array<{
    companyName: string;
    coverageType: string;
    annualPremium: number;
    monthlyPremium: number;
  }>>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateInsurance = () => {
    const vehicleValue = parseFloat(formData.vehicleValue);
    const driverAge = parseInt(formData.driverAge);
    const vehicleAge = parseInt(formData.vehicleAge);

    if (!vehicleValue || !driverAge || vehicleAge < 0) return;

    const relevantRates = insuranceRates.filter(rate => 
      rate.coverage_type === formData.coverageType
    );

    const calculatedResults = relevantRates.map(rate => {
      const annualPremium = calculateInsurancePremium(
        vehicleValue,
        formData.coverageType,
        driverAge,
        vehicleAge,
        formData.location,
        [rate]
      );

      return {
        companyName: rate.institution?.name || '',
        coverageType: rate.coverage_type,
        annualPremium,
        monthlyPremium: Math.round(annualPremium / 12)
      };
    });

    setResults(calculatedResults.sort((a, b) => a.annualPremium - b.annualPremium));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount);
  };

  const getCoverageDisplayName = (type: string) => {
    switch (type) {
      case 'third_party': return 'Third Party';
      case 'third_party_fire_theft': return 'Third Party, Fire & Theft';
      case 'comprehensive': return 'Comprehensive';
      default: return type;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Insurance Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="vehicleValue">Vehicle Value (Kyats)</Label>
          <Input
            id="vehicleValue"
            type="number"
            placeholder="e.g. 30000000"
            value={formData.vehicleValue}
            onChange={(e) => handleInputChange('vehicleValue', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="driverAge">Driver Age</Label>
          <Input
            id="driverAge"
            type="number"
            placeholder="e.g. 35"
            value={formData.driverAge}
            onChange={(e) => handleInputChange('driverAge', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="vehicleAge">Vehicle Age (years)</Label>
          <Input
            id="vehicleAge"
            type="number"
            placeholder="e.g. 5"
            value={formData.vehicleAge}
            onChange={(e) => handleInputChange('vehicleAge', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yangon">Yangon</SelectItem>
              <SelectItem value="Mandalay">Mandalay</SelectItem>
              <SelectItem value="Other">Other Cities</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="coverageType">Coverage Type</Label>
          <Select value={formData.coverageType} onValueChange={(value) => handleInputChange('coverageType', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="third_party">Third Party</SelectItem>
              <SelectItem value="third_party_fire_theft">Third Party, Fire & Theft</SelectItem>
              <SelectItem value="comprehensive">Comprehensive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={calculateInsurance}
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={!formData.vehicleValue || !formData.driverAge}
        >
          Calculate Insurance Quotes
        </Button>

        {results.length > 0 && (
          <div className="space-y-3 mt-6">
            <h3 className="font-semibold">Insurance Quotes - {getCoverageDisplayName(formData.coverageType)}</h3>
            {results.map((result, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{result.companyName}</h4>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    {getCoverageDisplayName(result.coverageType)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Annual Premium</div>
                    <div className="font-semibold text-blue-600">
                      {formatCurrency(result.annualPremium)} Ks
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Monthly Premium</div>
                    <div className="font-semibold">
                      {formatCurrency(result.monthlyPremium)} Ks
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

export default InsuranceCalculator;
