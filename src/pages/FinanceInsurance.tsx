
import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CreditCard, Info } from 'lucide-react';
import LoanCalculator from '@/components/LoanCalculator';
import InsuranceCalculator from '@/components/InsuranceCalculator';
import { useFinancialRates } from '@/hooks/useFinancialRates';

const FinanceInsurance = () => {
  const { institutions, loanRates, insuranceRates } = useFinancialRates();

  const bankPartners = institutions.filter(inst => inst.type === 'bank');
  const insurancePartners = institutions.filter(inst => inst.type === 'insurance');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Finance & Insurance
          </h1>
          <p className="text-lg text-gray-600">
            Get the best deals on vehicle financing and insurance in Myanmar
          </p>
        </div>

        <Tabs defaultValue="finance" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="finance">Vehicle Finance</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
          </TabsList>

          <TabsContent value="finance" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Enhanced Loan Calculator */}
              <LoanCalculator />

              {/* Finance Partners */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Finance Partners
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bankPartners.map((bank) => {
                      const bankRates = loanRates.filter(rate => rate.institution_id === bank.id);
                      const bestRate = bankRates.length > 0 ? Math.min(...bankRates.map(r => r.min_rate)) : null;
                      
                      return (
                        <div key={bank.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{bank.name}</h3>
                            {bestRate && (
                              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                                From {bestRate}% APR
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {bank.description || 'Competitive vehicle financing options'}
                          </p>
                          <Button variant="outline" size="sm" className="w-full">Get Quote</Button>
                        </div>
                      );
                    })}
                    
                    {bankPartners.length === 0 && (
                      <div className="text-center text-gray-500 py-8">
                        <p>No partner banks available at the moment.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Finance Types */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hire Purchase (HP)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Own the vehicle at the end of the term</li>
                    <li>• Fixed monthly payments</li>
                    <li>• Typically 10-20% deposit required</li>
                    <li>• Terms from 12-84 months</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Personal Contract Purchase (PCP)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Lower monthly payments</li>
                    <li>• Option to buy, return, or exchange</li>
                    <li>• Guaranteed future value</li>
                    <li>• Ideal for regular vehicle upgrades</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insurance" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Enhanced Insurance Calculator */}
              <InsuranceCalculator />

              {/* Insurance Partners */}
              <Card>
                <CardHeader>
                  <CardTitle>Insurance Partners</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {insurancePartners.map((company) => {
                      const companyRates = insuranceRates.filter(rate => rate.institution_id === company.id);
                      const comprehensiveRate = companyRates.find(r => r.coverage_type === 'comprehensive');
                      
                      return (
                        <div key={company.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{company.name}</h3>
                            {comprehensiveRate && (
                              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {(comprehensiveRate.base_premium_rate * 100).toFixed(1)}% of value
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {company.description || 'Comprehensive vehicle insurance coverage'}
                          </p>
                          <Button variant="outline" size="sm" className="w-full">Get Quote</Button>
                        </div>
                      );
                    })}
                    
                    {insurancePartners.length === 0 && (
                      <div className="text-center text-gray-500 py-8">
                        <p>No partner insurance companies available at the moment.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Insurance Types */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Third Party</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Legal minimum coverage</li>
                    <li>• Covers damage to others</li>
                    <li>• Most affordable option</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Third Party Fire & Theft</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Third party coverage</li>
                    <li>• Fire damage protection</li>
                    <li>• Theft protection</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Comprehensive</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Full coverage protection</li>
                    <li>• Accident damage</li>
                    <li>• Windscreen cover</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="pb-20 md:pb-0"></div>
    </div>
  );
};

export default FinanceInsurance;
