import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { SchwabClient } from '@/lib/schwab/client';

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const clubId = searchParams.get('clubId');

    if (!clubId) {
      return new Response('Missing clubId', { status: 400 });
    }

    // Get the brokerage connection
    const connection = await db.brokerageConnection.findFirst({
      where: {
        clubId,
        provider: 'schwab'
      }
    });

    if (!connection) {
      return new Response('No brokerage connection found', { status: 404 });
    }

    const schwabClient = new SchwabClient({
      clientId: process.env.SCHWAB_CLIENT_ID!,
      clientSecret: process.env.SCHWAB_CLIENT_SECRET!,
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/schwab/callback`,
      scope: ['trading', 'accounts'],
    });

    const accounts = await schwabClient.getAccounts();
    return Response.json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return new Response('Internal server error', { status: 500 });
  }
}