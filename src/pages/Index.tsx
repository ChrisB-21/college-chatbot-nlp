
import React, { useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Cpu } from 'lucide-react';
import { useCollegeChat } from '../hooks/useCollegeChat';
import ChatMessage from '../components/ChatMessage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import WebGPUDiagnostic from '../components/WebGPUDiagnostic';

const Index = () => {
  const {
    messages,
    inputMessage,
    setInputMessage,
    handleSendMessage,
    isModelReady,
    isLoading
  } = useCollegeChat();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-purple-700 text-white p-4 shadow-md">
        <div className="container mx-auto max-w-3xl flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold flex items-center">
            <Cpu className="mr-2" /> College Assistant
          </h1>
          <div className="flex items-center text-xs md:text-sm bg-purple-600 px-3 py-1 rounded-full">
            <span className={`h-2 w-2 rounded-full mr-2 ${isModelReady ? 'bg-green-400' : 'bg-yellow-400'}`} />
            {isModelReady ? 'GPU Accelerated' : 'Standard Mode'}
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-grow container mx-auto max-w-3xl py-6 px-4">
        {/* WebGPU Diagnostic Tool */}
        <WebGPUDiagnostic />
        
        <Card className="h-full flex flex-col mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg md:text-xl">Chat with Our College Assistant</CardTitle>
            <CardDescription>
              Ask questions about admissions, courses, fees, scholarships, and campus facilities
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-grow flex flex-col pt-4">
            {/* Messages Container */}
            <div className="flex-grow overflow-y-auto mb-4 space-y-6 pr-2">
              {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Container */}
            <div className="flex space-x-2 pt-4 border-t">
              <Input 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                placeholder="Ask a question about college admissions, courses, or fees..."
                className="flex-grow"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                variant="default"
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isLoading}
              >
                <Send className="mr-2" />
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-3 text-center text-sm text-gray-600">
        Powered by Hugging Face Transformers with WebGPU acceleration
      </footer>
    </div>
  );
};

export default Index;
