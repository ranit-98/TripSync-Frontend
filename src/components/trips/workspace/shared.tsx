import { tripItineraryAssets } from '@/json/assets';
import { tripTabs } from '@/json/tripItinerary';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatIcon from '@mui/icons-material/Chat';
import CollectionsIcon from '@mui/icons-material/Collections';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FlightIcon from '@mui/icons-material/Flight';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ForumIcon from '@mui/icons-material/Forum';
import HotelIcon from '@mui/icons-material/Hotel';
import MapIcon from '@mui/icons-material/Map';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PaymentsIcon from '@mui/icons-material/Payments';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SettingsIcon from '@mui/icons-material/Settings';
import * as yup from 'yup';

export const iconMap = {
  calendar_month: CalendarMonthIcon,
  chat: ChatIcon,
  collections: CollectionsIcon,
  dashboard: DashboardIcon,
  flight: FlightIcon,
  flight_takeoff: FlightTakeoffIcon,
  folder_open: FolderOpenIcon,
  forum: ForumIcon,
  hotel: HotelIcon,
  map: MapIcon,
  notifications: NotificationsIcon,
  payments: PaymentsIcon,
  restaurant: RestaurantIcon,
  settings: SettingsIcon,
} as const;

export type IconName = keyof typeof iconMap;
export type TripWorkspaceTab = (typeof tripTabs)[number]['label'];

export const tripTabSlugs: Record<TripWorkspaceTab, string> = {
  Chat: 'chat',
  Expenses: 'expenses',
  Files: 'files',
  Gallery: 'gallery',
  Itinerary: 'itinerary',
};

export const getTripTabHref = (tripId: string, tab: TripWorkspaceTab) => `/trips/${tripId}/${tripTabSlugs[tab]}`;

export const expenseRows = [
  {
    amount: '$245.50',
    category: 'Food & Dining',
    date: 'Oct 12, 2023',
    icon: RestaurantIcon,
    paidBy: tripItineraryAssets.members[0],
    split: [tripItineraryAssets.members[1], tripItineraryAssets.members[2], tripItineraryAssets.profile],
    title: 'Team Dinner - Amalfi',
    tone: 'primary',
  },
  {
    amount: '$1,850.00',
    category: 'Accommodation',
    date: 'Oct 11, 2023',
    icon: HotelIcon,
    paidBy: tripItineraryAssets.profile,
    split: [tripItineraryAssets.members[0], tripItineraryAssets.members[1]],
    title: 'Luxury Resort Stay',
    tone: 'tertiary',
  },
  {
    amount: '$65.00',
    category: 'Transportation',
    date: 'Oct 10, 2023',
    icon: DirectionsCarIcon,
    paidBy: tripItineraryAssets.members[2],
    split: [tripItineraryAssets.members[0], tripItineraryAssets.profile],
    title: 'Airport Transfer',
    tone: 'secondary',
  },
] as const;

export const documentFolders = [
  {
    count: 8,
    id: 'bills',
    name: 'Scanned Bills',
    size: '18.4 MB',
    subtitle: 'Restaurants, taxis, tickets',
    updatedAt: 'Updated 12 min ago',
  },
  {
    count: 5,
    id: 'bookings',
    name: 'Booking Docs',
    size: '9.1 MB',
    subtitle: 'Hotels, flights, confirmations',
    updatedAt: 'Updated yesterday',
  },
  {
    count: 4,
    id: 'identity',
    name: 'Travel IDs',
    size: '6.7 MB',
    subtitle: 'Passports, visas, insurance',
    updatedAt: 'Updated Apr 18',
  },
] as const;

export const folderDocuments = [
  {
    fileName: 'team-dinner-amalfi.jpg',
    icon: DescriptionIcon,
    name: 'Team Dinner - Amalfi receipt',
    type: 'Scan',
  },
  {
    fileName: 'airport-transfer-invoice.pdf',
    icon: PictureAsPdfIcon,
    name: 'Airport transfer invoice.pdf',
    type: 'PDF',
  },
  {
    fileName: 'hotel-le-meurice-booking.docx',
    icon: DescriptionIcon,
    name: 'Hotel Le Meurice booking',
    type: 'Document',
  },
] as const;

