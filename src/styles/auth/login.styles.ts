'use client';

import { Box, Paper, styled } from '@mui/material';

export const LoginPageWrapper = styled(Box)`
  min-height: 100svh;
  overflow: hidden;
  position: relative;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};

  .auth_header {
    position: fixed;
    inset: 0 0 auto;
    z-index: 10;
    border-bottom: 1px solid rgba(188, 201, 198, 0.34);
    background-color: rgba(245, 250, 248, 0.82);
    box-shadow: 0 10px 30px rgba(23, 29, 28, 0.08);
    backdrop-filter: blur(20px);
  }

  .auth_header_inner {
    min-height: 56px;
    align-items: center;
    justify-content: space-between;
  }

  .auth_brand {
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 0;
  }

  .auth_actions {
    align-items: center;
    gap: 12px;
  }

  .auth_login_btn {
    min-height: 32px;
    font-weight: 800;

    @media (max-width: 899px) {
      display: none;
    }
  }

  .auth_started_btn {
    min-height: 36px;
    height: 36px;
    padding-right: 20px;
    padding-left: 20px;
    border-radius: 12px;
    box-shadow: 0 8px 18px rgba(0, 104, 95, 0.26);
  }

  .auth_main {
    position: relative;
    display: flex;
    min-height: 100svh;
    align-items: center;
    justify-content: center;
    padding: 56px 16px 0;
  }

  .auth_hero_bg {
    position: absolute;
    z-index: 0;
    inset: 0;
    background-color: #172124;
  }

  .auth_hero_img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .auth_hero_overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.02) 0%,
      rgba(0, 0, 0, 0.22) 58%,
      rgba(0, 0, 0, 0.44) 100%
    );
  }

  .auth_card_body {
    gap: 28px;
  }

  .auth_heading {
    text-align: center;
  }

  .auth_title {
    font-size: 30px;
    font-weight: 800;
    line-height: 40px;
  }

  .auth_subtitle {
    margin-top: 4px;
    color: ${({ theme }) => theme.palette.text.secondary};
    font-size: 16px;
    font-weight: 700;
    line-height: 28px;
  }

  .auth_footer {
    position: fixed;
    right: 0;
    bottom: 24px;
    left: 0;
    z-index: 1;
    text-align: center;

    @media (max-width: 899px) {
      display: none;
    }
  }

  .auth_footer_copy {
    color: rgba(255, 255, 255, 0.72);
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.45));
    font-size: 12px;
    font-weight: 700;
  }
`;

export const LoginCardWrapper = styled(Paper)`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 480px;
  padding: 32px 34px 30px;
  border: 1px solid rgba(226, 232, 240, 0.62);
  border-radius: 32px;
  background-color: rgba(255, 255, 255, 0.72);
  box-shadow: 0 28px 70px rgba(23, 29, 28, 0.34);
  backdrop-filter: blur(22px);

  @media (max-width: 599px) {
    padding: 24px;
  }
`;

export const LoginFormWrapper = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .form_field {
    width: 100%;
  }

  .form_field_header {
    margin-bottom: 4px;
    padding-right: 4px;
    padding-left: 4px;
    align-items: center;
    justify-content: space-between;
  }

  .form_field_label {
    color: ${({ theme }) => theme.palette.text.secondary};
    font-size: 12px;
    font-weight: 800;
    line-height: 16px;
  }

  .form_field_error {
    display: block;
    margin-top: 4px;
    padding-right: 4px;
    padding-left: 4px;
  }

  .auth_input {
    &.MuiTextField-root {
      display: block;
    }

    .MuiOutlinedInput-root.MuiInputBase-root {
      height: 52px;
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 0.66);
      transition:
        background 160ms ease,
        border-color 160ms ease,
        box-shadow 160ms ease;

      fieldset {
        border-color: rgba(188, 201, 198, 0.86);
      }

      &:hover fieldset {
        border-color: ${({ theme }) => theme.palette.primary.main};
      }

      &.Mui-focused {
        background-color: rgba(255, 255, 255, 0.82);
        box-shadow: 0 0 0 3px rgba(0, 104, 95, 0.14);

        fieldset {
          border-width: 1px;
          border-color: ${({ theme }) => theme.palette.primary.main};
        }
      }
    }

    .MuiInputBase-input {
      height: 52px;
      box-sizing: border-box;
      padding-right: 16px;
      padding-left: 16px;
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;

      &::placeholder {
        color: #6d7a77;
        opacity: 0.86;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        box-shadow: 0 0 0 100px rgba(255, 255, 255, 0.66) inset;
        -webkit-text-fill-color: ${({ theme }) => theme.palette.text.primary};
      }
    }
  }

  .auth_link {
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 12px;
    font-weight: 800;
    line-height: 16px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .auth_submit_btn {
    min-height: 52px;
    height: 52px;
    margin-top: 6px;
    border-radius: 8px;
    box-shadow: 0 10px 22px rgba(0, 104, 95, 0.26);
    font-size: 20px;

    &:active {
      transform: scale(0.98);
    }
  }

  .auth_divider_wrap {
    padding-top: 4px;
    padding-bottom: 2px;
  }

  .auth_divider {
    &::before,
    &::after {
      border-color: rgba(109, 122, 119, 0.28);
    }
  }

  .auth_divider_text {
    padding-right: 16px;
    padding-left: 16px;
    color: ${({ theme }) => theme.palette.text.secondary};
    font-size: 10px;
    font-weight: 800;
    line-height: 16px;
    text-transform: uppercase;
  }

  .auth_google_btn {
    height: 52px;
    border-color: rgba(109, 122, 119, 0.88);
    border-radius: 8px;
    background-color: ${({ theme }) => theme.palette.common.white};
    color: ${({ theme }) => theme.palette.text.primary};
    font-weight: 800;

    &:hover {
      border-color: rgba(109, 122, 119, 0.55);
      background-color: rgba(240, 245, 242, 0.94);
    }
  }

  .google_icon {
    color: #4285f4;
  }

  .auth_signup_text {
    color: ${({ theme }) => theme.palette.text.secondary};
    font-size: 14px;
    line-height: 20px;
    text-align: center;
  }
`;
