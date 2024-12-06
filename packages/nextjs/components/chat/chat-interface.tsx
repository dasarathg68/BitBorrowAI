"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, User } from "lucide-react";

interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm BrianKnows, your AI assistant for Citrea DeFi. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response - Replace with actual BrianKnows API call
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        content: "I'm processing your request about Citrea DeFi...",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="card bg-base-100 shadow-xl h-[80vh] flex flex-col">
      <div className="card-body border-b p-4">
        <h2 className="card-title flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          Chat with BrianKnows
        </h2>
      </div>

      <div className="flex-1 overflow-hidden p-0">
        <div className="h-full p-4 overflow-y-auto" ref={scrollAreaRef}>
          <AnimatePresence initial={false}>
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-3 mb-4 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`rounded-full p-2 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-content"
                      : "bg-secondary text-secondary-content"
                  }`}
                >
                  {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.sender === "user"
                      ? "bg-primary text-primary-content"
                      : "bg-secondary text-secondary-content"
                  }`}
                >
                  {message.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-base-content opacity-60"
            >
              <Bot className="h-4 w-4" />
              <span>BrianKnows is typing...</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="p-4 border-t">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            placeholder="Ask about Citrea DeFi..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className="input input-bordered flex-1"
          />
          <button type="submit" className="btn btn-primary" disabled={!input.trim() || isTyping}>
            <Send className="h-4 w-4 mr-2" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
