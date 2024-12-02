import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';

export async function POST(
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
    const { memberUserId, role = 'MEMBER' } = body;

    // Verify user is a member of the club
    const clubMember = await db.clubMember.findFirst({
      where: {
        userId: memberUserId,
        clubId: params.clubId
      }
    });

    if (!clubMember) {
      return new Response('User must be a club member first', { status: 400 });
    }

    // Add member to team
    const teamMember = await db.teamMember.create({
      data: {
        userId: memberUserId,
        teamId: params.teamId,
        role
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            imageUrl: true
          }
        }
      }
    });

    return Response.json(teamMember);
  } catch (error) {
    console.error('Error adding team member:', error);
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

    const body = await request.json();
    const { memberUserId } = body;

    // Verify user is team leader, club admin, or removing themselves
    if (userId !== memberUserId) {
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
    }

    // Remove member from team
    await db.teamMember.delete({
      where: {
        teamId_userId: {
          teamId: params.teamId,
          userId: memberUserId
        }
      }
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error removing team member:', error);
    return new Response('Internal server error', { status: 500 });
  }
}