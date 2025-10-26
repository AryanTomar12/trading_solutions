import React, { useState } from 'react';

const BidsView = () => {
  const [bidsTab, setBidsTab] = useState('ipo');
  
  // Sample IPO data
  const [ipos] = useState([
    {
      instrument: 'JAYESH SME',
      company: 'Jayesh Logistics',
      date: '27th - 29th Oct',
      priceRange: '116 - 122',
      minAmount: '244000',
      quantity: '2000 Qty.',
      status: 'UPCOMING'
    },
    {
      instrument: 'LGEINDIA',
      company: 'LGE India',
      date: '21st - 23rd Oct',
      priceRange: '1080 - 1140',
      minAmount: '14820',
      quantity: '13 Qty.',
      status: 'CLOSED'
    },
    {
      instrument: 'ANANTAM',
      company: 'Anantam Infra',
      date: '20th - 22nd Oct',
      priceRange: '125',
      minAmount: '127500',
      quantity: '1020 Qty.',
      status: 'CLOSED'
    },
    {
      instrument: 'RUBICON',
      company: 'Rubicon Real Estate',
      date: '16th - 18th Oct',
      priceRange: '88 - 92',
      minAmount: '276000',
      quantity: '3000 Qty.',
      status: 'CLOSED'
    },
    {
      instrument: 'CRAMC',
      company: 'CRAMC',
      date: '14th - 16th Oct',
      priceRange: '150',
      minAmount: '150000',
      quantity: '1000 Qty.',
      status: 'CLOSED'
    },
    {
      instrument: 'CANHLIFE',
      company: 'Canara Healthcare',
      date: '11th - 13th Oct',
      priceRange: '175 - 185',
      minAmount: '168500',
      quantity: '950 Qty.',
      status: 'CLOSED'
    },
    {
      instrument: 'MIDWESTLTD',
      company: 'Midwest',
      date: '15th - 17th Oct',
      priceRange: '1014 - 1065',
      minAmount: '14910',
      quantity: '14 Qty.',
      status: 'CLOSED'
    }
  ]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Bids Sub-Tabs */}
      <div className="bg-[#1e1e1e] border-b border-gray-700 px-6 py-3 flex-shrink-0">
        <div className="flex items-center gap-1">
          {['ipo', 'govt-securities', 'auctions', 'corporate-actions', 'sse'].map((tab) => (
            <button
              key={tab}
              onClick={() => setBidsTab(tab)}
              className={`px-4 py-2 text-sm font-medium transition-all rounded ${
                bidsTab === tab
                  ? 'text-orange-500 bg-gray-700'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              {tab === 'ipo' && 'IPO'}
              {tab === 'govt-securities' && 'Govt. securities'}
              {tab === 'auctions' && 'Auctions'}
              {tab === 'corporate-actions' && 'Corporate actions'}
              {tab === 'sse' && 'SSE'}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-6">
        {bidsTab === 'ipo' ? (
          <div className="space-y-6">
            {/* IPOs Section */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">IPOs (0)</h2>
              <input
                type="text"
                placeholder="Q Search"
                className="px-3 py-1.5 bg-[#1e1e1e] border border-gray-700 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* IPO Table */}
            <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#252525] border-b border-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Instrument</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Price (₹)</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Min. amount (₹)</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ipos.map((ipo, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-[#252525] transition-colors">
                      <td className="px-4 py-3">
                        <div className="text-white font-medium">{ipo.instrument}</div>
                        <div className="text-gray-400 text-sm">{ipo.company}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-300">{ipo.date}</td>
                      <td className="px-4 py-3 text-gray-300">{ipo.priceRange}</td>
                      <td className="px-4 py-3">
                        <div className="text-gray-300">{ipo.minAmount}</div>
                        <div className="text-gray-500 text-sm">({ipo.quantity})</div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          className={`px-3 py-1 rounded text-xs font-medium ${
                            ipo.status === 'UPCOMING'
                              ? 'bg-green-900/30 text-green-400 border border-green-500/30'
                              : 'bg-gray-700 text-gray-400'
                          }`}
                        >
                          {ipo.status}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* View Upcoming Link */}
            <div className="text-center">
              <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors">
                Don't see an IPO here? View upcoming →
              </a>
            </div>

            {/* Active IPO Applications */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Active IPO applications</h3>
              <div className="flex items-center justify-center h-64 bg-[#1e1e1e] rounded-lg border border-gray-700">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 text-gray-600">
                    <svg viewBox="0 0 120 100" fill="none" stroke="currentColor" className="w-full h-full">
                      <rect x="20" y="20" width="80" height="60" rx="3" strokeWidth="3"/>
                      <line x1="20" y1="35" x2="100" y2="35" strokeWidth="3"/>
                      <text x="35" y="65" fontSize="20" fontWeight="bold" fill="currentColor">IPO</text>
                    </svg>
                  </div>
                  <p className="text-gray-400">There are no active IPO applications.</p>
                </div>
              </div>
            </div>
          </div>
        ) : bidsTab === 'govt-securities' ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 text-gray-600">
                <svg viewBox="0 0 120 100" fill="none" stroke="currentColor" className="w-full h-full">
                  <rect x="20" y="20" width="80" height="60" rx="4" strokeWidth="3"/>
                  <circle cx="45" cy="40" r="8" strokeWidth="2"/>
                  <circle cx="75" cy="40" r="8" strokeWidth="2"/>
                  <line x1="30" y1="60" x2="90" y2="60" strokeWidth="3"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Government Securities</h3>
              <p className="text-gray-400 mb-6">No government securities available at the moment.</p>
            </div>
          </div>
        ) : bidsTab === 'auctions' ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 text-gray-600">
                <svg viewBox="0 0 120 100" fill="none" stroke="currentColor" className="w-full h-full">
                  <circle cx="60" cy="50" r="30" strokeWidth="3"/>
                  <line x1="60" y1="50" x2="75" y2="50" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M40 50 L60 50 L60 70" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Auctions</h3>
              <p className="text-gray-400 mb-6">No auctions available at the moment.</p>
            </div>
          </div>
        ) : bidsTab === 'corporate-actions' ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 text-gray-600">
                <svg viewBox="0 0 120 100" fill="none" stroke="currentColor" className="w-full h-full">
                  <rect x="20" y="30" width="80" height="50" rx="3" strokeWidth="3"/>
                  <line x1="20" y1="45" x2="100" y2="45" strokeWidth="3"/>
                  <circle cx="50" cy="37" r="3" fill="currentColor"/>
                  <text x="60" y="70" fontSize="14" fontWeight="bold" fill="currentColor">CORP</text>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Corporate Actions</h3>
              <p className="text-gray-400 mb-6">No corporate actions available at the moment.</p>
            </div>
          </div>
        ) : bidsTab === 'sse' ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 text-gray-600">
                <svg viewBox="0 0 120 100" fill="none" stroke="currentColor" className="w-full h-full">
                  <rect x="25" y="20" width="70" height="60" rx="3" strokeWidth="3"/>
                  <circle cx="60" cy="50" r="20" strokeWidth="2"/>
                  <text x="45" y="56" fontSize="18" fontWeight="bold" fill="currentColor">SSE</text>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">SSE</h3>
              <p className="text-gray-400 mb-6">No SSE data available at the moment.</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BidsView;

