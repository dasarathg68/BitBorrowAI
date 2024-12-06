"use client";

import { useState } from "react";
import { ArrowDownUp } from "lucide-react";

export function SwapInterface() {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  return (
    <div className="card bg-base-100 shadow-xl w-full max-w-md mx-auto">
      <div className="card-body">
        <h2 className="card-title">Swap Tokens</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="label">
              <span className="label-text">From</span>
            </label>
            <input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={e => setFromAmount(e.target.value)}
              className="input input-bordered w-full"
            />
            <span className="block mt-1 text-sm opacity-70">BTC</span>
          </div>

          <div className="flex justify-center">
            <button className="btn btn-ghost btn-square">
              <ArrowDownUp className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">To</label>
            <input
              type="number"
              placeholder="0.0"
              value={toAmount}
              onChange={e => setToAmount(e.target.value)}
              className="input input-bordered w-full"
            />
            <span className="block mt-1 text-sm opacity-70">cBTC</span>
          </div>

          <div className="bg-base-200 rounded-lg p-3 text-sm space-y-2">
            <div className="flex flex-wrap justify-between gap-2">
              <span>Rate</span>
              <span>1 BTC = 0.998 cBTC</span>
            </div>
            <div className="flex flex-wrap justify-between gap-2">
              <span>Fee</span>
              <span>0.1%</span>
            </div>
          </div>

          <button className="btn btn-primary w-full">Swap</button>
        </div>
      </div>
    </div>
  );
}
