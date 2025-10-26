import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, BarChart3, MoreHorizontal, Plus, Search, Filter, Pin, FileText, TrendingUp, Bell, ShoppingBasket, Lightbulb, Zap, Trash2 } from 'lucide-react';

const Watchlist = ({ 
  stockData, 
  hoveredStock, 
  handleStockHover, 
  handleStockLeave, 
  handleStockClick, 
  handleBuySellClick, 
  privacyMode,
  watchlistGroups,
  currentWatchlist,
  setCurrentWatchlistId,
  onCreateWatchlist
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [changeType, setChangeType] = useState('close');
  const [showOptions, setShowOptions] = useState({
    priceChange: true,
    priceDirection: true,
    notes: true,
    priceChangePercent: true,
    holdings: true,
    groupColors: true
  });
  const [sortBy, setSortBy] = useState('ltp');
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [showWatchlistDropdown, setShowWatchlistDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(null); // Track which stock's dropdown is open
  const [dropdownPosition, setDropdownPosition] = useState('bottom'); // 'bottom' or 'top'
  const [dropdownCoords, setDropdownCoords] = useState({ top: 0, right: 0 });
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMoreDropdown(null);
      }
    };

    if (showMoreDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMoreDropdown]);
  
  const stocksPerPage = 6;
  const totalPages = Math.ceil(stockData.length / stocksPerPage);
  
  const startIndex = (currentPage - 1) * stocksPerPage;
  const endIndex = startIndex + stocksPerPage;
  const currentStocks = stockData.slice(startIndex, endIndex);

  const colors = [
    { name: 'gray', class: 'bg-gray-500' },
    { name: 'blue', class: 'bg-blue-500' },
    { name: 'sky', class: 'bg-sky-400' },
    { name: 'purple', class: 'bg-purple-500' },
    { name: 'green', class: 'bg-green-500' },
    { name: 'yellow', class: 'bg-yellow-400' },
    { name: 'orange', class: 'bg-orange-500' },
    { name: 'red', class: 'bg-red-500' }
  ];

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      onCreateWatchlist(newGroupName, selectedColor);
      setShowNewGroupModal(false);
      setNewGroupName('');
      setSelectedColor('blue');
    }
  };

  const getColorClass = (colorName) => {
    const colorMap = {
      gray: 'bg-gray-500',
      blue: 'bg-blue-500',
      sky: 'bg-sky-400',
      purple: 'bg-purple-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-400',
      orange: 'bg-orange-500',
      red: 'bg-red-500'
    };
    return colorMap[colorName] || 'bg-blue-500';
  };
  return (
    <div className="hidden lg:block w-80 xl:w-96 border-r border-gray-700 bg-gray-800 flex-shrink-0 overflow-y-auto">
      <div className="bg-gray-800 p-3 xl:p-4">
        <div className="flex items-center justify-between mb-3 xl:mb-4">
          <div className="relative flex-1">
            <button
              onClick={() => setShowWatchlistDropdown(!showWatchlistDropdown)}
              className="flex items-center gap-2 text-sm xl:text-lg font-semibold text-white hover:text-blue-400 transition-colors"
            >
              <div className={`w-2 h-2 rounded-full ${getColorClass(currentWatchlist.color)}`}></div>
              <span className="hidden xl:inline">{currentWatchlist.name}</span>
              <span className="xl:hidden">{currentWatchlist.name}</span>
              <span className="hidden lg:inline xl:hidden">({stockData.length})</span>
              <span className="hidden xl:inline">({stockData.length} / 250)</span>
              <ChevronRight className={`w-4 h-4 transition-transform ${showWatchlistDropdown ? 'rotate-90' : ''}`} />
            </button>

            {/* Watchlist Dropdown */}
            {showWatchlistDropdown && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto">
                {watchlistGroups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => {
                      setCurrentWatchlistId(group.id);
                      setShowWatchlistDropdown(false);
                      setCurrentPage(1);
                    }}
                    className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-700 transition-colors ${
                      currentWatchlist.id === group.id ? 'bg-gray-700' : ''
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${getColorClass(group.color)}`}></div>
                    <div className="flex-1">
                      <div className="font-medium text-white">{group.name}</div>
                      <div className="text-xs text-gray-400">{group.stocks.length} stocks</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button 
            onClick={() => setShowNewGroupModal(true)}
            className="text-xs xl:text-sm text-blue-400 hover:text-blue-300 transition-colors ml-2 whitespace-nowrap"
          >
            + New
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-3 xl:mb-4 relative">
          <div className="relative">
            <Search className="absolute left-2 xl:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 xl:w-4 xl:h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 xl:pl-10 pr-14 xl:pr-20 py-1.5 xl:py-2 bg-[#2a2a2a] border border-gray-600 rounded text-white text-sm xl:text-base placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button className="absolute right-10 xl:right-12 top-1/2 transform -translate-y-1/2 hidden xl:block px-2 py-1 text-xs text-gray-400 bg-gray-700 rounded">
              Ctrl + K
            </button>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white"
            >
              <Filter className="w-3 h-3 xl:w-4 xl:h-4" />
            </button>
          </div>

          {/* Filter Options - Absolute Positioned Overlay */}
          {showFilters && (
            <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-[#1e1e1e] border border-gray-700 rounded shadow-2xl z-50">
              {/* Change Type */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm font-medium text-white">CHANGE TYPE</h4>
                  <div className="w-4 h-4 rounded-full bg-gray-600 flex items-center justify-center">
                    <span className="text-xs text-gray-300">i</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="changeType"
                      value="close"
                      checked={changeType === 'close'}
                      onChange={(e) => setChangeType(e.target.value)}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-gray-300">Close price</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="changeType"
                      value="open"
                      checked={changeType === 'open'}
                      onChange={(e) => setChangeType(e.target.value)}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-gray-300">Open price</span>
                  </label>
                </div>
              </div>

              {/* Show Options */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-white mb-2">SHOW</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(showOptions).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setShowOptions(prev => ({ ...prev, [key]: e.target.checked }))}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-300 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h4 className="text-sm font-medium text-white mb-2">SORT BY</h4>
                <div className="flex gap-2 mb-2">
                  {['%', 'LTP', 'A-Z', 'EXCH'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option.toLowerCase())}
                      className={`px-3 py-1 text-sm rounded ${
                        sortBy === option.toLowerCase()
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400">Sort items within a group.</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          {currentStocks.map((stock, idx) => (
            <div
              key={idx}
              data-stock={stock.symbol}
              className="relative p-2 xl:p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-300 cursor-pointer group overflow-visible"
              onMouseEnter={() => handleStockHover(stock)}
              onMouseLeave={() => {
                // Don't hide on mouse leave if dropdown is open
                if (showMoreDropdown !== stock.symbol) {
                  handleStockLeave();
                }
              }}
              onClick={() => {
                setShowMoreDropdown(null);
                handleStockClick(stock);
              }}
            >
              {/* Hover Overlay */}
              {hoveredStock?.symbol === stock.symbol && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg animate-pulse"></div>
              )}
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1 xl:gap-2">
                    <span className="font-semibold text-white text-sm xl:text-base">{stock.symbol}</span>
                    {stock.exchange && (
                      <span className="text-xs px-1 xl:px-2 py-0.5 rounded bg-gray-600 text-gray-300">
                        {stock.exchange}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 xl:gap-2">
                    {(hoveredStock?.symbol === stock.symbol || showMoreDropdown === stock.symbol) ? (
                      <div className="flex items-center gap-1 xl:gap-2 animate-fadeIn">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowMoreDropdown(null);
                            handleBuySellClick(stock, 'buy');
                          }}
                          className="px-2 xl:px-3 py-1 xl:py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-xs font-semibold text-white transition-all hover:scale-105"
                        >
                          Buy
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowMoreDropdown(null);
                            handleBuySellClick(stock, 'sell');
                          }}
                          className="px-2 xl:px-3 py-1 xl:py-1.5 bg-red-600 hover:bg-red-700 rounded text-xs font-semibold text-white transition-all hover:scale-105"
                        >
                          Sell
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowMoreDropdown(null);
                            handleStockClick(stock);
                          }}
                          className="p-1 xl:p-1.5 bg-gray-600 hover:bg-gray-500 rounded flex items-center justify-center transition-all hover:scale-105"
                        >
                          <BarChart3 className="w-3 h-3 xl:w-4 xl:h-4" />
                        </button>
                        <div className="relative" ref={showMoreDropdown === stock.symbol ? dropdownRef : null}>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const rect = e.currentTarget.getBoundingClientRect();
                              const shouldShowTop = idx >= 3;
                              
                              setDropdownCoords({
                                top: shouldShowTop ? rect.top - 5 : rect.bottom + 5,
                                right: window.innerWidth - rect.right
                              });
                              setDropdownPosition(shouldShowTop ? 'top' : 'bottom');
                              setShowMoreDropdown(showMoreDropdown === stock.symbol ? null : stock.symbol);
                            }}
                            className="p-1.5 bg-gray-600 hover:bg-gray-500 rounded flex items-center justify-center transition-all hover:scale-105"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                          
                          {/* More Options Dropdown */}
                          {showMoreDropdown === stock.symbol && (
                            <div 
                              className="fixed w-56 bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-2xl max-h-[500px] overflow-y-auto"
                              style={{ 
                                backgroundColor: '#1e1e1e',
                                zIndex: 9999,
                                top: dropdownPosition === 'top' ? 'auto' : `${dropdownCoords.top}px`,
                                bottom: dropdownPosition === 'top' ? `${window.innerHeight - dropdownCoords.top}px` : 'auto',
                                right: `${dropdownCoords.right}px`
                              }}
                              onClick={(e) => e.stopPropagation()}
                              onMouseEnter={() => handleStockHover(stock)}
                              onMouseLeave={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Pin stock:', stock.symbol);
                                  setShowMoreDropdown(null);
                                }}
                                className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-700 transition-colors text-white text-sm rounded-t-lg"
                              >
                                <Pin className="w-4 h-4 text-gray-400" />
                                Pin (1, 2)
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Add notes for:', stock.symbol);
                                  setShowMoreDropdown(null);
                                }}
                                className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-700 transition-colors text-white text-sm"
                              >
                                <FileText className="w-4 h-4 text-gray-400" />
                                Notes
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStockClick(stock);
                                  setShowMoreDropdown(null);
                                }}
                                className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-700 transition-colors text-white text-sm"
                              >
                                <BarChart3 className="w-4 h-4 text-gray-400" />
                                Chart
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`https://zerodha.com/markets/option-chain/${stock.symbol}`, '_blank');
                                  setShowMoreDropdown(null);
                                }}
                                className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-700 transition-colors text-white text-sm"
                              >
                                <TrendingUp className="w-4 h-4 text-gray-400" />
                                Option chain
                              </button>
                              
                              <div className="border-t border-gray-700 my-1"></div>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Create GTT for:', stock.symbol);
                                  setShowMoreDropdown(null);
                                }}
                                className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-700 transition-colors text-white text-sm"
                              >
                                <Zap className="w-4 h-4 text-blue-400" />
                                <span>Create GTT <span className="text-xs text-gray-400">/ GTC</span></span>
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Create alert for:', stock.symbol);
                                  setShowMoreDropdown(null);
                                }}
                                className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-700 transition-colors text-white text-sm"
                              >
                                <Bell className="w-4 h-4 text-yellow-400" />
                                <span>Create alert <span className="text-xs text-gray-400">/ ATO</span></span>
                              </button>
                              
                              <div className="border-t border-gray-700 my-1"></div>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Market depth for:', stock.symbol);
                                  setShowMoreDropdown(null);
                                }}
                                className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-700 transition-colors text-white text-sm"
                              >
                                <TrendingUp className="w-4 h-4 text-gray-400" />
                                Market depth
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Add to basket:', stock.symbol);
                                  setShowMoreDropdown(null);
                                }}
                                className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-700 transition-colors text-white text-sm"
                              >
                                <ShoppingBasket className="w-4 h-4 text-gray-400" />
                                Add to basket
                              </button>
                              
                              <div className="border-t border-gray-700 my-1"></div>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`https://kite.zerodha.com/static/build/docs/kite-features.html`, '_blank');
                                  setShowMoreDropdown(null);
                                }}
                                className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-700 transition-colors text-white text-sm"
                              >
                                <Lightbulb className="w-4 h-4 text-yellow-400" />
                                Fundamentals
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`https://kite.zerodha.com/static/build/docs/kite-features.html`, '_blank');
                                  setShowMoreDropdown(null);
                                }}
                                className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-700 transition-colors text-white text-sm"
                              >
                                <Zap className="w-4 h-4 text-purple-400" />
                                Technicals
                              </button>
                              
                              <div className="border-t border-gray-700 my-1"></div>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Delete stock:', stock.symbol);
                                  setShowMoreDropdown(null);
                                }}
                                className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-red-900/20 transition-colors text-red-400 text-sm rounded-b-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={stock.color === 'green' ? 'text-green-400' : 'text-red-400'}>
                    {privacyMode ? '....' : `${stock.change > 0 ? '+' : ''}${stock.change} (${stock.percent}%)`}
                  </span>
                  <span className="font-semibold text-white">{privacyMode ? '....' : stock.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
          <button className="w-8 h-8 rounded text-gray-400 hover:text-white hover:bg-gray-700 transition-colors flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* New Group Modal */}
      {showNewGroupModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 p-6 w-96 shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-4">Create watchlist</h3>
            
            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Name</label>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Enter watchlist name"
                className="w-full px-3 py-2 bg-[#2a2a2a] border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                autoFocus
              />
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">Color</label>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full ${color.class} transition-all ${
                      selectedColor === color.name
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1e1e1e] scale-110'
                        : 'hover:scale-105'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowNewGroupModal(false);
                  setNewGroupName('');
                  setSelectedColor('blue');
                }}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                disabled={!newGroupName.trim()}
                className={`px-6 py-2 rounded font-medium transition-all ${
                  newGroupName.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;

