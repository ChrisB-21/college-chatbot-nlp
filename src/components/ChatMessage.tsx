
import React from 'react';
import { ChatMessage as ChatMessageType } from '../hooks/useCollegeChat';
import { User, Bot, BookOpen, School, Coins, Award, Building, HelpCircle, Briefcase } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  // Get the appropriate icon based on intent
  const getIntentIcon = () => {
    if (isUser) return <User size={20} className="text-blue-600" />;
    
    switch (message.intent) {
      case 'admission inquiries':
        return <School size={20} className="text-purple-600" />;
      case 'course information':
        return <BookOpen size={20} className="text-purple-600" />;
      case 'fee structure':
        return <Coins size={20} className="text-purple-600" />;
      case 'scholarship information':
        return <Award size={20} className="text-purple-600" />;
      case 'campus facilities':
        return <Building size={20} className="text-purple-600" />;
      case 'placement information':
        return <Briefcase size={20} className="text-purple-600" />;
      default:
        return <Bot size={20} className="text-purple-600" />;
    }
  };
  
  // Get a friendly label for the intent
  const getIntentLabel = () => {
    if (!message.intent) return '';
    
    switch (message.intent) {
      case 'admission inquiries':
        return 'Admissions';
      case 'course information':
        return 'Courses';
      case 'fee structure':
        return 'Fees';
      case 'scholarship information':
        return 'Scholarships';
      case 'campus facilities':
        return 'Campus';
      case 'placement information':
        return 'Placements';
      case 'general inquiry':
        return 'General Info';
      default:
        return typeof message.intent === 'string' ? message.intent : 'Unknown';
    }
  };
  
  // Ensure message text is a string
  const getMessageText = () => {
    if (typeof message.text === 'string') {
      return message.text;
    } else if (message.text === null || message.text === undefined) {
      return "Sorry, I couldn't process that response.";
    } else {
      return JSON.stringify(message.text);
    }
  };
  
  return (
    <div 
      className={`flex items-start gap-2 mb-4 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-100' : 'bg-purple-100'
      }`}>
        {getIntentIcon()}
      </div>
      
      <div className={`p-4 rounded-lg max-w-[80%] ${
        isUser 
          ? 'bg-blue-100 text-blue-800 ml-auto' 
          : 'bg-purple-50 text-gray-800 mr-auto border border-purple-100'
      }`}>
        <p className="text-sm md:text-base whitespace-pre-wrap">
          {getMessageText()}
        </p>
        
        {message.intent && !isUser && (
          <div className="mt-2 text-xs text-gray-500 flex items-center">
            <span className="bg-purple-100 px-2 py-1 rounded-full flex items-center">
              <HelpCircle size={12} className="mr-1" />
              {getIntentLabel()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
