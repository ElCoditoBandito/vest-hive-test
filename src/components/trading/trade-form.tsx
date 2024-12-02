import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { formatCurrency } from '@/lib/format';

interface TradeFormProps {
  onSubmit: (data: {
    symbol: string;
    side: 'buy' | 'sell';
    quantity: number;
    orderType: 'market' | 'limit';
    limitPrice?: number;
  }) => void;
  availableCash: number;
}

export function TradeForm({ onSubmit, availableCash }: TradeFormProps) {
  const [symbol, setSymbol] = React.useState('');
  const [side, setSide] = React.useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = React.useState('');
  const [orderType, setOrderType] = React.useState<'market' | 'limit'>('market');
  const [limitPrice, setLimitPrice] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      symbol: symbol.toUpperCase(),
      side,
      quantity: parseInt(quantity),
      orderType,
      limitPrice: orderType === 'limit' ? parseFloat(limitPrice) : undefined,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Place Trade</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Trade Type</Label>
            <RadioGroup
              value={side}
              onValueChange={(value) => setSide(value as 'buy' | 'sell')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="buy" id="buy" />
                <Label htmlFor="buy">Buy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sell" id="sell" />
                <Label htmlFor="sell">Sell</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="symbol">Symbol</Label>
            <Input
              id="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="Enter stock symbol"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Order Type</Label>
            <RadioGroup
              value={orderType}
              onValueChange={(value) => setOrderType(value as 'market' | 'limit')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="market" id="market" />
                <Label htmlFor="market">Market</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="limit" id="limit" />
                <Label htmlFor="limit">Limit</Label>
              </div>
            </RadioGroup>
          </div>

          {orderType === 'limit' && (
            <div className="space-y-2">
              <Label htmlFor="limitPrice">Limit Price</Label>
              <Input
                id="limitPrice"
                type="number"
                step="0.01"
                min="0.01"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                required
              />
            </div>
          )}

          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-medium">Available Cash</p>
            <p className="text-2xl font-bold">{formatCurrency(availableCash)}</p>
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full">
            Place {side.charAt(0).toUpperCase() + side.slice(1)} Order
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}