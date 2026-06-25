'use client';

import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { PreviewDocument } from './DocumentPreviewModal';

type DocumentPreviewFallbackProps = {
  document: PreviewDocument;
  title?: string;
};

export default function DocumentPreviewFallback({ document, title = 'Preview unavailable' }: DocumentPreviewFallbackProps) {
  return (
    <Box className="document_preview_fallback">
      <DescriptionIcon />
      <Typography component="h4">{title}</Typography>
      <Typography>This file type cannot be rendered here. You can still download it.</Typography>
      <Button component="a" download={document.originalFileName} href={document.url} startIcon={<DownloadIcon />} target="_blank" variant="contained">
        Download file
      </Button>
    </Box>
  );
}
