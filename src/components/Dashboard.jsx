import React, { useState, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';
import Header from './Header';
import Watchlist from './Watchlist';
import DashboardView from './DashboardView';
import OrdersView from './OrdersView';
import HoldingsView from './HoldingsView';
import PositionsView from './PositionsView';
import BidsView from './BidsView';
import FundsView from './FundsView';
import SearchModal from './SearchModal';
import BuySellModal from './BuySellModal';
import ChatModal from './ChatModal';
import BasketModal from './BasketModal';
import NotificationModal from './NotificationModal';
import ProfileDropdown from './ProfileDropdown';
import RealChartView from './RealChartView';

const TradingDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // URL routing effect
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/dashboard' || path === '/') {
        setActiveTab('dashboard');
        setSelectedChartStock(null);
      } else if (path.startsWith('/chart/')) {
        const symbol = path.split('/')[2];
        const stock = stockData.find(s => s.symbol.toLowerCase() === symbol.toLowerCase());
        if (stock) {
          setSelectedChartStock(stock);
          setActiveTab('dashboard');
        }
      } else if (['/orders', '/holdings', '/positions', '/bids', '/funds'].includes(path)) {
        setActiveTab(path.substring(1));
        setSelectedChartStock(null);
      }
    };

    // Set initial state based on URL
    handlePopState();
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  const [showBuySellModal, setShowBuySellModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedChartStock, setSelectedChartStock] = useState(null);
  const [chartTimeframe, setChartTimeframe] = useState('1d');
  const [chartZoom, setChartZoom] = useState(1);
  const [viewMode, setViewMode] = useState('chart');
  const [selectedExpiry, setSelectedExpiry] = useState('28 Oct (3 days)');
  const [orderType, setOrderType] = useState('buy');
  const [orders, setOrders] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [isIntraday, setIsIntraday] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showBasket, setShowBasket] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [hoveredStock, setHoveredStock] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Market Bot', message: 'Welcome to Trading Solutions! How can I help you today?', time: '10:30 AM' },
    { id: 2, sender: 'You', message: 'What do you think about HDFCBANK?', time: '10:32 AM' },
    { id: 3, sender: 'Market Bot', message: 'HDFCBANK is currently showing bearish signals. Consider waiting for a better entry point.', time: '10:33 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  const [watchlistGroups, setWatchlistGroups] = useState([
    {
      id: 1,
      name: 'Watchlist 1',
      color: 'blue',
      stocks: [
        { symbol: 'HDFCBANK', exchange: 'BSE', change: -14.25, percent: -1.41, price: 994.70, color: 'red', ltp: 994.70, ohlc: { open: 998.50, high: 1011.90, low: 991.00, close: 994.70 }, volume: '346.01K' },
        { symbol: 'INFY', exchange: 'EVENT', change: -3.10, percent: -0.20, price: 1525.40, color: 'red', ltp: 1525.40, ohlc: { open: 1528.50, high: 1530.20, low: 1520.10, close: 1525.40 }, volume: '234.56K' },
        { symbol: 'TCS', exchange: 'BSE', change: -12.20, percent: -0.40, price: 3062.45, color: 'red', ltp: 3062.45, ohlc: { open: 3074.65, high: 3080.20, low: 3055.30, close: 3062.45 }, volume: '189.23K' },
        { symbol: 'ONGC', exchange: '', change: 2.65, percent: 1.05, price: 254.96, color: 'green', ltp: 254.96, ohlc: { open: 252.31, high: 255.80, low: 251.20, close: 254.96 }, volume: '412.78K' },
        { symbol: 'HINDUNILVR', exchange: 'BSE', change: -83.35, percent: -3.20, price: 2517.40, color: 'red', ltp: 2517.40, ohlc: { open: 2600.75, high: 2610.30, low: 2510.20, close: 2517.40 }, volume: '156.90K' },
        { symbol: 'GOLDBEES', exchange: '', change: -1.28, percent: -1.26, price: 100.42, color: 'red', ltp: 100.42, ohlc: { open: 101.70, high: 102.10, low: 100.20, close: 100.42 }, volume: '89.45K' },
      ]
    }
  ]);
  const [currentWatchlistId, setCurrentWatchlistId] = useState(1);

  // Get mock stocks for new watchlists
  const generateMockStocks = () => {
    const mockStockPool = [
      { symbol: 'RELIANCE', exchange: 'NSE', change: 15.30, percent: 0.65, price: 2365.80, color: 'green', ltp: 2365.80, ohlc: { open: 2350.50, high: 2370.20, low: 2345.10, close: 2365.80 }, volume: '523.45K' },
      { symbol: 'WIPRO', exchange: 'NSE', change: -8.45, percent: -1.85, price: 447.55, color: 'red', ltp: 447.55, ohlc: { open: 456.00, high: 458.20, low: 445.30, close: 447.55 }, volume: '298.67K' },
      { symbol: 'TATAMOTORS', exchange: 'NSE', change: 12.75, percent: 1.32, price: 978.90, color: 'green', ltp: 978.90, ohlc: { open: 966.15, high: 982.40, low: 964.50, close: 978.90 }, volume: '687.12K' },
      { symbol: 'ICICIBANK', exchange: 'NSE', change: -5.60, percent: -0.58, price: 954.40, color: 'red', ltp: 954.40, ohlc: { open: 960.00, high: 963.80, low: 952.10, close: 954.40 }, volume: '412.89K' },
      { symbol: 'SBIN', exchange: 'NSE', change: 8.90, percent: 1.45, price: 622.35, color: 'green', ltp: 622.35, ohlc: { open: 613.45, high: 625.70, low: 611.20, close: 622.35 }, volume: '756.34K' },
      { symbol: 'AXISBANK', exchange: 'NSE', change: -11.25, percent: -1.12, price: 992.80, color: 'red', ltp: 992.80, ohlc: { open: 1004.05, high: 1008.90, low: 990.50, close: 992.80 }, volume: '345.78K' },
      { symbol: 'BHARTIARTL', exchange: 'NSE', change: 6.45, percent: 0.78, price: 833.70, color: 'green', ltp: 833.70, ohlc: { open: 827.25, high: 836.50, low: 825.80, close: 833.70 }, volume: '423.56K' },
      { symbol: 'ITC', exchange: 'NSE', change: -2.35, percent: -0.52, price: 447.65, color: 'red', ltp: 447.65, ohlc: { open: 450.00, high: 451.20, low: 446.30, close: 447.65 }, volume: '534.23K' },
      { symbol: 'ASIANPAINT', exchange: 'NSE', change: 18.50, percent: 0.62, price: 3008.25, color: 'green', ltp: 3008.25, ohlc: { open: 2989.75, high: 3015.60, low: 2985.40, close: 3008.25 }, volume: '178.45K' },
      { symbol: 'MARUTI', exchange: 'NSE', change: -45.80, percent: -0.45, price: 10124.30, color: 'red', ltp: 10124.30, ohlc: { open: 10170.10, high: 10185.40, low: 10110.50, close: 10124.30 }, volume: '89.67K' },
      { symbol: 'SUNPHARMA', exchange: 'NSE', change: 9.25, percent: 0.68, price: 1368.90, color: 'green', ltp: 1368.90, ohlc: { open: 1359.65, high: 1372.40, low: 1356.80, close: 1368.90 }, volume: '267.89K' },
      { symbol: 'TECHM', exchange: 'NSE', change: -7.30, percent: -0.56, price: 1293.45, color: 'red', ltp: 1293.45, ohlc: { open: 1300.75, high: 1305.20, low: 1290.10, close: 1293.45 }, volume: '198.34K' },
    ];

    // Randomly select 4-6 stocks
    const count = Math.floor(Math.random() * 3) + 4; // 4 to 6 stocks
    const shuffled = [...mockStockPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const currentWatchlist = watchlistGroups.find(g => g.id === currentWatchlistId) || watchlistGroups[0];
  const stockData = currentWatchlist.stocks;

  const handleCreateWatchlist = (name, color) => {
    const newWatchlist = {
      id: Date.now(),
      name,
      color,
      stocks: generateMockStocks()
    };
    setWatchlistGroups(prev => [...prev, newWatchlist]);
    setCurrentWatchlistId(newWatchlist.id);
  };

  const handleBuySellClick = (stock, type) => {
    setSelectedStock(stock);
    setOrderType(type);
    setPrice(stock.price);
    setShowBuySellModal(true);
  };

  const handleOrderSubmit = () => {
    const order = {
      id: Date.now(),
      symbol: selectedStock.symbol,
      exchange: selectedStock.exchange || 'NSE',
      type: orderType,
      quantity: quantity,
      price: price,
      isIntraday: isIntraday,
      total: quantity * price,
      timestamp: new Date().toLocaleString(),
      status: 'Completed',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setOrders([order, ...orders]);
    alert(`${orderType.toUpperCase()} order placed for ${quantity} shares of ${selectedStock.symbol} at ₹${price}`);
    setShowBuySellModal(false);
    setSelectedStock(null);
    setQuantity(1);
    setPrice(0);
  };

  const filteredStocks = stockData.filter(stock => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStockSelect = (stock) => {
    setShowSearchModal(false);
    setSearchQuery('');
    handleBuySellClick(stock, 'buy');
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: 'You',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
      
      setTimeout(() => {
        const botResponse = {
          id: chatMessages.length + 2,
          sender: 'Market Bot',
          message: 'I understand your query. Let me analyze the market data for you.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleStockHover = (stock) => {
    setHoveredStock(stock);
  };

  const handleStockLeave = () => {
    setHoveredStock(null);
  };

  const handleStockClick = (stock) => {
    setSelectedChartStock(stock);
    setChartZoom(1);
    // Update URL
    window.history.pushState({}, '', `/chart/${stock.symbol.toLowerCase()}`);
  };

  const handleBackToDashboard = () => {
    setSelectedChartStock(null);
    setActiveTab('dashboard');
    // Update URL
    window.history.pushState({}, '', '/dashboard');
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col overflow-hidden">
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showChat={showChat}
        setShowChat={setShowChat}
        chatMessages={chatMessages}
        showBasket={showBasket}
        setShowBasket={setShowBasket}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        privacyMode={privacyMode}
        setPrivacyMode={setPrivacyMode}
        selectedChartStock={selectedChartStock}
        handleBackToDashboard={handleBackToDashboard}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Watchlist 
          stockData={stockData}
          hoveredStock={hoveredStock}
          handleStockHover={handleStockHover}
          handleStockLeave={handleStockLeave}
          handleStockClick={handleStockClick}
          handleBuySellClick={handleBuySellClick}
          privacyMode={privacyMode}
          watchlistGroups={watchlistGroups}
          currentWatchlist={currentWatchlist}
          setCurrentWatchlistId={setCurrentWatchlistId}
          onCreateWatchlist={handleCreateWatchlist}
        />

          {/* Main Content Area */}
        <div className="flex-1 bg-[#1a1a1a] overflow-hidden flex flex-col w-full lg:w-auto">
          {activeTab === 'orders' ? (
            <OrdersView 
              orders={orders}
              setShowSearchModal={setShowSearchModal}
              setActiveTab={setActiveTab}
            />
          ) : activeTab === 'holdings' ? (
            <HoldingsView 
              setShowSearchModal={setShowSearchModal}
            />
          ) : activeTab === 'positions' ? (
            <PositionsView 
              setShowSearchModal={setShowSearchModal}
            />
          ) : activeTab === 'bids' ? (
            <BidsView />
          ) : activeTab === 'funds' ? (
            <FundsView privacyMode={privacyMode} />
          ) : selectedChartStock ? (
            <RealChartView 
              selectedChartStock={selectedChartStock}
              viewMode={viewMode}
              setViewMode={setViewMode}
              chartTimeframe={chartTimeframe}
              setChartTimeframe={setChartTimeframe}
              chartZoom={chartZoom}
              setChartZoom={setChartZoom}
              selectedExpiry={selectedExpiry}
              setSelectedExpiry={setSelectedExpiry}
              handleBuySellClick={handleBuySellClick}
            />
          ) : (
            <DashboardView 
              privacyMode={privacyMode}
              setShowSearchModal={setShowSearchModal}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <BuySellModal 
        showBuySellModal={showBuySellModal}
        selectedStock={selectedStock}
        orderType={orderType}
        quantity={quantity}
        setQuantity={setQuantity}
        price={price}
        setPrice={setPrice}
        isIntraday={isIntraday}
        setIsIntraday={setIsIntraday}
        handleOrderSubmit={handleOrderSubmit}
        setShowBuySellModal={setShowBuySellModal}
      />

      <SearchModal 
        showSearchModal={showSearchModal}
        setShowSearchModal={setShowSearchModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredStocks={filteredStocks}
        handleStockSelect={handleStockSelect}
      />

      <ChatModal 
        showChat={showChat}
        setShowChat={setShowChat}
        chatMessages={chatMessages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
      />

      <BasketModal 
        showBasket={showBasket}
        setShowBasket={setShowBasket}
        stockData={stockData}
        setOrders={setOrders}
      />

      <NotificationModal 
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
      />

      <ProfileDropdown 
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        privacyMode={privacyMode}
        setPrivacyMode={setPrivacyMode}
        onLogout={onLogout}
      />
    </div>
  );
};

export default TradingDashboard;
