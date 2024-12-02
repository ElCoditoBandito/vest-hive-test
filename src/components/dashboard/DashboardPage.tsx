'use client';

import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PortfolioChart } from './PortfolioChart';
import { PortfolioPositions } from './PortfolioPositions';
import { useAuth } from '@/hooks/useAuth';

export function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">VestHive</div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.name}</span>
            <Button 
              variant="outline" 
              onClick={() => logout()}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <PortfolioChart />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Team Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <PortfolioPositions />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}