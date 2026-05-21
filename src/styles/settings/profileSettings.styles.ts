'use client';

import { Box, styled } from '@mui/material';

export const ProfileSettingsWrapper = styled(Box)`
  display: flex;
  min-height: 100svh;
  background-color: #f5faf8;
  color: #171d1c;

  .settings_sidebar {
    position: sticky;
    top: 0;
    z-index: 30;
    display: flex;
    width: 280px;
    height: 100svh;
    flex: 0 0 280px;
    border-right: 1px solid rgba(188, 201, 198, 0.35);
    background-color: #f5faf8;
    box-shadow: 0 10px 28px rgba(23, 29, 28, 0.06);

    @media (max-width: 899px) {
      display: none;
    }
  }

  .sidebar_inner {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 8px;
    overflow-y: auto;
    padding: 24px;
  }

  .brand_row {
    align-items: center;
    gap: 14px;
    padding: 10px 0 28px;
  }

  .brand_icon {
    display: grid;
    width: 40px;
    height: 40px;
    place-items: center;
    border-radius: 999px;
    background-color: #00685f;
    color: #ffffff;
  }

  .brand_name,
  .mobile_brand,
  .page_title {
    color: #00685f;
    font-weight: 800;
  }

  .brand_name {
    font-size: 19px;
    line-height: 24px;
  }

  .brand_caption {
    color: #3d4947;
    font-size: 12px;
    line-height: 18px;
  }

  .sidebar_nav {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 8px;
  }

  .nav_link {
    display: flex;
    align-items: center;
    gap: 14px;
    min-height: 42px;
    padding: 10px 14px;
    border-radius: 8px;
    color: #3d4947;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition:
      background-color 160ms ease,
      color 160ms ease;

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover,
    &.active {
      background-color: rgba(0, 131, 120, 0.11);
      color: #00685f;
    }
  }

  .logout_link {
    margin-top: auto;
    border-top: 1px solid rgba(188, 201, 198, 0.35);
  }

  .settings_main {
    min-width: 0;
    flex: 1;
    padding-bottom: 92px;
  }

  .topbar {
    position: sticky;
    top: 0;
    z-index: 20;
    display: flex;
    min-height: 72px;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 0 32px;
    border-bottom: 1px solid rgba(188, 201, 198, 0.35);
    background-color: rgba(245, 250, 248, 0.88);
    box-shadow: 0 6px 16px rgba(23, 29, 28, 0.04);
    backdrop-filter: blur(18px);

    @media (max-width: 599px) {
      min-height: 64px;
      padding: 0 16px;
    }
  }

  .mobile_brand {
    display: none;
    font-size: 20px;

    @media (max-width: 899px) {
      display: block;
    }
  }

  .page_title {
    font-size: 22px;
    line-height: 30px;

    @media (max-width: 899px) {
      display: none;
    }
  }

  .topbar_actions {
    align-items: center;
    gap: 12px;
  }

  .topbar_avatar {
    width: 40px;
    height: 40px;
    border: 2px solid rgba(0, 104, 95, 0.22);
    border-radius: 50%;
    object-fit: cover;
  }

  .content_area {
    width: min(100%, 1280px);
    margin: 0 auto;
    padding: 32px;

    @media (max-width: 599px) {
      padding: 20px 16px;
    }
  }

  .settings_grid {
    display: grid;
    grid-template-columns: minmax(280px, 0.85fr) minmax(0, 1.7fr);
    gap: 24px;

    @media (max-width: 1099px) {
      grid-template-columns: 1fr;
    }
  }

  .identity_col,
  .forms_col,
  .stats_list {
    gap: 24px;
  }

  .profile_card,
  .stats_card,
  .panel {
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 8px 20px rgba(23, 29, 28, 0.08);
  }

  .profile_card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;
    text-align: center;
  }

  .profile_photo_wrap {
    position: relative;
    margin-bottom: 24px;
  }

  .profile_photo {
    display: block;
    width: 160px;
    height: 160px;
    border: 4px solid rgba(0, 131, 120, 0.16);
    border-radius: 50%;
    object-fit: cover;
  }

  .camera_badge {
    position: absolute;
    right: 6px;
    bottom: 6px;
    display: grid;
    width: 42px;
    height: 42px;
    place-items: center;
    border: 4px solid #ffffff;
    border-radius: 50%;
    background-color: #00685f;
    color: #ffffff;
    box-shadow: 0 8px 16px rgba(0, 104, 95, 0.22);

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .profile_name {
    color: #171d1c;
    font-size: 32px;
    font-weight: 800;
    line-height: 40px;
  }

  .profile_role {
    margin-top: 6px;
    color: #3d4947;
    font-size: 16px;
    line-height: 24px;
  }

  .member_since {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-top: 16px;
    color: #6d7a77;
    font-size: 12px;
    font-weight: 800;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .stats_card {
    border: 1px solid rgba(0, 131, 120, 0.12);
    background-color: rgba(0, 131, 120, 0.04);
    padding: 28px;
  }

  .section_title {
    color: #171d1c;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
  }

  .stats_card .section_title {
    color: #00685f;
    margin-bottom: 24px;
  }

  .stat_item {
    align-items: center;
    gap: 16px;
    border: 1px solid rgba(188, 201, 198, 0.35);
    border-radius: 8px;
    background-color: #ffffff;
    padding: 16px;
    box-shadow: 0 4px 12px rgba(23, 29, 28, 0.04);
  }

  .stat_icon {
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border-radius: 8px;

    &.primary {
      color: #00685f;
      background-color: rgba(0, 104, 95, 0.1);
    }

    &.secondary {
      color: #565e74;
      background-color: rgba(86, 94, 116, 0.1);
    }

    &.tertiary {
      color: #924628;
      background-color: rgba(146, 70, 40, 0.1);
    }
  }

  .stat_label {
    color: #6d7a77;
    font-size: 14px;
    line-height: 20px;
  }

  .stat_value {
    color: #171d1c;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
  }

  .panel {
    padding: 32px;
  }

  .panel_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 32px;
    border-bottom: 1px solid rgba(188, 201, 198, 0.35);
    padding-bottom: 16px;

    &.simple {
      justify-content: flex-start;
    }

    @media (max-width: 699px) {
      align-items: flex-start;
      flex-direction: column;
    }
  }

  .save_btn,
  .delete_btn {
    border-radius: 999px;
    background-color: #00685f;
    color: #ffffff;
    font-weight: 800;
    text-transform: none;
  }

  .form_grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;

    @media (max-width: 699px) {
      grid-template-columns: 1fr;
    }
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 6px;

    &.wide {
      grid-column: 1 / -1;
    }

    span {
      color: #6d7a77;
      font-size: 12px;
      font-weight: 800;
      line-height: 16px;
      padding-left: 4px;
    }
  }

  input,
  textarea {
    width: 100%;
    border: 1px solid #bcc9c6;
    border-radius: 8px;
    background-color: #f0f5f2;
    color: #171d1c;
    font: inherit;
    outline: none;
    transition:
      border-color 160ms ease,
      box-shadow 160ms ease;

    &:focus {
      border-color: #00685f;
      box-shadow: 0 0 0 1px #00685f;
    }
  }

  input {
    height: 48px;
    padding: 0 16px;
  }

  textarea {
    resize: none;
    padding: 14px 16px;
  }

  .security_grid {
    margin-bottom: 24px;
  }

  .desktop_spacer {
    @media (max-width: 699px) {
      display: none;
    }
  }

  .outline_btn {
    border: 1px solid #00685f;
    border-radius: 8px;
    color: #00685f;
    font-weight: 800;
    padding: 12px 28px;
    text-transform: none;
  }

  .danger_panel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    border: 1px solid rgba(186, 26, 26, 0.22);
    border-radius: 12px;
    background-color: rgba(255, 218, 214, 0.24);
    padding: 32px;

    @media (max-width: 699px) {
      align-items: flex-start;
      flex-direction: column;
    }
  }

  .danger_title {
    color: #ba1a1a;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
  }

  .danger_copy {
    margin-top: 4px;
    color: #3d4947;
    font-size: 16px;
    line-height: 24px;
  }

  .delete_btn {
    border-radius: 8px;
    background-color: #ba1a1a;
    white-space: nowrap;
  }

  .mobile_nav {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 40;
    display: none;
    align-items: center;
    justify-content: space-around;
    border-top: 1px solid rgba(188, 201, 198, 0.35);
    background-color: rgba(245, 250, 248, 0.92);
    padding: 8px 16px;
    backdrop-filter: blur(18px);

    @media (max-width: 899px) {
      display: flex;
    }
  }

  .mobile_nav_link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: #3d4947;
    font-size: 10px;
    font-weight: 800;
    text-decoration: none;

    svg {
      width: 22px;
      height: 22px;
    }

    &.active {
      color: #00685f;
    }
  }
`;
