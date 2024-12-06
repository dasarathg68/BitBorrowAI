'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

export function LendingDashboard() {
  const [amount, setAmount] = useState('');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lending Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="lend" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lend">Lend</TabsTrigger>
            <TabsTrigger value="borrow">Borrow</TabsTrigger>
          </TabsList>
          <TabsContent value="lend">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Amount (cBTC)</label>
                <Input
                  type="number"
                  placeholder="0.0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Current APY: 5.2%</p>
                <p>Total Value Locked: 145.23 cBTC</p>
              </div>
              <Button className="w-full">Lend cBTC</Button>
            </div>
          </TabsContent>
          <TabsContent value="borrow">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Borrow Amount</label>
                <Input
                  type="number"
                  placeholder="0.0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Collateral Required: 150%</p>
                <p>Interest Rate: 8.5% APR</p>
              </div>
              <Button className="w-full">Borrow</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}