'use client';

import { Box, styled } from '@mui/material';

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
