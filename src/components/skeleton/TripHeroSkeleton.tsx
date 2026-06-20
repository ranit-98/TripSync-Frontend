'use client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function TripHeroSkeleton() {
  return <Box className="hero hero_skeleton" component="header" aria-busy="true">
    <Skeleton height="100%" variant="rectangular" width="100%" />
    <Box className="hero_skeleton_content">
      <Skeleton height={26} width={112} />
      <Skeleton height={56} sx={{ mt: 1 }} width="52%" />
      <Skeleton height={38} sx={{ mt: 2 }} width={180} />
    </Box>
  </Box>;
}
