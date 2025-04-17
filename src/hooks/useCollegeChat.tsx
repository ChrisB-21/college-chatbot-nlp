
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

  // Initialize NLP models when the component mounts
  useEffect(() => {
    const loadModels = async () => {
      try {
        const success = await initializeModels();
        setIsModelReady(success);
        
        if (success) {
          toast({
            title: "AI Model Loaded",
            description: "The chatbot is ready with GPU acceleration."
          });
          
          // Add a welcome message
          setMessages([
            {
              text: "Welcome to the College Assistant! I can help you with questions about admissions, courses, fees, scholarships, and campus facilities. How can I assist you today?",
              sender: 'bot'
            }
          ]);
        } else {
          // Add a fallback message if model loading fails
          toast({
            title: "AI Model Information",
            description: "Using standard mode without GPU acceleration.",
            variant: "default"
          });
          
          setMessages([
            {
              text: "Welcome to the College Assistant! I'm ready to answer your questions about admissions, courses, fees, scholarships, and campus facilities. How can I help you today?",
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

    // Add user message to chat
    const userMessage: ChatMessage = { text: inputMessage, sender: 'user' };
    const newUserMessage = inputMessage;
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Classify the intent
      const intent = await classifyIntent(newUserMessage);
      console.log(`Detected intent: ${intent}`);
      
      // Generate a response based on the intent and user message
      const responseText = await generateResponse(newUserMessage, intent);
      
      // Add the response to the chat
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: responseText, sender: 'bot', intent }
        ]);
        setIsLoading(false);
      }, 500); // Small delay to make it feel more natural
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
