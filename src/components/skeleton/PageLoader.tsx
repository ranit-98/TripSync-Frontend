'use client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

type PageLoaderProps = { rows?: number; wrapperCls?: string };

export default function PageLoader({ rows = 4, wrapperCls }: PageLoaderProps) {
  return <Box aria-busy="true" aria-label="Loading content" className={wrapperCls} sx={{ p: 3, width: '100%' }}>
    <Skeleton height={36} width="32%" />
    <Skeleton height={22} sx={{ mb: 3 }} width="48%" />
    {Array.from({ length: rows }, (_, index) => <Skeleton height={86} key={index} sx={{ mb: 1.5 }} variant="rounded" />)}
  </Box>;
}
