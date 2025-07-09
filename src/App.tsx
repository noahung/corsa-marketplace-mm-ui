import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import VehicleDetail from './pages/VehicleDetail';
import SearchResults from './pages/SearchResults';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Sell from './pages/Sell';
import PostVehicle from './pages/PostVehicle';
import FinanceInsurance from './pages/FinanceInsurance';
import NotFound from './pages/NotFound';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from "@/components/ui/toaster"
import AdminRates from './pages/AdminRates';
import Cars from './pages/Cars';
import Motorbikes from './pages/Motorbikes';
import Dealers from './pages/Dealers';
import DealerDetail from './pages/DealerDetail';
import ValuationPage from './pages/ValuationPage';
import Advice from './pages/Advice';
import EVHub from './pages/EVHub';
import Compare from './pages/Compare';
import ChargingStationDetail from './pages/ChargingStationDetail';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Toaster />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/motorbikes" element={<Motorbikes />} />
          <Route path="/dealers" element={<Dealers />} />
          <Route path="/dealers/:id" element={<DealerDetail />} />
          <Route path="/valuation" element={<ValuationPage />} />
          <Route path="/advice" element={<Advice />} />
          <Route path="/ev-hub" element={<EVHub />} />
          <Route path="/ev-hub/charging-station/:id" element={<ChargingStationDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/vehicle/:id" element={<VehicleDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/post-vehicle" element={<PostVehicle />} />
          <Route path="/finance-insurance" element={<FinanceInsurance />} />
          <Route path="/admin/rates" element={<AdminRates />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
