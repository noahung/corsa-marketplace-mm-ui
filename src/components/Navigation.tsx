import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, User, Car, Zap, Calculator, CreditCard, BookOpen, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { path: '/cars', label: 'Cars', icon: Car },
    { path: '/motorbikes', label: 'Motorbikes', icon: Car },
    { path: '/dealers', label: 'Dealers', icon: User },
    { path: '/valuation', label: 'Valuation', icon: Calculator },
    { path: '/finance', label: 'Finance', icon: CreditCard },
    { path: '/ev-hub', label: 'EV Hub', icon: Zap },
    { path: '/advice', label: 'Advice', icon: BookOpen },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/">
              <img
                src="https://mhhfarkrqczisaxkzyla.supabase.co/storage/v1/object/public/misc//corsa%20logo.png"
                alt="Corsa Logo"
                className="h-8 w-auto mr-2"
                style={{ maxHeight: '32px', width: 'auto' }}
              />
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Link to="/search">
                <Button variant="ghost" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </Link>
              <Link to="/sell">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Sell Your Car
                </Button>
              </Link>
              {user ? (
                <div className="flex items-center space-x-2">
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Corsa</span>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-6">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive(item.path)
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </Link>
                    );
                  })}
                  
                  <div className="border-t pt-4">
                    <Link to="/search" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <Search className="w-4 h-4 mr-2" />
                        Search Vehicles
                      </Button>
                    </Link>
                    <Link to="/sell" onClick={() => setIsOpen(false)}>
                      <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700">
                        Sell Your Car
                      </Button>
                    </Link>
                    {user ? (
                      <div className="space-y-2 mt-2">
                        <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full">
                            <User className="w-4 h-4 mr-2" />
                            Dashboard
                          </Button>
                        </Link>
                        <Button variant="ghost" className="w-full" onClick={() => { handleSignOut(); setIsOpen(false); }}>
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full mt-2">
                          <User className="w-4 h-4 mr-2" />
                          Sign In
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-5 h-16">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center text-xs ${
              isActive('/') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Car className="w-5 h-5 mb-1" />
            Home
          </Link>
          <Link
            to="/search"
            className={`flex flex-col items-center justify-center text-xs ${
              isActive('/search') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Search className="w-5 h-5 mb-1" />
            Search
          </Link>
          <Link
            to="/valuation"
            className={`flex flex-col items-center justify-center text-xs ${
              isActive('/valuation') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Calculator className="w-5 h-5 mb-1" />
            Value
          </Link>
          <Link
            to="/sell"
            className={`flex flex-col items-center justify-center text-xs ${
              isActive('/sell') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Car className="w-5 h-5 mb-1" />
            Sell
          </Link>
          <Link
            to={user ? "/dashboard" : "/login"}
            className={`flex flex-col items-center justify-center text-xs ${
              isActive('/dashboard') || isActive('/login') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <User className="w-5 h-5 mb-1" />
            {user ? 'Account' : 'Sign In'}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navigation;
