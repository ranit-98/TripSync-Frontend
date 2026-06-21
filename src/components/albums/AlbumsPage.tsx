'use client';

import { useGalleryAlbums } from '@/api/hooks/gallery/useGallery.hooks';
import AppSidebar from '@/components/layout/AppSidebar';
import { PageLoader } from '@/components/skeleton';
import type { IAlbum } from '@/typescript/interface/api';
import { AlbumsPageWrapper } from '@/styles/albums/albums.styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CollectionsIcon from '@mui/icons-material/Collections';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

const toAlbums = (value: unknown): IAlbum[] => {
  if (Array.isArray(value)) return value as IAlbum[];
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const albums = [record.albums, record.items, record.data].find(Array.isArray);
    if (albums) return albums as IAlbum[];
  }
  return [];
};

const formatTripDates = (startDate?: string, endDate?: string) => {
  if (!startDate) return 'Dates not set';
  const start = new Date(startDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  if (!endDate) return start;
  const end = new Date(endDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  return `${start} – ${end}`;
};

export default function AlbumsPage() {
  const { data: albumsResponse, isLoading } = useGalleryAlbums();
  const albums = toAlbums(albumsResponse?.data.data);
  const featuredAlbum = albums[0];

  if (isLoading) return <PageLoader wrapperCls="page-loader" />;

  return (
    <AlbumsPageWrapper>
      <AppSidebar active="albums" showNewTrip />

      <Box className="albums_main" component="main">
        <Box className="albums_topbar" component="header">
          <Box>
            <Typography className="page_title" component="h1">Album</Typography>
            <Typography className="page_subtitle">Pick a trip to view and upload its shared travel photos.</Typography>
          </Box>
          {featuredAlbum && (
            <Button component={Link} href={`/albums/${featuredAlbum.id}`} startIcon={<AddPhotoAlternateIcon />} variant="contained">
              Upload Photos
            </Button>
          )}
        </Box>

        <Box className="albums_content">
          {featuredAlbum ? (
            <Box className="hero_album" component="section">
              {featuredAlbum.coverUrl && <Box component="img" src={featuredAlbum.coverUrl} alt={featuredAlbum.title} />}
              <Box className="hero_overlay" />
              <Box className="hero_content">
                <span className="hero_tag">Featured gallery</span>
                <Typography className="hero_title" component="h2">{featuredAlbum.title}</Typography>
                <Typography className="page_subtitle" sx={{ color: 'rgba(255,255,255,0.86)' }}>
                  {featuredAlbum.photoCount ?? 0} photos from {featuredAlbum.destination}
                </Typography>
                <Box className="hero_actions">
                  <Button component={Link} endIcon={<ArrowForwardIcon />} href={`/albums/${featuredAlbum.id}`} variant="contained">Open Gallery</Button>
                  <Button component={Link} href="/trips" startIcon={<CollectionsIcon />} variant="outlined">View Trips</Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box className="empty_album_panel">
              <Typography className="section_title" component="h2">No trip albums yet</Typography>
              <Typography className="page_subtitle">Create a trip, then upload photos to start a shared gallery.</Typography>
              <Button component={Link} href="/trips/create" variant="contained">Create Trip</Button>
            </Box>
          )}

          <Box className="section_row">
            <Typography className="section_title" component="h2">Trip albums</Typography>
            <Typography className="album_meta">{albums.reduce((total, album) => total + (album.photoCount ?? 0), 0)} photos synced</Typography>
          </Box>

          <Box className="album_grid">
            {albums.map((album) => (
              <Box className="album_card" component={Link} href={`/albums/${album.id}`} key={album.id}>
                <Box className="album_media">
                  {album.coverUrl && <Box component="img" src={album.coverUrl} alt={album.title} />}
                  <span className="photo_count"><PhotoLibraryIcon fontSize="inherit" /> {album.photoCount ?? 0} photos</span>
                </Box>
                <Box className="album_body">
                  <Typography className="album_title" component="h3">{album.title}</Typography>
                  <Typography className="album_meta">{album.destination}</Typography>
                  <Typography className="album_meta">{formatTripDates(album.startDate, album.endDate)}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </AlbumsPageWrapper>
  );
}
