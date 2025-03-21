
import React, { createContext, useContext, useReducer, useEffect } from "react";

export interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
}

type ChatAction =
  | { type: "ADD_MESSAGE"; payload: Message }
  | { type: "SET_TYPING"; payload: boolean }
  | { type: "CLEAR_CHAT" };

interface ChatContextType {
  state: ChatState;
  addMessage: (content: string, sender: "user" | "ai") => void;
  setTyping: (isTyping: boolean) => void;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const initialChatState: ChatState = {
  messages: [],
  isTyping: false,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "SET_TYPING":
      return {
        ...state,
        isTyping: action.payload,
      };
    case "CLEAR_CHAT":
      return {
        ...initialChatState,
      };
    default:
      return state;
  }
}

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);

  // Load chat history from localStorage on initial load
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      parsedMessages.forEach((message: Message) => {
        dispatch({ type: "ADD_MESSAGE", payload: { ...message, timestamp: new Date(message.timestamp) } });
      });
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(state.messages));
  }, [state.messages]);

  const addMessage = (content: string, sender: "user" | "ai") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
    };
    dispatch({ type: "ADD_MESSAGE", payload: newMessage });
  };

  const setTyping = (isTyping: boolean) => {
    dispatch({ type: "SET_TYPING", payload: isTyping });
  };

  const clearChat = () => {
    dispatch({ type: "CLEAR_CHAT" });
  };

  return (
    <ChatContext.Provider value={{ state, addMessage, setTyping, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
