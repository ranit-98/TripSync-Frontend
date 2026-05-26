import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function PlaceholderTab({ label }: { label: string }) {
  return (
    <Box className="tab_page padded_page">
      <Box className="placeholder_panel">
        <Typography component="h2">{label}</Typography>
        <Typography>This tab is ready for the next TripSync module.</Typography>
      </Box>
    </Box>
  );
}
