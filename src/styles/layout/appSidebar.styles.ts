'use client';

import { Box, styled } from '@mui/material';

export const AuthTopbarWrapper = styled(Box)`
  position: sticky;
  top: 0;
  z-index: 70;
  display: flex;
  min-height: 72px;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 14px 24px;
  border-bottom: 1px solid rgba(188, 201, 198, 0.35);
  background: rgba(245, 250, 248, 0.9);
  box-shadow: 0 6px 16px rgba(23, 29, 28, 0.04);
  backdrop-filter: blur(18px);

  .auth_topbar_brand {
    display: none;
    align-items: center;
    gap: 10px;
    color: #00685f;
    text-decoration: none;

    svg {
      width: 24px;
      height: 24px;
    }

    span {
      font: 800 24px/1 Georgia, serif;
    }
  }

  .auth_topbar_page {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    gap: 2px;
  }

  .auth_topbar_page_title {
    overflow: hidden;
    color: #10201d;
    font-size: 22px;
    font-weight: 900;
    line-height: 28px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .auth_topbar_page_subtitle {
    overflow: hidden;
    color: #687a76;
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .auth_topbar_actions {
    display: inline-flex;
    min-width: 0;
    flex: 0 1 auto;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;

    .MuiButton-root {
      min-height: 42px;
      border-radius: 999px;
      font-weight: 800;
      text-transform: none;
    }

    .MuiToggleButtonGroup-root {
      flex-wrap: nowrap;
    }

    .search_wrap {
      width: clamp(240px, 22vw, 360px);
      flex: 0 1 360px;
    }
  }

  .auth_topbar_profile_btn {
    display: inline-flex;
    min-width: 0;
    align-items: center;
    gap: 12px;
    padding: 6px 8px 6px 16px;
    border: 1px solid rgba(0, 104, 95, 0.16);
    border-radius: 999px;
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(238, 248, 245, 0.92)),
      #ffffff;
    box-shadow:
      0 14px 34px rgba(0, 104, 95, 0.08),
      inset 0 0 0 1px rgba(255, 255, 255, 0.82);
    color: #10201d;
    cursor: pointer;
    font: inherit;
    text-align: left;
    transition:
      border-color 160ms ease,
      box-shadow 160ms ease,
      transform 160ms ease;

    &:hover,
    &:focus-visible {
      border-color: rgba(0, 131, 120, 0.38);
      box-shadow:
        0 18px 38px rgba(0, 104, 95, 0.12),
        inset 0 0 0 1px rgba(255, 255, 255, 0.9);
      transform: translateY(-1px);
    }

    &:focus-visible {
      outline: 3px solid rgba(0, 131, 120, 0.18);
      outline-offset: 3px;
    }
  }

  .auth_topbar_profile_text {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 1px;
  }

  .auth_topbar_profile_name {
    max-width: 180px;
    overflow: hidden;
    color: #0e1d1a;
    font-size: 14px;
    font-weight: 800;
    line-height: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .auth_topbar_profile_meta {
    max-width: 180px;
    overflow: hidden;
    color: #687a76;
    font-size: 11px;
    font-weight: 700;
    line-height: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .auth_topbar_avatar_ring {
    position: relative;
    display: grid;
    width: 44px;
    height: 44px;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 50%;
    background:
      conic-gradient(from 160deg, #008378, #f0a100, #7388db, #008378);
  }

  .auth_topbar_avatar {
    width: 40px;
    height: 40px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    object-fit: cover;
  }

  .auth_topbar_status_dot {
    position: absolute;
    right: 1px;
    bottom: 3px;
    width: 11px;
    height: 11px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    background: #008378;
    box-shadow: 0 0 0 3px rgba(0, 131, 120, 0.14);
  }

  .auth_topbar_chevron {
    width: 19px;
    height: 19px;
    color: #00685f;
    transition: transform 160ms ease;
  }

  .auth_topbar_profile_btn[aria-expanded='true'] .auth_topbar_chevron {
    transform: rotate(180deg);
  }

  @media (max-width: 899px) {
    justify-content: space-between;

    .auth_topbar_brand {
      display: inline-flex;
    }

    .auth_topbar_page {
      display: none;
    }

    .auth_topbar_actions {
      display: none;
    }
  }

  @media (max-width: 599px) {
    min-height: 62px;
    padding: 10px 16px;

    .auth_topbar_brand span {
      font-size: 21px;
    }

    .auth_topbar_profile_btn {
      gap: 0;
      padding: 3px;
      border-color: transparent;
      background: transparent;
      box-shadow: none;

      &:hover,
      &:focus-visible {
        border-color: transparent;
        box-shadow: none;
        transform: none;
      }
    }

    .auth_topbar_profile_text,
    .auth_topbar_chevron {
      display: none;
    }
  }
`;

export const AppSidebarWrapper = styled(Box)`
  position: sticky;
  top: 0;
  z-index: 50;
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

  .sidebar_inner {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 8px;
    overflow-y: auto;
    padding: 24px;
  }

  .brand_row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 10px 0 28px;
  }

  .brand_icon {
    display: grid;
    width: 40px;
    height: 40px;
    place-items: center;
    border-radius: 10px;
    background-color: #00685f;
    color: #ffffff;
  }

  .brand_name {
    color: #00685f;
    font-size: 19px;
    font-weight: 800;
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

  .nav_icon {
    position: relative;
    display: inline-grid;
    place-items: center;
  }

  .nav_notification_badge {
    position: absolute;
    top: -10px;
    right: -15px;
    display: grid;
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    place-items: center;
    border: 2px solid #ffffff;
    border-radius: 999px;
    background: #c9402f;
    color: #ffffff;
    font-size: 10px;
    font-weight: 800;
    line-height: 1;
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

  .new_trip_btn {
    min-height: 52px;
    border-radius: 8px;
    background-color: #00685f;
    color: #ffffff;
    font-weight: 800;
    text-transform: none;
  }

  .logout_link {
    margin-top: 8px;
    border-top: 1px solid rgba(188, 201, 198, 0.35);
  }
`;

export const MobileBottomNavWrapper = styled(Box)`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 80;
  display: none;
  align-items: center;
  justify-content: space-around;
  gap: 2px;
  padding: 7px max(8px, env(safe-area-inset-left)) calc(7px + env(safe-area-inset-bottom)) max(8px, env(safe-area-inset-right));
  border-top: 1px solid rgba(188, 201, 198, 0.38);
  background: rgba(245, 250, 248, 0.94);
  box-shadow: 0 -10px 28px rgba(23, 29, 28, 0.08);
  backdrop-filter: blur(18px);

  @media (max-width: 899px) {
    display: flex;
  }

  .mobile_tab {
    position: relative;
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    min-height: 52px;
    border: 0;
    border-radius: 12px;
    background: transparent;
    color: #53625f;
    cursor: pointer;
    font: inherit;
    font-size: 10px;
    font-weight: 800;
    line-height: 1.1;
    text-decoration: none;
    transition:
      background-color 160ms ease,
      color 160ms ease;

    svg {
      width: 21px;
      height: 21px;
    }

    &.active,
    &:hover {
      background: rgba(0, 131, 120, 0.1);
      color: #00685f;
    }
  }

  .mobile_tab_badge {
    position: absolute;
    top: 4px;
    right: 22%;
    display: grid;
    min-width: 17px;
    height: 17px;
    padding: 0 4px;
    place-items: center;
    border: 2px solid #ffffff;
    border-radius: 999px;
    background: #c9402f;
    color: #ffffff;
    font-size: 9px;
    font-weight: 900;
    line-height: 1;
  }
`;
