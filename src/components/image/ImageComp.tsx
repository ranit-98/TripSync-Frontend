'use client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useState, type CSSProperties } from 'react';

type ImageCompProps = {
  alt: string;
  className?: string;
  height?: number | string;
  isAvatar?: boolean;
  isImagePreview?: boolean;
  isSmallPreview?: boolean;
  src?: string;
  style?: CSSProperties;
  width?: number | string;
};

export default function ImageComp({ alt, className, height = '100%', isAvatar = false, src, style, width = '100%' }: ImageCompProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Box
      className={className}
      sx={{
        borderRadius: isAvatar ? '50%' : 1,
        display: 'block',
        height,
        overflow: 'hidden',
        position: 'relative',
        ...style,
        width,
      }}
    >
      {!isLoaded && <Skeleton animation="wave" height="100%" variant={isAvatar ? 'circular' : 'rectangular'} width="100%" />}
      {src && <Box
        alt={alt}
        component="img"
        onError={() => setIsLoaded(true)}
        onLoad={() => setIsLoaded(true)}
        src={src}
        sx={{
          display: 'block',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 180ms ease',
          width: '100%',
        }}
      />}
    </Box>
  );
}
