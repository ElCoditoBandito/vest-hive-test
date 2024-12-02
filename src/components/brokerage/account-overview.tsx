import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/format';

interface AccountOverviewProps {
  accountId: string;
  balance: number;
  positions: Array<{
    symbol: string;
    quantity: number;
    marketValue: number;
    unrealizedGainLoss: number;
  }>;
  onDisconnect?: () => void;
}

export function AccountOverview({
  accountId,
  balance,
  positions,
  onDisconnect
}: AccountOverviewProps) {
  const totalValue = positions.reduce((sum, pos) => sum + pos.marketValue, 0);
  const totalGainLoss = positions.reduce((sum, pos) => sum + pos.unrealizedGainLoss, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Brokerage Account</CardTitle>
        {onDisconnect && (
          <Button variant="outline" onClick={onDisconnect}>
            Disconnect Account
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Account ID</p>
              <p className="text-2xl font-bold">{accountId}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Cash Balance</p>
              <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Positions Overview</h3>
            <div className="space-y-2">
              {positions.map((position) => (
                <div
                  key={position.symbol}
                  className="flex items-center justify-between py-2 border-b"
                >
                  <div>
                    <p className="font-medium">{position.symbol}</p>
                    <p className="text-sm text-muted-foreground">
                      {position.quantity} shares
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatCurrency(position.marketValue)}
                    </p>
                    <p className={`text-sm ${position.unrealizedGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(position.unrealizedGainLoss)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground">Total Gain/Loss</p>
                <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(totalGainLoss)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}