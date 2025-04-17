
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';

const Index = () => {
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'bot'}[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessages = [
      ...messages, 
      { text: inputMessage, sender: 'user' },
      { text: 'Processing your query...', sender: 'bot' }
    ];

    setMessages(newMessages);
    setInputMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow container mx-auto max-w-2xl py-10 flex flex-col">
        <div className="flex-grow overflow-y-auto mb-4 space-y-4 p-4 bg-white rounded-lg shadow-md">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.sender === 'user' 
                  ? 'bg-blue-100 text-blue-800 self-end ml-auto' 
                  : 'bg-gray-100 text-gray-800 self-start mr-auto'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <Input 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask a question about college admissions, courses, or fees..."
            className="flex-grow"
          />
          <Button onClick={handleSendMessage} variant="default">
            <Send className="mr-2" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
