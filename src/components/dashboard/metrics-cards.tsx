import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Briefcase } from 'lucide-react';

interface Metric {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
}

const metrics: Metric[] = [
  {
    title: 'Total Portfolio Value',
    value: '$124,500',
    change: '+12.5%',
    icon: <TrendingUp className="h-4 w-4 text-green-500" />
  },
  {
    title: 'Active Clubs',
    value: '3',
    icon: <Briefcase className="h-4 w-4" />
  },
  {
    title: 'Team Members',
    value: '12',
    icon: <Users className="h-4 w-4" />
  }
];

export function MetricsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            {metric.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            {metric.change && (
              <p className="text-xs text-muted-foreground">
                {metric.change} from last month
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}