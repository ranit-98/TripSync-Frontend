import ImageComp from '@/components/image/ImageComp';
import { TripHeroSkeleton } from '@/components/skeleton';
import { useAuthLogout } from '@/api/hooks/auth/useAuth.hooks';
import { tripItineraryAssets } from '@/json/assets';
import { useAuthStore } from '@/store/auth/auth.store';
import type { ITrip, ITripMember } from '@/typescript/interface/api';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import type { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const formatHeroDateRange = (startDate?: string, endDate?: string) => {
  if (!startDate || !endDate) {
    return 'Dates not set';
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 'Dates not set';
  }

  const monthFormatter = new Intl.DateTimeFormat('en', { month: 'short' });
  const startMonth = monthFormatter.format(start);
  const endMonth = monthFormatter.format(end);
  const startDay = start.getDate();
  const endDay = end.getDate();
  const endYear = end.getFullYear();

  return startMonth === endMonth
    ? `${startMonth} ${startDay} - ${endDay}, ${endYear}`
    : `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${endYear}`;
};

const getHeroStatus = (trip?: ITrip | null) => {
  if (!trip) {
    return 'Loading';
  }

  const now = Date.now();
  const start = new Date(trip.startDate).getTime();
  const end = new Date(trip.endDate).getTime();

  if (Number.isNaN(start) || Number.isNaN(end)) {
    return 'Planning';
  }

  if (now < start) {
    return 'Upcoming';
  }

  if (now <= end) {
    return 'Active';
  }

  return 'Completed';
};

const getInitials = (name?: string, email?: string) => {
  const source = name?.trim() || email?.trim() || '?';
  const words = source.split(/\s+/).filter(Boolean);

  if (words.length > 1) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  return source.slice(0, 2).toUpperCase();
};

const membersPopoverSx: SxProps<Theme> = {
  zIndex: (theme) => theme.zIndex.modal,
  '& .MuiPopover-paper': {
    borderRadius: '8px',
    boxShadow: '0 18px 36px rgba(23, 29, 28, 0.22)',
    overflow: 'hidden',
  },
  '& .members_popover': {
    width: 'min(300px, calc(100vw - 32px))',
    maxHeight: 360,
    overflowY: 'auto',
    border: '1px solid rgba(188, 201, 198, 0.45)',
    backgroundColor: '#ffffff',
    padding: '12px',
  },
  '& .members_popover_header': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '2px 4px 10px',
  },
  '& .members_popover_header h3': {
    color: 'text.primary',
    fontSize: '15px',
    fontWeight: 800,
    lineHeight: '20px',
  },
  '& .members_popover_header span': {
    display: 'grid',
    minWidth: 28,
    height: 28,
    placeItems: 'center',
    borderRadius: 999,
    backgroundColor: '#eef5f2',
    color: 'primary.main',
    fontSize: '12px',
    fontWeight: 800,
  },
  '& .members_popover_item': {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderRadius: '8px',
    padding: '8px 6px',
    '&:hover': {
      backgroundColor: '#f4f8f6',
    },
  },
  '& .members_popover_item strong, & .members_popover_item small': {
    display: 'block',
  },
  '& .members_popover_item strong': {
    overflow: 'hidden',
    maxWidth: 190,
    color: 'text.primary',
    fontSize: '14px',
    fontWeight: 800,
    lineHeight: '18px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  '& .members_popover_item small': {
    color: '#6d7a77',
    fontSize: '12px',
    fontWeight: 700,
    lineHeight: '16px',
  },
  '& .members_popover_avatar, & .members_popover_initial': {
    width: 36,
    height: 36,
    flex: '0 0 36px',
    borderRadius: '50%',
  },
  '& .members_popover_avatar': {
    objectFit: 'cover',
  },
  '& .members_popover_initial': {
    display: 'grid',
    placeItems: 'center',
    backgroundColor: '#dae2fd',
    color: '#131b2e',
    fontSize: '13px',
    fontWeight: 800,
  },
  '& .members_popover_empty': {
    color: '#6d7a77',
    fontSize: '13px',
    fontWeight: 700,
    padding: '10px 4px 4px',
  },
};

type TripHeroProps = {
  canManage: boolean;
  isLoading?: boolean;
  members: ITripMember[];
  onCollapse: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onInvite: () => void;
  onLeave: () => void;
  trip?: ITrip | null;
};

