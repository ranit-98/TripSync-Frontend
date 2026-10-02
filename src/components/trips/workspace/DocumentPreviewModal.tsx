'use client';

import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import DocumentPreviewFallback from './DocumentPreviewFallback';

export type PreviewDocument = {
  displayName: string;
  id?: string;
  mimeType?: string;
  objectKey?: string;
  originalFileName: string;
  size?: number;
  url: string;
};

const getFileNameText = (document: PreviewDocument) => [
  document.displayName,
  document.originalFileName,
  document.objectKey,
  document.url?.split('?')[0]?.split('/').pop(),
].filter(Boolean).join(' ').toLowerCase();

const getMimeText = (document: PreviewDocument) => (document.mimeType || '').toLowerCase();

const getProxyUrl = (document: PreviewDocument) => {
  const params = new URLSearchParams({
    filename: document.originalFileName || document.displayName || 'document',
    url: document.url,
  });

  if (document.mimeType) {
    params.set('type', document.mimeType);
  }

  return `/api/document-proxy?${params.toString()}`;
};

const isSpreadsheetDocument = (document: PreviewDocument) => {
  const fileName = getFileNameText(document);
  const mime = getMimeText(document);

  return (
    /\.(xls|xlsx|csv)(\?|#|\s|$)/i.test(fileName) ||
    /(^|[\s_-])xlsx?([\s_-]|$)/i.test(fileName) ||
    /(^|[\s_-])csv([\s_-]|$)/i.test(fileName) ||
    mime.includes('application/vnd.ms-excel') ||
    mime.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ||
    mime.includes('text/csv')
  );
};

const isPdfDocument = (document: PreviewDocument) => {
  const fileName = getFileNameText(document);
  const mime = getMimeText(document);

  return /\.pdf(\?|#|\s|$)/i.test(fileName) || mime.includes('application/pdf');
};

const isImageDocument = (document: PreviewDocument) => {
  const fileName = getFileNameText(document);
  const mime = getMimeText(document);

  return /\.(png|jpe?g|gif|webp|bmp|svg)(\?|#|\s|$)/i.test(fileName) || mime.startsWith('image/');
};

const isTextDocument = (document: PreviewDocument) => {
  const fileName = getFileNameText(document);
  const mime = getMimeText(document);

  return /\.(txt|json|md|html?)(\?|#|\s|$)/i.test(fileName) || mime.startsWith('text/') || mime.includes('application/json');
};

const isVideoDocument = (document: PreviewDocument) => {
  const fileName = getFileNameText(document);
  const mime = getMimeText(document);

  return /\.(mp4|webm|ogg|mov)(\?|#|\s|$)/i.test(fileName) || mime.startsWith('video/');
};

const isOfficeDocument = (document: PreviewDocument) => {
  const fileName = getFileNameText(document);
  const mime = getMimeText(document);

  return (
    /\.(doc|docx|ppt|pptx)(\?|#|\s|$)/i.test(fileName) ||
    mime.includes('application/msword') ||
    mime.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document') ||
    mime.includes('application/vnd.ms-powerpoint') ||
    mime.includes('application/vnd.openxmlformats-officedocument.presentationml.presentation')
  );
};

const formatFileSize = (size?: number) => {
  if (!size) {
    return 'Size unavailable';
  }

  const units = ['B', 'KB', 'MB', 'GB'];
  const unitIndex = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);
  const value = size / (1024 ** unitIndex);

  return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
};

// ─── PDF Preview ──────────────────────────────────────────────────────────────
// Match the working Mawai document viewer: fetch the file URL directly, create
// an application/pdf object URL, and render that blob URL in an iframe.

function PdfPreview({ document }: { document: PreviewDocument }) {
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState('');
  const [pdfError, setPdfError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const fileUrl = document.url;

  useEffect(() => {
    let objectUrl = '';
    let isActive = true;

    const loadPdf = async () => {
      setPdfPreviewUrl('');
      setPdfError('');
      setIsLoading(true);

      try {
        const response = await fetch(fileUrl);

        if (!response.ok) {
          throw new Error('Unable to load PDF');
        }

        const blob = await response.blob();
        objectUrl = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));

        if (isActive) {
          setPdfPreviewUrl(objectUrl);
        }
      } catch {
        if (isActive) {
          setPdfError('PDF preview failed. Open it in a new tab or download it.');
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadPdf();

    return () => {
      isActive = false;

      if (objectUrl) {
        window.URL.revokeObjectURL(objectUrl);
      }
    };
  }, [fileUrl]);

  if (isLoading) {
    return (
      <Box className="pdf_preview_loading">
        <CircularProgress size={36} />
        <Typography>Loading PDF…</Typography>
      </Box>
    );
  }

  if (pdfError || !pdfPreviewUrl) {
    return (
      <DocumentPreviewFallback
        document={document}
        title={pdfError || 'PDF preview is not available.'}
      />
    );
  }

  return (
    <iframe
      className="iframe_document_preview pdf_blob_preview"
      src={`${pdfPreviewUrl}#toolbar=1&navpanes=0`}
      title={document.displayName}
    />
  );
}

// ─── Office Preview ───────────────────────────────────────────────────────────
function OfficePreview({ document }: { document: PreviewDocument }) {
  const [isLoading, setIsLoading] = useState(true);
  const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(document.url)}`;

  return (
    <Box className="iframe_loader_wrap">
      {isLoading && (
        <Box className="iframe_loading_overlay">
          <CircularProgress size={36} />
          <Typography>Loading document…</Typography>
        </Box>
      )}
      <iframe
        className="iframe_document_preview"
        src={viewerUrl}
        title={document.displayName}
        onLoad={() => setIsLoading(false)}
      />
    </Box>
  );
}

// ─── Text Preview ─────────────────────────────────────────────────────────────
function TextPreview({ document }: { document: PreviewDocument }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadText = async () => {
      setError('');
      setIsLoading(true);

      try {
        const response = await fetch(getProxyUrl(document), { signal: controller.signal });

        if (!response.ok) {
          throw new Error('Unable to load text.');
        }

        setContent(await response.text());
      } catch (loadError) {
        if ((loadError as Error).name !== 'AbortError') {
          setError('This file could not be previewed.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadText();

    return () => controller.abort();
  }, [document]);

  if (isLoading) {
    return (
      <Box className="pdf_preview_loading">
        <CircularProgress size={36} />
        <Typography>Loading document…</Typography>
      </Box>
    );
  }

  if (error) {
    return <DocumentPreviewFallback document={document} title={error} />;
  }

  return (
    <Box className="text_document_preview">
      <pre>{content}</pre>
    </Box>
  );
}

// ─── Spreadsheet Preview ──────────────────────────────────────────────────────
function SpreadsheetPreview({ document }: { document: PreviewDocument }) {
  const [activeSheet, setActiveSheet] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sheets, setSheets] = useState<Record<string, string[][]>>({});

  useEffect(() => {
    const controller = new AbortController();

    const loadWorkbook = async () => {
      setError('');
      setIsLoading(true);

      try {
        const response = await fetch(getProxyUrl(document), { signal: controller.signal });

        if (!response.ok) {
          throw new Error('Unable to load spreadsheet.');
        }

        const buffer = await response.arrayBuffer();
        const XLSX = await import('xlsx');
        const workbook = XLSX.read(buffer, { type: 'array' });
        const parsedSheets = workbook.SheetNames.reduce<Record<string, string[][]>>((result, sheetName) => {
          const sheet = workbook.Sheets[sheetName];
          result[sheetName] = XLSX.utils.sheet_to_json<string[]>(sheet, {
            blankrows: false,
            defval: '',
            header: 1,
            raw: false,
          });

          return result;
        }, {});

        setSheets(parsedSheets);
        setActiveSheet(workbook.SheetNames[0] || '');
      } catch (loadError) {
        if ((loadError as Error).name !== 'AbortError') {
          setError('This spreadsheet could not be previewed.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadWorkbook();

    return () => controller.abort();
  }, [document]);

  const rows = activeSheet ? sheets[activeSheet] || [] : [];
  const columnCount = Math.max(...rows.map((row) => row.length), 0);

  if (isLoading) {
    return (
      <Box className="pdf_preview_loading">
        <CircularProgress size={36} />
        <Typography>Loading spreadsheet…</Typography>
      </Box>
    );
  }

  if (error || !rows.length) {
    return (
      <Box className="document_preview_fallback">
        <DescriptionIcon />
        <Typography component="h4">{error || 'No spreadsheet rows found'}</Typography>
        <Typography>You can still download the original file.</Typography>
        <Button component="a" download={document.originalFileName} href={document.url} startIcon={<DownloadIcon />} target="_blank" variant="contained">
          Download file
        </Button>
      </Box>
    );
  }

  return (
    <Box className="spreadsheet_preview">
      <Box className="spreadsheet_tabs">
        {Object.keys(sheets).map((sheetName) => (
          <button className={sheetName === activeSheet ? 'active' : ''} key={sheetName} onClick={() => setActiveSheet(sheetName)} type="button">
            {sheetName}
          </button>
        ))}
      </Box>
      <Box className="spreadsheet_table_wrap">
        <table>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`${activeSheet}-${rowIndex}`}>
                {Array.from({ length: columnCount }, (_, columnIndex) => (
                  <td className={rowIndex === 0 ? 'header_cell' : ''} key={`${activeSheet}-${rowIndex}-${columnIndex}`}>
                    {row[columnIndex] || ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}

// ─── PreviewContent ───────────────────────────────────────────────────────────
function PreviewContent({ document, zoom }: { document: PreviewDocument; zoom: number }) {
  if (!document.url?.trim()) {
    return <DocumentPreviewFallback document={document} title="File URL missing" />;
  }

  if (isSpreadsheetDocument(document)) {
    return <SpreadsheetPreview document={document} />;
  }

  if (isPdfDocument(document)) {
    return <PdfPreview document={document} />;
  }

  if (isImageDocument(document)) {
    return (
      <Box className="image_document_preview_wrap">
        <Box
          alt={document.displayName}
          className="image_document_preview"
          component="img"
          src={getProxyUrl(document)}
          sx={{ transform: `scale(${zoom})` }}
        />
      </Box>
    );
  }

  if (isVideoDocument(document)) {
    return <video className="video_document_preview" controls src={getProxyUrl(document)} />;
  }

  if (isTextDocument(document)) {
    return <TextPreview document={document} />;
  }

  if (isOfficeDocument(document)) {
    return <OfficePreview document={document} />;
  }

  return <DocumentPreviewFallback document={document} />;
}

// ─── Modal ────────────────────────────────────────────────────────────────────
type DocumentPreviewModalProps = {
  document: PreviewDocument;
  onClose: () => void;
};

export default function DocumentPreviewModal({ document, onClose }: DocumentPreviewModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const isImage = isImageDocument(document);

  const handleClose = () => {
    setIsFullScreen(false);
    setZoom(1);
    onClose();
  };

  return (
    <Box
      aria-label={`Preview ${document.displayName}`}
      aria-modal="true"
      className={`document_modal_overlay preview_overlay${isFullScreen ? ' is_fullscreen' : ''}`}
      role="dialog"
    >
      <Box className="document_modal document_preview_modal">
        <Box className="document_modal_header preview_modal_header">
          <Box className="preview_file_details">
            <Typography component="h3" title={document.displayName}>{document.displayName}</Typography>
            <Typography title={document.originalFileName}>{document.originalFileName} · {formatFileSize(document.size)}</Typography>
          </Box>
          <Box className="preview_header_actions">
            {isImage && (
              <>
                <Tooltip title="Zoom out">
                  <span>
                    <IconButton aria-label="Zoom out" disabled={zoom <= 0.5} onClick={() => setZoom((value) => Math.max(0.5, value - 0.1))}>
                      <ZoomOutIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Zoom in">
                  <span>
                    <IconButton aria-label="Zoom in" disabled={zoom >= 2} onClick={() => setZoom((value) => Math.min(2, value + 0.1))}>
                      <ZoomInIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </>
            )}
            <Tooltip title="Open in new tab">
              <IconButton aria-label="Open in new tab" component="a" href={document.url} rel="noopener noreferrer" target="_blank">
                <OpenInNewIcon />
              </IconButton>
            </Tooltip>
            {!isMobile && (
              <Tooltip title={isFullScreen ? 'Exit full screen' : 'Full screen'}>
                <IconButton aria-label={isFullScreen ? 'Exit full screen' : 'Full screen'} onClick={() => setIsFullScreen((value) => !value)}>
                  {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Download">
              <IconButton aria-label="Download document" component="a" download={document.originalFileName} href={document.url}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton aria-label="Close document preview" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box className="document_preview_body">
          <PreviewContent document={document} zoom={zoom} />
        </Box>
        <Box className="document_modal_footer preview_modal_footer">
          <Button component="a" download={document.originalFileName} href={document.url} startIcon={<DownloadIcon />} target="_blank">
            Download
          </Button>
          <Button onClick={handleClose} variant="contained">Done</Button>
        </Box>
      </Box>
    </Box>
  );
}
