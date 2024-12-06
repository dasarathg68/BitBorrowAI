"use client";

import { Header } from "~~/components/Header";
import { ReputationGraph } from "~~/components/reputation/reputation-graph";
import { ReputationHistory } from "~~/components/reputation/reputation-history";
import { ReputationScore } from "~~/components/reputation/reputation-score";

export default function ReputationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Reputation System</h1>
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ReputationGraph />
          </div>
          <div className="space-y-6 lg:col-span-4">
            <ReputationScore />
            <ReputationHistory />
          </div>
        </div>
      </main>
    </div>
  );
}
