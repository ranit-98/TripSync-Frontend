'use client';

import { useTripsAcceptInvite, useTripsDeclineInvite } from '@/api/hooks';
import { LoginCardWrapper, LoginPageWrapper } from '@/styles/auth/login.styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type InviteResponsePageProps = {
  inviteId: string;
};

export default function InviteResponsePage({ inviteId }: InviteResponsePageProps) {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const acceptInvite = useTripsAcceptInvite({
    optionalCallback: () => {
      setMessage('Invite accepted. Taking you to your trips...');
      setTimeout(() => router.push('/trips'), 700);
    },
  });
  const declineInvite = useTripsDeclineInvite({
    optionalCallback: () => {
      setMessage('Invite declined.');
      setTimeout(() => router.push('/dashboard'), 700);
    },
  });
  const isPending = acceptInvite.isPending || declineInvite.isPending;

  return (
    <LoginPageWrapper>
      <Box className="auth_main" component="main">
        <LoginCardWrapper elevation={0}>
          <Stack className="auth_card_body" spacing={3}>
            <Box className="auth_heading">
              <Typography className="auth_title" component="h1">
                Trip Invitation
              </Typography>
              <Typography className="auth_subtitle">
                Accept this invite to join the shared trip workspace.
              </Typography>
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button
                disabled={isPending || !inviteId}
                fullWidth
                onClick={() => acceptInvite.mutate({ inviteId })}
                size="large"
                startIcon={<CheckCircleIcon />}
                variant="contained"
              >
                {acceptInvite.isPending ? 'Accepting...' : 'Accept Invite'}
              </Button>
              <Button
                disabled={isPending || !inviteId}
                fullWidth
                onClick={() => declineInvite.mutate({ inviteId })}
                size="large"
                startIcon={<CloseIcon />}
                variant="outlined"
              >
                {declineInvite.isPending ? 'Declining...' : 'Decline'}
              </Button>
            </Stack>

            {message && (
              <Typography className="auth_subtitle" role="status">
                {message}
              </Typography>
            )}
          </Stack>
        </LoginCardWrapper>
      </Box>
    </LoginPageWrapper>
  );
}
