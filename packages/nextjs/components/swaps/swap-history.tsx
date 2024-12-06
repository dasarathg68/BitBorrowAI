"use client";

const mockHistory = [
  {
    id: 1,
    date: "2024-01-20",
    from: "BTC",
    to: "cBTC",
    amount: "0.5",
    status: "Completed",
  },
  {
    id: 2,
    date: "2024-01-19",
    from: "cBTC",
    to: "BTC",
    amount: "0.3",
    status: "Completed",
  },
];

export function SwapHistory() {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Swap History</h2>

        <div className="h-[300px] md:h-[400px] overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th className="w-[100px]">Date</th>
                <th>From</th>
                <th>To</th>
                <th className="text-right">Amount</th>
                <th className="hidden sm:table-cell text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockHistory.map(swap => (
                <tr key={swap.id}>
                  <td className="font-medium">{swap.date}</td>
                  <td>{swap.from}</td>
                  <td>{swap.to}</td>
                  <td className="text-right">{swap.amount}</td>
                  <td className="hidden sm:table-cell text-right">{swap.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
