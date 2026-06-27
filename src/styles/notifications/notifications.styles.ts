'use client';

import { Box, styled } from '@mui/material';

export const NotificationsPageWrapper = styled(Box)`
  display: flex;
  min-height: 100svh;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};

  .notifications_main {
    min-width: 0;
    flex: 1;
  }

  .notifications_topbar {
    position: sticky;
    top: 0;
    z-index: 40;
    display: none;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 16px 24px;
    border-bottom: 1px solid rgba(188, 201, 198, 0.35);
    background-color: rgba(245, 250, 248, 0.84);
    backdrop-filter: blur(20px);
  }

  .page_title {
    color: #172124;
    font-size: 32px;
    font-weight: 800;
    line-height: 40px;
  }

  .mobile_page_header {
    display: none;
  }

  .page_subtitle,
  .notification_time,
  .metric_label {
    color: #5f6f74;
    font-size: 14px;
    line-height: 20px;
  }

  .search_wrap {
    position: relative;
    width: clamp(280px, 26vw, 380px);
    flex: 0 1 380px;
  }

  .search_icon {
    position: absolute;
    top: 50%;
    left: 14px;
    z-index: 1;
    color: #6d7a77;
    transform: translateY(-50%);
  }

  .search_input .MuiOutlinedInput-root {
    min-height: 44px;
    border-radius: 999px;
    background-color: #ffffff;
    box-shadow: 0 1px 2px rgba(23, 29, 28, 0.04);
    transition: border-color 160ms ease, box-shadow 160ms ease;
  }

  .search_input input {
    padding: 10px 14px 10px 42px;
    color: #263432;
    font-size: 14px;
  }

  .search_input fieldset {
    border-color: rgba(188, 201, 198, 0.8);
  }

  .search_input .MuiOutlinedInput-root:hover fieldset {
    border-color: #8ba7a1;
  }

  .search_input .MuiOutlinedInput-root.Mui-focused {
    box-shadow: 0 0 0 3px rgba(0, 131, 120, 0.13);
  }

  .search_input .MuiOutlinedInput-root.Mui-focused fieldset {
    border-color: #00685f;
  }

  .notifications_content {
    display: grid;
    width: min(100%, 1280px);
    grid-template-columns: minmax(0, 1fr) 360px;
    gap: 24px;
    margin: 0 auto;
    padding: 24px;
  }

  .panel,
  .summary_card,
  .notification_card {
    border: 1px solid rgba(188, 201, 198, 0.36);
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 5px 18px rgba(23, 29, 28, 0.05);
  }

  .panel {
    overflow: hidden;
  }

  .panel_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 24px;
    border-bottom: 1px solid rgba(188, 201, 198, 0.35);
    background-color: #f0f5f2;
  }

  .panel_title {
    color: #172124;
    font-size: 24px;
    font-weight: 800;
    line-height: 32px;
  }

  .mark_btn {
    color: #00685f;
    font-weight: 800;
  }

  .notification_sections {
    display: grid;
    gap: 24px;
    padding: 20px;
  }

  .section_label {
    margin-bottom: 12px;
    color: #6d7a77;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    line-height: 16px;
    text-transform: uppercase;
  }

  .notification_list {
    display: grid;
    gap: 12px;
  }

  .notification_card {
    position: relative;
    display: grid;
    grid-template-columns: 48px minmax(0, 1fr) auto;
    gap: 16px;
    padding: 16px;
  }

  .notification_card.unread {
    border-left: 4px solid #00685f;
    background-color: rgba(0, 131, 120, 0.05);
  }

  .notification_card.actionable {
    cursor: pointer;
  }

  .avatar,
  .icon_avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    flex: 0 0 auto;
  }

  .avatar {
    object-fit: cover;
  }

  .icon_avatar {
    display: grid;
    place-items: center;
    background-color: rgba(0, 104, 95, 0.1);
    color: #00685f;
  }

  .icon_avatar.tertiary {
    background-color: rgba(176, 94, 61, 0.12);
    color: #924628;
  }

  .notification_text {
    color: #172124;
    font-size: 15px;
    line-height: 23px;
  }

  .notification_text strong,
  .notification_highlight {
    font-weight: 800;
  }

  .notification_highlight {
    color: #00685f;
  }

  .notification_meta {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  .trip_chip {
    padding: 4px 10px;
    border-radius: 999px;
    background-color: #dae2fd;
    color: #5c647a;
    font-size: 12px;
    font-weight: 800;
    line-height: 16px;
  }

  .trip_chip.neutral {
    background-color: #e4e9e7;
    color: #3d4947;
  }

  .unread_dot {
    width: 10px;
    height: 10px;
    margin-top: 19px;
    border-radius: 50%;
    background-color: #00685f;
  }

  .notification_actions {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    min-width: 24px;
  }

  .notification_actions .MuiIconButton-root {
    color: #6d7a77;
  }

  .empty_state {
    padding: 28px 4px;
    color: #5f6f74;
    text-align: center;
  }

  .invite_actions {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }

  .summary_stack {
    display: grid;
    gap: 16px;
  }

  .summary_card {
    padding: 20px;
  }

  .summary_title {
    color: #172124;
    font-size: 20px;
    font-weight: 800;
    line-height: 28px;
  }

  .metric_grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-top: 16px;
  }

  .metric_tile {
    padding: 14px;
    border-radius: 8px;
    background-color: #f0f5f2;
  }

  .metric_value {
    display: block;
    color: #00685f;
    font-size: 26px;
    font-weight: 800;
    line-height: 34px;
  }

  .filter_list {
    display: grid;
    gap: 8px;
    margin-top: 16px;
  }

  .filter_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 42px;
    padding: 0 12px;
    border-radius: 8px;
    background-color: #f5faf8;
    color: #3d4947;
    font-size: 14px;
    font-weight: 700;
    border: 0;
    text-align: left;
    cursor: pointer;
  }

  .filter_item.active {
    background-color: rgba(0, 131, 120, 0.11);
    color: #00685f;
  }

  @media (max-width: 1099px) {
    .notifications_content {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 899px) {
    .mobile_page_header {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .notifications_topbar {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      padding: 16px;
    }

    .search_wrap {
      width: 100%;
      flex-basis: auto;
    }

    .notifications_content {
      padding: 16px 16px 96px;
    }

    .notification_card {
      grid-template-columns: 44px minmax(0, 1fr);
    }

    .unread_dot {
      position: absolute;
      top: 18px;
      right: 18px;
      margin: 0;
    }

    .avatar,
    .icon_avatar {
      width: 44px;
      height: 44px;
    }
  }
`;
