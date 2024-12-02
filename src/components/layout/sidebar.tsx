import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarNavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const sidebarNavItems: SidebarNavItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'My Clubs', href: '/clubs' },
  { title: 'Teams', href: '/teams' },
  { title: 'Performance', href: '/performance' },
  { title: 'Settings', href: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-background md:block">
      <ScrollArea className="flex h-[calc(100vh-3.5rem)] flex-col gap-2 p-4">
        <div className="w-64 space-y-4 py-4">
          {sidebarNavItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start',
                pathname === item.href && 'bg-muted'
              )}
              asChild
            >
              <Link href={item.href}>
                {item.icon && (
                  <item.icon className="mr-2 h-4 w-4" />
                )}
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}