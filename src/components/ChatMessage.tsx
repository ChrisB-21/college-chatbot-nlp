
import React from 'react';
import { ChatMessage as ChatMessageType } from '../hooks/useCollegeChat';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div 
      className={`flex items-start gap-2 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-100' : 'bg-purple-100'
      }`}>
        {isUser ? <User size={20} className="text-blue-600" /> : <Bot size={20} className="text-purple-600" />}
      </div>
      
      <div className={`p-4 rounded-lg max-w-[80%] ${
        isUser 
          ? 'bg-blue-100 text-blue-800 ml-auto' 
          : 'bg-purple-50 text-gray-800 mr-auto border border-purple-100'
      }`}>
        <p className="text-sm md:text-base">{message.text}</p>
        
        {message.intent && !isUser && (
          <div className="mt-2 text-xs text-gray-500 flex items-center">
            <span className="bg-purple-100 px-2 py-1 rounded-full">
              {message.intent}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
