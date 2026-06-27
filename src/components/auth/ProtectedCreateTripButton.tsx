'use client';

import { saveAuthRedirectPath } from '@/lib/authRedirect';
import { useAuthStore } from '@/store';
import Button, { type ButtonProps } from '@mui/material/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';

const CREATE_TRIP_PATH = '/trips/create';
const LOGIN_REDIRECT_PATH = `/login?next=${encodeURIComponent(CREATE_TRIP_PATH)}`;

type ProtectedCreateTripButtonProps = Omit<ButtonProps<typeof Link>, 'component' | 'href' | 'onClick'>;

export default function ProtectedCreateTripButton(props: ProtectedCreateTripButtonProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    saveAuthRedirectPath(CREATE_TRIP_PATH);

    if (!isAuthenticated) {
      event.preventDefault();
      router.push(LOGIN_REDIRECT_PATH);
    }
  };

  return (
    <Button
      {...props}
      component={Link}
      href={CREATE_TRIP_PATH}
      onClick={handleClick}
    />
  );
}
