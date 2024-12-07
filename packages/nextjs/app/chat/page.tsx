"use client";

import { motion } from "framer-motion";
import { Header } from "~~/components/Header";
import { ChatInterface } from "~~/components/chat/chat-interface";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center items-center px-2 py-6 sm:py-8 md:py-12 max-w-[90vw] mx-auto"
      >
        <motion.h2
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 text-center"
        >
          Chat with BrianKnows
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-muted-foreground mb-6 text-center max-w-3xl"
        >
          Your AI assistant for Citrea DeFi. Ask anything about deposits, withdrawals, or transfers.
        </motion.p>
        <motion.div variants={itemVariants} className="w-full max-w-6xl">
          <ChatInterface />
        </motion.div>
      </motion.main>
    </div>
  );
}
