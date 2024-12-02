import React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <nav className="grid gap-2 py-6">
          <Link
            href="/dashboard"
            className="mx-[-0.75rem] flex items-center px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/clubs"
            className="mx-[-0.75rem] flex items-center px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            My Clubs
          </Link>
          <Link
            href="/teams"
            className="mx-[-0.75rem] flex items-center px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            Teams
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}