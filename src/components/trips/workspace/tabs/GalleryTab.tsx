import AddPhotoModal from '@/components/albums/AddPhotoModal';
import { galleryImages, tripAlbums } from '@/json/albums';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export default function GalleryTab() {
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const album = tripAlbums.find((item) => item.id === 'paris-loire') ?? tripAlbums[2];

  return (
    <Box className="tab_page padded_page">
      <Box className="trip_gallery_showcase">
        <Box className="trip_gallery_cover" component="img" src={album.cover} alt={album.title} />
        <Box className="trip_gallery_overlay" />
        <Box className="trip_gallery_content">
          <span>Trip gallery</span>
          <Typography component="h2">{album.title}</Typography>
          <Typography>{album.photoCount} photos from {album.location}</Typography>
          <Button startIcon={<AddPhotoAlternateIcon />} variant="contained" onClick={() => setShowAddPhotoModal(true)}>
            Add Photos
          </Button>
        </Box>
        <Box className="trip_gallery_strip">
          {galleryImages.slice(1, 4).map((image) => (
            <Box component="img" src={image.src} alt={image.alt} key={image.src} />
          ))}
        </Box>
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

      <Box className="trip_gallery_grid">
        {galleryImages.map((image) => (
          <Box className="trip_gallery_card" key={image.src}>
            <Box component="img" src={image.src} alt={image.alt} />
            <Box>
              <strong>{image.caption}</strong>
              <span>Uploaded to {album.title}</span>
            </Box>
          </Box>
        ))}
      </Box>

      {showAddPhotoModal && <AddPhotoModal albumTitle={album.title} onClose={() => setShowAddPhotoModal(false)} />}
    </Box>
  );
}
