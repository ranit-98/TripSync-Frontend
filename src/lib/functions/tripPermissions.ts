import type { ITripMember, IUser, TripRole } from '@/typescript/interface/api';

const normalizeEmail = (email?: string) => email?.trim().toLowerCase();

export const getCurrentTripRole = (
  members: ITripMember[],
  user?: Pick<IUser, 'id' | 'email'> | null,
): TripRole | undefined => {
  if (!user) return undefined;

  const userEmail = normalizeEmail(user.email);
  const membership = members.find((member) =>
    member.user?.id === user.id ||
    (Boolean(userEmail) && normalizeEmail(member.user?.email) === userEmail),
  );

  return membership?.role;
};

export const canManageTrip = (
  members: ITripMember[],
  user?: Pick<IUser, 'id' | 'email'> | null,
) => getCurrentTripRole(members, user) === 'collaborator';
