"use client";

import { History, Plus } from "lucide-react";

const recentChats = ["DeFi Lending Rates", "Cross-chain Swaps", "Reputation System", "cBTC Collateral"];

export function ChatSidebar() {
  return (
    <div className="card bg-base-100 shadow-xl h-[80vh]">
      <div className="card-body">
        <h2 className="card-title">Recent Chats</h2>

        <button className="btn btn-outline w-full mb-4">
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </button>

        <div className="overflow-y-auto h-[calc(80vh-8rem)]">
          <div className="space-y-2">
            {recentChats.map((chat, index) => (
              <button key={index} className="btn btn-ghost w-full justify-start">
                <History className="mr-2 h-4 w-4" />
                {chat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
