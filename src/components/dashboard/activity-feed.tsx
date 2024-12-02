import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Activity {
  id: string;
  type: 'trade' | 'vote' | 'member';
  description: string;
  timestamp: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'trade',
    description: 'Team Alpha purchased 100 shares of AAPL',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'vote',
    description: 'New investment proposal ready for voting',
    timestamp: '4 hours ago'
  },
  {
    id: '3',
    type: 'member',
    description: 'Sarah joined Team Beta',
    timestamp: '1 day ago'
  }
];

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex justify-between items-start space-x-4 border-b pb-4 last:border-0"
            >
              <div>
                <p className="text-sm font-medium">{activity.description}</p>
                <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}