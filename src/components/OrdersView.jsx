import React, { useState } from 'react';

const OrdersView = ({ orders, setShowSearchModal, setActiveTab }) => {
  const [orderSubTab, setOrderSubTab] = useState('orders');

  const renderEmptyState = (icon, title, buttonText, buttonAction) => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-6 text-gray-600">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <button 
          onClick={buttonAction}
          className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold transition-all text-white mt-4"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Order Sub-Tabs */}
      <div className="bg-[#1e1e1e] border-b border-gray-700 px-6 py-3 flex-shrink-0">
        <div className="flex items-center gap-1">
          {['orders', 'gtt', 'baskets', 'sip', 'alerts'].map((tab) => (
            <button
              key={tab}
              onClick={() => setOrderSubTab(tab)}
              className={`px-4 py-2 text-sm font-medium transition-all rounded ${
                orderSubTab === tab
                  ? 'text-orange-500 bg-gray-700'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              {tab === 'orders' && 'Orders'}
              {tab === 'gtt' && 'GTT'}
              {tab === 'baskets' && 'Baskets'}
              {tab === 'sip' && 'SIP'}
              {tab === 'alerts' && 'Alerts'}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-6">
        {orderSubTab === 'orders' && orders.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">Your Orders</h2>
          <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#252525] border-b border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Symbol</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Quantity</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-300">{order.time}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{order.symbol}</span>
                        {order.exchange && (
                          <span className="text-xs px-2 py-0.5 rounded bg-gray-700 text-gray-400">
                            {order.exchange}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-bold ${
                        order.type === 'buy' ? 'text-blue-400' : 'text-orange-400'
                      }`}>
                        {order.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-white">{order.quantity}</td>
                    <td className="px-4 py-3 text-sm text-white">₹{order.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-white">₹{order.total.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 rounded bg-green-600/20 text-green-400">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        ) : orderSubTab === 'orders' ? (
          renderEmptyState(
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
              <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
              <line x1="9" y1="3" x2="9" y2="21" strokeWidth="2"/>
            </svg>,
            "You haven't placed any orders today",
            "Get started",
            () => setShowSearchModal(true)
          )
        ) : orderSubTab === 'gtt' ? (
          renderEmptyState(
            <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
              <g transform="translate(20, 20)">
                {/* Clock circle */}
                <circle cx="40" cy="40" r="35" stroke="#666" strokeWidth="3" fill="none"/>
                <line x1="40" y1="40" x2="40" y2="20" stroke="#666" strokeWidth="3" strokeLinecap="round"/>
                <line x1="40" y1="40" x2="55" y2="40" stroke="#666" strokeWidth="3" strokeLinecap="round"/>
                {/* Arrow indicators */}
                <rect x="70" y="25" width="15" height="3" fill="#FFA500" rx="1.5"/>
                <rect x="70" y="35" width="20" height="3" fill="#4169E1" rx="1.5"/>
                <rect x="70" y="45" width="18" height="3" fill="#FFA500" rx="1.5"/>
                <rect x="70" y="55" width="22" height="3" fill="#4169E1" rx="1.5"/>
              </g>
            </svg>,
            "You have not created any triggers",
            "New GTT",
            () => setShowSearchModal(true)
          )
        ) : orderSubTab === 'baskets' ? (
          renderEmptyState(
            <svg viewBox="0 0 120 100" fill="none" stroke="currentColor" className="w-full h-full">
              <path d="M20,40 L20,80 L80,80 L80,40" strokeWidth="3" fill="none"/>
              <path d="M15,40 L85,40" strokeWidth="3"/>
              <path d="M30,40 L25,25 L35,25" strokeWidth="2.5"/>
              <path d="M50,40 L45,25 L55,25" strokeWidth="2.5"/>
              <path d="M70,40 L65,25 L75,25" strokeWidth="2.5"/>
              <line x1="30" y1="55" x2="70" y2="55" strokeWidth="2.5"/>
              <line x1="30" y1="65" x2="70" y2="65" strokeWidth="2.5"/>
            </svg>,
            "You haven't created any baskets",
            "New basket",
            () => setShowSearchModal(true)
          )
        ) : orderSubTab === 'sip' ? (
          renderEmptyState(
            <svg viewBox="0 0 120 100" fill="none" stroke="currentColor" className="w-full h-full">
              <rect x="20" y="25" width="60" height="50" rx="5" strokeWidth="3"/>
              <line x1="20" y1="40" x2="80" y2="40" strokeWidth="3"/>
              <text x="35" y="60" fontSize="24" fontWeight="bold" fill="currentColor">SIP</text>
              <circle cx="35" cy="35" r="3" fill="currentColor"/>
            </svg>,
            "You haven't created any SIPs",
            "Create new SIP",
            () => setShowSearchModal(true)
          )
        ) : orderSubTab === 'alerts' ? (
          renderEmptyState(
            <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" className="w-full h-full">
              <path d="M50,20 Q50,15 55,15 L65,15 Q70,15 70,20 L70,25" strokeWidth="3"/>
              <path d="M35,25 Q35,20 40,20 L80,20 Q85,20 85,25 L85,70 Q85,75 80,75 L70,85 L50,85 L40,75 Q35,75 35,70 Z" strokeWidth="3" fill="none"/>
              <circle cx="60" cy="50" r="8" strokeWidth="2.5"/>
              <path d="M45,90 Q50,95 60,95 Q70,95 75,90" strokeWidth="3" strokeLinecap="round"/>
            </svg>,
            "You haven't created any alerts",
            "Create new alert",
            () => alert('Alert creation coming soon!')
          )
        ) : null}
      </div>
    </div>
  );
};

export default OrdersView;

