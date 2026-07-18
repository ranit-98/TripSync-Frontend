"use client";

import { useAuthRegister } from "@/api/hooks/auth/useAuth.hooks";
import FormTextField from "@/components/Forms/FormTextField";
import { LoginFormWrapper } from "@/styles/auth/login.styles";
import type { IRegisterPayload } from "@/typescript/interface/api";
// import GoogleIcon from "@mui/icons-material/Google";
// import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function RegistrationForm() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<IRegisterPayload>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate: signUpMutation, isPending } = useAuthRegister({
    optionalCallback: () => {
      router.push("/login");
    },
  });

  const onSubmit = handleSubmit((formData) => {
    signUpMutation(formData);
  });

  return (
    <LoginFormWrapper noValidate onSubmit={onSubmit}>
      <FormTextField
        className="form_field"
        control={control}
        labelName="Full Name"
        name="name"
        placeHolder="Aarav Sharma"
        rules={{
          required: "Full name is required",
          minLength: {
            value: 2,
            message: "Full name must be at least 2 characters",
          },
        }}
        textFieldProps={{
          autoComplete: "name",
          className: "auth_input",
        }}
      />

      <FormTextField
        className="form_field"
        control={control}
        labelName="Email Address"
        name="email"
        placeHolder="alex@traveler.com"
        rules={{
          required: "Email address is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Enter a valid email address",
          },
        }}
        textFieldProps={{
          autoComplete: "email",
          className: "auth_input",
        }}
        type="email"
      />

      <FormTextField
        className="form_field"
        control={control}
        isPassword
        labelName="Password"
        name="password"
        placeHolder="StrongPass123"
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        }}
        textFieldProps={{
          autoComplete: "new-password",
          className: "auth_input",
        }}
      />

      <Button
        className="auth_submit_btn"
        fullWidth
        disabled={isPending}
        size="large"
        type="submit"
        variant="contained"
      >
        {isPending ? "Creating Account..." : "Create Account"}
      </Button>

      {/* Google sign-up is hidden until OAuth integration is available.
      <Box className="auth_divider_wrap">
        <Divider className="auth_divider">
          <Typography className="auth_divider_text">
            Or continue with
          </Typography>
        </Divider>
      </Box>

      <Button
        className="auth_google_btn"
        fullWidth
        color="inherit"
        startIcon={<GoogleIcon className="google_icon" />}
        variant="outlined"
      >
        Google
      </Button>
      */}

      <Typography className="auth_signup_text">
        Already have an account?{" "}
        <Link className="auth_link" href="/login">
          Login
        </Link>
      </Typography>
    </LoginFormWrapper>
  );
}
