import React from 'react';

const FundsView = ({ privacyMode }) => {
  const fundsData = {
    equity: {
      availableMargin: '0.00',
      usedMargin: '0.00',
      availableCash: '0.00',
      openingBalance: '0.00',
      payin: '0.00',
      payout: '0.00',
      span: '0.00',
      deliveryMargin: '0.00',
      exposure: '0.00',
      optionsPremium: '0.00',
      collateralLiquidFunds: '0.00',
      collateralEquity: '0.00',
      totalCollateral: '0.00'
    },
    commodity: {
      availableMargin: '0.00',
      usedMargin: '0.00',
      availableCash: '0.00',
      openingBalance: '0.00',
      payin: '0.00',
      payout: '0.00',
      span: '0.00',
      deliveryMargin: '0.00',
      exposure: '0.00',
      optionsPremium: '0.00',
      collateralLiquidFunds: '0.00',
      collateralEquity: '0.00',
      totalCollateral: '0.00'
    }
  };

  const renderRow = (label, value, isHighlighted = false) => (
    <div className={`flex justify-between items-center py-3 px-4 rounded-lg transition-colors ${
      isHighlighted ? 'bg-[#252525] hover:bg-[#2a2a2a]' : 'hover:bg-[#252525]'
    }`}>
      <span className={`text-sm ${isHighlighted ? 'text-white font-medium' : 'text-gray-400'}`}>{label}</span>
      <span className={`text-sm font-semibold ${isHighlighted ? 'text-green-400' : 'text-white'}`}>
        {privacyMode ? '....' : `₹${value}`}
      </span>
    </div>
  );

  const renderFundCard = (title, data) => (
    <div className="bg-[#1e1e1e] rounded-xl border border-gray-700 overflow-hidden shadow-lg">
      <div className="bg-gradient-to-r from-[#252525] to-[#1e1e1e] px-6 py-4 border-b border-gray-700 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <div className="flex items-center gap-4">
          <a href="#" className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View statement
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Help
          </a>
        </div>
      </div>
      <div className="p-5 space-y-1">
        {renderRow('Available margin', data.availableMargin, true)}
        {renderRow('Used margin', data.usedMargin)}
        {renderRow('Available cash', data.availableCash, true)}
        {renderRow('Opening balance', data.openingBalance)}
        {renderRow('Payin', data.payin)}
        {renderRow('Payout', data.payout)}
        {renderRow('SPAN', data.span)}
        {renderRow('Delivery margin', data.deliveryMargin)}
        {renderRow('Exposure', data.exposure)}
        {renderRow('Options premium', data.optionsPremium)}
        {renderRow('Collateral (Liquid funds)', data.collateralLiquidFunds)}
        {renderRow('Collateral (Equity)', data.collateralEquity)}
        {renderRow('Total collateral', data.totalCollateral, true)}
      </div>
    </div>
  );

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
        {/* Fund Transfer Section */}
        <div className="mb-8 bg-gradient-to-r from-[#1e1e1e] to-[#252525] rounded-xl border border-gray-700 p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-gray-300 font-medium">Instant, zero-cost fund transfers with</span>
            <img src="/UPI.svg" alt="UPI" className="h-4" />
          </div>
          <div className="flex items-center gap-4">
            <button className="px-8 py-3 rounded-lg bg-green-600 hover:bg-green-700 font-semibold transition-all text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add funds
            </button>
            <button className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold transition-all text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
              Withdraw
            </button>
          </div>
        </div>

        {/* Equity and Commodity Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderFundCard('Equity', fundsData.equity)}
          {renderFundCard('Commodity', fundsData.commodity)}
        </div>
      </div>
    </div>
  );
};

export default FundsView;

