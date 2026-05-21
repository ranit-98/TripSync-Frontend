'use client';

import { useEffect, useRef, useState } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { AcceptedTypes, ErrorImageMessage, SIZE } from '@/json/messages/validationText';
import { Box, Button, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import ImageComp from '../image/ImageComp';
import NoImageComp from '../image/NoImageComp';

interface MUIFormImageUploaderProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  description?: string;
  initialImage?: string;
  maxSizeMB?: number;
  isAvatar?: boolean;
  onValueChange?: (file: File | null) => void;
}

export function FormImageUploader<T extends FieldValues>({
  control,
  name,
  description,
  initialImage,
  maxSizeMB = SIZE,
  isAvatar = false,
  onValueChange,
}: MUIFormImageUploaderProps<T>) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialImage) setPreview(initialImage);
  }, [initialImage]);

  const handleImageSelect = (file: File | undefined) => {
    if (!file) return;

    if (!AcceptedTypes.includes(file.type)) {
      toast.error(ErrorImageMessage);
      return;
    }

    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      toast.error(`Max file size is ${maxSizeMB}MB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = e => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          {/* IMAGE */}
          <Box
            sx={{
              width: 152,
              height: 152,
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #ddd',
              mx: 'auto',
            }}
          >
            {preview ? (
              <ImageComp
                src={preview}
                isAvatar={isAvatar}
                width={152}
                height={152}
                isSmallPreview
                isImagePreview
                alt='uploaded-image'
              />
            ) : (
              <NoImageComp />
            )}
          </Box>

          {/* Upload button */}
          <Button variant='contained' sx={{ mt: 2 }} onClick={() => fileRef.current?.click()}>
            Upload Image
          </Button>

          <input
            hidden
            ref={fileRef}
            type='file'
            accept='image/*'
            onChange={e => {
              const file = e.target.files?.[0] ?? null;

              field.onChange(file);
              if (!file) {
                onValueChange?.(null);
                return;
              }

              handleImageSelect(file);
              onValueChange?.(file);
            }}
          />

          {/* Description / Error */}
          {fieldState.error ? (
            <Typography color='error' sx={{ mt: 1 }} variant='body2'>
              {fieldState.error.message}
            </Typography>
          ) : description ? (
            <Typography sx={{ mt: 1 }} variant='body2' color='text.secondary'>
              {description}
            </Typography>
          ) : null}

          {/* MAX SIZE TEXT */}
          {/* <Typography variant='body1' mt={1}>
            Upload file size maximum {maxSizeMB}MB
          </Typography> */}
        </Box>
      )}
    />
  );
}
