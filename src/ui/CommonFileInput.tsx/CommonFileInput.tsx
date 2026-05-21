'use client';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRef } from 'react';

type CommonFileInputProps = {
  btntitle?: string;
  className?: string;
  description?: string;
  onChange: (file: File) => void;
};

export default function CommonFileInputNew({
  btntitle = 'Choose File',
  className,
  description,
  onChange,
}: CommonFileInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Stack className={className} spacing={1}>
      <Button
        onClick={() => inputRef.current?.click()}
        startIcon={<AttachFileIcon />}
        variant="outlined"
      >
        {btntitle}
      </Button>
      {description && (
        <Typography color="text.secondary" variant="caption">
          {description}
        </Typography>
      )}
      <input
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onChange(file);
        }}
        ref={inputRef}
        type="file"
      />
    </Stack>
  );
}
