import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Vote, Users } from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const quickActions: QuickAction[] = [
  {
    id: '1',
    label: 'Create New Club',
    icon: <PlusCircle className="h-4 w-4" />,
    href: '/clubs/new'
  },
  {
    id: '2',
    label: 'Start Vote',
    icon: <Vote className="h-4 w-4" />,
    href: '/votes/new'
  },
  {
    id: '3',
    label: 'Invite Members',
    icon: <Users className="h-4 w-4" />,
    href: '/invite'
  }
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="w-full justify-start"
              asChild
            >
              <a href={action.href}>
                {action.icon}
                <span className="ml-2">{action.label}</span>
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}