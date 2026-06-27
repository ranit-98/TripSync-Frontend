'use client';

import { AppSidebarWrapper, MobileBottomNavWrapper } from '@/styles/layout/appSidebar.styles';
import { useNotificationsList } from '@/api/hooks/notifications/useNotifications.hooks';
import { useTripsPendingInvites } from '@/api/hooks/trips/useTrips.hooks';
import { useAuthLogout } from '@/api/hooks/auth/useAuth.hooks';
import { mergeNotifications, notificationList, pendingInviteNotifications } from '@/lib/functions/notifications.lib';
import AddIcon from '@mui/icons-material/Add';
import CollectionsIcon from '@mui/icons-material/Collections';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type SidebarKey = 'dashboard' | 'trips' | 'albums' | 'notifications' | 'settings';

type AppSidebarProps = {
  active: SidebarKey;
  dashboardHref?: string;
  showNewTrip?: boolean;
};

const navItems = [
  { href: '/dashboard', icon: DashboardIcon, key: 'dashboard', label: 'Dashboard' },
  { href: '/trips', icon: FlightTakeoffIcon, key: 'trips', label: 'My Trips' },
  { href: '/albums', icon: CollectionsIcon, key: 'albums', label: 'Album' },
  { href: '/notifications', icon: NotificationsIcon, key: 'notifications', label: 'Notifications' },
  { href: '/settings', icon: SettingsIcon, key: 'settings', label: 'Settings' },
] as const;

const mobileLabel: Record<SidebarKey, string> = {
  albums: 'Albums',
  dashboard: 'Home',
  notifications: 'Updates',
  settings: 'Settings',
  trips: 'Trips',
};

export default function AppSidebar({
  active,
  dashboardHref = '/dashboard',
  showNewTrip = false,
}: AppSidebarProps) {
  const router = useRouter();
  const logout = useAuthLogout({ optionalCallback: () => router.replace('/login') });
  const { data: notificationsResponse } = useNotificationsList();
  const { data: pendingInvitesResponse } = useTripsPendingInvites();
  const notifications = mergeNotifications(
    notificationList(notificationsResponse?.data.data),
    pendingInviteNotifications(pendingInvitesResponse?.data.data),
  );
  const unreadCount = notifications.filter((notification) => !notification.readAt && !notification.read_at && !notification.isRead && !notification.read).length;

  const navigation = (
    <>
      <Box className="brand_row">
        <Box className="brand_icon"><FlightTakeoffIcon /></Box>
        <Box><Typography className="brand_name">TripSync</Typography><Typography className="brand_caption">Collaborative Planning</Typography></Box>
      </Box>
      <Box className="sidebar_nav" component="nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const href = item.key === 'dashboard' ? dashboardHref : item.href;
          return <Box className={`nav_link${active === item.key ? ' active' : ''}`} component={Link} href={href} key={item.key}><Box className="nav_icon"><Icon />{item.key === 'notifications' && unreadCount > 0 && <span className="nav_notification_badge" aria-label={`${unreadCount} unread notifications`}>{unreadCount > 99 ? '99+' : unreadCount}</span>}</Box><span>{item.label}</span></Box>;
        })}
      </Box>
      {showNewTrip && <Button className="new_trip_btn" component={Link} href="/trips/create" startIcon={<AddIcon />} variant="contained">New Trip</Button>}
      <Button className="nav_link logout_link" disabled={logout.isPending} onClick={() => logout.mutate()} startIcon={<LogoutIcon />}>{logout.isPending ? 'Logging out...' : 'Logout'}</Button>
    </>
  );

  return (
    <>
      <AppSidebarWrapper as="aside"><Box className="sidebar_inner">{navigation}</Box></AppSidebarWrapper>
      <MobileBottomNavWrapper as="nav" aria-label="Primary mobile navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const href = item.key === 'dashboard' ? dashboardHref : item.href;
          return (
            <Box className={`mobile_tab${active === item.key ? ' active' : ''}`} component={Link} href={href} key={item.key}>
              <Icon />
              {item.key === 'notifications' && unreadCount > 0 && <span className="mobile_tab_badge">{unreadCount > 99 ? '99+' : unreadCount}</span>}
              <span>{mobileLabel[item.key]}</span>
            </Box>
          );
        })}
      </MobileBottomNavWrapper>
    </>
  );
}
