import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';

export async function getTeam(teamId: string) {
  const { userId } = auth();
  if (!userId) return null;

  const team = await db.team.findUnique({
    where: {
      id: teamId
    },
    include: {
      club: {
        include: {
          members: {
            where: {
              userId
            }
          }
        }
      },
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

  if (!team) return null;

  // Verify user is a club member
  if (team.club.members.length === 0) return null;

  return team;
}

export async function getTeamRole(teamId: string) {
  const { userId } = auth();
  if (!userId) return null;

  const membership = await db.teamMember.findUnique({
    where: {
      teamId_userId: {
        teamId,
        userId
      }
    }
  });

  return membership?.role || null;
}