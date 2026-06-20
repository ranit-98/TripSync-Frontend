'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ErrorBoundary as ReactErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { useCallback, useState, type ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallbackClassName?: string;
  onError?: (error: Error, info: { componentStack?: string | null }) => void;
};

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = error instanceof Error ? error.message : 'Please try again.';

  return (
    <Box className="section_error" role="alert" sx={{ p: 3, textAlign: 'center' }}>
      <Typography component="h2" variant="h6">This section could not be loaded.</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>{message}</Typography>
      <Button onClick={resetErrorBoundary} sx={{ mt: 2 }} variant="outlined">Try again</Button>
    </Box>
  );
}

/** Functional boundary; wrap independent sections so siblings remain usable. */
export default function ErrorBoundary({ children, fallbackClassName, onError }: ErrorBoundaryProps) {
  const [retryCount, setRetryCount] = useState(0);
  const handleError = useCallback((error: unknown, info: { componentStack?: string | null }) => {
    const normalizedError = error instanceof Error ? error : new Error(String(error));
    console.error('UI section failed to render', { error: normalizedError, info });
    onError?.(normalizedError, info);
  }, [onError]);

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary
          fallbackRender={(props) => <Box className={fallbackClassName}><ErrorFallback {...props} /></Box>}
          onError={handleError}
          onReset={() => { reset(); setRetryCount((count) => count + 1); }}
          resetKeys={[retryCount]}
        >
          {children}
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
