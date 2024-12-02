import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { clubId } = body;

    if (!clubId) {
      return new Response('Missing clubId', { status: 400 });
    }

    // Verify user has permission to disconnect account
    const membership = await db.clubMember.findFirst({
      where: {
        userId,
        clubId,
        role: {
          in: ['ADMIN', 'MODERATOR']
        }
      }
    });

    if (!membership) {
      return new Response('Permission denied', { status: 403 });
    }

    // Delete the brokerage connection
    await db.brokerageConnection.deleteMany({
      where: {
        clubId,
        provider: 'schwab'
      }
    });

    return new Response('Connection removed', { status: 200 });
  } catch (error) {
    console.error('Error disconnecting account:', error);
    return new Response('Internal server error', { status: 500 });
  }
}