"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, MessageCircleDashedIcon, X } from "lucide-react";
import { ChatInterface } from "@/components/chat/chat-interface";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden md:block">
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 mb-4"
          >
            <Card className="w-[380px] md:w-[420px] border-border/40 shadow-lg">
              <ChatInterface />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        className="h-14 w-14 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-black" />
        ) : (
          <MessageCircle className="h-6 w-6 text-black" />
        )}
      </Button>
    </div>
  );
}
