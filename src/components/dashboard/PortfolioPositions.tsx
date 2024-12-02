import React from 'react';

const mockPositions = [
  { symbol: 'AAPL', shares: 100, value: 18750, change: 2.5, team: 'Tech Growth' },
  { symbol: 'MSFT', shares: 50, value: 16800, change: -1.2, team: 'Tech Growth' },
  { symbol: 'GOOGL', shares: 25, value: 15600, change: 0.8, team: 'Tech Growth' },
  { symbol: 'XOM', shares: 150, value: 14200, change: 1.5, team: 'Value' },
  { symbol: 'JPM', shares: 75, value: 12400, change: -0.6, team: 'Value' },
];

export function PortfolioPositions() {
  return (
    <div className="space-y-4">
      {mockPositions.map((position) => (
        <div 
          key={position.symbol}
          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div>
            <div className="font-medium">{position.symbol}</div>
            <div className="text-sm text-gray-500">
              {position.shares} shares • {position.team}
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">
              ${position.value.toLocaleString()}
            </div>
            <div 
              className={
                position.change >= 0 
                  ? "text-green-600" 
                  : "text-red-600"
              }
            >
              {position.change > 0 ? '+' : ''}{position.change}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}