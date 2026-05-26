import AppSidebar from '@/components/layout/AppSidebar';
import { galleryImages, tripAlbums } from '@/json/albums';
import { AlbumsPageWrapper } from '@/styles/albums/albums.styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CollectionsIcon from '@mui/icons-material/Collections';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function AlbumsPage() {
  const featuredAlbum = tripAlbums[2];

  return (
    <AlbumsPageWrapper>
      <AppSidebar active="albums" showNewTrip />

      <Box className="albums_main" component="main">
        <Box className="albums_topbar" component="header">
          <Box>
            <Typography className="page_title" component="h1">
              Album
            </Typography>
            <Typography className="page_subtitle">Pick a trip to view and upload its shared travel photos.</Typography>
          </Box>
          <Button href="/albums/paris-loire" startIcon={<AddPhotoAlternateIcon />} variant="contained">
            Upload Photos
          </Button>
        </Box>

        <Box className="albums_content">
          <Box className="hero_album" component="section">
            <Box component="img" src={featuredAlbum.cover} alt={featuredAlbum.title} />
            <Box className="hero_overlay" />
            <Box className="hero_content">
              <span className="hero_tag">Featured gallery</span>
              <Typography className="hero_title" component="h2">
                {featuredAlbum.title}
              </Typography>
              <Typography className="page_subtitle" sx={{ color: 'rgba(255,255,255,0.86)' }}>
                {featuredAlbum.photoCount} photos from {featuredAlbum.location}
              </Typography>
              <Box className="hero_actions">
                <Button component={Link} endIcon={<ArrowForwardIcon />} href={featuredAlbum.href} variant="contained">
                  Open Gallery
                </Button>
                <Button component={Link} href="/trips" startIcon={<CollectionsIcon />} variant="outlined">
                  View Trips
                </Button>
              </Box>
            </Box>
          </Box>

          <Box className="section_row">
            <Typography className="section_title" component="h2">
              Trip albums
            </Typography>
            <Typography className="album_meta">{galleryImages.length} recent highlights synced</Typography>
          </Box>

          <Box className="album_grid">
            {tripAlbums.map((album) => (
              <Box className="album_card" component={Link} href={album.href} key={album.id}>
                <Box className="album_media">
                  <Box component="img" src={album.cover} alt={album.title} />
                  <span className="photo_count">
                    <PhotoLibraryIcon fontSize="inherit" /> {album.photoCount} photos
                  </span>
                </Box>
                <Box className="album_body">
                  <Typography className="album_title" component="h3">
                    {album.title}
                  </Typography>
                  <Typography className="album_meta">{album.location}</Typography>
                  <Typography className="album_meta">{album.date}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </AlbumsPageWrapper>
  );
}
