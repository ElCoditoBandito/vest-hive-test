import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ConnectAccountButtonProps {
  clubId: string;
  variant?: 'default' | 'outline';
}

export function ConnectAccountButton({ clubId, variant = 'default' }: ConnectAccountButtonProps) {
  const router = useRouter();

  const handleConnect = async () => {
    // Redirect to the Schwab connect endpoint
    router.push(`/api/schwab/connect?clubId=${clubId}`);
  };

  return (
    <Button
      variant={variant}
      onClick={handleConnect}
    >
      Connect Schwab Account
    </Button>
  );
}