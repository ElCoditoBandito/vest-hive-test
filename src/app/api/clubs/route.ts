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
    const { name, description, imageUrl } = body;

    // Create club and add creator as admin
    const club = await db.club.create({
      data: {
        name,
        description,
        imageUrl,
        members: {
          create: {
            userId,
            role: 'ADMIN'
          }
        }
      },
      include: {
        members: true
      }
    });

    return Response.json(club);
  } catch (error) {
    console.error('Error creating club:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Get all clubs where user is a member
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
            members: true
          }
        },
        _count: {
          select: {
            members: true,
            teams: true
          }
        }
      }
    });

    return Response.json(clubs);
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return new Response('Internal server error', { status: 500 });
  }
}