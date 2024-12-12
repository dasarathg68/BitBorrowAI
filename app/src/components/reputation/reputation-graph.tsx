"use client";

import { motion } from "framer-motion";

export function ReputationGraph() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card bg-base-100 shadow-xl h-[600px]"
    >
      <div className="card-body">
        <h2 className="card-title">Trust Network</h2>
      </div>
      <div className="card-body">
        <div className="h-[500px] w-full">
          {/* Placeholder for the actual graph visualization */}
          <div className="flex h-full items-center justify-center text-muted-foreground">Trust Graph Visualization</div>
        </div>
      </div>
    </motion.div>
  );
}
