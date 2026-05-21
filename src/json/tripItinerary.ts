import { tripItineraryAssets } from './assets';

export const tripNavItems = [
  { href: '/dashboard', icon: 'dashboard', label: 'Dashboard', active: false },
  { href: '/trips/settlements', icon: 'flight_takeoff', label: 'My Trips', active: true },
  { href: '#', icon: 'explore', label: 'Explore', active: false },
  { href: '#', icon: 'notifications', label: 'Notifications', active: false },
  { href: '/settings', icon: 'settings', label: 'Settings', active: false },
] as const;

export const tripTabs = [
  { icon: 'calendar_month', label: 'Itinerary', active: true },
  { icon: 'payments', label: 'Expenses', active: false },
  { icon: 'map', label: 'Map', active: false },
  { icon: 'chat', label: 'Chat', active: false },
  { icon: 'folder_open', label: 'Files', active: false },
] as const;

export const itineraryDays = [
  {
    dateDay: '12',
    dateMonth: 'Oct',
    description: '3 activities • Arriving at CDG',
    expanded: true,
    title: 'Day 1 — Arrival in Paris',
    activities: [
      {
        assignee: tripItineraryAssets.assignees[0],
        icon: 'flight',
        location: 'Charles de Gaulle Airport',
        time: '10:45 AM',
        title: 'AF123 - Landing at CDG',
        type: 'flight',
      },
      {
        assignee: tripItineraryAssets.assignees[1],
        icon: 'hotel',
        location: '228 Rue de Rivoli, 75001 Paris',
        time: '02:00 PM',
        title: 'Check-in: Hotel Le Meurice',
        type: 'hotel',
      },
      {
        assignee: tripItineraryAssets.assignees[2],
        icon: 'restaurant',
        location: "9 Carrefour de l'Odéon, 75006 Paris",
        time: '08:00 PM',
        title: 'Dinner at Le Comptoir de La Relais',
        type: 'food',
      },
    ],
  },
  {
    dateDay: '13',
    dateMonth: 'Oct',
    description: '5 activities • Walking tour',
    expanded: false,
    title: 'Day 2 — Louvre & Seine',
    activities: [],
  },
  {
    dateDay: '14',
    dateMonth: 'Oct',
    description: '2 activities • Renting a car',
    expanded: false,
    title: 'Day 3 — Loire Valley Drive',
    activities: [],
  },
] as const;

export const liveUpdates = [
  {
    actor: 'Priya',
    avatar: tripItineraryAssets.feed[0],
    highlight: 'Louvre Guided Tour',
    message: 'added',
    note: '',
    time: '2 minutes ago',
  },
  {
    actor: 'Alex',
    avatar: tripItineraryAssets.feed[1],
    highlight: 'Hotel Check-in',
    message: 'updated the time for',
    note: '',
    time: '15 minutes ago',
  },
  {
    actor: 'David',
    avatar: tripItineraryAssets.feed[2],
    highlight: 'Flight_Tickets.pdf',
    message: 'shared a file',
    note: '',
    time: '1 hour ago',
  },
  {
    actor: 'Priya',
    avatar: '',
    highlight: 'Chat',
    message: 'sent a message in',
    note: '"Can’t wait for the croissants!"',
    time: '2 hours ago',
  },
] as const;
