import RegistrationForm from "@/components/auth/RegistrationForm";
import { authAssets } from "@/json/assets";
import { LoginCardWrapper, LoginPageWrapper } from "@/styles/auth/login.styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Register() {
  return (
    <LoginPageWrapper>
      <Box className="auth_main auth_main_full" component="main">
        <Box aria-hidden className="auth_hero_bg">
          <Box
            alt=""
            className="auth_hero_img"
            component="img"
            src={authAssets.loginHero}
          />
          <Box className="auth_hero_overlay" />
        </Box>

        <LoginCardWrapper elevation={0}>
          <Stack className="auth_card_body">
            <Box className="auth_heading">
              <Typography className="auth_title" component="h1">
                TripSync
              </Typography>
              <Typography className="auth_subtitle">
                Create your account to start planning together.
              </Typography>
            </Box>

            <RegistrationForm />
            <Box className="auth_quick_panel">
              <Typography component="h2">With your account</Typography>
              {[
                "Plan trips together in one workspace",
                "Keep documents, photos, and updates organized",
                "Track shared expenses and settle balances",
              ].map((item) => (
                <Box className="auth_quick_item" key={item}>
                  <CheckCircleIcon />
                  <span>{item}</span>
                </Box>
              ))}
            </Box>
          </Stack>
        </LoginCardWrapper>
      </Box>

      <Box className="auth_footer" component="footer">
        <Typography className="auth_footer_copy">
          © 2024 TripSync. All rights reserved.
        </Typography>
      </Box>
    </LoginPageWrapper>
  );
}
