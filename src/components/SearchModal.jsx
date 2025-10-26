import React from 'react';
import { Search } from 'lucide-react';

const SearchModal = ({ showSearchModal, setShowSearchModal, searchQuery, setSearchQuery, filteredStocks, handleStockSelect }) => {
  if (!showSearchModal) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] rounded-lg w-[600px] max-w-full mx-4 max-h-[80vh] flex flex-col">
        {/* Search Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search eg: infy bse, nifty fut, index fund, etc"
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
              autoFocus
            />
            <span className="text-xs text-gray-500 px-2 py-1 rounded bg-gray-700">Ctrl + Shift + F</span>
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {searchQuery === '' ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 text-gray-600">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className="w-full h-full">
                  <circle cx="26" cy="26" r="18" strokeWidth="3"/>
                  <circle cx="26" cy="26" r="12" strokeWidth="2"/>
                  <line x1="38" y1="38" x2="54" y2="54" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Find an instrument</h3>
              <p className="text-gray-400 text-sm">Use the above search bar to find an instrument</p>
            </div>
          ) : filteredStocks.length > 0 ? (
            <div className="space-y-2">
              {filteredStocks.map((stock, idx) => (
                <div
                  key={idx}
                  onClick={() => handleStockSelect(stock)}
                  className="p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">{stock.symbol}</span>
                        {stock.exchange && (
                          <span className="text-xs px-2 py-0.5 rounded bg-gray-600 text-gray-300">
                            {stock.exchange}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-400">Equity</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">₹{stock.price.toFixed(2)}</div>
                      <div className={`text-sm ${stock.color === 'green' ? 'text-green-400' : 'text-red-400'}`}>
                        {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.percent}%)
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-2">No results found</div>
              <p className="text-gray-600 text-sm">Try searching with different keywords</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-700 flex justify-end">
          <button
            onClick={() => {
              setShowSearchModal(false);
              setSearchQuery('');
            }}
            className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;

