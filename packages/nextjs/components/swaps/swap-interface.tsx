"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp } from "lucide-react";
import { useState } from "react";

export function SwapInterface() {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle>Swap Tokens</CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">From</label>
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="w-full"
            />
            <span className="block mt-1 text-sm text-muted-foreground">
              BTC
            </span>
          </div>

          <div className="flex justify-center">
            <Button variant="ghost" size="icon">
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">To</label>
            <Input
              type="number"
              placeholder="0.0"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              className="w-full"
            />
            <span className="block mt-1 text-sm text-muted-foreground">
              cBTC
            </span>
          </div>

          <div className="rounded-lg bg-muted p-3 text-sm space-y-2">
            <div className="flex flex-wrap justify-between gap-2">
              <span>Rate</span>
              <span>1 BTC = 0.998 cBTC</span>
            </div>
            <div className="flex flex-wrap justify-between gap-2">
              <span>Fee</span>
              <span>0.1%</span>
            </div>
          </div>

          <Button className="w-full">Swap</Button>
        </div>
      </CardContent>
    </Card>
  );
}
