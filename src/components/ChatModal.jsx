import React from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatModal = ({ showChat, setShowChat, chatMessages, newMessage, setNewMessage, sendMessage }) => {
  if (!showChat) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-[#1e1e1e] rounded-lg border border-gray-700 shadow-2xl z-50 flex flex-col">
      <div className="bg-gradient-to-r from-[#252525] to-[#1e1e1e] text-white p-4 rounded-t-lg flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-white">Trading Assistant</span>
            <div className="text-xs text-green-400">Online</div>
          </div>
        </div>
        <button
          onClick={() => setShowChat(false)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1a1a1a]">
        {chatMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-lg text-sm ${
                message.sender === 'You'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-[#2a2a2a] text-gray-200 rounded-bl-sm border border-gray-600'
              }`}
            >
              <div className={`font-medium text-xs mb-2 ${
                message.sender === 'You' ? 'text-blue-100' : 'text-gray-400'
              }`}>
                {message.sender}
              </div>
              <div className="leading-relaxed">{message.message}</div>
              <div className={`text-xs mt-2 ${
                message.sender === 'You' ? 'text-blue-200' : 'text-gray-500'
              }`}>
                {message.time}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-700 bg-[#1e1e1e]">
        <div className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;

