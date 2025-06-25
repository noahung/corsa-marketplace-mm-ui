
import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Car className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold">Corsa</span>
            </div>
            <p className="text-gray-400 text-sm">
              Myanmar's leading automotive marketplace. Find your perfect vehicle or sell with confidence.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/cars" className="block text-gray-400 hover:text-white text-sm">Cars</Link>
              <Link to="/motorbikes" className="block text-gray-400 hover:text-white text-sm">Motorbikes</Link>
              <Link to="/dealers" className="block text-gray-400 hover:text-white text-sm">Dealers</Link>
              <Link to="/valuation" className="block text-gray-400 hover:text-white text-sm">Valuation</Link>
              <Link to="/sell" className="block text-gray-400 hover:text-white text-sm">Sell Your Vehicle</Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <div className="space-y-2">
              <Link to="/finance" className="block text-gray-400 hover:text-white text-sm">Finance & Insurance</Link>
              <Link to="/advice" className="block text-gray-400 hover:text-white text-sm">Buying Guides</Link>
              <Link to="/ev-hub" className="block text-gray-400 hover:text-white text-sm">EV Hub</Link>
              <Link to="/blog" className="block text-gray-400 hover:text-white text-sm">Blog</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+95 9 123 456 789</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                <span>info@corsa.mm</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>123 Yangon Street, Yangon, Myanmar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Corsa. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
            <Link to="/support" className="text-gray-400 hover:text-white text-sm">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
