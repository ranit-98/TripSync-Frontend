'use client';

import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Control, Controller, FieldPath, FieldValues, get, useFormState } from 'react-hook-form';

import ImageComp from '../image/ImageComp';
import CommonFileInputNew from '@/ui/CommonFileInput.tsx/CommonFileInput';

interface IFormFileUploadProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  labelName?: string;
  description?: string;
  acceptedFormats?: string;
  showPreview?: boolean;
}

const FormFileUpload = <T extends FieldValues>({
  name,
  control,
  description = 'PDF, Excel, Word, or Image formats (Max 10MB)',
  acceptedFormats,
  showPreview = true,
}: IFormFileUploadProps<T>) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const { errors: formErrors } = useFormState({ control });
  const errorMessage = get(formErrors, 'files')?.[0]?.file.message as string | undefined;

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = (file: File, onChange: (file: File | null) => void) => {
    onChange(file);
    setFileName(file.name);

    if (showPreview && file.type.startsWith('image/')) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleRemoveFile = (onChange: (file: File | null) => void) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFileName(null);
    onChange(null);
  };

  return (
    <Box>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ...fieldProps } }) => (
          <>
            {!fileName && (
              <CommonFileInputNew
                {...fieldProps}
                btntitle='Choose File'
                description={acceptedFormats || description}
                onChange={(file: File) => handleFileChange(file, onChange)}
                className='table-filechoose'
              />
            )}

            {/* FILE PREVIEW (same style as image) */}
            {fileName && !previewUrl && (
              <Box
                sx={{
                  mt: 1.5,
                  p: 1.5,
                  backgroundColor: 'success.lighter',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: 'success.light',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: 'success.main',
                  }}
                />
                <Typography
                  variant='body2'
                  sx={{
                    color: 'success.dark',
                    fontWeight: 500,
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {fileName}
                </Typography>
                <Typography
                  variant='caption'
                  sx={{ cursor: 'pointer', fontWeight: 700 }}
                  onClick={() => handleRemoveFile(onChange)}
                >
                  ✕
                </Typography>
              </Box>
            )}

            {/* IMAGE PREVIEW */}
            {showPreview && previewUrl && (
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant='caption'
                  color='text.secondary'
                  sx={{ mb: 1, display: 'block' }}
                >
                  Preview:
                </Typography>

                <Box
                  sx={{
                    position: 'relative',
                    width: 152,
                    height: 152,
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'grey.50',
                  }}
                >
                  {/*  REMOVE ICON */}
                  <Box
                    onClick={() => handleRemoveFile(onChange)}
                    sx={{
                      position: 'absolute',
                      top: 6,
                      right: 6,
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 2,
                    }}
                  >
                    ✕
                  </Box>

                  <ImageComp
                    src={previewUrl}
                    alt='Preview'
                    width={152}
                    height={152}
                    isSmallPreview
                    isImagePreview
                  />
                </Box>
              </Box>
            )}
          </>
        )}
      />

      {/* ERROR MESSAGE */}
      {errorMessage && (
        <Typography variant='caption' color='error' sx={{ mt: 0.5, display: 'block' }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default FormFileUpload;
