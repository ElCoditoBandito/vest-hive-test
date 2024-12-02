import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';

export async function getUserClubs() {
  const { userId } = auth();
  if (!userId) return [];

  const clubs = await db.club.findMany({
    where: {
      members: {
        some: {
          userId
        }
      }
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
      _count: {
        select: {
          members: true,
          teams: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return clubs;
}

export async function getClub(clubId: string) {
  const { userId } = auth();
  if (!userId) return null;

  const club = await db.club.findUnique({
    where: {
      id: clubId
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

  if (!club) return null;

  // Verify user is a member
  const isMember = club.members.some(member => member.user.id === userId);
  if (!isMember) return null;

  return club;
}