'use client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function TripListSkeleton() {
  return <Box aria-busy="true" className="trip_grid">
    {Array.from({ length: 6 }, (_, index) => <Box className="trip_card" key={index}>
      <Skeleton height={160} variant="rounded" />
      <Box sx={{ p: 2 }}><Skeleton height={28} width="72%" /><Skeleton height={20} width="48%" /><Skeleton height={20} width="85%" /></Box>
    </Box>)}
  </Box>;
}
