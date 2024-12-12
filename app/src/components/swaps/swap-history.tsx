"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Swap History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] md:h-[400px] overflow-x-auto">
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
                {mockHistory.map((swap, index) => (
                  <motion.tr
                    key={swap.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <TableCell className="font-medium">{swap.date}</TableCell>
                    <TableCell>{swap.from}</TableCell>
                    <TableCell>{swap.to}</TableCell>
                    <TableCell className="text-right">{swap.amount}</TableCell>
                    <TableCell className="hidden sm:table-cell text-right">
                      {swap.status}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
