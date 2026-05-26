'use client';

import AppSidebar from '@/components/layout/AppSidebar';
import { TripItineraryWrapper } from '@/styles/trips/itinerary.styles';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import ActiveTab from './workspace/ActiveTab';
import InviteModal from './workspace/InviteModal';
import TripHero from './workspace/TripHero';
import TripTabBar from './workspace/TripTabBar';
import type { TripWorkspaceTab } from './workspace/shared';

export default function TripWorkspacePage({ activeTab }: { activeTab: TripWorkspaceTab }) {
  const [showHero, setShowHero] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <TripItineraryWrapper>
      <AppSidebar active="trips" showNewTrip />

      <Box className="trip_main" component="main">
        {showHero ? (
          <TripHero onCollapse={() => setShowHero(false)} onInvite={() => setShowInviteModal(true)} />
        ) : (
          <Button
            className="hero_restore"
            startIcon={<KeyboardArrowDownIcon />}
            onClick={() => setShowHero(true)}
          >
            Show Trip Banner
          </Button>
        )}
        <TripTabBar activeTab={activeTab} />
        <ActiveTab activeTab={activeTab} />
      </Box>

      {activeTab === 'Itinerary' && (
        <Button className="mobile_fab" variant="contained" aria-label="Add activity">
          <AddIcon />
        </Button>
      )}

      {showInviteModal && <InviteModal onClose={() => setShowInviteModal(false)} />}
    </TripItineraryWrapper>
  );
}
