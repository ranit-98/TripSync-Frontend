import { tripTabs } from '@/json/tripItinerary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { getTripTabHref, TripIcon, type TripWorkspaceTab } from './shared';

export default function TripTabBar({ activeTab, tripId }: { activeTab: TripWorkspaceTab; tripId: string }) {
  const activeTabRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    activeTabRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [activeTab]);

  return (
    <Box className="tab_bar">
      <Box className="tab_inner">
        {tripTabs.map((tab) => (
          <Button
            className={`tab_btn${activeTab === tab.label ? ' active' : ''}`}
            component={Link}
            href={getTripTabHref(tripId, tab.label)}
            key={tab.label}
            ref={activeTab === tab.label ? activeTabRef : undefined}
          >
            <TripIcon name={tab.icon} />
            {tab.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
