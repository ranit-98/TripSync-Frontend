'use client';

import { useGalleryCreatePhoto } from '@/api/hooks/gallery/useGallery.hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DragEvent, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

type AddPhotoFormValues = { caption: string };

const addPhotoSchema: yup.ObjectSchema<AddPhotoFormValues> = yup.object({
  caption: yup.string().trim().max(160, 'Caption must be 160 characters or less').defined(),
});

type AddPhotoModalProps = {
  albumTitle: string;
  onClose: () => void;
  tripId?: string;
};

export default function AddPhotoModal({ albumTitle, onClose, tripId }: AddPhotoModalProps) {
  const [photos, setPhotos] = useState<{ file: File; previewUrl: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlsRef = useRef<string[]>([]);
  const createPhoto = useGalleryCreatePhoto({ optionalCallback: () => undefined });
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<AddPhotoFormValues>({
    defaultValues: { caption: '' },
    mode: 'onBlur',
    resolver: yupResolver(addPhotoSchema),
  });
  const isSubmitting = createPhoto.isPending;

  useEffect(() => () => previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url)), []);

  const addFiles = (fileList: FileList | File[]) => {
    const images = Array.from(fileList).filter((file) => file.type.startsWith('image/'));
    if (!images.length) {
      toast.error('Please choose image files only.');
      return;
    }

    const newPhotos = images.map((file) => {
      const previewUrl = URL.createObjectURL(file);
      previewUrlsRef.current.push(previewUrl);
      return { file, previewUrl };
    });
    setPhotos((current) => [...current, ...newPhotos]);
  };

  const removePhoto = (index: number) => {
    setPhotos((current) => {
      const photo = current[index];
      if (photo) {
        URL.revokeObjectURL(photo.previewUrl);
        previewUrlsRef.current = previewUrlsRef.current.filter((url) => url !== photo.previewUrl);
      }
      return current.filter((_, photoIndex) => photoIndex !== index);
    });
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    addFiles(event.dataTransfer.files);
  };

  const onSubmit: SubmitHandler<AddPhotoFormValues> = async (values) => {
    if (!tripId) {
      toast.error('A trip is required before photos can be uploaded.');
      return;
    }

    if (!photos.length) {
      toast.error('Select at least one photo to upload.');
      return;
    }

    try {
      await Promise.all(
        photos.map(async ({ file }) => {
          const formData = new FormData();
          formData.append('image', file);

          const caption = values.caption.trim();
          if (caption) formData.append('caption', caption);

          await createPhoto.mutateAsync({ body: formData, tripId });
        }),
      );
      toast.success(`${photos.length} photo${photos.length === 1 ? '' : 's'} added to ${albumTitle}.`);
      onClose();
    } catch {
      toast.error('Some photos could not be uploaded. Please try again.');
    }
  };

  return (
    <Box className="add_photo_overlay">
      <Box className="add_photo_modal" component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box className="add_photo_header">
          <Box>
            <Typography component="h3">Add Photos</Typography>
            <Typography>Drop multiple photos or browse to upload them to {albumTitle}.</Typography>
          </Box>
          <IconButton aria-label="Close add photo modal" disabled={isSubmitting} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box className="add_photo_body">
          <Box
            className={`photo_dropzone${isDragging ? ' is_dragging' : ''}`}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
          >
            <AddPhotoAlternateIcon />
            <strong>{photos.length ? `${photos.length} photo${photos.length === 1 ? '' : 's'} selected` : 'Drag and drop photos here'}</strong>
            <span>Choose multiple JPG, PNG, HEIC, or other image files at once.</span>
            <Button disabled={isSubmitting} onClick={() => fileInputRef.current?.click()} type="button" variant="outlined">
              Browse files
            </Button>
            <input
              accept="image/*"
              hidden
              multiple
              ref={fileInputRef}
              type="file"
              onChange={(event) => {
                if (event.target.files) addFiles(event.target.files);
                event.target.value = '';
              }}
            />
          </Box>

          {photos.length > 0 && (
            <Box className="selected_photo_list" aria-label="Selected photos">
              {photos.map(({ file, previewUrl }, index) => (
                <Box className="selected_photo" key={`${file.name}-${file.lastModified}-${index}`}>
                  <Box component="img" src={previewUrl} alt={file.name} />
                  <span title={file.name}>{file.name}</span>
                  <IconButton aria-label={`Remove ${file.name}`} disabled={isSubmitting} onClick={() => removePhoto(index)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}

          <TextField
            {...register('caption')}
            error={!!errors.caption}
            fullWidth
            helperText={errors.caption?.message || 'This caption will be applied to every photo in this batch.'}
            label="Caption"
            multiline
            placeholder="Optional caption for this upload..."
            rows={3}
          />
        </Box>

        <Box className="add_photo_footer">
          <Button disabled={isSubmitting} onClick={onClose}>Cancel</Button>
          <Button disabled={!photos.length || isSubmitting} type="submit" variant="contained">
            {isSubmitting ? 'Uploading...' : `Save ${photos.length || ''} Photo${photos.length === 1 ? '' : 's'}`}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
