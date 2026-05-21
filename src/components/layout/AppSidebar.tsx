import { AppSidebarWrapper } from '@/styles/layout/appSidebar.styles';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExploreIcon from '@mui/icons-material/Explore';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type SidebarKey = 'dashboard' | 'trips' | 'explore' | 'notifications' | 'settings';

type AppSidebarProps = {
  active: SidebarKey;
  dashboardHref?: string;
  showNewTrip?: boolean;
};

const navItems = [
  { href: '/dashboard', icon: DashboardIcon, key: 'dashboard', label: 'Dashboard' },
  { href: '/trips/itinerary', icon: FlightTakeoffIcon, key: 'trips', label: 'My Trips' },
  { href: '#', icon: ExploreIcon, key: 'explore', label: 'Explore' },
  { href: '#', icon: NotificationsIcon, key: 'notifications', label: 'Notifications' },
  { href: '/settings', icon: SettingsIcon, key: 'settings', label: 'Settings' },
] as const;

export default function AppSidebar({
  active,
  dashboardHref = '/dashboard',
  showNewTrip = false,
}: AppSidebarProps) {
  return (
    <AppSidebarWrapper as="aside">
      <Box className="sidebar_inner">
        <Box className="brand_row">
          <Box className="brand_icon">
            <FlightTakeoffIcon />
          </Box>
          <Box>
            <Typography className="brand_name">TripSync</Typography>
            <Typography className="brand_caption">Collaborative Planning</Typography>
          </Box>
        </Box>

        <Box className="sidebar_nav" component="nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const href = item.key === 'dashboard' ? dashboardHref : item.href;

            return (
              <Box
                className={`nav_link${active === item.key ? ' active' : ''}`}
                component="a"
                href={href}
                key={item.key}
              >
                <Icon />
                <span>{item.label}</span>
              </Box>
            );
          })}
        </Box>

        {showNewTrip && (
          <Button className="new_trip_btn" startIcon={<AddIcon />} variant="contained">
            New Trip
          </Button>
        )}

        <Box className="nav_link logout_link" component="a" href="#">
          <LogoutIcon />
          <span>Logout</span>
        </Box>
      </Box>
    </AppSidebarWrapper>
  );
}
