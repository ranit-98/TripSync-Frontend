'use client';

import { useFilesCreateDocument, useFilesCreateFolder, useFilesDeleteFolder, useFilesDocuments, useFilesFolders } from '@/api/hooks/files/useFiles.hooks';
import { useUploadsSign } from '@/api/hooks/uploads/useUploads.hooks';
import type { ICloudinaryUploadResponse, IDocument, IFolder, ISignedUpload } from '@/typescript/interface/api';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ChangeEvent, DragEvent, type ReactNode, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import * as yup from 'yup';

const DocumentPreviewModal = dynamic(() => import('@/components/trips/workspace/DocumentPreviewModal'), { ssr: false });

const toArray = <T,>(value: unknown): T[] => Array.isArray(value) ? value as T[] : [];

type FolderFormValues = { name: string };

const folderSchema: yup.ObjectSchema<FolderFormValues> = yup.object({
  name: yup.string().trim().required('Folder name is required.').min(2, 'Use at least 2 characters.').max(60, 'Folder name must be 60 characters or less.').defined(),
});

const uploadFile = async (file: File, signed: ISignedUpload) => {
  if (!signed.uploadUrl) throw new Error('Upload URL missing.');
  if (signed.signature || signed.apiKey) {
    const data = new FormData();
    data.append('file', file);
    if (signed.apiKey) data.append('api_key', signed.apiKey);
    if (signed.signature) data.append('signature', signed.signature);
    if (signed.timestamp) data.append('timestamp', String(signed.timestamp));
    if (signed.folder) data.append('folder', signed.folder);
    if (signed.publicId) data.append('public_id', signed.publicId);
    const response = await fetch(signed.uploadUrl, { method: 'POST', body: data });
    if (!response.ok) throw new Error('Upload failed.');
    const result = await response.json() as ICloudinaryUploadResponse;
    return result.secure_url || result.url || '';
  }
  const response = await fetch(signed.uploadUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type || 'application/octet-stream' } });
  if (!response.ok) throw new Error('Upload failed.');
  return signed.uploadUrl.split('?')[0];
};

