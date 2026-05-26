import AppSidebar from '@/components/layout/AppSidebar';
import { dashboardAssets } from '@/json/assets';
import { recentTrips } from '@/json/dashboard';
import { TripListPageWrapper } from '@/styles/trips/tripList.styles';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function TripListPage() {
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
            <TextField className="search_input" hiddenLabel placeholder="Search trips..." size="small" fullWidth />
          </Box>
        </Box>

        <Box className="trips_content">
          <Box className="hero_panel" component="section">
            <Box component="img" src={dashboardAssets.paris} alt="Paris at sunset" />
            <Box className="hero_overlay" />
            <Box className="hero_content">
              <span className="hero_tag">Continue planning</span>
              <Typography className="hero_title" component="h2">
                Autumn in Paris & Loire
              </Typography>
              <Box className="hero_actions">
                <Button
                  className="primary_btn"
                  component={Link}
                  endIcon={<ArrowForwardIcon />}
                  href="/trips/paris-loire/itinerary"
                >
                  Open trip
                </Button>
                <Button className="ghost_btn" component={Link} href="/trips/create" startIcon={<AddIcon />} variant="outlined">
                  New trip
                </Button>
              </Box>
            </Box>
          </Box>

          <Box className="section_row">
            <Typography className="section_title" component="h2">
              All trips
            </Typography>
            <Button component={Link} href="/trips/create" startIcon={<AddIcon />} variant="contained">
              New Trip
            </Button>
          </Box>

          <Box className="trip_grid">
            {recentTrips.map((trip) => (
              <Box className="trip_card" component={Link} href={trip.detailHref} key={trip.title}>
                <Box className="trip_media">
                  <Box component="img" src={trip.image} alt={trip.title} />
                  <span className={`trip_status ${trip.statusTone}`}>{trip.status}</span>
                </Box>
                <Box className="trip_body">
                  <Typography className="trip_title" component="h3">
                    {trip.title}
                  </Typography>
                  <Typography className="trip_date">{trip.date}</Typography>
                  <Typography className="trip_meta">
                    <CalendarMonthIcon fontSize="small" />
                    Itinerary workspace
                  </Typography>
                  <Typography className="trip_meta">
                    <GroupIcon fontSize="small" />
                    Shared planning
                  </Typography>

                  <Box className="trip_footer">
                    <Box className="avatar_stack">
                      {dashboardAssets.avatars.slice(0, trip.visibleAvatars).map((avatar) => (
                        <Box className="trip_avatar" component="img" src={avatar} alt="Trip participant" key={avatar} />
                      ))}
                      {trip.extraGuests && <span className="avatar_more">{trip.extraGuests}</span>}
                    </Box>
                    <Box className="progress_block">
                      <Typography className="progress_label">{trip.progressLabel}</Typography>
                      <Box className="progress_track">
                        <span className="progress_bar" style={{ width: `${trip.progress}%` }} />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </TripListPageWrapper>
  );
}
