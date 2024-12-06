"use client";

export function CollateralStats() {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Your Position</h2>

        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>Collateral Ratio</span>
              <span className="font-medium">180%</span>
            </div>
            <progress className="progress w-full" value={75} max={100}></progress>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm opacity-70">Deposited</span>
              <span className="font-medium">2.5 cBTC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm opacity-70">Borrowed</span>
              <span className="font-medium">1.2 cBTC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm opacity-70">Health Factor</span>
              <span className="font-medium text-success">1.8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
