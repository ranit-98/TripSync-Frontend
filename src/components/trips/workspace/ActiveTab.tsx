import type { TripWorkspaceTab } from './shared';
import ChatTab from './tabs/ChatTab';
import ExpensesTab from './tabs/ExpensesTab';
import FilesTab from './tabs/FilesTab';
import GalleryTab from './tabs/GalleryTab';
import ItineraryTab from './tabs/ItineraryTab';
import MapTab from './tabs/MapTab';
import PlaceholderTab from './tabs/PlaceholderTab';

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
