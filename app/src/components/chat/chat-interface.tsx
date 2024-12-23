"use client";

import { useEffect, useRef, useState } from "react";
import { AskResult, BrianSDK, BrianSDKOptions } from "@brian-ai/sdk";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, User } from "lucide-react";
import { BRIANKNOWS_SYSTEM_PROMPT } from "@/utils/ai-prompts";

const options: BrianSDKOptions = {
  apiKey: process.env.NEXT_PUBLIC_BRIAN_API_KEY ?? "",
};

const brian = new BrianSDK(options);

interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface AIResponse {
  action: string;
  amount: string | null;
  asset: string | null;
  chain: string | null;
  to: string | null;
  additionalDetails: string | null;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content:
        "Hello! I'm BrianKnows, your AI assistant for BitBorrowAI. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const actionMappings: Record<
    string,
    (response: AIResponse) => Promise<void>
  > = {
    deposit_collateral: async (response) => {
      console.log(
        "Depositing",
        response.amount,
        response.asset,
        "on",
        response.chain
      );
      await addBotMessage(response, "Deposit");
    },
    withdraw: async (response) => {
      console.log(
        "Withdrawing",
        response.amount,
        response.asset,
        "from",
        response.chain
      );
      await addBotMessage(response, "Withdraw");
    },
    transfer: async (response) => {
      console.log(
        "Transferring",
        response.amount,
        response.asset,
        "to",
        response.to,
        "on",
        response.chain
      );
      await addBotMessage(response, "Transfer");
    },
  };

  const addBotMessage = async (response: AIResponse, action: string) => {
    const botMessage: Message = {
      id: messages.length + 2,
      content:
        response.additionalDetails ??
        `${action}ing ${response.amount} ${response.asset} on ${response.chain}`,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
  };

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

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const updatedPrompt =
        BRIANKNOWS_SYSTEM_PROMPT +
        `\n\n This is the user's question: ${input}. Answer the question in a helpful and concise manner following the guidelines provided.`;

      const aiResponse: AskResult = await brian.ask({
        prompt: updatedPrompt,
        kb: "public-knowledge-box",
      });

      // For demonstration purposes, using a mock response
      // const aiResponse: AskResult = {
      //   answer: `{"action": "deposit_collateral", "amount": "10", "asset": "cBTC", "chain": "Citrea", "to": null, "additionalDetails": null}`,
      // };

      const formattedResponse: AIResponse = JSON.parse(aiResponse.answer);

      const action = actionMappings[formattedResponse.action];
      if (action) {
        await action(formattedResponse);
      }

      if (formattedResponse.action === "answer") {
        const botMessage: Message = {
          id: messages.length + 2,
          content:
            formattedResponse.additionalDetails ??
            "Sorry, I couldn't process that request.",
          sender: "bot",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: messages.length + 2,
        content: "Sorry, I encountered an error processing your request.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-lg shadow-lg bg-base-100  max-w-2xl mx-auto h-[72vh] flex flex-col"
      >
        <div className="border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            Chat with BrianKnows
          </h2>
        </div>

        <div className="flex-1 overflow-hidden p-4">
          <div className="h-full overflow-y-auto pr-4" ref={scrollAreaRef}>
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-3 mb-4 ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`rounded-full p-2 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
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
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Bot className="h-4 w-4" />
                <span>BrianKnows is typing...</span>
              </motion.div>
            )}
          </div>
        </div>

        <div className="p-4 border-t">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              placeholder="Ask BrianKnows anything..."
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
              className="flex-1 px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Chat input"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!input.trim() || isTyping}
            >
              <Send className="h-4 w-4 mr-2 inline-block" />
              Send
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
