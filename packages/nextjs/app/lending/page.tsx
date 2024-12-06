"use client";

import { Header } from "~~/components/Header";
import { CollateralStats } from "~~/components/lending/collateral-stats";
import { LendingDashboard } from "~~/components/lending/lending-dashboard";

export default function LendingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Lending & Borrowing</h1>
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <LendingDashboard />
          </div>
          <div className="md:col-span-4">
            <CollateralStats />
          </div>
        </div>
      </main>
    </div>
  );
}
