import AppSidebar from '@/components/layout/AppSidebar';
import { dashboardAssets, tripItineraryAssets } from '@/json/assets';
import { ProfileSettingsWrapper } from '@/styles/settings/profileSettings.styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import ExploreIcon from '@mui/icons-material/Explore';
import FlightIcon from '@mui/icons-material/Flight';
import MapIcon from '@mui/icons-material/Map';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PublicIcon from '@mui/icons-material/Public';
import SaveIcon from '@mui/icons-material/Save';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const stats = [
  { icon: MapIcon, label: 'Trips Planned', tone: 'primary', value: '24' },
  { icon: PublicIcon, label: 'Countries Visited', tone: 'secondary', value: '12' },
  { icon: FlightIcon, label: 'Total Distance', tone: 'tertiary', value: '42,850 km' },
] as const;

export default function ProfileSettings() {
  return (
    <ProfileSettingsWrapper>
      <AppSidebar active="settings" />

      <Box className="settings_main" component="main">
        <Box className="topbar" component="header">
          <Typography className="mobile_brand">TripSync</Typography>
          <Typography className="page_title" component="h1">
            Profile Settings
          </Typography>
          <Stack className="topbar_actions" direction="row">
            <IconButton aria-label="Open notifications">
              <NotificationsIcon />
            </IconButton>
            <Box
              alt="User profile avatar"
              className="topbar_avatar"
              component="img"
              src={tripItineraryAssets.profile}
            />
          </Stack>
        </Box>

        <Box className="content_area">
          <Box className="settings_grid">
            <Stack className="identity_col">
              <Box className="profile_card">
                <Box className="profile_photo_wrap">
                  <Box
                    alt="Alex Thompson"
                    className="profile_photo"
                    component="img"
                    src={dashboardAssets.userAvatar}
                  />
                  <span className="camera_badge">
                    <PhotoCameraIcon />
                  </span>
                </Box>
                <Typography className="profile_name" component="h2">
                  Alex Thompson
                </Typography>
                <Typography className="profile_role">
                  Product Designer &amp; World Explorer
                </Typography>
                <Typography className="member_since">
                  <CalendarTodayIcon />
                  Member since March 2023
                </Typography>
              </Box>

              <Box className="stats_card">
                <Typography className="section_title" component="h2">
                  My Travel Stats
                </Typography>
                <Stack className="stats_list">
                  {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                      <Stack className="stat_item" direction="row" key={stat.label}>
                        <Box className={`stat_icon ${stat.tone}`}>
                          <Icon />
                        </Box>
                        <Box>
                          <Typography className="stat_label">{stat.label}</Typography>
                          <Typography className="stat_value">{stat.value}</Typography>
                        </Box>
                      </Stack>
                    );
                  })}
                </Stack>
              </Box>
            </Stack>

            <Stack className="forms_col">
              <Box className="panel">
                <Box className="panel_header">
                  <Typography className="section_title" component="h2">
                    Personal Information
                  </Typography>
                  <Button className="save_btn" startIcon={<SaveIcon />} variant="contained">
                    Save Changes
                  </Button>
                </Box>

                <Box className="form_grid" component="form">
                  <label>
                    <span>First Name</span>
                    <input defaultValue="Alex" type="text" />
                  </label>
                  <label>
                    <span>Last Name</span>
                    <input defaultValue="Thompson" type="text" />
                  </label>
                  <label className="wide">
                    <span>Email Address</span>
                    <input defaultValue="alex.thompson@example.com" type="email" />
                  </label>
                  <label className="wide">
                    <span>Biography</span>
                    <textarea
                      defaultValue="Passionate traveler and UI/UX designer focused on creating meaningful digital experiences. Currently planning my next big adventure through Southeast Asia."
                      rows={4}
                    />
                  </label>
                  <label>
                    <span>Phone Number</span>
                    <input defaultValue="+1 (555) 000-0000" type="tel" />
                  </label>
                  <label>
                    <span>Location</span>
                    <input defaultValue="San Francisco, CA" type="text" />
                  </label>
                </Box>
              </Box>

              <Box className="panel">
                <Box className="panel_header simple">
                  <Typography className="section_title" component="h2">
                    Security
                  </Typography>
                </Box>
                <Box className="form_grid security_grid">
                  <label>
                    <span>Current Password</span>
                    <input placeholder="••••••••••••" type="password" />
                  </label>
                  <span className="desktop_spacer" />
                  <label>
                    <span>New Password</span>
                    <input placeholder="Enter new password" type="password" />
                  </label>
                  <label>
                    <span>Confirm New Password</span>
                    <input placeholder="Repeat new password" type="password" />
                  </label>
                </Box>
                <Button className="outline_btn">Update Password</Button>
              </Box>

              <Box className="danger_panel">
                <Box>
                  <Typography className="danger_title" component="h2">
                    Danger Zone
                  </Typography>
                  <Typography className="danger_copy">
                    Once you delete your account, there is no going back. Please be certain.
                  </Typography>
                </Box>
                <Button className="delete_btn" startIcon={<DeleteIcon />} variant="contained">
                  Delete Account
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>

      <Box className="mobile_nav" component="nav">
        <Box className="mobile_nav_link" component="a" href="/dashboard">
          <DashboardIcon />
          <span>Home</span>
        </Box>
        <Box className="mobile_nav_link" component="a" href="#">
          <ExploreIcon />
          <span>Explore</span>
        </Box>
        <Box className="mobile_nav_link active" component="a" href="/settings">
          <SettingsIcon />
          <span>Profile</span>
        </Box>
      </Box>
    </ProfileSettingsWrapper>
  );
}
