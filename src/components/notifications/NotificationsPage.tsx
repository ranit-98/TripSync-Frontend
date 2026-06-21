'use client';

import { useNotificationsDelete, useNotificationsList, useNotificationsRead, useNotificationsReadAll } from '@/api/hooks/notifications/useNotifications.hooks';
import { useTripsPendingInvites } from '@/api/hooks/trips/useTrips.hooks';
import AppSidebar from '@/components/layout/AppSidebar';
import { mergeNotifications, notificationList, pendingInviteNotifications } from '@/lib/functions/notifications.lib';
import { NotificationsPageWrapper } from '@/styles/notifications/notifications.styles';
import type { INotification } from '@/typescript/interface/api';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

type FilterKey = 'all' | 'invite' | 'expense' | 'itinerary';

const isUnread = (notification: INotification) =>
  !notification.readAt && !notification.read_at && !notification.isRead && !notification.read;

const isPendingInviteNotification = (notification: INotification) => notification.id.startsWith('pending-invite-');

const actionUrlFor = (notification: INotification) => {
  const resourceType = notification.resourceType || notification.resource_type;
  const invitationId = notification.inviteId || notification.resourceId || notification.resource_id;
  const isActualInvite = notification.type === 'trip_invite' || resourceType === 'trip_invite' || resourceType === 'invite';

  return notification.actionUrl || notification.action_url || (isActualInvite && invitationId ? `/invites/${invitationId}` : undefined);
};

const notificationText = (notification: INotification) =>
  [notification.type, notification.resourceType, notification.resource_type, notification.title, notification.message, notification.body]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

const categoryFor = (notification: INotification): FilterKey => {
  const text = notificationText(notification);
  if (text.includes('invite')) return 'invite';
  if (text.includes('expense') || text.includes('budget') || text.includes('settlement')) return 'expense';
  if (text.includes('itinerary') || text.includes('activity') || text.includes('schedule')) return 'itinerary';
  return 'all';
};

const getTripName = (notification: INotification) => {
  const source = notification.metadata || notification.data || {};
  const tripName = source.tripName || source.tripTitle || source.trip_name || source.trip_title;
  return typeof tripName === 'string' ? tripName : undefined;
};

const getDate = (notification: INotification) => {
  const value = notification.createdAt || notification.created_at;
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date : null;
};

const timeLabel = (notification: INotification) => {
  const date = getDate(notification);
  if (!date) return 'Recently';
  const elapsedMinutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (elapsedMinutes < 1) return 'Just now';
  if (elapsedMinutes < 60) return `${elapsedMinutes}m ago`;
  if (elapsedMinutes < 1440) return `${Math.floor(elapsedMinutes / 60)}h ago`;
  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: date.getFullYear() === new Date().getFullYear() ? undefined : 'numeric' });
};

const sectionLabel = (notification: INotification) => {
  const date = getDate(notification);
  if (!date) return 'Earlier';
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  if (date >= startOfToday) return 'Today';
  if (date >= startOfYesterday) return 'Yesterday';
  return 'Earlier';
};

const notificationIcon = (notification: INotification) => {
  switch (categoryFor(notification)) {
    case 'invite': return GroupAddIcon;
    case 'expense': return ReceiptLongIcon;
    case 'itinerary': return EventNoteIcon;
    default: return notificationText(notification).includes('photo') ? PhotoLibraryIcon : NotificationsIcon;
  }
};

