"use client";

import { useState } from "react";

export function LendingDashboard() {
  const [amount, setAmount] = useState("");

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Lending Dashboard</h2>

        <div className="tabs tabs-boxed">
          <input type="radio" name="lending-tabs" className="tab-toggle" defaultChecked />
          <a className="tab" role="tab">
            Lend
          </a>
          <input type="radio" name="lending-tabs" className="tab-toggle" />
          <a className="tab" role="tab">
            Borrow
          </a>
        </div>

        <div className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Amount (cBTC)</span>
            </label>
            <input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="text-sm opacity-70">
            <p>Current APY: 5.2%</p>
            <p>Total Value Locked: 145.23 cBTC</p>
          </div>
          <button className="btn btn-primary w-full">Lend cBTC</button>
        </div>

        <div className="space-y-4 hidden">
          <div>
            <label className="label">
              <span className="label-text">Borrow Amount</span>
            </label>
            <input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="text-sm opacity-70">
            <p>Collateral Required: 150%</p>
            <p>Interest Rate: 8.5% APR</p>
          </div>
          <button className="btn btn-primary w-full">Borrow</button>
        </div>
      </div>
    </div>
  );
}
