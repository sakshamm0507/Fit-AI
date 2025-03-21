
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useChat } from "@/context/ChatContext";
import { cn } from "@/lib/utils";
import { Chat as KendoChat, Message } from "@progress/kendo-react-conversational-ui";

// Define a custom message type that matches what Kendo Chat expects
interface CustomMessage {
  author: {
    id: number;
    name: string;
  };
  text: string;
  timestamp: Date;
}

const initialMessage: CustomMessage = {
  author: { id: 0, name: "AI Fitness Assistant" },
  text: "Hello! I'm your AI fitness assistant. How can I help you with your fitness journey today?",
  timestamp: new Date(),
};

const Chat = () => {
  const { state, addMessage, setTyping } = useChat();
  const [messages, setMessages] = useState<CustomMessage[]>([initialMessage]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const user = {
    id: 1,
    name: "User",
  };

  const bot = {
    id: 0,
    name: "AI Fitness Assistant",
  };

  // Convert chat context messages to Kendo Chat format
  useEffect(() => {
    if (state.messages.length === 0) {
      setMessages([initialMessage]);
      return;
    }
    
    const kendoMessages = state.messages.map((msg) => ({
      author: msg.sender === "user" ? user : bot,
      text: msg.content,
      timestamp: msg.timestamp || new Date(),
    }));
    
    setMessages(kendoMessages);
  }, [state.messages]);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, state.isTyping]);

  const handleSend = (event: any) => {
    const userMessage = event.message.text;
    
    if (!userMessage.trim()) return;
    
    // Add user message
    addMessage(userMessage, "user");
    
    // Simulate AI typing
    setTyping(true);
    
    // Mock AI response logic (replace with actual API call)
    setTimeout(() => {
      const responses = [
        "Based on your goals, I'd recommend a mix of strength training and cardio. How does that sound?",
        "Great progress! Let's increase your workout intensity to keep challenging your muscles.",
        "For weight loss, focus on creating a caloric deficit through both diet and exercise.",
        "Make sure to get enough protein to support muscle recovery after your workouts.",
        "Rest days are just as important as workout days. Your muscles need time to recover and grow.",
        "Stay hydrated! Aim for at least 2-3 liters of water daily, especially on workout days.",
        "Have you considered adding yoga to your routine? It's great for flexibility and stress reduction."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse, "ai");
      setTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-16 flex flex-col bg-gradient-to-b from-background to-secondary/30">
      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto px-4">
        <div className="text-center my-8">
          <h1 className="text-2xl font-display font-bold">Chat with AI Assistant</h1>
          <p className="text-sm text-muted-foreground mt-1">Ask questions about workouts, nutrition, or fitness goals</p>
        </div>
        
        <div className="flex-1 overflow-hidden rounded-xl bg-secondary/50 backdrop-blur-sm">
          <KendoChat
            user={user}
            messages={messages}
            onMessageSend={handleSend}
            placeholder="Ask about workouts, nutrition, or fitness goals..."
            className="k-chat-container"
          />
        </div>
        
        {/* AI Typing Indicator */}
        {state.isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex mt-2 ml-4"
          >
            <div className="flex max-w-[80%] md:max-w-[70%]">
              <div className="px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                    className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                    className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                  />
                </div>
              </div>
            </div>
            <div ref={messagesEndRef} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Chat;