export default function NotificationsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterKey>('all');
  const { data: notificationsResponse, isLoading } = useNotificationsList();
  const { data: pendingInvitesResponse, isLoading: arePendingInvitesLoading } = useTripsPendingInvites();
  const readNotification = useNotificationsRead({ optionalCallback: () => undefined });
  const readAll = useNotificationsReadAll({ optionalCallback: () => undefined });
  const deleteNotification = useNotificationsDelete({ optionalCallback: () => undefined });
  const notifications = useMemo(() => mergeNotifications(
    notificationList(notificationsResponse?.data.data),
    pendingInviteNotifications(pendingInvitesResponse?.data.data),
  ), [notificationsResponse?.data.data, pendingInvitesResponse?.data.data]);
  const unreadCount = notifications.filter(isUnread).length;
  const todayCount = notifications.filter((notification) => sectionLabel(notification) === 'Today').length;
  const counts = useMemo(() => ({
    all: notifications.length,
    invite: notifications.filter((notification) => categoryFor(notification) === 'invite').length,
    expense: notifications.filter((notification) => categoryFor(notification) === 'expense').length,
    itinerary: notifications.filter((notification) => categoryFor(notification) === 'itinerary').length,
  }), [notifications]);
  const displayedNotifications = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return notifications.filter((notification) => {
      const matchesFilter = filter === 'all' || categoryFor(notification) === filter;
      return matchesFilter && (!term || `${notification.title || ''} ${notification.message || notification.body || ''} ${getTripName(notification) || ''}`.toLowerCase().includes(term));
    });
  }, [filter, notifications, searchTerm]);
  const sections = useMemo(() => ['Today', 'Yesterday', 'Earlier'].map((label) => ({ label, items: displayedNotifications.filter((notification) => sectionLabel(notification) === label) })).filter((section) => section.items.length), [displayedNotifications]);

  const handleOpen = async (notification: INotification) => {
    if (isUnread(notification) && !isPendingInviteNotification(notification)) await readNotification.mutateAsync({ notificationId: notification.id });
    const actionUrl = actionUrlFor(notification);
    if (actionUrl) router.push(actionUrl);
  };

  return (
    <NotificationsPageWrapper>
      <AppSidebar active="notifications" showNewTrip />
      <Box className="notifications_main" component="main">
        <Box className="notifications_topbar" component="header">
          <Box><Typography className="page_title" component="h1">Notifications</Typography><Typography className="page_subtitle">Track trip invites, itinerary updates, and budget changes.</Typography></Box>
          <Box className="search_wrap"><SearchIcon className="search_icon" /><TextField className="search_input" hiddenLabel placeholder="Search notifications..." size="small" fullWidth value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /></Box>
        </Box>
        <Box className="notifications_content">
          <Box className="panel">
            <Box className="panel_header"><Box><Typography className="panel_title" component="h2">Inbox</Typography><Typography className="page_subtitle">{unreadCount ? `${unreadCount} unread update${unreadCount === 1 ? '' : 's'} need your attention.` : 'You are all caught up.'}</Typography></Box><Button className="mark_btn" disabled={!unreadCount || readAll.isPending} onClick={() => readAll.mutate()}>Mark all read</Button></Box>
            <Box className="notification_sections">
              {(isLoading || arePendingInvitesLoading) && <Typography className="empty_state">Loading notifications...</Typography>}
              {!isLoading && !arePendingInvitesLoading && sections.length === 0 && <Typography className="empty_state">No notifications match this view.</Typography>}
              {sections.map((section) => <Box component="section" key={section.label}><Typography className="section_label">{section.label}</Typography><Box className="notification_list">{section.items.map((notification) => {
                const Icon = notificationIcon(notification); const unread = isUnread(notification); const tripName = getTripName(notification);
                const actionUrl = actionUrlFor(notification);
                return <Box className={`notification_card${unread ? ' unread' : ''}${actionUrl ? ' actionable' : ''}`} key={notification.id} onClick={() => handleOpen(notification)} role={actionUrl ? 'button' : undefined} tabIndex={actionUrl ? 0 : undefined}>
                  <Box className="icon_avatar"><Icon /></Box><Box><Typography className="notification_text"><strong>{notification.title || 'Trip update'}</strong>{notification.message || notification.body ? ` ${notification.message || notification.body}` : ''}</Typography><Box className="notification_meta">{tripName && <span className={`trip_chip${unread ? '' : ' neutral'}`}>{tripName}</span>}<span className="notification_time">{timeLabel(notification)}</span></Box></Box>
                  <Box className="notification_actions">{unread && <span className="unread_dot" />}{!unread && <IconButton aria-label="Delete notification" size="small" onClick={(event) => { event.stopPropagation(); deleteNotification.mutate({ notificationId: notification.id }); }}><DeleteOutlineIcon fontSize="small" /></IconButton>}</Box>
                </Box>;
              })}</Box></Box>)}
            </Box>
          </Box>
          <Box className="summary_stack"><Box className="summary_card"><Typography className="summary_title" component="h2">Activity Summary</Typography><Box className="metric_grid"><Box className="metric_tile"><span className="metric_value">{unreadCount}</span><span className="metric_label">Unread</span></Box><Box className="metric_tile"><span className="metric_value">{todayCount}</span><span className="metric_label">Today</span></Box></Box></Box><Box className="summary_card"><Typography className="summary_title" component="h2">Filters</Typography><Box className="filter_list">{([['all', 'All notifications'], ['invite', 'Invites'], ['expense', 'Budgets'], ['itinerary', 'Itinerary']] as const).map(([key, label]) => <button className={`filter_item${filter === key ? ' active' : ''}`} key={key} onClick={() => setFilter(key)} type="button"><span>{label}</span><strong>{counts[key]}</strong></button>)}</Box></Box><Box className="summary_card"><Typography className="summary_title" component="h2">Quick Actions</Typography><Box className="filter_list"><Button href="/trips/create" startIcon={<AddIcon />} variant="contained">New Trip</Button><Button href="/trips" startIcon={<NotificationsIcon />} variant="outlined">Review trip activity</Button></Box></Box></Box>
        </Box>
      </Box>
    </NotificationsPageWrapper>
  );
}
