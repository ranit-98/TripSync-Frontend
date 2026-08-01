import type { TripWorkspaceTab } from "./shared";
import { lazy } from "react";

const ChatTab = lazy(() => import("./tabs/ChatTab"));
const ExpensesTab = lazy(() => import("./tabs/ExpensesTab"));
const FilesTab = lazy(() => import("./tabs/FilesTab"));
const GalleryTab = lazy(() => import("./tabs/GalleryTab"));
const ItineraryTab = lazy(() => import("./tabs/ItineraryTab"));
// const MapTab = lazy(() => import("./tabs/MapTab"));
const PlaceholderTab = lazy(() => import("./tabs/PlaceholderTab"));

export default function ActiveTab({
  activeTab,
  canManage,
  expensesView,
  onInvite,
  tripId,
}: {
  activeTab: TripWorkspaceTab;
  canManage: boolean;
  expensesView?: "expenses" | "settlements" | "insights";
  onInvite?: () => void;
  tripId: string;
}) {
  if (activeTab === "Itinerary") return <ItineraryTab canEdit={canManage} tripId={tripId} />;
  if (activeTab === "Expenses") return <ExpensesTab canEdit={canManage} initialView={expensesView} tripId={tripId} />;
  // if (activeTab === "Map") return <MapTab />;
  if (activeTab === "Chat")
    return <ChatTab onInvite={onInvite} tripId={tripId} />;
  if (activeTab === "Gallery") return <GalleryTab canEdit={canManage} tripId={tripId} />;
  if (activeTab === "Files") return <FilesTab canEdit={canManage} tripId={tripId} />;
  return <PlaceholderTab label={activeTab} />;
}
