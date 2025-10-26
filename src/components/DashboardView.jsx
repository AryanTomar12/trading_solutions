import React from 'react';
import { Clock, Diamond, Briefcase } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const DashboardView = ({ privacyMode, setShowSearchModal }) => {
  // Market overview chart data
  const marketData = [
    { month: 'Jan 25', value: 24000 },
    { month: 'Apr 25', value: 25000 },
    { month: 'Jul 25', value: 23000 },
    { month: 'Oct 25', value: 25795 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e1e1e] border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-white font-semibold">{label}</p>
          <p className="text-blue-400">NIFTY 50: ₹{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Account Verification Banner */}
      <div className="bg-yellow-800/20 text-yellow-300 p-3 text-sm flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info mr-2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4"/>
          <path d="M12 8h.01"/>
        </svg>
        Our team is verifying your account opening application form. This takes up to 24 working hours. We will notify you once it's ready.
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-6">
        {/* Welcome Message */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Hi, Aryan</h1>
        </div>

        {/* Equity and Commodity Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Equity Card */}
          <div className="bg-[#1e1e1e] rounded-xl border border-gray-700 overflow-hidden shadow-lg">
            <div className="bg-gradient-to-r from-[#252525] to-[#1e1e1e] px-6 py-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Equity</h3>
              </div>
              <a href="#" className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors">
                View statement
              </a>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Margins used</span>
                <span className="text-white font-medium">{privacyMode ? '••••' : '₹0.00'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Opening balance</span>
                <span className="text-white font-medium">{privacyMode ? '••••' : '₹0.00'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Margin available</span>
                <span className="text-white font-medium">{privacyMode ? '••••' : '₹0.00'}</span>
              </div>
            </div>
          </div>

          {/* Commodity Card */}
          <div className="bg-[#1e1e1e] rounded-xl border border-gray-700 overflow-hidden shadow-lg">
            <div className="bg-gradient-to-r from-[#252525] to-[#1e1e1e] px-6 py-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                  <Diamond className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Commodity</h3>
              </div>
              <a href="#" className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors">
                View statement
              </a>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Margins used</span>
                <span className="text-white font-medium">{privacyMode ? '••••' : '₹0.00'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Opening balance</span>
                <span className="text-white font-medium">{privacyMode ? '••••' : '₹0.00'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Margin available</span>
                <span className="text-white font-medium">{privacyMode ? '••••' : '₹0.00'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Start Investing Section */}
        <div className="flex items-center justify-center mb-8">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 text-gray-600">
              <Briefcase className="w-full h-full" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">You don't have any stocks in your DEMAT yet.</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Get started with absolutely free equity investments.
            </p>
            <button 
              onClick={() => setShowSearchModal(true)}
              className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold transition-all text-white"
            >
              Start investing
            </button>
          </div>
        </div>

        {/* Market Overview and Positions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Market Overview */}
          <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Market overview</h3>
              <span className="text-sm text-gray-400">(NIFTY 50)</span>
            </div>
            <div className="h-48 bg-[#131722] rounded border border-gray-600 relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketData} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9CA3AF', fontSize: 10 }}
                    interval={0}
                    angle={0}
                    textAnchor="middle"
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9CA3AF', fontSize: 10 }}
                    domain={['dataMin - 500', 'dataMax + 500']}
                    tickFormatter={(value) => `${(value/1000).toFixed(0)}k`}
                    width={30}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 5, fill: '#3B82F6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Positions Section */}
          <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 p-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" strokeWidth="2"/>
                  <path d="M2 17l10 5 10-5" strokeWidth="2"/>
                  <path d="M2 12l10 5 10-5" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">You don't have any positions yet</h3>
              <button 
                onClick={() => setShowSearchModal(true)}
                className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold transition-all text-white"
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
