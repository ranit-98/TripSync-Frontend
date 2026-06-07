'use client';

import { useTripDetails, useTripMembers } from '@/api/hooks/trips/useTrips.hooks';
import AppSidebar from '@/components/layout/AppSidebar';
import { TripItineraryWrapper } from '@/styles/trips/itinerary.styles';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import ActiveTab from './workspace/ActiveTab';
import InviteModal from './workspace/InviteModal';
import TripHero from './workspace/TripHero';
import TripTabBar from './workspace/TripTabBar';
import type { TripWorkspaceTab } from './workspace/shared';

export default function TripWorkspacePage({ activeTab }: { activeTab: TripWorkspaceTab }) {
  const params = useParams<{ tripId?: string }>();
  const tripId = params.tripId ?? '';
  const [showHero, setShowHero] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { data: tripResponse, isLoading: isTripLoading } = useTripDetails(tripId);
  const { data: membersResponse } = useTripMembers(tripId);
  const trip = tripResponse?.data.data ?? null;
  const members = membersResponse?.data.data ?? [];

  return (
    <TripItineraryWrapper>
      <AppSidebar active="trips" showNewTrip />

      <Box className="trip_main" component="main">
        {showHero ? (
          <TripHero
            isLoading={isTripLoading}
            members={members}
            onCollapse={() => setShowHero(false)}
            onInvite={() => setShowInviteModal(true)}
            trip={trip}
          />
        ) : (
          <Button
            className="hero_restore"
            startIcon={<KeyboardArrowDownIcon />}
            onClick={() => setShowHero(true)}
          >
            Show Trip Banner
          </Button>
        )}
        <TripTabBar activeTab={activeTab} tripId={tripId} />
        <ActiveTab activeTab={activeTab} tripId={tripId} />
      </Box>

      {activeTab === 'Itinerary' && (
        <Button className="mobile_fab" variant="contained" aria-label="Add activity">
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
