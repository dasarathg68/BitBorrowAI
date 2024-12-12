"use client";

import { Header } from "@/components/Header";
import { SwapHistory } from "@/components/swaps/swap-history";
import { SwapInterface } from "@/components/swaps/swap-interface";

export default function SwapsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">Atomic Swaps</h1>
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SwapInterface />
          </div>
          <div className="lg:col-span-7">
            <SwapHistory />
          </div>
        </div>
      </main>
    </div>
  );
}
