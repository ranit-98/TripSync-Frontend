import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import {
  addFolderDefaultValues,
  addFolderSchema,
  documentFolders,
  folderDocuments,
  uploadDocumentDefaultValues,
  uploadDocumentSchema,
  type AddFolderFormValues,
  type UploadDocumentFormValues,
} from '../shared';

function AddFolderModal({ onClose }: { onClose: () => void }) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AddFolderFormValues>({
    defaultValues: addFolderDefaultValues,
    mode: 'onBlur',
    resolver: yupResolver(addFolderSchema),
  });

  const onSubmit: SubmitHandler<AddFolderFormValues> = (values) => {
    const payload = {
      description: values.description.trim(),
      name: values.name.trim(),
    };

    console.log('Add folder payload:', payload);
    onClose();
  };

  return (
    <Box className="document_modal_overlay">
      <Box className="document_modal" component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box className="document_modal_header">
          <Box>
            <Typography component="h3">New Folder</Typography>
            <Typography>Create a place to organize trip files.</Typography>
          </Box>
          <IconButton aria-label="Close new folder modal" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className="document_modal_body">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.name}
                fullWidth
                helperText={errors.name?.message}
                label="Folder name"
                placeholder="e.g. Restaurant bills"
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.description}
                fullWidth
                helperText={errors.description?.message}
                label="Short description"
                placeholder="What should be stored here?"
              />
            )}
          />
        </Box>
        <Box className="document_modal_footer">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Create Folder
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

function UploadDocumentModal({ folderName, onClose }: { folderName: string; onClose: () => void }) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<UploadDocumentFormValues>({
    defaultValues: uploadDocumentDefaultValues,
    mode: 'onBlur',
    resolver: yupResolver(uploadDocumentSchema),
  });

  const document = watch('document');
  const documentName = document?.[0]?.name;

  const onSubmit: SubmitHandler<UploadDocumentFormValues> = (values) => {
    const payload = {
      fileName: values.document?.[0]?.name ?? null,
      folderName,
      name: values.name.trim(),
    };

    console.log('Upload document payload:', payload);
    onClose();
  };

  return (
    <Box className="document_modal_overlay">
      <Box className="document_modal" component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box className="document_modal_header">
          <Box>
            <Typography component="h3">Upload Document</Typography>
            <Typography>Add a document to {folderName}.</Typography>
          </Box>
          <IconButton aria-label="Close upload document modal" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className="document_modal_body">
          <Controller
            control={control}
            name="document"
            render={({ field: { onChange, ref } }) => (
              <Button className="document_file_dropzone" component="label">
                <CloudUploadIcon />
                <strong>{documentName ?? 'Choose document'}</strong>
                <span>PDF, JPG, PNG, or DOC files</span>
                <input
                  ref={ref}
                  hidden
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  type="file"
                  onChange={(event) => onChange(event.target.files)}
                />
              </Button>
            )}
          />
          {errors.document?.message && (
            <Typography color="error" variant="caption">
              {errors.document.message}
            </Typography>
          )}
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.name}
                fullWidth
                helperText={errors.name?.message}
                label="Display name"
                placeholder="e.g. Hotel invoice"
              />
            )}
          />
        </Box>
        <Box className="document_modal_footer">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Upload
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default function FilesTab() {
  const [activeFolderId, setActiveFolderId] = useState<(typeof documentFolders)[number]['id']>('bills');
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const [showUploadDocumentModal, setShowUploadDocumentModal] = useState(false);
  const activeFolder = documentFolders.find((folder) => folder.id === activeFolderId) ?? documentFolders[0];

  return (
    <Box className="tab_page padded_page">
      <Box className="files_header">
        <Box>
          <Typography className="section_heading" component="h2">
            Trip Documents
          </Typography>
          <Typography className="files_subtitle">
            Create folders for scanned bills, booking proofs, IDs, and shared travel documents.
          </Typography>
        </Box>
        <Stack className="files_actions" direction="row">
          <Button startIcon={<CreateNewFolderIcon />} variant="outlined" onClick={() => setShowAddFolderModal(true)}>
            New Folder
          </Button>
         
        </Stack>
      </Box>

      <Box className="files_grid">
        <Box className="folder_panel">
          <Box className="folder_panel_header">
            <Typography component="h3">Folders</Typography>
            <span>{documentFolders.length} folders</span>
          </Box>
          <Box className="folder_list">
            {documentFolders.map((folder) => (
              <Button
                className={`folder_card${activeFolderId === folder.id ? ' active' : ''}`}
                key={folder.id}
                onClick={() => setActiveFolderId(folder.id)}
              >
                <Box className="folder_icon">
                  <FolderOpenIcon />
                </Box>
                <Box className="folder_copy">
                  <strong>{folder.name}</strong>
                  <span>{folder.subtitle}</span>
                  <small>{folder.updatedAt}</small>
                </Box>
                <Box className="folder_count">
                  <strong>{folder.count}</strong>
                  <span>{folder.size}</span>
                </Box>
              </Button>
            ))}
          </Box>
        </Box>

        <Box className="documents_panel">
          <Box className="documents_header">
            <Box>
              <Typography component="h3">{activeFolder.name}</Typography>
              <Typography>
                {activeFolder.count} files - {activeFolder.size}
              </Typography>
            </Box>
            <Button startIcon={<CloudUploadIcon />} variant="outlined" onClick={() => setShowUploadDocumentModal(true)}>
              Upload Document
            </Button>
          </Box>

          <Box className="scan_dropzone">
            <CloudUploadIcon />
            <Box>
              <strong>Drop documents here</strong>
              <span>PDF, JPG, PNG, or DOC files will be stored inside {activeFolder.name}.</span>
            </Box>
          </Box>

          <Box className="document_table">
            <Box className="document_row document_head">
              <span>Document</span>
              <span>File</span>
            </Box>
            {folderDocuments.map((document) => {
              const Icon = document.icon;

              return (
                <Box className="document_row" key={document.name}>
                  <Stack className="document_name" direction="row">
                    <span className="document_icon">
                      <Icon />
                    </span>
                    <Box>
                      <strong>{document.name}</strong>
                      <small>{document.type}</small>
                    </Box>
                  </Stack>
                  <span className="muted_text">{document.fileName}</span>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
      {showAddFolderModal && <AddFolderModal onClose={() => setShowAddFolderModal(false)} />}
      {showUploadDocumentModal && (
        <UploadDocumentModal folderName={activeFolder.name} onClose={() => setShowUploadDocumentModal(false)} />
      )}
    </Box>
  );
}
