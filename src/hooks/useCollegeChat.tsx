
import { useState, useEffect } from 'react';
import { initializeModels, classifyIntent, generateResponse } from '../services/nlpService';

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
          // Add a welcome message
          setMessages([
            {
              text: "Welcome to the College Assistant! I can help you with questions about admissions, courses, fees, scholarships, and campus facilities. How can I assist you today?",
              sender: 'bot'
            }
          ]);
        } else {
          // Add a fallback message if model loading fails
          setMessages([
            {
              text: "I'm ready to answer your questions about our college! How can I help you today?",
              sender: 'bot'
            }
          ]);
        }
      } catch (error) {
        console.error("Failed to load NLP models:", error);
        setIsModelReady(false);
      }
    };

    loadModels();
  }, []);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    // Add user message to chat
    const userMessage: ChatMessage = { text: inputMessage, sender: 'user' };
    const processingMessage: ChatMessage = { text: 'Processing your query...', sender: 'bot' };
    
    setMessages(prevMessages => [...prevMessages, userMessage, processingMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Classify the intent
      const intent = await classifyIntent(inputMessage);
      console.log(`Detected intent: ${intent}`);
      
      // Generate a response based on the intent
      const responseText = await generateResponse(inputMessage, intent);
      
      // Replace the processing message with the actual response
      setMessages(prevMessages => {
        const newMessages = [...prevMessages];
        newMessages.pop(); // Remove the processing message
        newMessages.push({ text: responseText, sender: 'bot', intent });
        return newMessages;
      });
    } catch (error) {
      console.error("Error processing message:", error);
      
      // Replace the processing message with an error message
      setMessages(prevMessages => {
        const newMessages = [...prevMessages];
        newMessages.pop(); // Remove the processing message
        newMessages.push({ 
          text: "I'm having trouble processing your request right now. Could you try rephrasing your question?", 
          sender: 'bot' 
        });
        return newMessages;
      });
    } finally {
      setIsLoading(false);
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
