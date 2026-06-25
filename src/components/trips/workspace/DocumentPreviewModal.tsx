'use client';

import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
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
// Fetches PDF as a Blob → creates a blob: URL → renders in <object> with
// an <iframe> fallback. This is the most reliable cross-browser approach and
// avoids Content-Security-Policy restrictions that block proxy iframes.

function PdfPreview({ document }: { document: PreviewDocument }) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [useIframeFallback, setUseIframeFallback] = useState(false);
  const prevBlobUrl = useRef<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadPdf = async () => {
      setError('');
      setIsLoading(true);
      setBlobUrl(null);

      try {
        const response = await fetch(getProxyUrl({ ...document, mimeType: 'application/pdf' }), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const blob = await response.blob();
        const pdfBlob = blob.type === 'application/pdf' ? blob : new Blob([blob], { type: 'application/pdf' });
        const url = URL.createObjectURL(pdfBlob);

        prevBlobUrl.current = url;
        setBlobUrl(url);
      } catch (loadError) {
        if ((loadError as Error).name !== 'AbortError') {
          setError('Could not load the PDF file.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadPdf();

    return () => {
      controller.abort();
      if (prevBlobUrl.current) {
        URL.revokeObjectURL(prevBlobUrl.current);
        prevBlobUrl.current = null;
      }
    };
  }, [document]);

  if (isLoading) {
    return (
      <Box className="pdf_preview_loading">
        <CircularProgress size={36} />
        <Typography>Loading PDF…</Typography>
      </Box>
    );
  }

  if (error || !blobUrl) {
    return <DocumentPreviewFallback document={document} title={error || 'Could not load PDF'} />;
  }

  // Try <object> first; if that fails (some browsers / CSP), switch to <iframe>
  if (useIframeFallback) {
    return (
      <iframe
        className="iframe_document_preview pdf_blob_preview"
        src={blobUrl}
        title={document.displayName}
      />
    );
  }

  return (
    <object
      className="iframe_document_preview pdf_blob_preview"
      data={blobUrl}
      type="application/pdf"
      onError={() => setUseIframeFallback(true)}
    >
      {/* Native PDF viewer unavailable – switch to iframe */}
      <iframe
        className="iframe_document_preview pdf_blob_preview"
        src={blobUrl}
        title={document.displayName}
        onLoad={() => {
          // If the iframe loaded but shows no content, it likely means the browser
          // blocked it. We expose the open-in-new-tab button via the fallback instead.
        }}
      />
    </object>
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
function PreviewContent({ document }: { document: PreviewDocument }) {
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
    return <Box alt={document.displayName} className="image_document_preview" component="img" src={getProxyUrl(document)} />;
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
  return (
    <Box className="document_modal_overlay preview_overlay">
      <Box className="document_modal document_preview_modal">
        <Box className="document_modal_header preview_modal_header">
          <Box>
            <Typography component="h3">{document.displayName}</Typography>
            <Typography>{document.originalFileName} · {formatFileSize(document.size)}</Typography>
          </Box>
          <Box className="preview_header_actions">
            <IconButton aria-label="Open in new tab" component="a" href={document.url} target="_blank">
              <OpenInNewIcon />
            </IconButton>
            <IconButton aria-label="Close document preview" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Box className="document_preview_body">
          <PreviewContent document={document} />
        </Box>
        <Box className="document_modal_footer preview_modal_footer">
          <Button component="a" download={document.originalFileName} href={document.url} startIcon={<DownloadIcon />} target="_blank">
            Download
          </Button>
          <Button onClick={onClose} variant="contained">Done</Button>
        </Box>
      </Box>
    </Box>
  );
}
