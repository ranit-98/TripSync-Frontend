'use client';

import { useGalleryAlbum, useGalleryPhotos } from '@/api/hooks/gallery/useGallery.hooks';
import AddPhotoModal from '@/components/albums/AddPhotoModal';
import AppSidebar from '@/components/layout/AppSidebar';
import { PageLoader } from '@/components/skeleton';
import type { IPhoto } from '@/typescript/interface/api';
import { AlbumsPageWrapper } from '@/styles/albums/albums.styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const toPhotos = (value: unknown): IPhoto[] => {
  if (Array.isArray(value)) return value as IPhoto[];
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const photos = [record.photos, record.items, record.data].find(Array.isArray);
    if (photos) return photos as IPhoto[];
  }
  return [];
};

type AlbumGalleryPageProps = { tripId: string };

export default function AlbumGalleryPage({ tripId }: AlbumGalleryPageProps) {
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const { data: albumResponse, isLoading: isAlbumLoading } = useGalleryAlbum(tripId);
  const { data: photosResponse, isLoading: isPhotosLoading } = useGalleryPhotos(tripId);
  const album = albumResponse?.data.data;
  const photos = useMemo(() => photosResponse?.pages.flatMap((page) => toPhotos(page.data.data)) ?? [], [photosResponse?.pages]);
  const albumTitle = album?.title || 'Trip Gallery';
  const coverUrl = album?.coverUrl || photos[0]?.url;
  const photoCount = album?.photoCount ?? photos.length;

  if (isAlbumLoading || isPhotosLoading) return <PageLoader wrapperCls="page-loader" />;

  return (
    <AlbumsPageWrapper>
      <AppSidebar active="albums" showNewTrip />

      <Box className="albums_main" component="main">
        <Box className="albums_topbar" component="header">
          <Box>
            <Typography className="page_title" component="h1">{albumTitle}</Typography>
            <Typography className="page_subtitle">{album?.destination || 'Trip'} photo gallery</Typography>
          </Box>
          <Button component={Link} href="/albums" startIcon={<ArrowBackIcon />} variant="outlined">Back to Albums</Button>
        </Box>

        <Box className="albums_content">
          {photos.length ? (
            <Box className="gallery_showcase">
              {coverUrl && <Box className="showcase_large" component="img" src={coverUrl} alt={albumTitle} />}
              {photos.slice(1, 5).map((photo) => (
                <Box className="showcase_tile" component="img" src={photo.url} alt={photo.caption || photo.originalFileName} key={photo.id} />
              ))}
              <Box className="showcase_caption">
                <span>{album?.destination || 'Trip gallery'}</span>
                <strong>{photoCount} shared memories</strong>
              </Box>
            </Box>
          ) : null}

          <Box className="gallery_hero">
            <Box className="upload_panel">
              <Box className="upload_copy">
                <span className="upload_icon"><CloudUploadIcon /></span>
                <Box>
                  <strong>Upload trip photos</strong>
                  <Typography className="gallery_meta">Add photos from the trip. They will appear in this shared gallery.</Typography>
                </Box>
              </Box>
              <Button onClick={() => setShowAddPhotoModal(true)} startIcon={<AddPhotoAlternateIcon />} variant="contained">Choose Photos</Button>
            </Box>
            <Box className="gallery_stat">
              <strong>{photoCount} photos</strong>
              <Typography className="gallery_meta">Shared with all trip members</Typography>
            </Box>
          </Box>

          <Box className="gallery_toolbar">
            <Typography className="section_title" component="h2">Gallery</Typography>
            <Typography className="gallery_meta"><PhotoLibraryIcon fontSize="inherit" /> Latest uploads</Typography>
          </Box>

          {photos.length ? (
            <Box className="gallery_grid">
              {photos.map((photo) => (
                <Box className="gallery_card" key={photo.id}>
                  <Box component="img" src={photo.url} alt={photo.caption || photo.originalFileName} />
                  <Box className="gallery_caption">
                    <strong>{photo.caption || photo.originalFileName}</strong>
                    <Typography className="gallery_meta">Uploaded to {albumTitle}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Box className="empty_album_panel">
              <Typography className="section_title" component="h2">No photos yet</Typography>
              <Typography className="page_subtitle">Upload the first memory from this trip.</Typography>
              <Button onClick={() => setShowAddPhotoModal(true)} startIcon={<AddPhotoAlternateIcon />} variant="contained">Add Photos</Button>
            </Box>
          )}
        </Box>
      </Box>
      {showAddPhotoModal && <AddPhotoModal albumTitle={albumTitle} onClose={() => setShowAddPhotoModal(false)} tripId={tripId} />}
    </AlbumsPageWrapper>
  );
}
