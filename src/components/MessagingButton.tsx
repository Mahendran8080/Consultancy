import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const MessagingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([
    { role: 'bot', content: 'Hi there! I\'m your virtual assistant. How can I help you with our roofing services today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && 
          chatContainerRef.current && 
          !chatContainerRef.current.contains(event.target as Node) &&
          !(event.target as Element).closest('.messaging-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Initialize the Google GenAI instance
      const genAI = new GoogleGenAI({ apiKey: 'AIzaSyBme5cQd2CZn-r74ni3x7O-CJe828CthSc' });

      // Create a context-driven prompt for the roofing website
      const prompt = `
      You are a helpful customer support assistant for Amman Roofing Company. 
      You specialize in answering customer inquiries about roofing services, including roof installation, repair, and maintenance.
      Respond to the following customer query professionally and helpfully:

      company Info:phone number:-7538859982
email:-sriammanroofings@gmail.com
address:-Annai Satya Nagar kanakagiri kakapalayam Salem

stocks=[Roofing Sheets
metal
₹300.00
100
In Stock	
2-3 business days,
clay tiles
tiles
₹200.00
55
In Stock	
2-3 business days,
Ashpalt Shingles
shingles
₹100.00
0
Out of Stock	
Out of stock]
      
      Customer: "${userMessage}"
      
      Assistant:`;

      // Stream the response from the GenAI model
      const stream = await genAI.models.generateContentStream({
        model: "gemini-2.0-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      });

      // Process and display the streaming response
      let responseText = '';
      for await (const chunk of stream) {
        responseText += chunk.text;
      }

      setMessages(prev => [...prev, { role: 'bot', content: responseText }]);

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: 'Sorry, I encountered an error. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating chat button */}
      <button 
        onClick={toggleChat}
        className="messaging-button fixed bottom-6 right-6 z-40 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all"
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
      
      {/* Chat container */}
      {isOpen && (
        <div 
          ref={chatContainerRef}
          className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-40 overflow-hidden flex flex-col"
          style={{ maxHeight: 'calc(100vh - 150px)' }}
        >
          {/* Chat header */}
          <div className="bg-blue-600 text-white p-4">
            <h3 className="font-medium">Amman Roofing Assistant</h3>
            <p className="text-sm text-blue-100">Ask us anything about our services</p>
          </div>
          
          {/* Messages area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user' 
                      ? 'bg-blue-100 text-gray-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-gray-100">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input form */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`px-4 py-2 bg-blue-600 text-white rounded-r-lg flex items-center justify-center ${
                  isLoading || !input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default MessagingButton;
