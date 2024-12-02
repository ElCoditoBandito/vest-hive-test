import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { SchwabClient } from '@/lib/schwab/client';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state'); // clubId

  if (!code || !state) {
    return new Response('Missing required parameters', { status: 400 });
  }

  try {
    const schwabClient = new SchwabClient({
      clientId: process.env.SCHWAB_CLIENT_ID!,
      clientSecret: process.env.SCHWAB_CLIENT_SECRET!,
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/schwab/callback`,
      scope: ['trading', 'accounts'],
    });

    const token = await schwabClient.handleCallback(code);

    // Store the connection in the database
    await db.brokerageConnection.create({
      data: {
        clubId: state,
        provider: 'schwab',
        accountId: '', // This will be filled after getting account details
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        expiresAt: new Date(Date.now() + token.expiresIn * 1000),
      },
    });

    // Redirect back to the club page
    return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/clubs/${state}`);
  } catch (error) {
    console.error('Schwab callback error:', error);
    return new Response('Authentication failed', { status: 500 });
  }
}