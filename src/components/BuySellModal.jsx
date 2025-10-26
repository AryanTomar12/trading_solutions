import React from 'react';
import { X, Plus, Minus } from 'lucide-react';

const BuySellModal = ({ 
  showBuySellModal, 
  selectedStock, 
  orderType, 
  quantity, 
  setQuantity, 
  price, 
  setPrice, 
  isIntraday, 
  setIsIntraday,
  handleOrderSubmit,
  setShowBuySellModal
}) => {
  if (!showBuySellModal || !selectedStock) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] rounded-lg p-6 w-96 max-w-full mx-4 animate-slideUp border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{selectedStock.symbol}</h3>
          <button
            onClick={() => setShowBuySellModal(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Exchange Selection */}
        <div className="mb-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="exchange" defaultChecked className="text-blue-600" />
              <span className="text-sm text-white">BSE ₹{selectedStock.price}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="exchange" className="text-blue-600" />
              <span className="text-sm text-white">NSE ₹{(selectedStock.price + 0.05).toFixed(2)}</span>
            </label>
          </div>
        </div>

        {/* Order Type Tabs */}
        <div className="flex gap-2 mb-4">
          {['Quick', 'Regular', 'Iceberg'].map((type) => (
            <button
              key={type}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                type === 'Quick' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Quantity Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">Qty.</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center text-white transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="flex-1 px-3 py-2 border border-gray-600 rounded text-center bg-[#2a2a2a] text-white focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center text-white transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Price Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
          <div className="relative">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-600 rounded pr-8 bg-[#2a2a2a] text-white focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => setPrice(0)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Intraday Checkbox */}
        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isIntraday}
              onChange={(e) => setIsIntraday(e.target.checked)}
              className="text-blue-600"
            />
            <span className="text-sm text-white">Intraday</span>
          </label>
        </div>

        {/* Order Summary */}
        <div className="mb-4 p-3 bg-[#2a2a2a] rounded border border-gray-700">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Req. ₹{(quantity * price).toFixed(2)}</span>
            <span className="text-gray-400">+₹1.04</span>
            <span className="text-gray-400">Avail. ₹0.00</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleOrderSubmit}
            className={`flex-1 py-2 px-4 rounded font-semibold text-white transition-all ${
              orderType === 'buy' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {orderType.toUpperCase()}
          </button>
          <button
            onClick={() => setShowBuySellModal(false)}
            className="px-4 py-2 border border-gray-600 rounded text-gray-300 hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuySellModal;

