
import { useState, useEffect } from 'react';
import { initializeModels, classifyIntent, generateResponse } from '../services/nlpService';
import { toast } from '@/hooks/use-toast';

export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  intent?: string;
}

export const useCollegeChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isModelReady, setIsModelReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const success = await initializeModels();
        setIsModelReady(success);
        
        if (success) {
          toast({
            title: "AI Model Loaded",
            description: "Coll.e is ready with GPU acceleration."
          });
          
          setMessages([
            {
              text: "Welcome to Coll.e! I can help you with questions about admissions, courses, fees, scholarships, and campus facilities. How can I assist you today?",
              sender: 'bot'
            }
          ]);
        } else {
          toast({
            title: "AI Model Information",
            description: "Using standard mode without GPU acceleration.",
            variant: "default"
          });
          
          setMessages([
            {
              text: "Welcome to Coll.e! I'm ready to answer your questions about admissions, courses, fees, scholarships, and campus facilities. How can I help you today?",
              sender: 'bot'
            }
          ]);
        }
      } catch (error) {
        console.error("Failed to load NLP models:", error);
        setIsModelReady(false);
        
        toast({
          title: "AI Model Error",
          description: "Running in compatibility mode. Some advanced features may be limited.",
          variant: "destructive"
        });
      }
    };

    loadModels();
  }, []);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage: ChatMessage = { text: inputMessage, sender: 'user' };
    const newUserMessage = inputMessage;
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const intent = await classifyIntent(newUserMessage);
      console.log(`Detected intent: ${intent}`);
      
      // Ensure intent is a string
      const intentString = typeof intent === 'string' ? intent : 'general inquiry';
      
      const responseText = await generateResponse(newUserMessage, intentString);
      
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: responseText, sender: 'bot', intent: intentString }
        ]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error processing message:", error);
      
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { 
            text: "I'm having trouble processing your request right now. Could you try rephrasing your question?", 
            sender: 'bot' 
          }
        ]);
        setIsLoading(false);
        
        toast({
          title: "Processing Error",
          description: "There was an issue analyzing your question. Please try a different query.",
          variant: "destructive"
        });
      }, 500);
    }
  };

  return {
    messages,
    inputMessage,
    setInputMessage,
    handleSendMessage,
    isModelReady,
    isLoading
  };
};
