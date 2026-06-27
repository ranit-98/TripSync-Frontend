'use client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export function AlbumsPageSkeleton() {
  return (
    <>
      <Box className="albums_topbar" component="header">
        <Box>
          <Skeleton height={40} width={130} />
          <Skeleton height={22} width={360} />
        </Box>
        <Skeleton height={42} variant="rounded" width={150} />
      </Box>

      <Box className="albums_content" aria-busy="true" aria-label="Loading albums">
        <Skeleton className="hero_album" variant="rounded" />

        <Box className="section_row">
          <Skeleton height={32} width={160} />
          <Skeleton height={22} width={110} />
        </Box>

        <Box className="album_grid">
          {Array.from({ length: 6 }, (_, index) => (
            <Box className="album_card" key={index}>
              <Skeleton className="album_media" variant="rounded" />
              <Box className="album_body">
                <Skeleton height={30} width="76%" />
                <Skeleton height={20} width="48%" />
                <Skeleton height={20} width="62%" />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}

export function AlbumGalleryPageSkeleton() {
  return (
    <>
      <Box className="albums_topbar" component="header">
        <Box>
          <Skeleton height={40} width={260} />
          <Skeleton height={22} width={180} />
        </Box>
        <Skeleton height={42} variant="rounded" width={150} />
      </Box>

      <Box className="albums_content" aria-busy="true" aria-label="Loading gallery">
        <Box className="gallery_showcase">
          <Skeleton className="showcase_large" variant="rounded" />
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton className="showcase_tile" key={index} variant="rounded" />
          ))}
        </Box>

        <Box className="gallery_hero">
          <Box className="upload_panel">
            <Box className="upload_copy">
              <Skeleton height={52} variant="rounded" width={52} />
              <Box>
                <Skeleton height={28} width={180} />
                <Skeleton height={20} width={280} />
              </Box>
            </Box>
            <Skeleton height={42} variant="rounded" width={150} />
          </Box>
          <Box className="gallery_stat">
            <Skeleton height={30} width={120} />
            <Skeleton height={20} width={190} />
          </Box>
        </Box>

        <Box className="gallery_toolbar">
          <Skeleton height={32} width={120} />
          <Skeleton height={22} width={130} />
        </Box>

        <Box className="gallery_grid">
          {Array.from({ length: 9 }, (_, index) => (
            <Box className="gallery_card" key={index}>
              <Skeleton height={220} variant="rectangular" />
              <Box className="gallery_caption">
                <Skeleton height={20} width="70%" />
                <Skeleton height={18} width="52%" />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
