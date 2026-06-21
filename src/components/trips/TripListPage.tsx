'use client';

import { useNotificationsList } from '@/api/hooks/notifications/useNotifications.hooks';
import {
  useTripsAcceptInvite,
  useTripsDeclineInvite,
  useTripsList,
  useTripsPendingInvites,
} from '@/api/hooks/trips/useTrips.hooks';
import AppSidebar from '@/components/layout/AppSidebar';
import ImageComp from '@/components/image/ImageComp';
import { TripListSkeleton } from '@/components/skeleton';
import { dashboardAssets } from '@/json/assets';
import { TripListPageWrapper } from '@/styles/trips/tripList.styles';
import type { ApiId, INotification, ITrip, ITripInvite } from '@/typescript/interface/api';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PaymentsIcon from '@mui/icons-material/Payments';
import SearchIcon from '@mui/icons-material/Search';
import StyleIcon from '@mui/icons-material/Style';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const formatTripDateRange = (startDate?: string, endDate?: string) => {
  if (!startDate || !endDate) {
    return 'Dates not set';
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 'Dates not set';
  }

  const formatter = new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return `${formatter.format(start)} - ${formatter.format(end)}`;
};

const getTripStatus = (trip: ITrip) => {
  const now = Date.now();
  const start = new Date(trip.startDate).getTime();
  const end = new Date(trip.endDate).getTime();

  if (Number.isNaN(start) || Number.isNaN(end)) {
    return { label: 'Planned', tone: 'neutral' };
  }

  if (now < start) {
    return { label: 'Upcoming', tone: 'secondary' };
  }

  if (now <= end) {
    return { label: 'Active', tone: 'primary' };
  }

  return { label: 'Completed', tone: 'neutral' };
};

type PendingInvite = {
  id: ApiId;
  inviteId: ApiId;
  message: string;
  tripName: string;
};

const getRecordValue = (record: Record<string, unknown> | undefined, key: string) => {
  const value = record?.[key];

  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
};

const toArray = <T,>(value: unknown): T[] => {
  if (Array.isArray(value)) return value as T[];

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const candidates = [record.notifications, record.invites, record.items, record.data];
    const arrayValue = candidates.find(Array.isArray);

    if (arrayValue) return arrayValue as T[];
  }

  return [];
};

const getPendingInviteFromTripInvite = (invite: ITripInvite): PendingInvite | null => {
  if (!invite.id || invite.status !== 'pending') {
    return null;
  }

  return {
    id: invite.id,
    inviteId: invite.id,
    message: invite.notes || `You have been invited as a ${invite.role}.`,
    tripName: invite.trip?.title || 'Shared trip',
  };
};

