'use server';

import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

type CreateTeamInput = {
  clubId: string;
  name: string;
  description: string;
  imageUrl?: string;
  allocation: number;
};

export async function createTeam(data: CreateTeamInput) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const membership = await db.clubMember.findFirst({
    where: {
      userId,
      clubId: data.clubId,
      role: {
        in: ['ADMIN', 'MODERATOR']
      }
    }
  });

  if (!membership) {
    throw new Error('Permission denied');
  }

  const team = await db.team.create({
    data: {
      ...data,
      members: {
        create: {
          userId,
          role: 'LEADER'
        }
      }
    }
  });

  revalidatePath(`/clubs/${data.clubId}`);
  return team;
}

type UpdateTeamInput = {
  clubId: string;
  teamId: string;
  name: string;
  description: string;
  imageUrl?: string;
  allocation: number;
};

export async function updateTeam({ clubId, teamId, ...data }: UpdateTeamInput) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const [teamMembership, clubMembership] = await Promise.all([
    db.teamMember.findFirst({
      where: {
        userId,
        teamId,
        role: 'LEADER'
      }
    }),
    db.clubMember.findFirst({
      where: {
        userId,
        clubId,
        role: 'ADMIN'
      }
    })
  ]);

  if (!teamMembership && !clubMembership) {
    throw new Error('Permission denied');
  }

  const team = await db.team.update({
    where: { id: teamId },
    data
  });

  revalidatePath(`/clubs/${clubId}/teams/${teamId}`);
  return team;
}

type UpdateTeamMemberInput = {
  clubId: string;
  teamId: string;
  memberId: string;
  role: 'LEADER' | 'MEMBER';
};

export async function updateTeamMember({
  clubId,
  teamId,
  memberId,
  role
}: UpdateTeamMemberInput) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const [teamMembership, clubMembership] = await Promise.all([
    db.teamMember.findFirst({
      where: {
        userId,
        teamId,
        role: 'LEADER'
      }
    }),
    db.clubMember.findFirst({
      where: {
        userId,
        clubId,
        role: 'ADMIN'
      }
    })
  ]);

  if (!teamMembership && !clubMembership) {
    throw new Error('Permission denied');
  }

  const member = await db.teamMember.update({
    where: {
      teamId_userId: {
        teamId,
        userId: memberId
      }
    },
    data: { role }
  });

  revalidatePath(`/clubs/${clubId}/teams/${teamId}`);
  return member;
}

type AddTeamMemberInput = {
  clubId: string;
  teamId: string;
  userId: string;
};

export async function addTeamMember({ clubId, teamId, userId: memberUserId }: AddTeamMemberInput) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const [teamMembership, clubMembership] = await Promise.all([
    db.teamMember.findFirst({
      where: {
        userId,
        teamId,
        role: 'LEADER'
      }
    }),
    db.clubMember.findFirst({
      where: {
        userId,
        clubId,
        role: 'ADMIN'
      }
    })
  ]);

  if (!teamMembership && !clubMembership) {
    throw new Error('Permission denied');
  }

  // Verify user is a club member
  const clubMember = await db.clubMember.findFirst({
    where: {
      userId: memberUserId,
      clubId
    }
  });

  if (!clubMember) {
    throw new Error('User must be a club member first');
  }

  const member = await db.teamMember.create({
    data: {
      userId: memberUserId,
      teamId,
      role: 'MEMBER'
    }
  });

  revalidatePath(`/clubs/${clubId}/teams/${teamId}`);
  return member;
}

type RemoveTeamMemberInput = {
  clubId: string;
  teamId: string;
  userId: string;
};

export async function removeTeamMember({ clubId, teamId, userId: memberUserId }: RemoveTeamMemberInput) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  // Allow self-removal or require leader/admin permission
  if (userId !== memberUserId) {
    const [teamMembership, clubMembership] = await Promise.all([
      db.teamMember.findFirst({
        where: {
          userId,
          teamId,
          role: 'LEADER'
        }
      }),
      db.clubMember.findFirst({
        where: {
          userId,
          clubId,
          role: 'ADMIN'
        }
      })
    ]);

    if (!teamMembership && !clubMembership) {
      throw new Error('Permission denied');
    }
  }

  await db.teamMember.delete({
    where: {
      teamId_userId: {
        teamId,
        userId: memberUserId
      }
    }
  });

  revalidatePath(`/clubs/${clubId}/teams/${teamId}`);
}