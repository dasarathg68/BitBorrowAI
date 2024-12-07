"use client";

import { motion } from "framer-motion";
import { Header } from "~~/components/Header";
import { CollateralStats } from "~~/components/lending/collateral-stats";
import { LendingDashboard } from "~~/components/lending/lending-dashboard";

export default function LendingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 text-3xl font-bold"
        >
          Lending & Borrowing
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid gap-6 md:grid-cols-12"
        >
          <div className="md:col-span-8">
            <LendingDashboard />
          </div>
          <div className="md:col-span-4">
            <CollateralStats />
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
}
