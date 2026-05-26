'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

type AddPhotoFormValues = {
  caption: string;
  photos: FileList | null;
};

const addPhotoSchema: yup.ObjectSchema<AddPhotoFormValues> = yup.object({
  caption: yup.string().trim().max(160, 'Caption must be 160 characters or less').defined(),
  photos: yup.mixed<FileList>().nullable().defined(),
});

const defaultValues: AddPhotoFormValues = {
  caption: '',
  photos: null,
};

type AddPhotoModalProps = {
  albumTitle: string;
  onClose: () => void;
};

export default function AddPhotoModal({ albumTitle, onClose }: AddPhotoModalProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<AddPhotoFormValues>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(addPhotoSchema),
  });

  const photos = watch('photos');
  const photoCount = photos?.length ?? 0;

  const onSubmit: SubmitHandler<AddPhotoFormValues> = (values) => {
    const payload = {
      albumTitle,
      caption: values.caption.trim() || null,
      photoNames: values.photos ? Array.from(values.photos).map((photo) => photo.name) : [],
    };

    console.log('Add photo payload:', payload);
    onClose();
  };

  return (
    <Box className="add_photo_overlay">
      <Box className="add_photo_modal" component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box className="add_photo_header">
          <Box>
            <Typography component="h3">Add Photos</Typography>
            <Typography>Upload memories to {albumTitle}. Photo and caption are optional.</Typography>
          </Box>
          <IconButton aria-label="Close add photo modal" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box className="add_photo_body">
          <Controller
            control={control}
            name="photos"
            render={({ field: { onChange, ref } }) => (
              <Button className="photo_dropzone" component="label">
                <AddPhotoAlternateIcon />
                <strong>{photoCount ? `${photoCount} photo${photoCount > 1 ? 's' : ''} selected` : 'Choose photos'}</strong>
                <span>JPG, PNG, or HEIC files can be added now or later.</span>
                <input
                  ref={ref}
                  hidden
                  multiple
                  accept="image/*"
                  type="file"
                  onChange={(event) => onChange(event.target.files)}
                />
              </Button>
            )}
          />

          <Controller
            control={control}
            name="caption"
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.caption}
                fullWidth
                helperText={errors.caption?.message}
                label="Caption"
                multiline
                placeholder="Optional caption for this upload..."
                rows={3}
              />
            )}
          />
        </Box>

        <Box className="add_photo_footer">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save Photos
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
