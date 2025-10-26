import React, { useState, useMemo } from 'react';
import { 
  ComposedChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Bar,
  Line,
  ReferenceLine
} from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, Volume2, Settings, Maximize2 } from 'lucide-react';

const RealChartView = ({ 
  selectedChartStock, 
  viewMode, 
  setViewMode, 
  chartTimeframe, 
  setChartTimeframe, 
  chartZoom, 
  setChartZoom,
  selectedExpiry,
  setSelectedExpiry,
  handleBuySellClick 
}) => {
  const [hoveredData, setHoveredData] = useState(null);
  const [isLoadingOptionChain, setIsLoadingOptionChain] = useState(false);

  // Generate realistic candlestick data
  const generateChartData = () => {
    const data = [];
    const basePrice = selectedChartStock?.price || 1000;
    let currentPrice = basePrice;
    const now = new Date();
    
    for (let i = 200; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const date = time.toISOString().split('T')[0];
      
      // Generate realistic price movement
      const volatility = 0.02;
      const change = (Math.random() - 0.5) * volatility * currentPrice;
      const open = currentPrice;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * volatility * currentPrice * 0.5;
      const low = Math.min(open, close) - Math.random() * volatility * currentPrice * 0.5;
      const volume = Math.floor(Math.random() * 1000000) + 100000;
      
      data.push({
        date,
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        volume,
        change: parseFloat(change.toFixed(2)),
        changePercent: parseFloat(((change / open) * 100).toFixed(2))
      });
      
      currentPrice = close;
    }
    
    return data;
  };

  const chartData = useMemo(() => generateChartData(), [selectedChartStock]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#1e1e1e] border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-white font-semibold">{label}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Open:</span>
              <span className="text-white">₹{data.open}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">High:</span>
              <span className="text-green-400">₹{data.high}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Low:</span>
              <span className="text-red-400">₹{data.low}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Close:</span>
              <span className="text-white">₹{data.close}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Volume:</span>
              <span className="text-blue-400">{data.volume.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Change:</span>
              <span className={data.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                {data.change >= 0 ? '+' : ''}{data.change} ({data.changePercent}%)
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom candlestick component
  const CustomCandlestick = (props) => {
    const { payload, x, y, width, height } = props;
    if (!payload) return null;

    const { open, close, high, low } = payload;
    const isGreen = close >= open;
    const color = isGreen ? '#26a69a' : '#ef5350';
    
    const bodyHeight = Math.abs(close - open);
    const bodyY = y + (height - Math.max(open, close) * height / (high - low + 1));
    const wickTop = y;
    const wickBottom = y + height;
    
    return (
      <g>
        {/* Wick */}
        <line
          x1={x + width / 2}
          y1={wickTop}
          x2={x + width / 2}
          y2={wickBottom}
          stroke={color}
          strokeWidth={1}
        />
        {/* Body */}
        <rect
          x={x + width * 0.2}
          y={bodyY}
          width={width * 0.6}
          height={Math.max(bodyHeight, 1)}
          fill={isGreen ? color : 'transparent'}
          stroke={color}
          strokeWidth={1}
        />
      </g>
    );
  };

  const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];
  const expiries = ['25 Oct 2024', '31 Oct 2024', '07 Nov 2024', '14 Nov 2024', '21 Nov 2024'];

  const handleExpiryChange = (newExpiry) => {
    setIsLoadingOptionChain(true);
    setSelectedExpiry(newExpiry);
    // Simulate loading delay
    setTimeout(() => {
      setIsLoadingOptionChain(false);
    }, 800);
  };

  if (viewMode === 'option-chain') {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Option Chain Header */}
        <div className="bg-[#1e1e1e] border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white">{selectedChartStock?.symbol} Option Chain</h2>
            <select 
              value={selectedExpiry}
              onChange={(e) => handleExpiryChange(e.target.value)}
              className="bg-[#2a2a2a] border border-gray-600 rounded px-4 py-2 text-white text-sm hover:border-blue-500 focus:outline-none focus:border-blue-500 transition-colors"
            >
              {expiries.map(expiry => (
                <option key={expiry} value={expiry}>{expiry}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('chart')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Chart
            </button>
          </div>
        </div>

        {/* Option Chain Table */}
        <div className="flex-1 overflow-auto bg-[#1a1a1a] p-4">
          <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 overflow-hidden relative">
            {/* Loader Overlay */}
            {isLoadingOptionChain && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-white text-sm">Loading option chain...</span>
                </div>
              </div>
            )}

            {/* Horizontally Scrollable Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[1200px]">
                <thead className="bg-[#252525] border-b border-gray-700 sticky top-0">
                  <tr>
                    <th colSpan="5" className="px-4 py-3 text-center text-green-400 font-semibold border-r border-gray-700">CALLS</th>
                    <th className="px-4 py-3 text-center text-white font-semibold">STRIKE</th>
                    <th colSpan="5" className="px-4 py-3 text-center text-red-400 font-semibold border-l border-gray-700">PUTS</th>
                  </tr>
                  <tr className="bg-[#1e1e1e]">
                    {/* Calls Headers */}
                    <th className="px-3 py-2 text-right text-gray-400 font-medium text-xs">OI</th>
                    <th className="px-3 py-2 text-right text-gray-400 font-medium text-xs">Chng in OI</th>
                    <th className="px-3 py-2 text-right text-gray-400 font-medium text-xs">Volume</th>
                    <th className="px-3 py-2 text-right text-gray-400 font-medium text-xs">LTP</th>
                    <th className="px-3 py-2 text-right text-gray-400 font-medium text-xs border-r border-gray-700">Chng</th>
                    {/* Strike Header */}
                    <th className="px-4 py-2 text-center text-gray-400 font-medium">Strike</th>
                    {/* Puts Headers */}
                    <th className="px-3 py-2 text-left text-gray-400 font-medium text-xs border-l border-gray-700">Chng</th>
                    <th className="px-3 py-2 text-left text-gray-400 font-medium text-xs">LTP</th>
                    <th className="px-3 py-2 text-left text-gray-400 font-medium text-xs">Volume</th>
                    <th className="px-3 py-2 text-left text-gray-400 font-medium text-xs">Chng in OI</th>
                    <th className="px-3 py-2 text-left text-gray-400 font-medium text-xs">OI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {Array.from({ length: 20 }, (_, i) => {
                    const strike = 1000 + (i - 10) * 50;
                    const isATM = Math.abs(strike - (selectedChartStock?.price || 1000)) < 25;
                    const isITM_Call = strike < (selectedChartStock?.price || 1000);
                    const isITM_Put = strike > (selectedChartStock?.price || 1000);
                    
                    return (
                      <tr 
                        key={strike} 
                        className={`hover:bg-[#2a2a2a] transition-colors ${
                          isATM ? 'bg-blue-900/20 border-l-2 border-r-2 border-blue-500' : ''
                        }`}
                      >
                        {/* Calls Data */}
                        <td className={`px-3 py-2 text-right text-white ${isITM_Call ? 'bg-green-900/10' : ''}`}>
                          {Math.floor(Math.random() * 10000).toLocaleString()}
                        </td>
                        <td className={`px-3 py-2 text-right ${Math.random() > 0.5 ? 'text-green-400' : 'text-red-400'} ${isITM_Call ? 'bg-green-900/10' : ''}`}>
                          {(Math.random() * 1000).toFixed(0)}
                        </td>
                        <td className={`px-3 py-2 text-right text-gray-300 ${isITM_Call ? 'bg-green-900/10' : ''}`}>
                          {Math.floor(Math.random() * 5000).toLocaleString()}
                        </td>
                        <td className={`px-3 py-2 text-right text-white font-semibold ${isITM_Call ? 'bg-green-900/10' : ''}`}>
                          {(Math.random() * 100).toFixed(2)}
                        </td>
                        <td className={`px-3 py-2 text-right border-r border-gray-700 ${Math.random() > 0.5 ? 'text-green-400' : 'text-red-400'} ${isITM_Call ? 'bg-green-900/10' : ''}`}>
                          {(Math.random() * 10 - 5).toFixed(2)}
                        </td>
                        
                        {/* Strike */}
                        <td className="px-4 py-2 text-center">
                          <span className={`font-bold ${isATM ? 'text-blue-400 text-base' : 'text-white'}`}>
                            {strike}
                          </span>
                        </td>
                        
                        {/* Puts Data */}
                        <td className={`px-3 py-2 text-left border-l border-gray-700 ${Math.random() > 0.5 ? 'text-green-400' : 'text-red-400'} ${isITM_Put ? 'bg-red-900/10' : ''}`}>
                          {(Math.random() * 10 - 5).toFixed(2)}
                        </td>
                        <td className={`px-3 py-2 text-left text-white font-semibold ${isITM_Put ? 'bg-red-900/10' : ''}`}>
                          {(Math.random() * 100).toFixed(2)}
                        </td>
                        <td className={`px-3 py-2 text-left text-gray-300 ${isITM_Put ? 'bg-red-900/10' : ''}`}>
                          {Math.floor(Math.random() * 5000).toLocaleString()}
                        </td>
                        <td className={`px-3 py-2 text-left ${Math.random() > 0.5 ? 'text-green-400' : 'text-red-400'} ${isITM_Put ? 'bg-red-900/10' : ''}`}>
                          {(Math.random() * 1000).toFixed(0)}
                        </td>
                        <td className={`px-3 py-2 text-left text-white ${isITM_Put ? 'bg-red-900/10' : ''}`}>
                          {Math.floor(Math.random() * 10000).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Chart Header */}
      <div className="bg-[#1e1e1e] border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-white">{selectedChartStock?.symbol} Chart</h2>
          <div className="flex items-center gap-2">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setChartTimeframe(tf)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  chartTimeframe === tf
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('option-chain')}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Option Chain
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex-1 p-4">
        <div className="bg-[#131722] rounded-lg border border-gray-700 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              onMouseMove={(data) => setHoveredData(data)}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2B2B43" />
              <XAxis 
                dataKey="date" 
                stroke="#485c7b"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis 
                stroke="#485c7b"
                fontSize={12}
                domain={['dataMin - 10', 'dataMax + 10']}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Volume bars */}
              <Bar 
                dataKey="volume" 
                fill="#26a69a" 
                opacity={0.3}
                yAxisId="volume"
              />
              
              {/* Price line */}
              <Line
                type="monotone"
                dataKey="close"
                stroke="#26a69a"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#26a69a' }}
              />
              
              {/* Reference line for current price */}
              <ReferenceLine 
                y={selectedChartStock?.price} 
                stroke="#ffa500" 
                strokeDasharray="5 5"
                label={{ value: "Current", position: "topRight" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart Controls */}
      <div className="bg-[#1e1e1e] border-t border-gray-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Zoom:</span>
            <button
              onClick={() => setChartZoom(prev => Math.min(prev + 0.1, 2))}
              className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              +
            </button>
            <span className="text-white text-sm px-2">{chartZoom.toFixed(1)}x</span>
            <button
              onClick={() => setChartZoom(prev => Math.max(prev - 0.1, 0.1))}
              className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              -
            </button>
          </div>
          {hoveredData && (
            <div className="text-sm text-gray-400">
              Last: ₹{hoveredData.close} | Vol: {hoveredData.volume?.toLocaleString()}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleBuySellClick(selectedChartStock, 'buy')}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            BUY
          </button>
          <button
            onClick={() => handleBuySellClick(selectedChartStock, 'sell')}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            SELL
          </button>
        </div>
      </div>
    </div>
  );
};

export default RealChartView;