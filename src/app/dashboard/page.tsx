import React from 'react';
import { MetricsCards } from '@/components/dashboard/metrics-cards';
import { PerformanceOverview } from '@/components/dashboard/performance-overview';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { QuickActions } from '@/components/dashboard/quick-actions';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <MetricsCards />
      <div className="grid gap-4 md:grid-cols-7">
        <PerformanceOverview />
        <div className="md:col-span-2 space-y-4">
          <QuickActions />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}