import Box from '@mui/material/Box';

type ImageCompProps = {
  alt: string;
  height: number;
  isAvatar?: boolean;
  isImagePreview?: boolean;
  isSmallPreview?: boolean;
  src: string;
  width: number;
};

export default function ImageComp({ alt, height, isAvatar = false, src, width }: ImageCompProps) {
  return (
    <Box
      alt={alt}
      component="img"
      src={src}
      sx={{
        borderRadius: isAvatar ? '50%' : 1,
        display: 'block',
        height,
        objectFit: 'cover',
        width,
      }}
    />
  );
}
