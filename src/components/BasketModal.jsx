import React, { useState } from 'react';
import { Search, ShoppingCart, ChevronDown, X } from 'lucide-react';

const BasketModal = ({ showBasket, setShowBasket, stockData, setOrders }) => {
  const [basketItems, setBasketItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStocks = stockData.filter(stock => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToBasket = (stock) => {
    const existingItem = basketItems.find(item => item.symbol === stock.symbol);
    if (existingItem) {
      setBasketItems(basketItems.map(item => 
        item.symbol === stock.symbol 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setBasketItems([...basketItems, { ...stock, quantity: 1 }]);
    }
  };

  const removeFromBasket = (symbol) => {
    setBasketItems(basketItems.filter(item => item.symbol !== symbol));
  };

  const updateQuantity = (symbol, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromBasket(symbol);
      return;
    }
    setBasketItems(basketItems.map(item => 
      item.symbol === symbol 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const clearBasket = () => {
    setBasketItems([]);
  };

  const placeAllOrders = () => {
    if (basketItems.length === 0) return;
    
    // Create orders for each basket item
    const newOrders = basketItems.map(item => ({
      id: Date.now() + Math.random(),
      symbol: item.symbol,
      exchange: item.exchange || 'NSE',
      type: 'buy', // Default to buy, could be made configurable
      quantity: item.quantity,
      price: item.price,
      isIntraday: false,
      total: item.quantity * item.price,
      timestamp: new Date().toLocaleString(),
      status: 'Completed',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    // Add orders to the orders list
    setOrders(prevOrders => [...newOrders, ...prevOrders]);
    
    alert(`Successfully placed ${basketItems.length} orders from basket!`);
    clearBasket();
    setShowBasket(false);
  };

  if (!showBasket) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-[#252525] px-6 py-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-bold text-white">Basket</h2>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          <button 
            onClick={() => setShowBasket(false)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Search and Clear */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search & add"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
              />
            </div>
            <button 
              onClick={clearBasket}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Clear basket
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {basketItems.length === 0 && searchQuery === '' ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-gray-600">
                  <ShoppingCart className="w-full h-full" />
                </div>
                <p className="text-gray-400">Start by adding instruments</p>
              </div>
            </div>
          ) : searchQuery !== '' ? (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Search Results</h3>
              {filteredStocks.map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg hover:bg-[#333] transition-colors">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="text-white font-medium">{stock.symbol}</div>
                      <div className="text-gray-400 text-sm">{stock.exchange}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">₹{stock.price}</div>
                      <div className={`text-sm ${stock.color === 'green' ? 'text-green-400' : 'text-red-400'}`}>
                        {stock.change > 0 ? '+' : ''}{stock.change} ({stock.percent > 0 ? '+' : ''}{stock.percent}%)
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => addToBasket(stock)}
                    className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded transition-colors"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Basket Items ({basketItems.length})</h3>
              {basketItems.map((item) => (
                <div key={item.symbol} className="flex items-center justify-between p-4 bg-[#2a2a2a] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="text-white font-medium">{item.symbol}</div>
                      <div className="text-gray-400 text-sm">{item.exchange}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">₹{item.price}</div>
                      <div className={`text-sm ${item.color === 'green' ? 'text-green-400' : 'text-red-400'}`}>
                        {item.change > 0 ? '+' : ''}{item.change} ({item.percent > 0 ? '+' : ''}{item.percent}%)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateQuantity(item.symbol, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-600 hover:bg-gray-500 text-white rounded flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.symbol, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-600 hover:bg-gray-500 text-white rounded flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromBasket(item.symbol)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {basketItems.length > 0 && (
          <div className="bg-[#252525] px-6 py-4 border-t border-gray-700 flex items-center justify-end gap-3">
            <button 
              onClick={() => setShowBasket(false)}
              className="px-6 py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg transition-colors"
            >
              Close
            </button>
            <button 
              onClick={placeAllOrders}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Place all
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasketModal;
