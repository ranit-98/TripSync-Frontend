import ImageIcon from '@mui/icons-material/Image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function NoImageComp() {
  return (
    <Box
      sx={{
        alignItems: 'center',
        bgcolor: 'action.hover',
        color: 'text.secondary',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <ImageIcon />
      <Typography variant="caption">No image</Typography>
    </Box>
  );
}
