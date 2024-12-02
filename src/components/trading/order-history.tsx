import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/lib/format';
import { SchwabOrder } from '@/lib/schwab/types';

interface OrderHistoryProps {
  orders: SchwabOrder[];
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>
                  {new Date(order.timestamp).toLocaleDateString()}
                </TableCell>
                <TableCell>{order.symbol}</TableCell>
                <TableCell className="capitalize">{order.side}</TableCell>
                <TableCell className="text-right">{order.quantity}</TableCell>
                <TableCell className="text-right">
                  {order.filledPrice
                    ? formatCurrency(order.filledPrice)
                    : order.limitPrice
                    ? formatCurrency(order.limitPrice)
                    : 'Market'}
                </TableCell>
                <TableCell className="capitalize">{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}