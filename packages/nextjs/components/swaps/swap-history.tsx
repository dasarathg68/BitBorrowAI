"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <Card>
      <CardHeader>
        <CardTitle>Swap History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] md:h-[400px]">
          <div className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockHistory.map((swap) => (
                  <TableRow key={swap.id}>
                    <TableCell className="font-medium">{swap.date}</TableCell>
                    <TableCell>{swap.from}</TableCell>
                    <TableCell>{swap.to}</TableCell>
                    <TableCell className="text-right">{swap.amount}</TableCell>
                    <TableCell className="hidden sm:table-cell text-right">
                      {swap.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
