'use client';

import { useGalleryAlbum, useGalleryPhotos } from '@/api/hooks/gallery/useGallery.hooks';
import AddPhotoModal from '@/components/albums/AddPhotoModal';
import { TripGalleryTabSkeleton } from '@/components/skeleton';
import type { IPhoto } from '@/typescript/interface/api';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';

const toPhotos = (value: unknown): IPhoto[] => {
  if (Array.isArray(value)) return value as IPhoto[];

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const candidates = [record.photos, record.items, record.data];
    const photos = candidates.find(Array.isArray);
    if (photos) return photos as IPhoto[];
  }

  return [];
};

export default function GalleryTab({ tripId }: { tripId: string }) {
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const { data: albumResponse, isLoading: isAlbumLoading } = useGalleryAlbum(tripId);
  const { data: photosResponse, isLoading: isPhotosLoading } = useGalleryPhotos(tripId);
  const album = albumResponse?.data.data;
  const photos = useMemo(() => photosResponse?.pages.flatMap((page) => toPhotos(page.data.data)) ?? [], [photosResponse?.pages]);
  const coverUrl = album?.coverUrl || photos[0]?.url;
  const albumTitle = album?.title || 'Trip Gallery';
  const photoCount = album?.photoCount ?? photos.length;

  if (isAlbumLoading || isPhotosLoading) {
    return <TripGalleryTabSkeleton />;
  }

  return (
    <Box className="tab_page padded_page">
      <Box className="trip_gallery_showcase">
        {coverUrl && <Box className="trip_gallery_cover" component="img" src={coverUrl} alt={albumTitle} />}
        <Box className="trip_gallery_overlay" />
        <Box className="trip_gallery_content">
          <span>Trip gallery</span>
          <Typography component="h2">{albumTitle}</Typography>
          <Typography>{photoCount} photo{photoCount === 1 ? '' : 's'} shared with this trip</Typography>
          <Button startIcon={<AddPhotoAlternateIcon />} variant="contained" onClick={() => setShowAddPhotoModal(true)}>
            Add Photos
          </Button>
        </Box>
        {photos.length > 1 && (
          <Box className="trip_gallery_strip">
            {photos.slice(1, 4).map((photo) => (
              <Box component="img" src={photo.url} alt={photo.caption || photo.originalFileName} key={photo.id} />
            ))}
          </Box>
        )}
      </Box>

      <Box className="trip_gallery_toolbar">
        <Box>
          <Typography className="section_heading" component="h2">
            Shared Memories
          </Typography>
          <Typography className="files_subtitle">Upload photos directly to this trip gallery.</Typography>
        </Box>
        <Button startIcon={<CloudUploadIcon />} variant="outlined" onClick={() => setShowAddPhotoModal(true)}>
          Upload
        </Button>
      </Box>

      {photos.length ? (
        <Box className="trip_gallery_grid">
          {photos.map((photo) => (
            <Box className="trip_gallery_card" key={photo.id}>
              <Box component="img" src={photo.url} alt={photo.caption || photo.originalFileName} />
              <Box>
                <strong>{photo.caption || photo.originalFileName}</strong>
                <span>Uploaded to {albumTitle}</span>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Box className="empty_panel">
          <Typography className="empty_title">No photos yet</Typography>
          <Typography className="empty_copy">Drop photos here to start collecting memories from this trip.</Typography>
          <Button startIcon={<AddPhotoAlternateIcon />} variant="contained" onClick={() => setShowAddPhotoModal(true)}>
            Add Photos
          </Button>
        </Box>
      )}

      {showAddPhotoModal && (
        <AddPhotoModal albumTitle={albumTitle} onClose={() => setShowAddPhotoModal(false)} tripId={tripId} />
      )}
    </Box>
  );
}
