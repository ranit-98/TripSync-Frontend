import type { TripWorkspaceTab } from './shared';
import ChatTab from './tabs/ChatTab';
import ExpensesTab from './tabs/ExpensesTab';
import FilesTab from './tabs/FilesTab';
import GalleryTab from './tabs/GalleryTab';
import ItineraryTab from './tabs/ItineraryTab';
import MapTab from './tabs/MapTab';
import PlaceholderTab from './tabs/PlaceholderTab';

export default function ActiveTab({ activeTab }: { activeTab: TripWorkspaceTab }) {
  if (activeTab === 'Itinerary') return <ItineraryTab />;
  if (activeTab === 'Expenses') return <ExpensesTab />;
  if (activeTab === 'Map') return <MapTab />;
  if (activeTab === 'Chat') return <ChatTab />;
  if (activeTab === 'Gallery') return <GalleryTab />;
  if (activeTab === 'Files') return <FilesTab />;
  return <PlaceholderTab label={activeTab} />;
}
