

import { useState } from 'react';
import Logo from "../assets/cloudpulse.svg";
import { Bell, Menu, X, ChevronDown, Search } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 py-3 px-6 bg-black border-b border-gray-800 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Company Name */}
        <div className="flex">
          <img src={Logo} alt="CloudPulse Logo" className="h-[45px] transition-transform hover:scale-105" />
        </div>
        
        
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
            <span>Dashboard</span>
          </a>
          <div className="relative group">
            <button className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1" onClick={() => {}}>
              <span>Functions</span>
              <ChevronDown size={16} className="text-gray-400 group-hover:text-white" />
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 hidden group-hover:block">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">New Function</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">My Functions</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">Templates</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">Function Metrics</a>
              </div>
            </div>
          </div>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Docs</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
        </nav>
        
        {/* Action Items */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="text-gray-300 hover:text-white p-1 relative hidden md:block">
            <Bell size={20} />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-500"></span>
          </button>
          
          {/* Deploy Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors hidden md:block font-medium">
            Deploy
          </button>
          
          {/* Profile Menu */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white cursor-pointer border-2 border-gray-700 hover:border-gray-600"
            >
              <span className="text-sm font-medium">vk</span>
            </button>
            
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu">
                  <div className="px-4 py-2 border-b border-gray-800">
                    <p className="text-sm font-medium text-white">John Parker</p>
                    <p className="text-xs text-gray-400">john@example.com</p>
                  </div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">Your Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">API Keys</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">Billing</a>
                  <div className="border-t border-gray-800 mt-1">
                    <a href="#" className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-800">Sign out</a>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 mt-3 rounded-md shadow-lg p-4">
          <div className="flex items-center mb-4">
            <Search size={16} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-800 text-white w-full px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <nav className="flex flex-col space-y-3">
            <a href="#" className="text-gray-300 hover:text-white transition-colors py-2 px-3 hover:bg-gray-800 rounded-md">Dashboard</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors py-2 px-3 hover:bg-gray-800 rounded-md">Functions</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors py-2 px-3 hover:bg-gray-800 rounded-md">Docs</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors py-2 px-3 hover:bg-gray-800 rounded-md">Pricing</a>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors font-medium mt-2">
              Deploy
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;