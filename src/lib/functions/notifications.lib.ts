import type { INotification, ITripInvite } from '@/typescript/interface/api';

export const notificationList = (value: unknown): INotification[] => {
  if (Array.isArray(value)) return value as INotification[];
  if (!value || typeof value !== 'object') return [];

  const record = value as Record<string, unknown>;
  const key = ['notifications', 'items', 'data'].find((candidate) => Array.isArray(record[candidate]));
  return key ? record[key] as INotification[] : [];
};

const listItems = (value: unknown): unknown[] => {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== 'object') return [];

  const record = value as Record<string, unknown>;
  const key = ['invites', 'items', 'data'].find((candidate) => Array.isArray(record[candidate]));
  return key ? record[key] as unknown[] : [];
};

export const pendingInviteNotifications = (value: unknown): INotification[] =>
  listItems(value)
    .filter((item): item is ITripInvite => Boolean(item && typeof item === 'object' && 'status' in item && (item as ITripInvite).status === 'pending'))
    .map((invite) => ({
        actionUrl: `/invites/${invite.id}`,
        body: invite.notes ?? `You have been invited as a ${invite.role}.`,
        createdAt: invite.createdAt,
        data: { tripName: invite.trip?.title ?? 'Shared trip' },
        id: `pending-invite-${invite.id}`,
        inviteId: invite.id,
        resourceId: invite.id,
        resourceType: 'trip_invite',
        title: invite.trip?.title ?? 'New trip invite',
        type: 'trip_invite',
      }));

const inviteId = (notification: INotification) => notification.inviteId || notification.resourceId || notification.resource_id;

export const mergeNotifications = (notifications: INotification[], pendingInvites: INotification[]) => {
  const existingInviteIds = new Set(
    notifications
      .filter((notification) => `${notification.type ?? ''} ${notification.resourceType ?? notification.resource_type ?? ''}`.toLowerCase().includes('invite'))
      .map(inviteId)
      .filter((id): id is string => Boolean(id)),
  );

  return [...notifications, ...pendingInvites.filter((notification) => !existingInviteIds.has(inviteId(notification) ?? ''))]
    .sort((left, right) => new Date(right.createdAt || right.created_at || 0).getTime() - new Date(left.createdAt || left.created_at || 0).getTime());
};