export default function TripHero({ canManage, isLoading = false, members, onCollapse, onDelete, onEdit, onInvite, onLeave, trip }: TripHeroProps) {
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.user);
  const logout = useAuthLogout({ optionalCallback: () => router.replace('/login') });
  const [membersAnchor, setMembersAnchor] = useState<HTMLElement | null>(null);
  const [profileAnchor, setProfileAnchor] = useState<HTMLElement | null>(null);
  const [settingsAnchor, setSettingsAnchor] = useState<HTMLElement | null>(null);
  const sortedMembers = useMemo(() => {
    return [...members].sort((firstMember, secondMember) => {
      if (firstMember.role === secondMember.role) {
        return 0;
      }

      return firstMember.role === 'collaborator' ? -1 : 1;
    });
  }, [members]);

  if (isLoading) {
    return <TripHeroSkeleton />;
  }

  const visibleMembers = sortedMembers.slice(0, 2);
  const extraMembers = Math.max(members.length - visibleMembers.length, 0);
  const hasMembers = sortedMembers.length > 0;
  const isOwner = trip?.ownerId === currentUser?.id;

  return (
    <Box className="hero" component="header">
      <ImageComp
        alt={trip?.title || 'Trip cover'}
        className="hero_img"
        src={trip?.coverUrl || tripItineraryAssets.hero}
      />
      <Box className="hero_overlay" />

      <Box className="hero_topbar">
        <IconButton className="glass_icon_btn" component={Link} href="/trips" aria-label="Back to trips">
          <ArrowBackIcon />
        </IconButton>
        <Stack className="hero_actions" direction="row">
          <Box
            aria-label="Open account actions"
            aria-haspopup="menu"
            className="hero_user_island"
            component="button"
            onClick={(event) => setProfileAnchor(event.currentTarget)}
            type="button"
          >
            <ImageComp
              alt={currentUser?.name || currentUser?.email || 'User avatar'}
              className="profile_avatar"
              isAvatar
              src={currentUser?.avatarUrl || tripItineraryAssets.profile}
            />
            <span>{currentUser?.name || currentUser?.email || 'Account'}</span>
          </Box>
          <Menu anchorEl={profileAnchor} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} onClose={() => setProfileAnchor(null)} open={Boolean(profileAnchor)} transformOrigin={{ horizontal: 'right', vertical: 'top' }}>
            <MenuItem component={Link} href="/trips/create" onClick={() => setProfileAnchor(null)}>
              <AddIcon fontSize="small" />
              Create trip
            </MenuItem>
            <MenuItem disabled={logout.isPending} onClick={() => { setProfileAnchor(null); logout.mutate(); }}>
              <LogoutIcon fontSize="small" />
              {logout.isPending ? 'Logging out...' : 'Logout'}
            </MenuItem>
          </Menu>
        </Stack>
      </Box>

      <Box className="hero_content">
        <Stack className="hero_copy">
          <Stack className="hero_meta" direction="row">
            <span className="status_pill">{getHeroStatus(trip)}</span>
            <span className="hero_date">{formatHeroDateRange(trip?.startDate, trip?.endDate)}</span>
          </Stack>
          <Typography className="hero_title" component="h1">
            {isLoading ? 'Loading trip...' : trip?.title || 'Untitled trip'}
          </Typography>
          <Stack className="member_actions" direction="row">
            <Stack className="member_stack">
              {(hasMembers ? visibleMembers : [{ id: 'placeholder', user: { avatarUrl: tripItineraryAssets.members[0], email: '', id: 'placeholder', name: 'Trip member' }, role: 'viewer' as const }]).map((member) => {
                const user = member.user;

                return user?.avatarUrl ? (
                  <ImageComp alt={user.name || 'Trip member'} className="member_avatar" isAvatar key={member.id} src={user.avatarUrl} />
                ) : (
                  <span className="member_initial compact" key={member.id}>
                    {getInitials(user?.name, user?.email)}
                  </span>
                );
              })}
              {extraMembers > 0 && (
                <Box
                  aria-label={`Show ${extraMembers} more trip ${extraMembers === 1 ? 'member' : 'members'}`}
                  aria-haspopup="dialog"
                  className="member_more member_more_button"
                  component="button"
                  onClick={(event) => setMembersAnchor(event.currentTarget)}
                  type="button"
                >
                  +{extraMembers}
                </Box>
              )}
            </Stack>
            <Popover
              anchorEl={membersAnchor}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              onClose={() => setMembersAnchor(null)}
              open={Boolean(membersAnchor)}
              sx={membersPopoverSx}
              transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            >
              <Box className="members_popover">
                <Box className="members_popover_header">
                  <Typography component="h3">Trip members</Typography>
                  <span>{sortedMembers.length}</span>
                </Box>
                {hasMembers ? (
                  sortedMembers.map((member) => {
                    const user = member.user;
                    const roleLabel = member.role === 'collaborator' ? 'Collaborator' : 'Viewer';

                    return (
                      <Box className="members_popover_item" key={member.id}>
                        {user?.avatarUrl ? (
                          <ImageComp alt={user.name || 'Trip member'} className="members_popover_avatar" isAvatar src={user.avatarUrl} />
                        ) : (
                          <span className="members_popover_initial">{getInitials(user?.name, user?.email)}</span>
                        )}
                        <Box>
                          <strong>{user?.name || user?.email || 'Invited member'}</strong>
                          <small>{roleLabel}</small>
                        </Box>
                      </Box>
                    );
                  })
                ) : (
                  <Typography className="members_popover_empty">No members have joined this trip yet.</Typography>
                )}
              </Box>
            </Popover>
            <>
              {canManage && (
                <Button className="invite_btn" onClick={onInvite} startIcon={<PersonAddIcon />}>
                  Invite
                </Button>
              )}
              <IconButton className="glass_icon_btn" aria-label="Trip settings" onClick={(event) => setSettingsAnchor(event.currentTarget)}>
                <SettingsIcon />
              </IconButton>
              <Menu anchorEl={settingsAnchor} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} onClose={() => setSettingsAnchor(null)} open={Boolean(settingsAnchor)} transformOrigin={{ horizontal: 'right', vertical: 'top' }}>
                {canManage && (
                  <>
                  <MenuItem onClick={() => { setSettingsAnchor(null); onEdit(); }}>Edit trip</MenuItem>
                  <MenuItem onClick={() => { setSettingsAnchor(null); onDelete(); }}>Delete trip</MenuItem>
                  </>
                )}
                {!isOwner && <MenuItem onClick={() => { setSettingsAnchor(null); onLeave(); }}>
                  <ExitToAppIcon fontSize="small" />
                  Leave trip
                </MenuItem>}
              </Menu>
            </>
          </Stack>
        </Stack>
      </Box>
      <IconButton className="hero_toggle" aria-label="Collapse trip hero" onClick={onCollapse}>
        <KeyboardArrowUpIcon />
      </IconButton>
    </Box>
  );
}
