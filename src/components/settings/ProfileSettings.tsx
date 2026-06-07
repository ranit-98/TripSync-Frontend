"use client";

import { useUsersMe, useUsersUploadAvatar } from "@/api/hooks/users/useUsers.hooks";
import AppSidebar from "@/components/layout/AppSidebar";
import ChangePasswordCard from "@/components/settings/profile/ChangePasswordCard";
import DeleteAccountCard from "@/components/settings/profile/DeleteAccountCard";
import PersonalInfoForm from "@/components/settings/profile/PersonalInfoForm";
import ProfileImageCard from "@/components/settings/profile/ProfileImageCard";
import ProfileStats from "@/components/settings/profile/ProfileStats";
import { useImageUpload } from "@/hooks/useImageUpload";
import { dashboardAssets } from "@/json/assets";
import { useAuthStore } from "@/store";
import { ProfileSettingsWrapper } from "@/styles/settings/profileSettings.styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExploreIcon from "@mui/icons-material/Explore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useCallback, useMemo, useState } from "react";

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProfileSettings() {
  const storedUser = useAuthStore((state) => state.user);
  const [isProfileEditing, setIsProfileEditing] = useState(false);

  // ── Data ─────────────────────────────────────────────────────────────────
  const { data: profileResponse, isLoading } = useUsersMe();
  const user = useMemo(
    () => profileResponse?.data.data ?? storedUser,
    [profileResponse?.data.data, storedUser]
  );

  // ── Avatar Upload hook ──────────────────────────────────────────────────
  const { mutateAsync: uploadAvatarFn } = useUsersUploadAvatar({
    optionalCallback: () => undefined,
  });
  const { isUploading, uploadedUrl, previewUrl, upload: uploadAvatar, reset: resetUpload } =
    useImageUpload(uploadAvatarFn);

  const handleEditModeChange = useCallback((isEditing: boolean) => {
    setIsProfileEditing(isEditing);
  }, []);

  // File selected → immediately upload to backend
  const handleFileSelected = useCallback(
    (file: File) => {
      uploadAvatar(file, "avatar", {
        name: user?.name || "",
      });
    },
    [uploadAvatar, user?.name]
  );

  // After profile is saved, clear avatar upload state
  const handleProfileSaved = useCallback(() => {
    resetUpload();
  }, [resetUpload]);

  // ── Derived Values ───────────────────────────────────────────────────────
  const avatarSrc = previewUrl || user?.avatarUrl || dashboardAssets.userAvatar;
  const displayName = user?.name;

  return (
    <ProfileSettingsWrapper>
      <AppSidebar active="settings" />

      <Box className="settings_main" component="main">
        <Box className="topbar" component="header">
          <Typography className="mobile_brand">TripSync</Typography>
          <Typography className="page_title" component="h1">
            Profile Settings
          </Typography>
          <Stack className="topbar_actions" direction="row">
            <IconButton aria-label="Open notifications">
              <NotificationsIcon />
            </IconButton>
            <Box alt="User profile avatar" className="topbar_avatar" component="img" src={avatarSrc} />
          </Stack>
        </Box>

        <Box className="content_area">
          <Box className="settings_grid">
            <Stack className="identity_col">
              <ProfileImageCard
                avatarPreviewUrl={avatarSrc}
                isEditing={isProfileEditing}
                isLoading={isLoading}
                name={displayName}
                onFileSelected={handleFileSelected}
                user={user}
              />
              <ProfileStats />
            </Stack>

            <Stack className="forms_col">
              <PersonalInfoForm
                hasPendingAvatarUpload={Boolean(uploadedUrl)}
                isAvatarUploading={isUploading}
                isEditing={isProfileEditing}
                isLoading={isLoading}
                onEditModeChange={handleEditModeChange}
                onProfileSaved={handleProfileSaved}
                user={user}
              />
              <ChangePasswordCard />
              <DeleteAccountCard />
            </Stack>
          </Box>
        </Box>
      </Box>

      <Box className="mobile_nav" component="nav">
        <Box className="mobile_nav_link" component="a" href="/dashboard">
          <DashboardIcon />
          <span>Home</span>
        </Box>
        <Box className="mobile_nav_link" component="a" href="#">
          <ExploreIcon />
          <span>Explore</span>
        </Box>
        <Box className="mobile_nav_link active" component="a" href="/settings">
          <SettingsIcon />
          <span>Profile</span>
        </Box>
      </Box>
    </ProfileSettingsWrapper>
  );
}