const getInviteIdFromUrl = (url?: string) => {
  const match = url?.match(/\/invites\/([^/?#]+)/);

  return match?.[1];
};

const getPendingInvite = (notification: INotification): PendingInvite | null => {
  const resourceType = notification.resourceType || notification.resource_type || '';
  const text = `${notification.type ?? ''} ${resourceType} ${notification.title ?? ''} ${notification.message ?? ''} ${notification.body ?? ''}`.toLowerCase();
  const inviteId =
    notification.inviteId ||
    notification.resourceId ||
    notification.resource_id ||
    getRecordValue(notification.metadata, 'inviteId') ||
    getRecordValue(notification.metadata, 'invite_id') ||
    getRecordValue(notification.metadata, 'resourceId') ||
    getRecordValue(notification.metadata, 'resource_id') ||
    getRecordValue(notification.data, 'inviteId') ||
    getRecordValue(notification.data, 'invite_id') ||
    getRecordValue(notification.data, 'resourceId') ||
    getRecordValue(notification.data, 'resource_id') ||
    getInviteIdFromUrl(notification.actionUrl || notification.action_url);
  const status =
    getRecordValue(notification.metadata, 'status') ||
    getRecordValue(notification.data, 'status') ||
    '';
  const isInviteActivity = ['trip_invite_declined', 'trip_invite_accepted', 'trip_member_joined'].includes(notification.type ?? '');
  const isInvite =
    resourceType === 'trip_invite' ||
    resourceType === 'invite' ||
    (!isInviteActivity && Boolean(inviteId) && (text.includes('invite') || text.includes('invitation')));
  const isClosedInvite = ['accepted', 'declined', 'expired'].includes(status.toLowerCase());

  if (!inviteId || !isInvite || isClosedInvite || isInviteActivity) {
    return null;
  }

  return {
    id: notification.id,
    inviteId,
    message: notification.message || notification.body || 'You have been invited to join a trip.',
    tripName:
      getRecordValue(notification.metadata, 'tripTitle') ||
      getRecordValue(notification.metadata, 'trip_title') ||
      getRecordValue(notification.metadata, 'tripName') ||
      getRecordValue(notification.metadata, 'trip_name') ||
      getRecordValue(notification.data, 'tripTitle') ||
      getRecordValue(notification.data, 'trip_title') ||
      getRecordValue(notification.data, 'tripName') ||
      getRecordValue(notification.data, 'trip_name') ||
      notification.title ||
      'Shared trip',
  };
};

export default function TripListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dismissedInviteIds, setDismissedInviteIds] = useState<string[]>([]);
  const { data: tripsResponse, isLoading } = useTripsList();
  const { data: notificationsResponse } = useNotificationsList();
  const { data: pendingInvitesResponse } = useTripsPendingInvites();
  const acceptInvite = useTripsAcceptInvite({ optionalCallback: () => undefined });
  const declineInvite = useTripsDeclineInvite({ optionalCallback: () => undefined });
  const trips = useMemo(() => tripsResponse?.data.data ?? [], [tripsResponse?.data.data]);
  const pendingInvites = useMemo(
    () => {
      const invitesFromApi = toArray<ITripInvite>(pendingInvitesResponse?.data.data)
        .map(getPendingInviteFromTripInvite)
        .filter((invite): invite is PendingInvite => Boolean(invite));
      const invitesFromNotifications = toArray<INotification>(notificationsResponse?.data.data)
        .map(getPendingInvite)
        .filter((invite): invite is PendingInvite => Boolean(invite));
      const invitesById = new Map<string, PendingInvite>();

      [...invitesFromApi, ...invitesFromNotifications].forEach((invite) => {
        if (!dismissedInviteIds.includes(invite.inviteId)) {
          invitesById.set(invite.inviteId, invite);
        }
      });

      return Array.from(invitesById.values());
    },
    [dismissedInviteIds, notificationsResponse?.data.data, pendingInvitesResponse?.data.data]
  );
  const filteredTrips = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return trips;
    }

    return trips.filter((trip) => {
      return `${trip.title} ${trip.destination}`.toLowerCase().includes(normalizedSearch);
    });
  }, [searchTerm, trips]);
  const featuredTrip = filteredTrips[0];

  return (
    <TripListPageWrapper>
      <AppSidebar active="trips" showNewTrip />

      <Box className="trips_main" component="main">
        <Box className="trips_topbar" component="header">
          <Box>
            <Typography className="page_title" component="h1">
              My Trips
            </Typography>
            <Typography className="page_subtitle">Choose a trip to open its itinerary, map, chat, and expenses.</Typography>
          </Box>

          <Box className="search_wrap">
            <SearchIcon className="search_icon" />
            <TextField
              className="search_input"
              fullWidth
              hiddenLabel
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search trips..."
              size="small"
              value={searchTerm}
            />
          </Box>
        </Box>

        <Box className="trips_content">
          {pendingInvites.length > 0 && (
            <Box className="invites_panel" component="section">
              <Box className="section_row compact">
                <Box>
                  <Typography className="section_title" component="h2">
                    Pending invites
                  </Typography>
                  <Typography className="page_subtitle">Join trips that have been shared with you.</Typography>
                </Box>
              </Box>

              <Box className="invite_list">
                {pendingInvites.map((invite) => {
                  const isAccepting = acceptInvite.isPending && acceptInvite.variables?.inviteId === invite.inviteId;
                  const isDeclining = declineInvite.isPending && declineInvite.variables?.inviteId === invite.inviteId;
                  const isPendingAction = isAccepting || isDeclining;

                  return (
                    <Box className="invite_card" key={invite.id}>
                      <Box className="invite_icon">
                        <GroupAddIcon />
                      </Box>
                      <Box className="invite_copy">
                        <Typography className="invite_title" component="h3">
                          {invite.tripName}
                        </Typography>
                        <Typography className="invite_message">{invite.message}</Typography>
                      </Box>
                      <Box className="invite_actions">
                        <Button
                          disabled={isPendingAction}
                          onClick={() =>
                            acceptInvite.mutate(
                              { inviteId: invite.inviteId },
                              { onSuccess: () => setDismissedInviteIds((current) => [...current, invite.inviteId]) }
                            )
                          }
                          size="small"
                          variant="contained"
                        >
                          {isAccepting ? 'Joining...' : 'Join'}
                        </Button>
                        <Button
                          disabled={isPendingAction}
                          onClick={() =>
                            declineInvite.mutate(
                              { inviteId: invite.inviteId },
                              { onSuccess: () => setDismissedInviteIds((current) => [...current, invite.inviteId]) }
                            )
                          }
                          size="small"
                          variant="outlined"
                        >
                          {isDeclining ? 'Declining...' : 'Decline'}
                        </Button>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}

          {featuredTrip && (
            <Box className="hero_panel" component="section">
              <ImageComp alt={featuredTrip.title} src={featuredTrip.coverUrl || dashboardAssets.paris} style={{ borderRadius: 0 }} />
              <Box className="hero_overlay" />
              <Box className="hero_content">
                <span className="hero_tag">Continue planning</span>
                <Typography className="hero_title" component="h2">
                  {featuredTrip.title}
                </Typography>
                <Typography className="hero_meta">{featuredTrip.destination}</Typography>
                <Box className="hero_actions">
                  <Button
                    className="primary_btn"
                    component={Link}
                    endIcon={<ArrowForwardIcon />}
                    href={`/trips/${featuredTrip.id}/itinerary`}
                  >
                    Open trip
                  </Button>
                  <Button className="ghost_btn" component={Link} href="/trips/create" startIcon={<AddIcon />} variant="outlined">
                    New trip
                  </Button>
                </Box>
              </Box>
            </Box>
          )}

          <Box className="section_row">
            <Typography className="section_title" component="h2">
              All trips
            </Typography>
            <Button component={Link} href="/trips/create" startIcon={<AddIcon />} variant="contained">
              New Trip
            </Button>
          </Box>

          {isLoading ? (
            <TripListSkeleton />
          ) : filteredTrips.length ? (
            <Box className="trip_grid">
              {filteredTrips.map((trip) => {
                const status = getTripStatus(trip);

                return (
                  <Box className="trip_card" component={Link} href={`/trips/${trip.id}/itinerary`} key={trip.id}>
                    <Box className="trip_media">
                      <ImageComp alt={trip.title} src={trip.coverUrl || dashboardAssets.bali} style={{ borderRadius: 0 }} />
                      <span className={`trip_status ${status.tone}`}>{status.label}</span>
                    </Box>
                    <Box className="trip_body">
                      <Typography className="trip_title" component="h3">
                        {trip.title}
                      </Typography>
                      <Typography className="trip_date">{trip.destination}</Typography>
                      <Typography className="trip_meta">
                        <CalendarMonthIcon fontSize="small" />
                        {formatTripDateRange(trip.startDate, trip.endDate)}
                      </Typography>
                      <Typography className="trip_meta">
                        <PaymentsIcon fontSize="small" />
                        {trip.budget ? `${trip.currency || 'USD'} ${trip.budget.toLocaleString()}` : 'Budget not set'}
                      </Typography>
                      <Typography className="trip_meta">
                        <StyleIcon fontSize="small" />
                        {trip.styles?.length ? trip.styles.join(', ') : 'No styles added'}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Box className="empty_state">
              <Typography className="empty_title">No trips found</Typography>
              <Typography className="empty_copy">
                {searchTerm ? 'Try another search term.' : 'Create a trip to see it here.'}
              </Typography>
              {!searchTerm && (
                <Button component={Link} href="/trips/create" startIcon={<AddIcon />} variant="contained">
                  New Trip
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </TripListPageWrapper>
  );
}
