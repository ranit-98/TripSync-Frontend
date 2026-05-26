'use client';

import AddPhotoModal from '@/components/albums/AddPhotoModal';
import AppSidebar from '@/components/layout/AppSidebar';
import { galleryImages, tripAlbums } from '@/json/albums';
import { AlbumsPageWrapper } from '@/styles/albums/albums.styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useState } from 'react';

type AlbumGalleryPageProps = {
  tripId?: string;
};

export default function AlbumGalleryPage({ tripId = 'paris-loire' }: AlbumGalleryPageProps) {
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const album = tripAlbums.find((item) => item.id === tripId) ?? tripAlbums[2];

  return (
    <AlbumsPageWrapper>
      <AppSidebar active="albums" showNewTrip />

      <Box className="albums_main" component="main">
        <Box className="albums_topbar" component="header">
          <Box>
            <Typography className="page_title" component="h1">
              {album.title}
            </Typography>
            <Typography className="page_subtitle">{album.location} photo gallery</Typography>
          </Box>
          <Button component={Link} href="/albums" startIcon={<ArrowBackIcon />} variant="outlined">
            Back to Albums
          </Button>
        </Box>

        <Box className="albums_content">
          <Box className="gallery_showcase">
            <Box className="showcase_large" component="img" src={album.cover} alt={album.title} />
            {galleryImages.slice(1, 5).map((image) => (
              <Box className="showcase_tile" component="img" src={image.src} alt={image.alt} key={image.src} />
            ))}
            <Box className="showcase_caption">
              <span>{album.location}</span>
              <strong>{album.photoCount} shared memories</strong>
            </Box>
          </Box>

          <Box className="gallery_hero">
            <Box className="upload_panel">
              <Box className="upload_copy">
                <span className="upload_icon">
                  <CloudUploadIcon />
                </span>
                <Box>
                  <strong>Upload trip photos</strong>
                  <Typography className="gallery_meta">
                    Add JPG or PNG photos from the trip. They will appear in this shared gallery.
                  </Typography>
                </Box>
              </Box>
              <Button onClick={() => setShowAddPhotoModal(true)} startIcon={<AddPhotoAlternateIcon />} variant="contained">
                Choose Photos
              </Button>
            </Box>

            <Box className="gallery_stat">
              <strong>{album.photoCount} photos</strong>
              <Typography className="gallery_meta">{album.date}</Typography>
              <Typography className="gallery_meta">Shared with all trip members</Typography>
            </Box>
          </Box>

          <Box className="gallery_toolbar">
            <Typography className="section_title" component="h2">
              Gallery
            </Typography>
            <Typography className="gallery_meta">
              <PhotoLibraryIcon fontSize="inherit" /> Latest uploads
            </Typography>
          </Box>

          <Box className="gallery_grid">
            {galleryImages.map((image) => (
              <Box className="gallery_card" key={image.src}>
                <Box component="img" src={image.src} alt={image.alt} />
                <Box className="gallery_caption">
                  <strong>{image.caption}</strong>
                  <Typography className="gallery_meta">Uploaded to {album.title}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      {showAddPhotoModal && <AddPhotoModal albumTitle={album.title} onClose={() => setShowAddPhotoModal(false)} />}
    </AlbumsPageWrapper>
  );
}
