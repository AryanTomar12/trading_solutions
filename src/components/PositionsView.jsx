import React, { useState } from 'react';

const PositionsView = ({ setShowSearchModal }) => {
  const [positions] = useState([]); // Empty positions for now

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Content Area */}
      <div className="flex-1 overflow-auto p-6">
        {positions.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">Positions</h2>
            {/* Positions table will go here when we have data */}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 text-gray-600">
                <svg viewBox="0 0 120 100" fill="none" stroke="currentColor" className="w-full h-full">
                  <circle cx="60" cy="50" r="20" strokeWidth="3"/>
                  <path d="M60 40 L60 60" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M50 50 L70 50" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="40" y1="70" x2="80" y2="70" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="35" y1="80" x2="85" y2="80" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">You don't have any positions yet</h3>
              <button 
                onClick={() => setShowSearchModal(true)}
                className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold transition-all text-white mt-4"
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

export default PositionsView;

