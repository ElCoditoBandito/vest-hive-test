import React from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { MobileNav } from './mobile-nav';

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">VestHive</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <UserButton afterSignOutUrl="/" />
          </nav>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}