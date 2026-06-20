"use client";

import {
  useTripDetails,
  useTripMembers,
} from "@/api/hooks/trips/useTrips.hooks";
import AppSidebar from "@/components/layout/AppSidebar";
import ErrorBoundary from "@/components/errors/ErrorBoundary";
import { PageLoader } from "@/components/skeleton";
import { useTripWorkspaceUiStore } from "@/store";
import { TripItineraryWrapper } from "@/styles/trips/itinerary.styles";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import ActiveTab from "./workspace/ActiveTab";
import InviteModal from "./workspace/InviteModal";
import TripHero from "./workspace/TripHero";
import TripTabBar from "./workspace/TripTabBar";
import type { TripWorkspaceTab } from "./workspace/shared";

export default function TripWorkspacePage({
  activeTab,
}: {
  activeTab: TripWorkspaceTab;
}) {
  const params = useParams<{ tripId?: string }>();
  const tripId = params.tripId ?? "";
  const showHero = useTripWorkspaceUiStore((state) =>
    state.isTripHeroExpanded(tripId),
  );
  const setTripHeroExpanded = useTripWorkspaceUiStore(
    (state) => state.setTripHeroExpanded,
  );
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isHeroMounted, setIsHeroMounted] = useState(showHero);
  const { data: tripResponse, isLoading: isTripLoading } =
    useTripDetails(tripId);
  const { data: membersResponse } = useTripMembers(tripId);
  const trip = tripResponse?.data.data ?? null;
  const members = membersResponse?.data.data ?? [];

  useEffect(() => {
    if (showHero) {
      setIsHeroMounted(true);
      return;
    }

    const timer = window.setTimeout(() => setIsHeroMounted(false), 280);
    return () => window.clearTimeout(timer);
  }, [showHero]);

  return (
    <TripItineraryWrapper>
      <AppSidebar active="trips" showNewTrip />

      <Box
        className={`trip_main ${showHero ? "hero_expanded" : "hero_collapsed"}`}
        component="main"
      >
        {isHeroMounted ? (
          <Box className={showHero ? "hero_transition is_expanded" : "hero_transition is_collapsing"}>
            <TripHero
            isLoading={isTripLoading}
            members={members}
            onCollapse={() => setTripHeroExpanded(tripId, false)}
            onInvite={() => setShowInviteModal(true)}
            trip={trip}
          />
          </Box>
        ) : (
          <Box className="collapsed_trip_header">
            <IconButton
              className="collapsed_back_btn"
              component={Link}
              href="/trips"
              aria-label="Back to trips"
            >
              <ArrowBackIcon />
            </IconButton>
            <Box className="collapsed_trip_copy">
              <Typography component="h1">
                {isTripLoading
                  ? "Loading trip..."
                  : trip?.title || "Untitled trip"}
              </Typography>
              <span>Trip workspace</span>
            </Box>
            <Button
              className="hero_restore"
              startIcon={<KeyboardArrowDownIcon />}
              onClick={() => setTripHeroExpanded(tripId, true)}
            >
              Show Trip Banner
            </Button>
          </Box>
        )}
        <TripTabBar activeTab={activeTab} tripId={tripId} />
        <ErrorBoundary fallbackClassName="trip_tab_error">
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ActiveTab
              activeTab={activeTab}
              onInvite={() => setShowInviteModal(true)}
              tripId={tripId}
            />
          </Suspense>
        </ErrorBoundary>
      </Box>

      {activeTab === "Itinerary" && (
        <Button
          className="mobile_fab"
          variant="contained"
          aria-label="Add activity"
        >
          <AddIcon />
        </Button>
      )}

      {showInviteModal && (
        <InviteModal
          members={members}
          onClose={() => setShowInviteModal(false)}
          trip={trip}
          tripId={tripId}
        />
      )}
    </TripItineraryWrapper>
  );
}
