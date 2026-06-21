import { useUsersUpdateMe } from "@/api/hooks/users/useUsers.hooks";
import FormTextField from "@/components/Forms/FormTextField";
import type { IUser } from "@/typescript/interface/api";
import type { IUpdateUserPayload } from "@/typescript/interface/api";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { profileDefaultValues, type ProfileFormValues, profileSchema } from "./profileSettings.schema";

// ─── Types ───────────────────────────────────────────────────────────────────

type PersonalInfoFormProps = {
  hasPendingAvatarUpload: boolean;
  isAvatarUploading: boolean;
  isEditing: boolean;
  isLoading: boolean;
  onEditModeChange: (isEditing: boolean) => void;
  onProfileSaved: () => void;
  user?: IUser | null;
};

// ─── Component ───────────────────────────────────────────────────────────────

function PersonalInfoForm({
  hasPendingAvatarUpload,
  isAvatarUploading,
  isEditing,
  isLoading,
  onEditModeChange,
  onProfileSaved,
  user,
}: PersonalInfoFormProps) {
  const formValues = useMemo<ProfileFormValues>(
    () => ({
      email: user?.email ?? "",
      name: user?.name ?? "",
    }),
    [user?.email, user?.name]
  );
  const { control, formState, handleSubmit, reset } = useForm<ProfileFormValues>({
    defaultValues: profileDefaultValues,
    resolver: yupResolver(profileSchema),
  });

  // Do not use RHF's `values` option here: it continuously overwrites user input
  // whenever the profile query changes. Reset only while the form is read-only.
  useEffect(() => {
    if (!isEditing) reset(formValues);
  }, [formValues, isEditing, reset]);

  const openEditMode = useCallback(() => {
    onEditModeChange(true);
  }, [onEditModeChange]);

  const closeEditMode = useCallback(() => {
    reset(formValues);
    onEditModeChange(false);
  }, [formValues, onEditModeChange, reset]);

  const { mutate: updateProfile, isPending } = useUsersUpdateMe({
    optionalCallback: () => {
      onProfileSaved();
      closeEditMode();
    },
  });

  const handleEdit = useCallback(() => {
    openEditMode();
  }, [openEditMode]);

  const onSubmit = handleSubmit((formData) => {
    if (!formState.isDirty && !hasPendingAvatarUpload) {
      closeEditMode();
      return;
    }

    const payload: IUpdateUserPayload = {
      name: formData.name.trim(),
    };

    if (!formState.isDirty) {
      onProfileSaved();
      closeEditMode();
      return;
    }

    updateProfile(payload);
  });

  const isBusy = isPending || isAvatarUploading;

  return (
    <Box className="panel">
      <Box className="panel_header">
        <Typography className="section_title" component="h2">
          Personal Information
        </Typography>
        {isEditing ? (
          <Box className="edit_actions">
            <button className="cancel_btn" disabled={isBusy} onClick={closeEditMode} type="button">Cancel</button>
            <button className="save_btn" disabled={isBusy || isLoading} form="profile-settings-form" type="submit"><SaveIcon />{isBusy ? "Saving..." : "Save Changes"}</button>
          </Box>
        ) : (
          <button
            className="save_btn"
            onClick={handleEdit}
            type="button"
          >
            <EditIcon />
            Edit
          </button>
        )}
      </Box>

      <Box
        className={`form_grid profile_form ${isEditing ? "is_editing" : "is_readonly"}`}
        data-editing={isEditing}
        component="form"
        id="profile-settings-form"
        noValidate
        onSubmit={onSubmit}
      >
        <FormTextField
          className="wide"
          control={control}
          isDisable={!isEditing}
          labelName="Full Name"
          name="name"
          placeHolder="Enter your full name"
          textFieldProps={{ autoComplete: "name" }}
        />
        <FormTextField
          className="wide"
          control={control}
          isDisable
          labelName="Email Address"
          name="email"
          type="email"
        />
      </Box>
    </Box>
  );
}

export default PersonalInfoForm;
