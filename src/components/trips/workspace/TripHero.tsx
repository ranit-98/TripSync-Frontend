import { tripItineraryAssets } from '@/json/assets';
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

export default function TripHero({ onCollapse, onInvite }: { onCollapse: () => void; onInvite: () => void }) {
  return (
    <Box className="hero" component="header">
      <Box alt="Paris Skyline" className="hero_img" component="img" src={tripItineraryAssets.hero} />
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
            <span className="status_pill">Planning</span>
            <span className="hero_date">Oct 12 - Oct 20, 2024</span>
          </Stack>
          <Typography className="hero_title" component="h1">
            Autumn in Paris & Loire
          </Typography>
          <Stack className="member_actions" direction="row">
            <Stack className="member_stack">
              {tripItineraryAssets.members.map((member) => (
                <Box alt="Trip member" className="member_avatar" component="img" key={member} src={member} />
              ))}
              <span className="member_more">+2</span>
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
