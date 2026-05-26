import AppSidebar from '@/components/layout/AppSidebar';
import { dashboardAssets } from '@/json/assets';
import { dashboardStats, recentTrips } from '@/json/dashboard';
import { DashboardPageWrapper } from '@/styles/dashboard/dashboard.styles';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CollectionsIcon from '@mui/icons-material/Collections';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import GroupIcon from '@mui/icons-material/Group';
import MapIcon from '@mui/icons-material/Map';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PublicIcon from '@mui/icons-material/Public';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

const iconMap = {
  add: AddIcon,
  event_upcoming: EventAvailableIcon,
  map: MapIcon,
  public: PublicIcon,
} as const;

type IconName = keyof typeof iconMap;

function DashboardSymbol({ name }: { name: IconName }) {
  const Icon = iconMap[name];
  return <Icon />;
}

export default function DashboardPage() {
  return (
    <DashboardPageWrapper>
      <AppSidebar active="dashboard" showNewTrip />

      <Box className="dashboard_main" component="main">
        <Box className="dashboard_topbar" component="header">
          <Box>
            <Typography className="dashboard_title" component="h1">
              Good morning, Rahul
            </Typography>
            <Typography className="dashboard_subtitle">Ready for your next adventure?</Typography>
          </Box>

          <Stack className="topbar_actions" direction="row">
            <Box className="search_wrap">
              <SearchIcon className="search_icon" />
              <TextField
                className="search_input"
                hiddenLabel
                placeholder="Search trips, destinations..."
                size="small"
              />
            </Box>
            <IconButton className="notification_btn" component={Link} href="/notifications" aria-label="Open notifications">
              <NotificationsIcon />
              <span className="notification_badge" />
            </IconButton>
          </Stack>
        </Box>

        <Box className="dashboard_content">
          <Box className="stats_grid" component="section">
            {dashboardStats.map((stat) => (
              <Box className="stat_card" key={stat.label}>
                <Box className={`stat_icon ${stat.tone}`}>
                  <DashboardSymbol name={stat.icon} />
                </Box>
                <Box>
                  <Typography className="metric_label">{stat.label}</Typography>
                  <Typography className="metric_value">{stat.value}</Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box className="spotlight" component="section">
            <Box
              alt="Swiss Alps at sunrise"
              className="spotlight_img"
              component="img"
              src={dashboardAssets.spotlight}
            />
            <Box className="spotlight_overlay" />
            <Box className="spotlight_content">
              <Stack className="spotlight_copy">
                <Typography className="spotlight_tag">NEXT UP</Typography>
                <Typography className="spotlight_title" component="h2">
                  Winter in Lucerne
                </Typography>
                <Stack className="spotlight_meta" direction={{ xs: 'column', sm: 'row' }}>
                  <Stack className="spotlight_meta_item" direction="row">
                    <CalendarMonthIcon fontSize="small" />
                    <span>Dec 15 - Dec 22, 2024</span>
                  </Stack>
                  <Stack className="spotlight_meta_item" direction="row">
                    <GroupIcon fontSize="small" />
                    <span>4 Participants</span>
                  </Stack>
                </Stack>
              </Stack>

              <Stack className="spotlight_side">
                <Box className="countdown_card">
                  <Typography className="countdown_label">Departure in</Typography>
                  <Stack className="countdown_values" direction="row">
                    <Box>
                      <span className="countdown_value">14</span>
                      <span className="countdown_unit">Days</span>
                    </Box>
                    <Box>
                      <span className="countdown_value">08</span>
                      <span className="countdown_unit">Hrs</span>
                    </Box>
                  </Stack>
                </Box>
                <Button
                  className="open_trip_btn"
                  component={Link}
                  endIcon={<ArrowForwardIcon />}
                  href="/trips/paris-loire/itinerary"
                >
                  Open Trip
                </Button>
              </Stack>
            </Box>
          </Box>

          <Box component="section">
            <Box className="section_header">
              <Typography className="section_title" component="h3">
                Recent Itineraries
              </Typography>
              <Button className="view_all_btn" endIcon={<ChevronRightIcon />}>
                View All
              </Button>
            </Box>

            <Box className="trips_scroller">
              {recentTrips.map((trip) => (
                <Box
                  className="trip_card"
                  component={Link}
                  href={trip.detailHref}
                  key={trip.title}
                  sx={{ textDecoration: 'none' }}
                >
                  <Box className="trip_media">
                    <Box alt={trip.title} className="trip_img" component="img" src={trip.image} />
                    <span className={`trip_status ${trip.statusTone}`}>{trip.status}</span>
                  </Box>
                  <Box className="trip_body">
                    <Box>
                      <Typography className="trip_title">{trip.title}</Typography>
                      <Typography className="trip_date">{trip.date}</Typography>
                    </Box>
                    <Stack className="trip_footer" direction="row">
                      <Stack className="avatar_stack">
                        {dashboardAssets.avatars.slice(0, trip.visibleAvatars).map((avatar) => (
                          <Box
                            alt="Trip participant"
                            className="trip_avatar"
                            component="img"
                            key={avatar}
                            src={avatar}
                          />
                        ))}
                        {trip.extraGuests && <span className="avatar_more">{trip.extraGuests}</span>}
                      </Stack>
                      <Box className="progress_block">
                        <Typography className="progress_label">{trip.progressLabel}</Typography>
                        <Box className="progress_track">
                          <span
                            className="progress_bar"
                            style={{ width: `${trip.progress}%` }}
                          />
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="mobile_nav" component="nav">
        <Box className="mobile_nav_link active" component="a" href="#">
          <DashboardIcon />
          <span>Home</span>
        </Box>
        <Box className="mobile_nav_link" component="a" href="#">
          <FlightTakeoffIcon />
          <span>Trips</span>
        </Box>
        <Box className="mobile_add_wrap">
          <Button className="mobile_add_btn" variant="contained">
            <AddIcon />
          </Button>
        </Box>
        <Box className="mobile_nav_link" component="a" href="/albums">
          <CollectionsIcon />
          <span>Album</span>
        </Box>
        <Box className="mobile_nav_link" component="a" href="#">
          <Box
            alt="Profile"
            className="mobile_avatar"
            component="img"
            src={dashboardAssets.userAvatar}
          />
          <span>Profile</span>
        </Box>
      </Box>
    </DashboardPageWrapper>
  );
}
