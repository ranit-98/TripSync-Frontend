import { tripItineraryAssets } from '@/json/assets';
import type { ITrip, ITripMember } from '@/typescript/interface/api';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

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

type TripHeroProps = {
  isLoading?: boolean;
  members: ITripMember[];
  onCollapse: () => void;
  onInvite: () => void;
  trip?: ITrip | null;
};

export default function TripHero({ isLoading = false, members, onCollapse, onInvite, trip }: TripHeroProps) {
  const memberAvatars = members
    .map((member) => member.user?.avatarUrl)
    .filter((avatar): avatar is string => Boolean(avatar));
  const visibleAvatars = memberAvatars.slice(0, 3);
  const extraMembers = Math.max(members.length - visibleAvatars.length, 0);

  return (
    <Box className="hero" component="header">
      <Box
        alt={trip?.title || 'Trip cover'}
        className="hero_img"
        component="img"
        src={trip?.coverUrl || tripItineraryAssets.hero}
      />
      <Box className="hero_overlay" />

      <Box className="hero_topbar">
        <IconButton className="glass_icon_btn" component={Link} href="/trips" aria-label="Back to trips">
          <ArrowBackIcon />
        </IconButton>
        <Stack className="hero_actions" direction="row">
          <IconButton className="glass_icon_btn" component={Link} href="/notifications" aria-label="Open notifications">
            <NotificationsIcon />
          </IconButton>
          <IconButton className="glass_icon_btn" aria-label="Share trip">
            <ShareIcon />
          </IconButton>
          <Box alt="Avatar" className="profile_avatar" component="img" src={tripItineraryAssets.profile} />
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
              {(visibleAvatars.length ? visibleAvatars : tripItineraryAssets.members.slice(0, 1)).map((member) => (
                <Box alt="Trip member" className="member_avatar" component="img" key={member} src={member} />
              ))}
              {extraMembers > 0 && <span className="member_more">+{extraMembers}</span>}
            </Stack>
            <Button className="invite_btn" onClick={onInvite} startIcon={<PersonAddIcon />}>
              Invite
            </Button>
            <IconButton className="glass_icon_btn" aria-label="Trip settings">
              <SettingsIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
      <IconButton className="hero_toggle" aria-label="Collapse trip hero" onClick={onCollapse}>
        <KeyboardArrowUpIcon />
      </IconButton>
    </Box>
  );
}
