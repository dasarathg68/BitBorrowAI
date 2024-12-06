"use client";

export function ReputationScore() {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Trust Score</h2>
      </div>
      <div className="card-body">
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-4xl font-bold">85</span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>Network Trust</span>
              <span>85%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-primary rounded-full" style={{ width: "85%" }}></div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Transactions</span>
              <span>124</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Successful Trades</span>
              <span>98%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Network Position</span>
              <span>Top 15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
