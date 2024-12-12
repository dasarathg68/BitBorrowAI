"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function CollateralStats() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Your Position</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Collateral Ratio</span>
            <span className="font-medium">180%</span>
          </div>
          <Progress value={75} className="w-full" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Deposited</span>
            <span className="font-medium">2.5 cBTC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Borrowed</span>
            <span className="font-medium">1.2 cBTC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Health Factor</span>
            <span className="font-medium text-green-500">1.8</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
