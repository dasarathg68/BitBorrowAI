'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function ReputationScore() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trust Score</CardTitle>
      </CardHeader>
      <CardContent>
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
            <Progress value={85} className="h-2" />
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
      </CardContent>
    </Card>
  );
}