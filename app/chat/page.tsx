'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Send, Bot, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI medical assistant. Please describe your symptoms and I\'ll help you understand what might be going on.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Initial page animation
    gsap.fromTo(
      '.chat-container',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Animate initial message
    gsap.fromTo(
      '.message-1',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, delay: 0.3, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Animate new user message
    setTimeout(() => {
      gsap.fromTo(
        `.message-${userMessage.id}`,
        { opacity: 0, x: 30, scale: 0.8 },
        { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }, 50);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue })
      });

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.response || 'I apologize, but I\'m having trouble processing your request. Please try again.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Animate AI response
      setTimeout(() => {
        gsap.fromTo(
          `.message-${aiMessage.id}`,
          { opacity: 0, x: -30, scale: 0.8 },
          { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
        );
      }, 100);

      // If AI suggests seeing a doctor, show navigation button after 2 seconds
      if (data.response?.toLowerCase().includes('doctor') || data.response?.toLowerCase().includes('consultation')) {
        setTimeout(() => {
          const doctorButton: Message = {
            id: (Date.now() + 2).toString(),
            type: 'ai',
            content: 'FIND_DOCTORS_BUTTON',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, doctorButton]);
        }, 2000);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again later.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container min-h-screen flex flex-col max-w-4xl mx-auto p-4">
      <div className="glass-dark rounded-t-2xl p-4 mb-4">
        <h1 className="text-2xl font-bold text-white text-center">
          <span className="text-red-500">Dr</span> AI Medical Assistant
        </h1>
        <p className="text-gray-300 text-center mt-2">
          Describe your symptoms for personalized guidance
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 glass-dark rounded-2xl p-4 mb-4 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 max-h-[60vh]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-${message.id} flex ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.content === 'FIND_DOCTORS_BUTTON' ? (
                <div className="flex flex-col items-center space-y-3">
                  <button
                    onClick={() => router.push('/doctors')}
                    className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Find Available Doctors
                  </button>
                </div>
              ) : (
                <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                      : 'bg-gradient-to-r from-green-500 to-teal-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'message-user text-white rounded-br-none'
                      : 'message-ai text-white rounded-bl-none'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-end space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="message-ai px-4 py-3 rounded-2xl rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="glass-dark rounded-2xl p-4">
        <div className="flex space-x-4">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe your symptoms..."
            className="flex-1 bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}