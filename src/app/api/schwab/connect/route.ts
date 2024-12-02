import { NextRequest } from 'next/server';
import { SchwabClient } from '@/lib/schwab/client';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const clubId = searchParams.get('clubId');

  if (!clubId) {
    return new Response('Missing clubId', { status: 400 });
  }

  const schwabClient = new SchwabClient({
    clientId: process.env.SCHWAB_CLIENT_ID!,
    clientSecret: process.env.SCHWAB_CLIENT_SECRET!,
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/schwab/callback`,
    scope: ['trading', 'accounts'],
  });

  // Generate auth URL and redirect to Schwab
  const authUrl = schwabClient.getAuthUrl();
  return Response.redirect(`${authUrl}&state=${clubId}`);
}