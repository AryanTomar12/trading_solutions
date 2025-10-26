import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, CheckCircle, AlertCircle, Info, TrendingUp, TrendingDown } from 'lucide-react';

const NotificationModal = ({ showNotifications, setShowNotifications }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, setShowNotifications]);
  const [notifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Order Executed',
      message: 'Your BUY order for HDFCBANK (100 shares) has been executed at ₹994.70',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'alert',
      title: 'Price Alert',
      message: 'TCS has reached your target price of ₹3060.00',
      time: '15 minutes ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Market Update',
      message: 'NIFTY 50 is down by 0.37%. Market sentiment is bearish.',
      time: '1 hour ago',
      read: true
    },
    {
      id: 4,
      type: 'success',
      title: 'Funds Added',
      message: '₹50,000 has been successfully added to your account via UPI',
      time: '2 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'alert',
      title: 'Low Balance Alert',
      message: 'Your available margin is below ₹10,000. Consider adding funds.',
      time: '3 hours ago',
      read: true
    }
  ]);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!showNotifications) return null;

  return (
    <div ref={modalRef} className="fixed top-16 right-24 w-80 bg-[#1e1e1e] rounded-lg border border-gray-700 shadow-2xl z-[9999]">
        {/* Header */}
        <div className="bg-[#252525] px-6 py-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-6 h-6 text-orange-500" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-white">Notifications</h2>
          </div>
          <button 
            onClick={() => setShowNotifications(false)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-gray-600">
                  <Bell className="w-full h-full" />
                </div>
                <p className="text-gray-400">No notifications yet</p>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    notification.read 
                      ? 'bg-[#1e1e1e] border-gray-700 hover:bg-[#252525]' 
                      : 'bg-[#252525] border-orange-500/30 hover:bg-[#2a2a2a]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold text-sm ${
                          notification.read ? 'text-gray-300' : 'text-white'
                        }`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        )}
                      </div>
                      <p className={`text-sm mb-2 ${
                        notification.read ? 'text-gray-400' : 'text-gray-300'
                      }`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="bg-[#252525] px-6 py-3 border-t border-gray-700">
            <button className="w-full text-center text-sm text-blue-500 hover:text-blue-400 transition-colors">
              Mark all as read
            </button>
          </div>
        )}
    </div>
  );
};

export default NotificationModal;