const getFileExtension = (document: IDocument) => {
  const source = document.originalFileName || document.displayName || document.url || document.mimeType;
  const extension = source.split('?')[0]?.split('/').pop()?.split('.').pop();

  return extension && extension !== source ? extension.toLowerCase() : document.mimeType;
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

function FolderModal({ parent, onClose, onCreate }: { parent?: IFolder; onClose: () => void; onCreate: (name: string) => void }) {
  const { formState: { errors }, handleSubmit, register } = useForm<FolderFormValues>({ defaultValues: { name: '' }, mode: 'onBlur', resolver: yupResolver(folderSchema) });
  return <Box className="document_modal_overlay"><Box className="document_modal folder_modal" component="form" noValidate onSubmit={handleSubmit((values) => onCreate(values.name.trim()))}>
    <Box className="document_modal_header"><Box><Typography component="h3">New Folder</Typography><Typography>{parent ? `Create a folder inside ${parent.name}.` : 'Create a top-level folder.'}</Typography></Box><IconButton onClick={onClose}><CloseIcon /></IconButton></Box>
    <Box className="document_modal_body"><TextField {...register('name')} autoFocus className="folder_name_field" error={!!errors.name} fullWidth helperText={errors.name?.message || 'Use a clear name to organize this trip.'} label="Folder name" placeholder="e.g. Hotel bookings" slotProps={{ inputLabel: { shrink: true } }} /></Box>
    <Box className="document_modal_footer"><Button onClick={onClose}>Cancel</Button><Button type="submit" variant="contained">Create Folder</Button></Box>
  </Box></Box>;
}

function DeleteFolderModal({ folder, isDeleting, onClose, onConfirm }: { folder: IFolder; isDeleting: boolean; onClose: () => void; onConfirm: () => void }) {
  return <Box className="document_modal_overlay"><Box className="document_modal confirm_delete_modal">
    <Box className="document_modal_header"><Box><Typography component="h3">Delete folder?</Typography><Typography>{folder.name} and every subfolder and file inside it will be permanently removed.</Typography></Box><IconButton disabled={isDeleting} onClick={onClose}><CloseIcon /></IconButton></Box>
    <Box className="document_modal_footer"><Button disabled={isDeleting} onClick={onClose}>Cancel</Button><Button color="error" disabled={isDeleting} onClick={onConfirm} variant="contained">{isDeleting ? 'Deleting...' : 'Delete Folder'}</Button></Box>
  </Box></Box>;
}

export default function FilesTab({ tripId }: { tripId: string }) {
  const [activeFolderId, setActiveFolderId] = useState<string>();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [mobileView, setMobileView] = useState<'folders' | 'files'>('folders');
  const [folderParent, setFolderParent] = useState<IFolder | null | undefined>();
  const [folderToDelete, setFolderToDelete] = useState<IFolder | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<IDocument | null>(null);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: foldersResponse, isLoading: foldersLoading } = useFilesFolders(tripId);
  const folders = toArray<IFolder>(foldersResponse?.data.data);
  const activeFolder = folders.find((folder) => folder.id === activeFolderId) || folders[0];
  const { data: documentsResponse, isLoading: documentsLoading } = useFilesDocuments(tripId, activeFolder?.id);
  const documents = toArray<IDocument>(documentsResponse?.data.data);
  const createFolder = useFilesCreateFolder({ optionalCallback: () => setFolderParent(undefined) });
  const deleteFolder = useFilesDeleteFolder({ optionalCallback: () => { setActiveFolderId(undefined); setFolderToDelete(null); } });
  const createDocument = useFilesCreateDocument({ optionalCallback: () => undefined });
  const signUpload = useUploadsSign({ optionalCallback: () => undefined });

  const childrenByParent = useMemo(() => folders.reduce<Record<string, IFolder[]>>((result, folder) => { const key = folder.parentId || 'root'; (result[key] ||= []).push(folder); return result; }, {}), [folders]);
  const selectFolder = (folder: IFolder) => {
    setActiveFolderId(folder.id);
    setExpanded((current) => new Set(current).add(folder.id));
    setMobileView('files');
  };
  const toggleFolder = (id: string) => setExpanded((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  const uploadFiles = async (files: FileList | File[]) => {
    if (!activeFolder) return toast.error('Create or select a folder first.');
    const selected = Array.from(files);
    if (!selected.length) return;
    setUploadProgress(Object.fromEntries(selected.map((file) => [file.name, 5])));
    try { await Promise.all(selected.map(async (file) => { setUploadProgress((current) => ({ ...current, [file.name]: 20 })); const signedResponse = await signUpload.mutateAsync({ body: { fileName: file.name, mimeType: file.type || 'application/octet-stream', target: 'document' }, tripId }); const signed = signedResponse.data.data; if (!signed) throw new Error(); setUploadProgress((current) => ({ ...current, [file.name]: 55 })); const url = await uploadFile(file, signed); setUploadProgress((current) => ({ ...current, [file.name]: 85 })); await createDocument.mutateAsync({ tripId, folderId: activeFolder.id, body: { displayName: file.name.replace(/\.[^.]+$/, ''), mimeType: file.type || 'application/octet-stream', objectKey: signed.objectKey || signed.publicId || file.name, originalFileName: file.name, size: file.size, url } }); setUploadProgress((current) => ({ ...current, [file.name]: 100 })); })); toast.success(`${selected.length} file${selected.length === 1 ? '' : 's'} uploaded.`); window.setTimeout(() => setUploadProgress({}), 1200); } catch { toast.error('Some files could not be uploaded.'); }
  };
  const onDrop = (event: DragEvent<HTMLDivElement>) => { event.preventDefault(); setIsDragging(false); void uploadFiles(event.dataTransfer.files); };
  const renderFolders = (parentId: string | null, depth = 0): ReactNode => (
    childrenByParent[parentId || 'root'] || []
  ).map((folder) => {
    const children = childrenByParent[folder.id] || [];
    const open = expanded.has(folder.id);

    return (
      <Box className="folder_tree_node" key={folder.id} sx={{ pl: `${Math.min(depth, 3) * 10}px` }}>
        <Box className={`folder_tree_row${activeFolder?.id === folder.id ? ' active' : ''}`}>
          <IconButton
            aria-label={`${open ? 'Collapse' : 'Expand'} ${folder.name}`}
            disabled={!children.length}
            onClick={() => toggleFolder(folder.id)}
          >
            <ExpandMoreIcon className={open ? '' : 'folder_collapsed'} />
          </IconButton>
          <Button onClick={() => selectFolder(folder)} startIcon={open ? <FolderOpenIcon /> : <FolderIcon />} title={folder.name}>
            <span className="folder_tree_name">{folder.name}</span>
          </Button>
          <IconButton className="folder_action" aria-label={`Create folder inside ${folder.name}`} onClick={() => setFolderParent(folder)}>
            <CreateNewFolderIcon fontSize="small" />
          </IconButton>
          <IconButton className="folder_action" aria-label={`Delete ${folder.name}`} color="error" onClick={() => setFolderToDelete(folder)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
        <Collapse in={open} timeout={180} unmountOnExit>
          {renderFolders(folder.id, depth + 1)}
        </Collapse>
      </Box>
    );
  });

  return (
    <Box className="tab_page padded_page">
      <Box className="files_header">
        <Box>
          <Typography className="section_heading" component="h2">Trip Documents</Typography>
          <Typography className="files_subtitle">Organize nested folders and upload multiple files into any folder.</Typography>
        </Box>
        <Button startIcon={<CreateNewFolderIcon />} variant="outlined" onClick={() => setFolderParent(null)}>New Folder</Button>
      </Box>
      <Box aria-label="Document browser" className="mobile_files_switch" role="tablist">
        <Button aria-selected={mobileView === 'folders'} className={mobileView === 'folders' ? 'active' : ''} onClick={() => setMobileView('folders')} role="tab" startIcon={<FolderIcon />}>Folders ({folders.length})</Button>
        <Button aria-selected={mobileView === 'files'} className={mobileView === 'files' ? 'active' : ''} disabled={!activeFolder} onClick={() => setMobileView('files')} role="tab" startIcon={<DescriptionIcon />}>Files ({documents.length})</Button>
      </Box>
      <Box className="files_grid">
        <Box className={`folder_panel${mobileView === 'folders' ? '' : ' mobile_files_hidden'}`}>
          <Box className="folder_panel_header">
            <Typography component="h3">Folders</Typography>
            <span>{folders.length} folders</span>
          </Box>
          {foldersLoading ? (
            <Box className="empty_inline">Loading folders...</Box>
          ) : (
            <Box className="folder_tree">{renderFolders(null)}</Box>
          )}
        </Box>
        <Box className={`documents_panel${mobileView === 'files' ? '' : ' mobile_files_hidden'}`}>
          {!activeFolder ? (
            <Box className="documents_no_selection">
              <FolderOpenIcon />
              <Typography component="h3">Choose a folder first</Typography>
              <Typography>Select a folder from the left to view its files, add subfolders, or upload documents.</Typography>
              <Button startIcon={<CreateNewFolderIcon />} variant="contained" onClick={() => setFolderParent(null)}>Create a Folder</Button>
            </Box>
          ) : (
            <>
              <Box className="documents_header">
                <Box>
                  <Typography component="h3">{activeFolder?.name || 'Select a folder'}</Typography>
                  <Typography>{documents.length} files in this folder</Typography>
                </Box>
                <Box className="documents_actions">
                  <Button disabled={!activeFolder} startIcon={<CreateNewFolderIcon />} variant="outlined" onClick={() => setFolderParent(activeFolder)}>Add Subfolder</Button>
                  <Button disabled={!activeFolder} startIcon={<CloudUploadIcon />} variant="contained" onClick={() => inputRef.current?.click()}>Upload Files</Button>
                </Box>
              </Box>
              <Box className="documents_panel_body">
                <Box
                  aria-disabled={!activeFolder}
                  className={`scan_dropzone${isDragging ? ' is_dragging' : ''}${!activeFolder ? ' is_disabled' : ''}`}
                  onDragEnter={() => activeFolder && setIsDragging(true)}
                  onDragLeave={() => setIsDragging(false)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    if (activeFolder) onDrop(event);
                  }}
                >
                  <CloudUploadIcon />
                  <Box>
                    <strong>Drop multiple documents here</strong>
                    <span>{activeFolder ? `Files will be stored inside ${activeFolder.name}.` : 'Create a folder before uploading files.'}</span>
                  </Box>
                </Box>
                {Object.entries(uploadProgress).length > 0 && (
                  <Box className="document_upload_progress">
                    {Object.entries(uploadProgress).map(([name, progress]) => (
                      <Box key={name}>
                        <Box className="upload_progress_label">
                          <span>{name}</span>
                          <strong>{progress}%</strong>
                        </Box>
                        <LinearProgress value={progress} variant="determinate" />
                      </Box>
                    ))}
                  </Box>
                )}
                <input
                  accept=".pdf,.jpg,.jpeg,.png,.webp,.gif,.txt,.csv,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                  hidden
                  multiple
                  ref={inputRef}
                  type="file"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files) void uploadFiles(event.target.files);
                    event.target.value = '';
                  }}
                />
                <Box className="document_table">
                  {documentsLoading ? (
                    <Box className="empty_inline">Loading files...</Box>
                  ) : documents.length ? (
                    <>
                      <Box className="document_row document_head">
                        <span>Document</span>
                        <span>File</span>
                        <span>Actions</span>
                      </Box>
                      {documents.map((document) => (
                        <Box className="document_row" key={document.id}>
                          <Box className="document_name">
                            <span className="document_icon"><DescriptionIcon /></span>
                            <Box>
                              <strong>{document.displayName}</strong>
                              <small>{document.mimeType || getFileExtension(document)}</small>
                            </Box>
                          </Box>
                          <Box className="document_file_meta">
                            <strong>{document.originalFileName}</strong>
                            <small>{formatFileSize(document.size)}</small>
                          </Box>
                          <Box className="document_actions">
                            <IconButton aria-label={`Preview ${document.displayName}`} onClick={() => setPreviewDocument(document)}>
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                            <IconButton aria-label={`Download ${document.displayName}`} component="a" download={document.originalFileName} href={document.url} target="_blank">
                              <DownloadIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      ))}
                    </>
                  ) : (
                    <Box className="documents_empty">
                      <FolderOpenIcon />
                      <Typography component="h4">This folder is empty</Typography>
                      <Typography>Upload files or create a subfolder to keep this trip organized.</Typography>
                      <Box>
                        <Button startIcon={<CreateNewFolderIcon />} variant="outlined" onClick={() => setFolderParent(activeFolder)}>Add Subfolder</Button>
                        <Button startIcon={<CloudUploadIcon />} variant="contained" onClick={() => inputRef.current?.click()}>Upload Files</Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
      {folderParent !== undefined && <FolderModal parent={folderParent || undefined} onClose={() => setFolderParent(undefined)} onCreate={(name) => createFolder.mutate({ tripId, body: { name, parentId: folderParent?.id || null } })} />}
      {folderToDelete && <DeleteFolderModal folder={folderToDelete} isDeleting={deleteFolder.isPending} onClose={() => setFolderToDelete(null)} onConfirm={() => deleteFolder.mutate({ tripId, folderId: folderToDelete.id })} />}
      {previewDocument && <DocumentPreviewModal document={previewDocument} onClose={() => setPreviewDocument(null)} />}
    </Box>
  );
}
