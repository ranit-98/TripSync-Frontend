import type { TripWorkspaceTab } from './shared';
import { lazy } from 'react';

const ChatTab = lazy(() => import('./tabs/ChatTab'));
const ExpensesTab = lazy(() => import('./tabs/ExpensesTab'));
const FilesTab = lazy(() => import('./tabs/FilesTab'));
const GalleryTab = lazy(() => import('./tabs/GalleryTab'));
const ItineraryTab = lazy(() => import('./tabs/ItineraryTab'));
const MapTab = lazy(() => import('./tabs/MapTab'));
const PlaceholderTab = lazy(() => import('./tabs/PlaceholderTab'));

export default function ActiveTab({
  activeTab,
  onInvite,
  tripId,
}: {
  activeTab: TripWorkspaceTab;
  onInvite?: () => void;
  tripId: string;
}) {
  if (activeTab === 'Itinerary') return <ItineraryTab tripId={tripId} />;
  if (activeTab === 'Expenses') return <ExpensesTab tripId={tripId} />;
  if (activeTab === 'Map') return <MapTab />;
  if (activeTab === 'Chat') return <ChatTab onInvite={onInvite} tripId={tripId} />;
  if (activeTab === 'Gallery') return <GalleryTab />;
  if (activeTab === 'Files') return <FilesTab />;
  return <PlaceholderTab label={activeTab} />;
}
