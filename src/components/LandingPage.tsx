import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">VestHive</div>
        <div className="space-x-4">
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:text-gray-300">Login</Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
          </Link>
        </div>
      </nav>
      
      <main className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Elevate Your Investment Club Experience
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Manage portfolios, track team performance, and collaborate seamlessly with your investment club members.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                Start Your Club
              </Button>
            </Link>
            <Button variant="outline" className="text-white border-white hover:bg-white/10 px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};