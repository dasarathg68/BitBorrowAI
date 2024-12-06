"use client";

import { Header } from "~~/components/Header";
import { ChatInterface } from "~~/components/chat/chat-interface";
import { ChatSidebar } from "~~/components/chat/chat-sidebar";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto grid gap-6 px-4 py-8 md:grid-cols-12">
        <div className="md:col-span-9">
          <ChatInterface />
        </div>
        <div className="md:col-span-3">
          <ChatSidebar />
        </div>
      </main>
    </div>
  );
}
