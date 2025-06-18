
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Shield, CreditCard, Info } from 'lucide-react';

const FinanceInsurance = () => {
  const [loanData, setLoanData] = useState({
    vehiclePrice: '',
    downPayment: '',
    loanTerm: '60',
    interestRate: '8.5'
  });

  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanData.vehiclePrice) - parseFloat(loanData.downPayment || '0');
    const monthlyRate = parseFloat(loanData.interestRate) / 100 / 12;
    const numPayments = parseInt(loanData.loanTerm);
    
    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                   (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    setMonthlyPayment(Math.round(payment));
  };

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
              {/* Loan Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Loan Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="vehiclePrice">Vehicle Price (Lakhs Ks)</Label>
                    <Input
                      id="vehiclePrice"
                      type="number"
                      placeholder="e.g. 300"
                      value={loanData.vehiclePrice}
                      onChange={(e) => setLoanData({...loanData, vehiclePrice: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="downPayment">Down Payment (Lakhs Ks)</Label>
                    <Input
                      id="downPayment"
                      type="number"
                      placeholder="e.g. 60"
                      value={loanData.downPayment}
                      onChange={(e) => setLoanData({...loanData, downPayment: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="loanTerm">Loan Term (months)</Label>
                    <Input
                      id="loanTerm"
                      type="number"
                      value={loanData.loanTerm}
                      onChange={(e) => setLoanData({...loanData, loanTerm: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      value={loanData.interestRate}
                      onChange={(e) => setLoanData({...loanData, interestRate: e.target.value})}
                    />
                  </div>

                  <Button 
                    onClick={calculateLoan}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={!loanData.vehiclePrice}
                  >
                    Calculate Monthly Payment
                  </Button>

                  {monthlyPayment && (
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-2">Estimated Monthly Payment</div>
                      <div className="text-2xl font-bold text-blue-600">
                        {monthlyPayment.toLocaleString()} Ks
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

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
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">CB Bank</h3>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">8.5% APR</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Competitive rates for new and used vehicles</p>
                      <Button variant="outline" size="sm" className="w-full">Get Quote</Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">KBZ Bank</h3>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">9.0% APR</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Flexible terms up to 7 years</p>
                      <Button variant="outline" size="sm" className="w-full">Get Quote</Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">AYA Bank</h3>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">8.8% APR</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Quick approval in 24 hours</p>
                      <Button variant="outline" size="sm" className="w-full">Get Quote</Button>
                    </div>
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
              {/* Insurance Quote Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Get Insurance Quote
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="vehicleValue">Vehicle Value (Lakhs Ks)</Label>
                    <Input id="vehicleValue" type="number" placeholder="e.g. 300" />
                  </div>

                  <div>
                    <Label htmlFor="driverAge">Driver Age</Label>
                    <Input id="driverAge" type="number" placeholder="e.g. 35" />
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g. Yangon" />
                  </div>

                  <div>
                    <Label htmlFor="coverageType">Coverage Type</Label>
                    <Input id="coverageType" placeholder="Comprehensive" />
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Get Instant Quote
                  </Button>
                </CardContent>
              </Card>

              {/* Insurance Partners */}
              <Card>
                <CardHeader>
                  <CardTitle>Insurance Partners</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Myanmar Insurance</h3>
                      <p className="text-sm text-gray-600 mb-3">Comprehensive coverage with 24/7 support</p>
                      <Button variant="outline" size="sm" className="w-full">Get Quote</Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">IKBZ Insurance</h3>
                      <p className="text-sm text-gray-600 mb-3">Competitive rates for young drivers</p>
                      <Button variant="outline" size="sm" className="w-full">Get Quote</Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Grand Guardian</h3>
                      <p className="text-sm text-gray-600 mb-3">Specialist in luxury vehicle insurance</p>
                      <Button variant="outline" size="sm" className="w-full">Get Quote</Button>
                    </div>
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