export const routeStops = [
  { title: 'Shinjuku Gyoen Garden', time: '10:00 AM - 12:30 PM', top: '40%', left: '30%' },
  { title: 'Meiji Jingu Shrine', time: '1:00 PM - 3:00 PM', top: '32%', left: '45%' },
  { title: 'Shibuya Crossing', time: '6:30 PM - 9:00 PM', top: '48%', left: '58%' },
] as const;

export const chatMembers = [
  {
    avatar: tripItineraryAssets.members[0],
    name: 'Priya Sharma',
    status: 'Typing...',
    online: true,
    active: true,
  },
  {
    avatar: tripItineraryAssets.members[1],
    name: 'Marcus Chen',
    status: 'Online',
    online: true,
    active: false,
  },
  {
    avatar: tripItineraryAssets.members[2],
    name: 'Alex Rivera',
    status: 'Away - 12m ago',
    online: false,
    active: false,
  },
] as const;

export const expenseCategories = [
  { icon: RestaurantIcon, label: 'Food & Dining', value: 'food' },
  { icon: HotelIcon, label: 'Accommodation', value: 'hotel' },
  { icon: DirectionsCarIcon, label: 'Transportation', value: 'transport' },
  { icon: FlightIcon, label: 'Flights', value: 'flight' },
  { icon: PaymentsIcon, label: 'Activities', value: 'activity' },
] as const;

export const tripMembers = [
  { avatar: tripItineraryAssets.profile, label: 'You', value: 'you' },
  { avatar: tripItineraryAssets.members[0], label: 'Priya Sharma', value: 'priya' },
  { avatar: tripItineraryAssets.members[1], label: 'Alex Rivera', value: 'alex' },
  { avatar: tripItineraryAssets.members[2], label: 'David Kim', value: 'david' },
] as const;

export type AddExpenseFormValues = {
  amount: number;
  category: string;
  date: string;
  description: string;
  notes: string;
  paidBy: string;
  splitWith: string[];
};

export type AddFolderFormValues = {
  description: string;
  name: string;
};

export type UploadDocumentFormValues = {
  document: FileList | null;
  name: string;
};

export const addExpenseSchema: yup.ObjectSchema<AddExpenseFormValues> = yup.object({
  amount: yup
    .number()
    .typeError('Enter a valid amount')
    .positive('Amount must be greater than 0')
    .required('Amount is required'),
  category: yup.string().required('Category is required'),
  date: yup.string().required('Date is required'),
  description: yup.string().trim().required('Description is required'),
  notes: yup.string().trim().max(240, 'Notes must be 240 characters or less').defined(),
  paidBy: yup.string().required('Paid by is required'),
  splitWith: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Select at least one member')
    .required('Select at least one member'),
});

export const addFolderSchema: yup.ObjectSchema<AddFolderFormValues> = yup.object({
  description: yup.string().trim().required('Short description is required').max(120, 'Description must be 120 characters or less'),
  name: yup.string().trim().required('Folder name is required').max(48, 'Folder name must be 48 characters or less'),
});

export const uploadDocumentSchema: yup.ObjectSchema<UploadDocumentFormValues> = yup.object({
  document: yup
    .mixed<FileList>()
    .nullable()
    .defined()
    .test('document-required', 'Document is required', (value) => !!value?.length),
  name: yup.string().trim().required('Document name is required').max(64, 'Document name must be 64 characters or less'),
});

export const addExpenseDefaultValues: AddExpenseFormValues = {
  amount: 0,
  category: 'food',
  date: new Date().toISOString().slice(0, 10),
  description: '',
  notes: '',
  paidBy: 'you',
  splitWith: ['you', 'priya', 'alex', 'david'],
};

export const addFolderDefaultValues: AddFolderFormValues = {
  description: '',
  name: '',
};

export const uploadDocumentDefaultValues: UploadDocumentFormValues = {
  document: null,
  name: '',
};

export function TripIcon({ name }: { name: IconName }) {
  const Icon = iconMap[name];
  return <Icon />;
}
