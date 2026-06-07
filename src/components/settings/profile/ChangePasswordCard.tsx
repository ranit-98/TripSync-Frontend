import { useUsersChangePassword } from "@/api/hooks/users/useUsers.hooks";
import FormTextField from "@/components/Forms/FormTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { passwordDefaultValues, type PasswordFormValues, passwordSchema } from "./profileSettings.schema";

function ChangePasswordCard() {
  const { control, handleSubmit, reset } = useForm<PasswordFormValues>({
    defaultValues: passwordDefaultValues,
    resolver: yupResolver(passwordSchema),
  });

  const { mutate: changePassword, isPending } = useUsersChangePassword({
    optionalCallback: () => {
      reset(passwordDefaultValues);
    },
  });

  const onSubmit = handleSubmit((formData) => {
    changePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });
  });

  return (
    <Box className="panel">
      <Box className="panel_header simple">
        <Typography className="section_title" component="h2">
          Security
        </Typography>
      </Box>
      <Box
        className="form_grid security_grid"
        component="form"
        id="password-reset-form"
        noValidate
        onSubmit={onSubmit}
      >
        <FormTextField
          control={control}
          isPassword
          labelName="Current Password"
          name="currentPassword"
          placeHolder="Current password"
          textFieldProps={{ autoComplete: "current-password" }}
        />
        <span className="desktop_spacer" />
        <FormTextField
          control={control}
          isPassword
          labelName="New Password"
          name="newPassword"
          placeHolder="Enter new password"
          textFieldProps={{ autoComplete: "new-password" }}
        />
        <FormTextField
          control={control}
          isPassword
          labelName="Confirm New Password"
          name="confirmPassword"
          placeHolder="Repeat new password"
          textFieldProps={{ autoComplete: "new-password" }}
        />
      </Box>
      <Button className="outline_btn" disabled={isPending} form="password-reset-form" type="submit">
        {isPending ? "Resetting..." : "Reset Password"}
      </Button>
    </Box>
  );
}

export default memo(ChangePasswordCard);
