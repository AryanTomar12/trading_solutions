import React, { useState, useEffect } from 'react';
import { Bell, ShoppingCart } from 'lucide-react';

const Header = ({ activeTab, setActiveTab, showChat, setShowChat, chatMessages, showBasket, setShowBasket, showNotifications, setShowNotifications, showProfile, setShowProfile, privacyMode, setPrivacyMode, selectedChartStock, handleBackToDashboard }) => {
  const [userName, setUserName] = useState('');
  const [userInitials, setUserInitials] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('userName') || 'Guest User';
    setUserName(name);
    // Get initials from name
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    setUserInitials(initials);
  }, []);

  return (
    <header className="bg-gray-800 border-b border-gray-700 flex-shrink-0">
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between w-full">
          {/* Left Section - Market Indices */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">NIFTY 50</span>
              <span className="font-semibold text-white">25795.15</span>
              <span className="text-red-400 text-sm">-96.25 (-0.37%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">SENSEX</span>
              <span className="font-semibold text-white">84211.88</span>
              <span className="text-red-400 text-sm">-344.52 (-0.41%)</span>
            </div>
            <div className="text-orange-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Center Section - Navigation */}
          <nav className="flex items-center gap-6">
            {['Dashboard', 'Orders', 'Holdings', 'Positions', 'Bids', 'Funds'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item.toLowerCase());
                  // Update URL
                  if (item.toLowerCase() === 'dashboard') {
                    window.history.pushState({}, '', '/dashboard');
                  } else {
                    window.history.pushState({}, '', `/${item.toLowerCase()}`);
                  }
                }}
                className={`text-sm font-medium transition-colors ${
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
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowBasket(!showBasket)}
              className="p-2 text-gray-400 hover:text-white transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-400 hover:text-white transition-colors relative"
            >
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 hover:bg-gray-700 rounded-lg px-2 py-1 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center font-semibold text-white text-sm">
                {userInitials}
              </div>
              <span className="text-gray-400 text-sm">{userName.split(' ')[0]}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

