import React, { useState, useEffect } from 'react';
import { Bell, ShoppingCart, Menu, X } from 'lucide-react';

const Header = ({ activeTab, setActiveTab, showChat, setShowChat, chatMessages, showBasket, setShowBasket, showNotifications, setShowNotifications, showProfile, setShowProfile, privacyMode, setPrivacyMode, selectedChartStock, handleBackToDashboard }) => {
  const [userName, setUserName] = useState('');
  const [userInitials, setUserInitials] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem('userName') || 'Guest User';
    setUserName(name);
    // Get initials from name
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    setUserInitials(initials);
  }, []);

  const navItems = ['Dashboard', 'Orders', 'Holdings', 'Positions', 'Bids', 'Funds'];

  const handleNavClick = (item) => {
    setActiveTab(item.toLowerCase());
    setIsMobileMenuOpen(false);
    // Update URL
    if (item.toLowerCase() === 'dashboard') {
      window.history.pushState({}, '', '/dashboard');
    } else {
      window.history.pushState({}, '', `/${item.toLowerCase()}`);
    }
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 flex-shrink-0">
      <div className="w-full px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between w-full">
          {/* Left Section - Market Indices */}
          <div className="hidden md:flex items-center gap-4 xl:gap-8">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs xl:text-sm">NIFTY 50</span>
              <span className="font-semibold text-white text-sm xl:text-base">25795.15</span>
              <span className="text-red-400 text-xs xl:text-sm">-96.25 (-0.37%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs xl:text-sm">SENSEX</span>
              <span className="font-semibold text-white text-sm xl:text-base">84211.88</span>
              <span className="text-red-400 text-xs xl:text-sm">-344.52 (-0.41%)</span>
            </div>
            <div className="text-orange-500 hidden xl:block">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Mobile Market Indices */}
          <div className="flex md:hidden items-center gap-2 flex-1 overflow-x-auto">
            <div className="flex items-center gap-1 whitespace-nowrap">
              <span className="text-gray-400 text-xs">NIFTY</span>
              <span className="font-semibold text-white text-xs">25795</span>
              <span className="text-red-400 text-xs">-96</span>
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <span className="text-gray-400 text-xs">SENSEX</span>
              <span className="font-semibold text-white text-xs">84211</span>
              <span className="text-red-400 text-xs">-344</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors ml-2"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Center Section - Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-4 xl:gap-6">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`text-xs xl:text-sm font-medium transition-colors ${
                  activeTab === item.toLowerCase()
                    ? 'text-orange-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Right Section - User Controls */}
          <div className="flex items-center gap-2 xl:gap-4">
            <button 
              onClick={() => setShowBasket(!showBasket)}
              className="p-2 text-gray-400 hover:text-white transition-colors relative"
            >
              <ShoppingCart className="w-4 h-4 xl:w-5 xl:h-5" />
            </button>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-400 hover:text-white transition-colors relative hidden sm:block"
            >
              <Bell className="w-4 h-4 xl:w-5 xl:h-5" />
            </button>
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-1 xl:gap-2 hover:bg-gray-700 rounded-lg px-2 py-1 transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 xl:w-8 xl:h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center font-semibold text-white text-xs xl:text-sm">
                {userInitials}
              </div>
              <span className="text-gray-400 text-xs xl:text-sm hidden lg:block">{userName.split(' ')[0]}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
            <nav className="grid grid-cols-2 gap-2 mt-4">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.toLowerCase()
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

