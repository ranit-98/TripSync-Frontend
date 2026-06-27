import LoginForm from '@/components/auth/LoginForm';
import PublicNavbar from '@/components/layout/PublicNavbar';
import { LoginCardWrapper, LoginPageWrapper } from '@/styles/auth/login.styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function LoginPage() {
  return <LoginPageWrapper>
    <PublicNavbar variant="auth" />
    <Box className="auth_main" component="main"><Box aria-hidden className="auth_hero_bg"><Box alt="" className="auth_hero_img" component="img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEw5x54xVshOKYEMFowM3LkOipxeZRwvBsQvCyAQPk6zADjN5lSD1EGTltPxshfKPBuMdkSkD7X3D457DJX92cKIfLqjod7KuvpJ0WGOST8P87FLYej_JAesRP_oI9kFhWs6hdpevBjXskSEsXub_Ap7o4TYOOGvqlzmQCcYibyc4yv6VpQPPxi4IPcu6mF8I6rQrPHptWMyXlZYeR9UUu_QBy0Jhfh6xGoyXmdjV5L3GLsNaUhj2aNLo24kUaxdxySMVe_0-nzVk" /><Box className="auth_hero_overlay" /></Box><LoginCardWrapper elevation={0}><Stack className="auth_card_body"><Box className="auth_heading"><Typography className="auth_title" component="h1">TripSync</Typography><Typography className="auth_subtitle">Plan Together. Travel Better.</Typography></Box><LoginForm /></Stack></LoginCardWrapper></Box>
    <Box className="auth_footer" component="footer"><Typography className="auth_footer_copy">© 2024 TripSync. All rights reserved.</Typography></Box>
  </LoginPageWrapper>;
}
