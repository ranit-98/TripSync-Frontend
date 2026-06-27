"use client";

import { useUsersMe, useUsersUploadAvatar } from "@/api/hooks/users/useUsers.hooks";
import AppSidebar from "@/components/layout/AppSidebar";
import AuthTopbar from "@/components/layout/AuthTopbar";
import { ProfileSettingsSkeleton } from "@/components/skeleton";
import ChangePasswordCard from "@/components/settings/profile/ChangePasswordCard";
import DeleteAccountCard from "@/components/settings/profile/DeleteAccountCard";
import PersonalInfoForm from "@/components/settings/profile/PersonalInfoForm";
import ProfileImageCard from "@/components/settings/profile/ProfileImageCard";
import ProfileStats from "@/components/settings/profile/ProfileStats";
import { useImageUpload } from "@/hooks/useImageUpload";
import { dashboardAssets } from "@/json/assets";
import { useAuthStore } from "@/store";
import { useSettingsUiStore } from "@/store/ui";
import { ProfileSettingsWrapper } from "@/styles/settings/profileSettings.styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useCallback, useMemo } from "react";

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProfileSettings() {
  const storedUser = useAuthStore((state) => state.user);
  const isProfileEditing = useSettingsUiStore((state) => state.isProfileEditing);
  const setProfileEditing = useSettingsUiStore((state) => state.setProfileEditing);

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
    setProfileEditing(isEditing);
  }, [setProfileEditing]);

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
        <AuthTopbar subtitle="Manage your profile, security, and account preferences." title="Profile Settings" />

        <Box className="content_area">
          <Box className="mobile_page_header">
            <Box className="page_title" component="h1">Profile Settings</Box>
            <Box className="page_subtitle">Manage your profile, security, and account preferences.</Box>
          </Box>
          {isLoading ? <ProfileSettingsSkeleton /> : <Box className="settings_grid">
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
          </Box>}
        </Box>
      </Box>

    </ProfileSettingsWrapper>
  );
}
