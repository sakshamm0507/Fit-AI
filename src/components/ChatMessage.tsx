
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Message } from "@/context/ChatContext";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  isLatest?: boolean;
}

const ChatMessage = ({ message, isLatest }: ChatMessageProps) => {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLatest && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLatest]);

  const isUser = message.sender === "user";

  return (
    <motion.div
      ref={messageRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex max-w-[80%] md:max-w-[70%]",
          isUser ? "flex-row-reverse" : "flex-row"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 text-white",
            isUser ? "ml-2 bg-indigo-500" : "mr-2 bg-blue-500"
          )}
        >
          {isUser ? <User size={14} /> : <Bot size={14} />}
        </div>
        <div
          className={cn(
            "px-4 py-3 rounded-2xl text-sm md:text-base",
            isUser
              ? "bg-indigo-500 text-white rounded-tr-none"
              : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-tl-none"
          )}
        >
          {message.content}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
