import React, { useState, useEffect, useRef } from 'react';
import { User, Edit3, Shield, Terminal, Coins, HelpCircle, Users, Keyboard, BookOpen, LogOut } from 'lucide-react';

const ProfileDropdown = ({ showProfile, setShowProfile, privacyMode, setPrivacyMode, onLogout }) => {
  const dropdownRef = useRef(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // Get user info from localStorage
  useEffect(() => {
    const name = localStorage.getItem('userName') || 'Guest User';
    const email = localStorage.getItem('userEmail') || 'guest@example.com';
    setUserName(name);
    setUserEmail(email);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    if (showProfile) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfile, setShowProfile]);

  if (!showProfile) return null;

  return (
    <div ref={dropdownRef} className="fixed top-16 right-6 w-80 bg-[#1e1e1e] rounded-lg border border-gray-700 shadow-2xl z-[9999]">
      {/* User Info */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-semibold text-white text-lg">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white">{userName}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">{userEmail}</span>
              <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                <Edit3 className="w-3 h-3 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Mode */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-white">Privacy mode</span>
          </div>
          <button
            onClick={() => setPrivacyMode(!privacyMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              privacyMode ? 'bg-blue-600' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                privacyMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#252525] transition-colors">
          <div className="w-8 h-8 bg-[#2a2a2a] rounded-full flex items-center justify-center">
            <Terminal className="w-4 h-4 text-gray-400" />
          </div>
          <span className="text-sm font-medium text-white">Console</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#252525] transition-colors">
          <div className="w-8 h-8 bg-[#2a2a2a] rounded-full flex items-center justify-center">
            <Coins className="w-4 h-4 text-gray-400" />
          </div>
          <span className="text-sm font-medium text-white">Coin</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#252525] transition-colors">
          <div className="w-8 h-8 bg-[#2a2a2a] rounded-full flex items-center justify-center">
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>
          <span className="text-sm font-medium text-white">Support</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#252525] transition-colors">
          <div className="w-8 h-8 bg-[#2a2a2a] rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-gray-400" />
          </div>
          <span className="text-sm font-medium text-white">Invite friends</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#252525] transition-colors">
          <div className="w-8 h-8 bg-[#2a2a2a] rounded-full flex items-center justify-center">
            <Keyboard className="w-4 h-4 text-gray-400" />
          </div>
          <span className="text-sm font-medium text-white">Keyboard shortcuts</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#252525] transition-colors">
          <div className="w-8 h-8 bg-[#2a2a2a] rounded-full flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-gray-400" />
          </div>
          <span className="text-sm font-medium text-white">User manual</span>
        </button>

        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#252525] transition-colors"
        >
          <div className="w-8 h-8 bg-[#2a2a2a] rounded-full flex items-center justify-center">
            <LogOut className="w-4 h-4 text-red-400" />
          </div>
          <span className="text-sm font-medium text-white">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
