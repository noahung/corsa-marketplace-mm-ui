
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Building2, CreditCard, Shield, Plus, Edit, Trash2 } from 'lucide-react';
import { useFinancialRates, FinancialInstitution, LoanRate, InsuranceRate } from '@/hooks/useFinancialRates';
import { useAdminRates } from '@/hooks/useAdminRates';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AdminRates = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { institutions, loanRates, insuranceRates, fetchInstitutions, fetchLoanRates, fetchInsuranceRates } = useFinancialRates();
  const { loading, createInstitution, updateInstitution, createLoanRate, updateLoanRate, createInsuranceRate, updateInsuranceRate } = useAdminRates();
  
  const [activeTab, setActiveTab] = useState('institutions');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Check if user is admin
  useEffect(() => {
    if (user && (!user.user_metadata?.role || user.user_metadata.role !== 'admin')) {
      toast({
        title: "Access Denied",
        description: "You need admin privileges to access this page.",
        variant: "destructive",
      });
    }
  }, [user, toast]);

  const refreshData = () => {
    fetchInstitutions();
    fetchLoanRates();
    fetchInsuranceRates();
  };

  const handleSave = async (formData: any) => {
    let success = false;
    
    if (activeTab === 'institutions') {
      if (editingItem) {
        success = await updateInstitution(editingItem.id, formData);
      } else {
        success = await createInstitution(formData);
      }
    } else if (activeTab === 'loans') {
      if (editingItem) {
        success = await updateLoanRate(editingItem.id, formData);
      } else {
        success = await createLoanRate(formData);
      }
    } else if (activeTab === 'insurance') {
      if (editingItem) {
        success = await updateInsuranceRate(editingItem.id, formData);
      } else {
        success = await createInsuranceRate(formData);
      }
    }
    
    if (success) {
      setDialogOpen(false);
      setEditingItem(null);
      refreshData();
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount);
  };

  if (!user || user.user_metadata?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600">You need admin privileges to access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Rate Management Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage financial institutions, loan rates, and insurance rates
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="institutions">Institutions</TabsTrigger>
            <TabsTrigger value="loans">Loan Rates</TabsTrigger>
            <TabsTrigger value="insurance">Insurance Rates</TabsTrigger>
          </TabsList>

          <TabsContent value="institutions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Financial Institutions</h2>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingItem(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Institution
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingItem ? 'Edit Institution' : 'Add New Institution'}
                    </DialogTitle>
                  </DialogHeader>
                  <InstitutionForm
                    initialData={editingItem}
                    onSave={handleSave}
                    loading={loading}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {institutions.map((institution) => (
                <Card key={institution.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="w-5 h-5" />
                          {institution.name}
                        </CardTitle>
                        <Badge variant={institution.type === 'bank' ? 'default' : 'secondary'}>
                          {institution.type}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingItem(institution);
                          setDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{institution.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="loans" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Loan Rates</h2>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingItem(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Loan Rate
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingItem ? 'Edit Loan Rate' : 'Add New Loan Rate'}
                    </DialogTitle>
                  </DialogHeader>
                  <LoanRateForm
                    initialData={editingItem}
                    institutions={institutions.filter(i => i.type === 'bank')}
                    onSave={handleSave}
                    loading={loading}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {loanRates.map((rate) => (
                <Card key={rate.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5" />
                          {rate.institution?.name} - {rate.product_name}
                        </CardTitle>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">
                            {rate.min_rate}% - {rate.max_rate}%
                          </Badge>
                          <Badge variant="secondary">
                            {rate.min_term_months}-{rate.max_term_months} months
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingItem(rate);
                          setDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {rate.min_amount && (
                        <div>Min Amount: {formatCurrency(rate.min_amount)} Ks</div>
                      )}
                      {rate.max_amount && (
                        <div>Max Amount: {formatCurrency(rate.max_amount)} Ks</div>
                      )}
                      {rate.min_down_payment_percent && (
                        <div>Min Down Payment: {rate.min_down_payment_percent}%</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insurance" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Insurance Rates</h2>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingItem(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Insurance Rate
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingItem ? 'Edit Insurance Rate' : 'Add New Insurance Rate'}
                    </DialogTitle>
                  </DialogHeader>
                  <InsuranceRateForm
                    initialData={editingItem}
                    institutions={institutions.filter(i => i.type === 'insurance')}
                    onSave={handleSave}
                    loading={loading}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {insuranceRates.map((rate) => (
                <Card key={rate.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="w-5 h-5" />
                          {rate.institution?.name}
                        </CardTitle>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">
                            {rate.coverage_type.replace('_', ' ')}
                          </Badge>
                          <Badge variant="secondary">
                            {(rate.base_premium_rate * 100).toFixed(2)}% of value
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingItem(rate);
                          setDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {rate.min_premium && (
                        <div>Min Premium: {formatCurrency(rate.min_premium)} Ks</div>
                      )}
                      {rate.max_premium && (
                        <div>Max Premium: {formatCurrency(rate.max_premium)} Ks</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Institution Form Component
const InstitutionForm = ({ initialData, onSave, loading }: any) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    type: initialData?.type || 'bank',
    description: initialData?.description || '',
    logo_url: initialData?.logo_url || '',
    is_active: initialData?.is_active ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Institution Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="type">Type</Label>
        <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bank">Bank</SelectItem>
            <SelectItem value="insurance">Insurance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <div>
        <Label htmlFor="logo_url">Logo URL</Label>
        <Input
          id="logo_url"
          type="url"
          value={formData.logo_url}
          onChange={(e) => setFormData(prev => ({ ...prev, logo_url: e.target.value }))}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Saving...' : 'Save Institution'}
      </Button>
    </form>
  );
};

// Loan Rate Form Component
const LoanRateForm = ({ initialData, institutions, onSave, loading }: any) => {
  const [formData, setFormData] = useState({
    institution_id: initialData?.institution_id || '',
    product_name: initialData?.product_name || '',
    min_rate: initialData?.min_rate || '',
    max_rate: initialData?.max_rate || '',
    min_term_months: initialData?.min_term_months || '',
    max_term_months: initialData?.max_term_months || '',
    min_amount: initialData?.min_amount || '',
    max_amount: initialData?.max_amount || '',
    min_down_payment_percent: initialData?.min_down_payment_percent || '',
    special_conditions: initialData?.special_conditions || '',
    is_active: initialData?.is_active ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      min_rate: parseFloat(formData.min_rate),
      max_rate: parseFloat(formData.max_rate),
      min_term_months: parseInt(formData.min_term_months),
      max_term_months: parseInt(formData.max_term_months),
      min_amount: formData.min_amount ? parseFloat(formData.min_amount) : null,
      max_amount: formData.max_amount ? parseFloat(formData.max_amount) : null,
      min_down_payment_percent: formData.min_down_payment_percent ? parseFloat(formData.min_down_payment_percent) : null
    };
    onSave(processedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="institution_id">Bank</Label>
        <Select value={formData.institution_id} onValueChange={(value) => setFormData(prev => ({ ...prev, institution_id: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select a bank" />
          </SelectTrigger>
          <SelectContent>
            {institutions.map((institution: FinancialInstitution) => (
              <SelectItem key={institution.id} value={institution.id}>
                {institution.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="product_name">Product Name</Label>
        <Input
          id="product_name"
          value={formData.product_name}
          onChange={(e) => setFormData(prev => ({ ...prev, product_name: e.target.value }))}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="min_rate">Min Rate (%)</Label>
          <Input
            id="min_rate"
            type="number"
            step="0.1"
            value={formData.min_rate}
            onChange={(e) => setFormData(prev => ({ ...prev, min_rate: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="max_rate">Max Rate (%)</Label>
          <Input
            id="max_rate"
            type="number"
            step="0.1"
            value={formData.max_rate}
            onChange={(e) => setFormData(prev => ({ ...prev, max_rate: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="min_term_months">Min Term (months)</Label>
          <Input
            id="min_term_months"
            type="number"
            value={formData.min_term_months}
            onChange={(e) => setFormData(prev => ({ ...prev, min_term_months: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="max_term_months">Max Term (months)</Label>
          <Input
            id="max_term_months"
            type="number"
            value={formData.max_term_months}
            onChange={(e) => setFormData(prev => ({ ...prev, max_term_months: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="min_amount">Min Amount (Ks)</Label>
          <Input
            id="min_amount"
            type="number"
            value={formData.min_amount}
            onChange={(e) => setFormData(prev => ({ ...prev, min_amount: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="max_amount">Max Amount (Ks)</Label>
          <Input
            id="max_amount"
            type="number"
            value={formData.max_amount}
            onChange={(e) => setFormData(prev => ({ ...prev, max_amount: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="min_down_payment_percent">Min Down Payment (%)</Label>
        <Input
          id="min_down_payment_percent"
          type="number"
          step="0.1"
          value={formData.min_down_payment_percent}
          onChange={(e) => setFormData(prev => ({ ...prev, min_down_payment_percent: e.target.value }))}
        />
      </div>

      <div>
        <Label htmlFor="special_conditions">Special Conditions</Label>
        <Textarea
          id="special_conditions"
          value={formData.special_conditions}
          onChange={(e) => setFormData(prev => ({ ...prev, special_conditions: e.target.value }))}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Saving...' : 'Save Loan Rate'}
      </Button>
    </form>
  );
};

// Insurance Rate Form Component
const InsuranceRateForm = ({ initialData, institutions, onSave, loading }: any) => {
  const [formData, setFormData] = useState({
    institution_id: initialData?.institution_id || '',
    coverage_type: initialData?.coverage_type || 'comprehensive',
    base_premium_rate: initialData?.base_premium_rate || '',
    min_premium: initialData?.min_premium || '',
    max_premium: initialData?.max_premium || '',
    is_active: initialData?.is_active ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      base_premium_rate: parseFloat(formData.base_premium_rate),
      min_premium: formData.min_premium ? parseFloat(formData.min_premium) : null,
      max_premium: formData.max_premium ? parseFloat(formData.max_premium) : null,
      age_multipliers: {
        "18-25": 1.3,
        "26-35": 1.0,
        "36-50": 0.9,
        "51+": 0.85
      },
      vehicle_age_multipliers: {
        "0-3": 1.0,
        "4-7": 1.1,
        "8-15": 1.3,
        "16+": 1.5
      },
      location_multipliers: {
        "Yangon": 1.2,
        "Mandalay": 1.0,
        "Other": 0.9
      }
    };
    onSave(processedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="institution_id">Insurance Company</Label>
        <Select value={formData.institution_id} onValueChange={(value) => setFormData(prev => ({ ...prev, institution_id: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select an insurance company" />
          </SelectTrigger>
          <SelectContent>
            {institutions.map((institution: FinancialInstitution) => (
              <SelectItem key={institution.id} value={institution.id}>
                {institution.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="coverage_type">Coverage Type</Label>
        <Select value={formData.coverage_type} onValueChange={(value) => setFormData(prev => ({ ...prev, coverage_type: value }))}>
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

      <div>
        <Label htmlFor="base_premium_rate">Base Premium Rate (decimal, e.g., 0.045 for 4.5%)</Label>
        <Input
          id="base_premium_rate"
          type="number"
          step="0.0001"
          value={formData.base_premium_rate}
          onChange={(e) => setFormData(prev => ({ ...prev, base_premium_rate: e.target.value }))}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="min_premium">Min Premium (Ks)</Label>
          <Input
            id="min_premium"
            type="number"
            value={formData.min_premium}
            onChange={(e) => setFormData(prev => ({ ...prev, min_premium: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="max_premium">Max Premium (Ks)</Label>
          <Input
            id="max_premium"
            type="number"
            value={formData.max_premium}
            onChange={(e) => setFormData(prev => ({ ...prev, max_premium: e.target.value }))}
          />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Saving...' : 'Save Insurance Rate'}
      </Button>
    </form>
  );
};

export default AdminRates;
