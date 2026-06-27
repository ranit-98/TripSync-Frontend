'use client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export function TripGalleryTabSkeleton() {
  return (
    <Box className="tab_page padded_page" aria-busy="true" aria-label="Loading trip gallery">
      <Box className="trip_gallery_showcase">
        <Skeleton className="trip_gallery_cover" variant="rectangular" />
        <Box className="trip_gallery_content">
          <Skeleton height={18} width={96} />
          <Skeleton height={48} width="52%" />
          <Skeleton height={24} width="34%" />
          <Skeleton height={42} variant="rounded" width={140} />
        </Box>
        <Box className="trip_gallery_strip">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton height="100%" key={index} variant="rounded" width="100%" />
          ))}
        </Box>
      </Box>

      <Box className="trip_gallery_toolbar">
        <Box>
          <Skeleton height={32} width={190} />
          <Skeleton height={22} width={280} />
        </Box>
        <Skeleton height={40} variant="rounded" width={110} />
      </Box>

      <Box className="trip_gallery_grid">
        {Array.from({ length: 6 }, (_, index) => (
          <Box className="trip_gallery_card" key={index}>
            <Skeleton height={190} variant="rectangular" />
            <Box>
              <Skeleton height={22} width="72%" />
              <Skeleton height={18} width="54%" />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
