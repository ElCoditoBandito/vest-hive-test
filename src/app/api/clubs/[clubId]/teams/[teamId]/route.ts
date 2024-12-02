import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { clubId: string; teamId: string } }
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

    const team = await db.team.findUnique({
      where: {
        id: params.teamId,
        clubId: params.clubId
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
        performance: {
          orderBy: {
            date: 'desc'
          },
          take: 30
        },
        transactions: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 10
        }
      }
    });

    if (!team) {
      return new Response('Team not found', { status: 404 });
    }

    return Response.json(team);
  } catch (error) {
    console.error('Error fetching team:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { clubId: string; teamId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Verify user is team leader or club admin
    const [teamMembership, clubMembership] = await Promise.all([
      db.teamMember.findFirst({
        where: {
          userId,
          teamId: params.teamId,
          role: 'LEADER'
        }
      }),
      db.clubMember.findFirst({
        where: {
          userId,
          clubId: params.clubId,
          role: 'ADMIN'
        }
      })
    ]);

    if (!teamMembership && !clubMembership) {
      return new Response('Permission denied', { status: 403 });
    }

    const body = await request.json();
    const { name, description, imageUrl, allocation } = body;

    const team = await db.team.update({
      where: {
        id: params.teamId,
        clubId: params.clubId
      },
      data: {
        name,
        description,
        imageUrl,
        allocation
      }
    });

    return Response.json(team);
  } catch (error) {
    console.error('Error updating team:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { clubId: string; teamId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Verify user is club admin
    const clubMembership = await db.clubMember.findFirst({
      where: {
        userId,
        clubId: params.clubId,
        role: 'ADMIN'
      }
    });

    if (!clubMembership) {
      return new Response('Permission denied', { status: 403 });
    }

    // Delete the team and all related data
    await db.team.delete({
      where: {
        id: params.teamId,
        clubId: params.clubId
      }
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting team:', error);
    return new Response('Internal server error', { status: 500 });
  }
}