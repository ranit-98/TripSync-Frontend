"use client";

import { useAuthLogin } from "@/api/hooks";
import FormTextField from "@/components/Forms/FormTextField";
import {
  consumeAuthRedirectPath,
  isSafeInternalPath,
} from "@/lib/authRedirect";
import { LoginFormWrapper } from "@/styles/auth/login.styles";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type LoginFormValues = {
  email: string;
  password: string;
};

const getLoginRedirectPath = () => {
  const savedPath = consumeAuthRedirectPath();

  if (savedPath) {
    return savedPath;
  }

  const nextPath = new URLSearchParams(window.location.search).get("next");

  if (isSafeInternalPath(nextPath)) {
    return nextPath;
  }

  return "/dashboard";
};

export default function LoginForm() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginMutation, isPending } = useAuthLogin({
    optionalCallback: () => {
      router.push(getLoginRedirectPath());
    },
  });
  const onSubmit = handleSubmit((formData) => {
    loginMutation(formData);
  });

  return (
    <LoginFormWrapper noValidate onSubmit={onSubmit}>
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
        // helperAction={
        //   // <Link className="auth_link" href="#">
        //   //   Forgot?
        //   // </Link>
        // }
        isPassword
        labelName="Password"
        name="password"
        placeHolder="Enter your password"
        rules={{
          required: "Password is required",
        }}
        textFieldProps={{
          autoComplete: "current-password",
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
        {isPending ? "Logging in..." : "Login"}
      </Button>

      <Typography className="auth_signup_text">
        Don&apos;t have an account?{" "}
        <Link className="auth_link" href="/auth/register">
          Sign up
        </Link>
      </Typography>
    </LoginFormWrapper>
  );
}
