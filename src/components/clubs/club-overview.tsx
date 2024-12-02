import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MemberList } from '@/components/shared/member-list';
import { PerformanceChart } from '@/components/shared/performance-chart';

interface ClubOverviewProps {
  clubId: string;
  clubName: string;
  description: string;
  performance: {
    date: string;
    value: number;
  }[];
  members: {
    id: string;
    name: string;
    role: string;
    imageUrl?: string;
  }[];
}

export function ClubOverview({ 
  clubName, 
  description, 
  performance, 
  members 
}: ClubOverviewProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>{clubName}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <PerformanceChart data={performance} />
          </div>
        </CardContent>
      </Card>
      <MemberList title="Club Members" members={members} />
    </div>
  );
}