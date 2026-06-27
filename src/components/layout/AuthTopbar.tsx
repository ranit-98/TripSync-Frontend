'use client';

import { useAuthLogout } from '@/api/hooks/auth/useAuth.hooks';
import ImageComp from '@/components/image/ImageComp';
import { dashboardAssets } from '@/json/assets';
import { useAuthStore } from '@/store';
import { AuthTopbarWrapper } from '@/styles/layout/appSidebar.styles';
import AddIcon from '@mui/icons-material/Add';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type MouseEvent, type ReactNode } from 'react';

type AuthTopbarProps = {
  actions?: ReactNode;
  subtitle?: string;
  title?: string;
};

export default function AuthTopbar({ actions, subtitle, title }: AuthTopbarProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthLogout({ optionalCallback: () => router.replace('/login') });
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const displayName = user?.name || user?.email || 'Traveler';
  const accountMeta = user?.email || 'TripSync member';

  const closeMenu = () => setAnchorEl(null);

  const handleAvatarClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    closeMenu();
    logout.mutate();
  };

  return (
    <AuthTopbarWrapper as="header">
      <Box className="auth_topbar_brand" component={Link} href="/dashboard">
        <FlightTakeoffIcon />
        <Typography component="span">TripSync</Typography>
      </Box>

      {title && (
        <Box className="auth_topbar_page">
          <Typography className="auth_topbar_page_title" component="h1">{title}</Typography>
          {subtitle && <Typography className="auth_topbar_page_subtitle">{subtitle}</Typography>}
        </Box>
      )}

      {actions && <Box className="auth_topbar_actions">{actions}</Box>}

      <Box
        aria-controls={isOpen ? 'auth-topbar-menu' : undefined}
        aria-expanded={isOpen ? 'true' : undefined}
        aria-haspopup="menu"
        aria-label="Open account menu"
        className="auth_topbar_profile_btn"
        component="button"
        onClick={handleAvatarClick}
        type="button"
      >
        <Box className="auth_topbar_profile_text">
          <Typography className="auth_topbar_profile_name" component="span">{displayName}</Typography>
          <Typography className="auth_topbar_profile_meta" component="span">{accountMeta}</Typography>
        </Box>
        <Box className="auth_topbar_avatar_ring">
          <ImageComp alt="User profile avatar" className="auth_topbar_avatar" isAvatar src={user?.avatarUrl || dashboardAssets.userAvatar} />
          <span aria-hidden className="auth_topbar_status_dot" />
        </Box>
        <KeyboardArrowDownIcon className="auth_topbar_chevron" />
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="auth-topbar-menu"
        onClose={closeMenu}
        open={isOpen}
        slotProps={{ paper: { className: 'auth_topbar_menu' } }}
      >
        <MenuItem component={Link} href="/trips/create" onClick={closeMenu}>
          <AddIcon fontSize="small" />
          Create trip
        </MenuItem>
        <MenuItem disabled={logout.isPending} onClick={handleLogout}>
          <LogoutIcon fontSize="small" />
          {logout.isPending ? 'Logging out...' : 'Logout'}
        </MenuItem>
      </Menu>
    </AuthTopbarWrapper>
  );
}
