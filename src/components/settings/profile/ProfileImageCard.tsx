import { dashboardAssets } from "@/json/assets";
import ImageComp from "@/components/image/ImageComp";
import { AcceptedTypes, ErrorImageMessage, SIZE } from "@/json/messages/validationText";
import type { IUser } from "@/typescript/interface/api";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { memo, useCallback, useMemo, useRef, type ChangeEvent } from "react";
import toast from "react-hot-toast";

// ─── Types ───────────────────────────────────────────────────────────────────

type ProfileImageCardProps = {
  avatarPreviewUrl?: string;
  isEditing: boolean;
  isLoading: boolean;
  name?: string;
  onFileSelected: (file: File) => void;
  user?: IUser | null;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatMemberSince = (createdAt?: string) => {
  if (!createdAt) {
    return "Member profile";
  }

  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "Member profile";
  }

  return `Member since ${new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(date)}`;
};

const MAX_BYTES = SIZE * 1024 * 1024;

// ─── Component ───────────────────────────────────────────────────────────────

function ProfileImageCard({
  avatarPreviewUrl,
  isEditing,
  isLoading,
  name,
  onFileSelected,
  user,
}: ProfileImageCardProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const memberSince = useMemo(() => formatMemberSince(user?.createdAt), [user?.createdAt]);

  const displayAvatar = avatarPreviewUrl || user?.avatarUrl || dashboardAssets.userAvatar;
  const displayName = name || user?.name || "Your profile";

  const handleOpenFilePicker = useCallback(() => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  }, [isEditing]);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) {
        return;
      }

      if (!AcceptedTypes.includes(file.type)) {
        toast.error(ErrorImageMessage);
        event.target.value = "";
        return;
      }

      if (file.size > MAX_BYTES) {
        toast.error(`Max file size is ${SIZE}MB`);
        event.target.value = "";
        return;
      }

      onFileSelected(file);
      event.target.value = "";
    },
    [onFileSelected]
  );

  return (
    <Box className="profile_card">
      <Box className="profile_photo_wrap">
        <ImageComp alt={displayName} className="profile_photo" isAvatar src={displayAvatar} />
        <IconButton
          aria-label="Choose profile image"
          className={`camera_badge ${isEditing ? "active" : ""}`}
          disabled={!isEditing}
          onClick={handleOpenFilePicker}
          type="button"
        >
          <PhotoCameraIcon />
        </IconButton>
        <input hidden accept="image/*" onChange={handleFileChange} ref={fileInputRef} type="file" />
      </Box>
      <Typography className="profile_name" component="h2">
        {isLoading ? "Loading profile..." : displayName}
      </Typography>
      <Typography className="profile_role">{user?.role || user?.email || "TripSync member"}</Typography>
      <Typography className="member_since">
        <CalendarTodayIcon />
        {memberSince}
      </Typography>
    </Box>
  );
}

export default memo(ProfileImageCard);
