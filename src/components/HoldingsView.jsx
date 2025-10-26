import React, { useState } from 'react';

const HoldingsView = ({ setShowSearchModal }) => {
  const [holdingsTab, setHoldingsTab] = useState('all');
  const [holdings] = useState([]); // Empty holdings for now

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Holdings Sub-Tabs */}
      <div className="bg-[#1e1e1e] border-b border-gray-700 px-6 py-3 flex-shrink-0">
        <div className="flex items-center gap-1">
          {['all', 'equity', 'mutual-funds'].map((tab) => (
            <button
              key={tab}
              onClick={() => setHoldingsTab(tab)}
              className={`px-4 py-2 text-sm font-medium transition-all rounded ${
                holdingsTab === tab
                  ? 'text-orange-500 bg-gray-700'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              {tab === 'all' && 'All'}
              {tab === 'equity' && 'Equity'}
              {tab === 'mutual-funds' && 'Mutual funds'}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Holdings</h2>
        
        {holdingsTab === 'mutual-funds' ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 text-gray-600">
                <svg viewBox="0 0 120 100" fill="none" stroke="currentColor" className="w-full h-full">
                  <circle cx="60" cy="50" r="35" strokeWidth="3"/>
                  <path d="M60 30 L60 50 L75 65" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Start investing in commission-free direct mutual funds.</h3>
              <button 
                onClick={() => alert('Opening Coin...')}
                className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold transition-all text-white mt-4"
              >
                Open Coin
              </button>
            </div>
          </div>
        ) : holdings.length > 0 ? (
          <div className="space-y-4">
            {/* Holdings table will go here when we have data */}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 text-gray-600">
                <svg viewBox="0 0 120 100" fill="none" stroke="currentColor" className="w-full h-full">
                  <rect x="20" y="20" width="80" height="60" rx="4" strokeWidth="3"/>
                  <line x1="20" y1="35" x2="100" y2="35" strokeWidth="3"/>
                  <rect x="35" y="45" width="20" height="25" strokeWidth="2.5"/>
                  <rect x="65" y="50" width="20" height="20" strokeWidth="2.5"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">You don't have any stocks in your DEMAT yet.</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Get started with absolutely free equity investments.
              </p>
              <button 
                onClick={() => setShowSearchModal(true)}
                className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold transition-all text-white"
              >
                Get started
              </button>
              <div className="mt-6">
                <button className="text-blue-500 hover:text-blue-400 transition-all flex items-center gap-2 mx-auto">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Analytics
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HoldingsView;

