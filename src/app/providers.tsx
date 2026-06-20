'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { theme } from '@/theme/theme';
import ErrorBoundary from '@/components/errors/ErrorBoundary';

type ProvidersProps = Readonly<{
  children: ReactNode;
}>;

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { throwOnError: true } } })
  );

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorBoundary fallbackClassName="app_error">{children}</ErrorBoundary>
          <Toaster position="top-right" />
        </ThemeProvider>
      </QueryClientProvider>
    </AppRouterCacheProvider>
  );
}
