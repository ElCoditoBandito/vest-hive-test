import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import Link from 'next/link';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
  footerText?: string;
  footerLink?: {
    text: string;
    href: string;
  };
}

export function AuthCard({
  children,
  title,
  description,
  footerText,
  footerLink,
}: AuthCardProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {children}
        {(footerText || footerLink) && (
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            {footerText}{' '}
            {footerLink && (
              <Link 
                href={footerLink.href}
                className="ml-1 text-primary hover:underline"
              >
                {footerLink.text}
              </Link>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}