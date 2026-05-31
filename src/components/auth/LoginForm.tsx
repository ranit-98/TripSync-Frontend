'use client';

import { useAuthLogin } from '@/api/hooks';
import FormTextField from '@/components/Forms/FormTextField';
import { LoginFormWrapper } from '@/styles/auth/login.styles';
import GoogleIcon from '@mui/icons-material/Google';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: loginMutation, isPending } = useAuthLogin({
    optionalCallback: () => {
      router.push("/settings");
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
          required: 'Email address is required',
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Enter a valid email address',
          },
        }}
        textFieldProps={{
          autoComplete: 'email',
          className: 'auth_input',
        }}
        type="email"
      />

      <FormTextField
        className="form_field"
        control={control}
        helperAction={
          <Link className="auth_link" href="#">
            Forgot?
          </Link>
        }
        isPassword
        labelName="Password"
        name="password"
        placeHolder=""
        rules={{
          required: 'Password is required',
        }}
        textFieldProps={{
          autoComplete: 'current-password',
          className: 'auth_input',
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

      <Typography className="auth_signup_text">
        Don&apos;t have an account?{' '}
        <Link className="auth_link" href="/auth/register">
          Sign up
        </Link>
      </Typography>
    </LoginFormWrapper>
  );
}
