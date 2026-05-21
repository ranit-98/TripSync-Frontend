import { dashboardAssets } from './assets';

export const dashboardStats = [
  { icon: 'map', label: 'Trips Planned', tone: 'primary', value: '12' },
  { icon: 'public', label: 'Countries Visited', tone: 'tertiary', value: '08' },
  { icon: 'event_upcoming', label: 'Upcoming Trips', tone: 'secondary', value: '03' },
] as const;

export const dashboardNavItems = [
  { href: '/dashboard', icon: 'dashboard', label: 'Dashboard', active: true, separated: false },
  { href: '/trips/settlements', icon: 'flight_takeoff', label: 'My Trips', active: false, separated: false },
  { href: '#', icon: 'explore', label: 'Explore', active: false, separated: false },
  { href: '#', icon: 'notifications', label: 'Notifications', active: false, separated: false },
  { href: '/settings', icon: 'settings', label: 'Settings', active: false, separated: true },
  { href: '#', icon: 'logout', label: 'Logout', active: false, separated: false },
] as const;

export const recentTrips = [
  {
    date: 'Oct 12 - Oct 20, 2024',
    image: dashboardAssets.bali,
    progress: 45,
    progressLabel: '45% Planned',
    status: 'Planning',
    statusTone: 'secondary',
    title: 'Bali Spiritual Retreat',
    visibleAvatars: 2,
    extraGuests: '+2',
  },
  {
    date: 'Nov 05 - Nov 12, 2024',
    image: dashboardAssets.tokyo,
    progress: 100,
    progressLabel: '100% Ready',
    status: 'Confirmed',
    statusTone: 'primary',
    title: 'Tokyo Tech Expo 2024',
    visibleAvatars: 3,
    extraGuests: '',
  },
  {
    date: 'Aug 10 - Aug 18, 2024',
    image: dashboardAssets.paris,
    progress: 100,
    progressLabel: 'Archive Access',
    status: 'Completed',
    statusTone: 'neutral',
    title: 'Summer in Paris',
    visibleAvatars: 1,
    extraGuests: '',
  },
] as const;
