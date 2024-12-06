'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function CollateralStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Position</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Collateral Ratio</span>
            <span className="font-medium">180%</span>
          </div>
          <Progress value={75} className="h-2" />
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
            <span className="font-medium text-success">1.8</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}