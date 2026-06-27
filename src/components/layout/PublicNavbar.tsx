'use client';

import MapIcon from '@mui/icons-material/Map';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import ProtectedCreateTripButton from '@/components/auth/ProtectedCreateTripButton';
import { PublicNavbarWrapper } from '@/styles/layout/publicNavbar.styles';

type PublicNavbarProps = {
  variant?: 'default' | 'auth';
};

export default function PublicNavbar({ variant = 'default' }: PublicNavbarProps) {
  const isAuthVariant = variant === 'auth';

  return (
    <PublicNavbarWrapper as="header">
      <Container maxWidth="xl">
        <Stack className="public_nav_inner" direction="row">
          <Link className="public_brand" href="/">
            <MapIcon />
            TripSync
          </Link>

          <Stack className="public_links" direction="row">
            <Link href="/#features">Features</Link>
            <Link href="/#how-it-works">How it works</Link>
            <Link href="/#settlements">Settlements</Link>
          </Stack>

          <Stack className="public_actions" direction="row">
            {isAuthVariant ? (
              <Button component={Link} href="/auth/register" variant="contained">
                Sign up
              </Button>
            ) : (
              <>
                <Button component={Link} href="/login">
                  Login
                </Button>
                <ProtectedCreateTripButton variant="contained">
                  Start planning
                </ProtectedCreateTripButton>
              </>
            )}
          </Stack>
        </Stack>
      </Container>
    </PublicNavbarWrapper>
  );
}
