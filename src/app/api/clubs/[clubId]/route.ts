import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { clubId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Verify user is a member of the club
    const membership = await db.clubMember.findFirst({
      where: {
        userId,
        clubId: params.clubId
      }
    });

    if (!membership) {
      return new Response('Not a member of this club', { status: 403 });
    }

    const club = await db.club.findUnique({
      where: {
        id: params.clubId
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                imageUrl: true
              }
            }
          }
        },
        teams: {
          include: {
            members: true,
            performance: {
              orderBy: {
                date: 'desc'
              },
              take: 1
            }
          }
        },
        brokerageConnections: true,
        transactions: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 10
        }
      }
    });

    if (!club) {
      return new Response('Club not found', { status: 404 });
    }

    return Response.json(club);
  } catch (error) {
    console.error('Error fetching club:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { clubId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Verify user is an admin
    const membership = await db.clubMember.findFirst({
      where: {
        userId,
        clubId: params.clubId,
        role: 'ADMIN'
      }
    });

    if (!membership) {
      return new Response('Permission denied', { status: 403 });
    }

    const body = await request.json();
    const { name, description, imageUrl } = body;

    const club = await db.club.update({
      where: {
        id: params.clubId
      },
      data: {
        name,
        description,
        imageUrl
      }
    });

    return Response.json(club);
  } catch (error) {
    console.error('Error updating club:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { clubId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Verify user is an admin
    const membership = await db.clubMember.findFirst({
      where: {
        userId,
        clubId: params.clubId,
        role: 'ADMIN'
      }
    });

    if (!membership) {
      return new Response('Permission denied', { status: 403 });
    }

    // Delete the club and all related data
    await db.club.delete({
      where: {
        id: params.clubId
      }
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting club:', error);
    return new Response('Internal server error', { status: 500 });
  }
}