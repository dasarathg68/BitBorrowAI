"use client";

import { motion } from "framer-motion";
import { Header } from "~~/components/Header";
import { ChatInterface } from "~~/components/chat/chat-interface";
import { ChatSidebar } from "~~/components/chat/chat-sidebar";

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
    <div className="min-h-screen bg-background">
      <Header />
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto grid gap-6 px-4 py-8 md:grid-cols-12"
      >
        <motion.div variants={itemVariants} className="md:col-span-9">
          <ChatInterface />
        </motion.div>
        <motion.div variants={itemVariants} className="md:col-span-3">
          <ChatSidebar />
        </motion.div>
      </motion.main>
    </div>
  );
}
