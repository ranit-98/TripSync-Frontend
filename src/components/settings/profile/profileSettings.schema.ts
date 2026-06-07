import type { IChangePasswordPayload } from "@/typescript/interface/api";
import * as yup from "yup";

export type ProfileFormValues = {
  name: string;
  email: string;
};

export type PasswordFormValues = IChangePasswordPayload & {
  confirmPassword: string;
};

export const profileDefaultValues: ProfileFormValues = {
  name: "",
  email: "",
};

export const passwordDefaultValues: PasswordFormValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const profileSchema: yup.ObjectSchema<ProfileFormValues> = yup.object({
  email: yup.string().trim().email("Enter a valid email").defined(),
  name: yup.string().trim().required("Full name is required").min(2, "Full name must be at least 2 characters"),
});

export const passwordSchema: yup.ObjectSchema<PasswordFormValues> = yup.object({
  confirmPassword: yup
    .string()
    .required("Confirm your new password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup.string().required("New password is required").min(8, "Password must be at least 8 characters"),
});
