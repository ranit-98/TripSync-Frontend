'use client';

import { Box, styled } from '@mui/material';

export const TripSettlementsWrapper = styled(Box)`
  display: flex;
  min-height: 100svh;
  background-color: #f5faf8;
  color: #171d1c;

  .settlement_sidebar {
    position: sticky;
    top: 0;
    z-index: 30;
    display: flex;
    width: 280px;
    height: 100svh;
    flex: 0 0 280px;
    border-right: 1px solid rgba(188, 201, 198, 0.35);
    background-color: #f5faf8;

    @media (max-width: 899px) {
      display: none;
    }
  }

  .sidebar_inner {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 8px;
    padding: 28px 24px;
  }

  .brand_block {
    margin-bottom: 26px;
  }

  .brand_name {
    color: #00685f;
    font-size: 18px;
    font-weight: 800;
    line-height: 24px;
  }

  .brand_caption {
    color: #3d4947;
    font-size: 11px;
    line-height: 16px;
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
    min-height: 40px;
    padding: 9px 14px;
    border-radius: 8px;
    color: #3d4947;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition:
      background-color 160ms ease,
      color 160ms ease;

    svg {
      width: 19px;
      height: 19px;
    }

    &:hover,
    &.active {
      background-color: rgba(0, 131, 120, 0.11);
      color: #00685f;
    }
  }

  .logout_link {
    margin-top: auto;
  }

  .settlement_main {
    position: relative;
    min-width: 0;
    flex: 1;
    padding-bottom: 96px;
  }

  .topbar {
    position: sticky;
    top: 0;
    z-index: 20;
    display: flex;
    min-height: 72px;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    padding: 0 32px;
    border-bottom: 1px solid rgba(188, 201, 198, 0.35);
    background-color: rgba(245, 250, 248, 0.88);
    backdrop-filter: blur(18px);

    @media (max-width: 599px) {
      min-height: 64px;
      padding: 0 16px;
    }
  }

  .topbar_title,
  .topbar_actions {
    align-items: center;
    gap: 12px;
  }

  .topbar_title h1 {
    color: #171d1c;
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;

    @media (max-width: 599px) {
      font-size: 16px;
      line-height: 22px;
    }
  }

  .back_btn {
    color: #00685f;
  }

  .profile_avatar,
  .stack_avatar,
  .person_avatar,
  .mini_avatar {
    border-radius: 50%;
    object-fit: cover;
  }

  .profile_avatar {
    width: 34px;
    height: 34px;
    border: 2px solid rgba(0, 104, 95, 0.22);
  }

  .content_area {
    width: min(100%, 1280px);
    margin: 0 auto;
    padding: 32px;

    @media (max-width: 899px) {
      padding: 20px 16px;
    }
  }

  .summary_grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;

    @media (max-width: 899px) {
      grid-template-columns: 1fr;
    }
  }

  .summary_card,
  .panel {
    border: 1px solid rgba(188, 201, 198, 0.42);
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.82);
    box-shadow: 0 8px 20px rgba(23, 29, 28, 0.08);
    backdrop-filter: blur(12px);
  }

  .summary_card {
    min-height: 134px;
    padding: 24px;
  }

  .share_card {
    border-color: rgba(0, 104, 95, 0.24);
    background-color: rgba(137, 245, 231, 0.22);
  }

  .summary_label {
    color: #3d4947;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.06em;
    line-height: 16px;
    text-transform: uppercase;
  }

  .summary_value {
    margin-top: 14px;
    color: #171d1c;
    font-size: 28px;
    font-weight: 800;
    line-height: 36px;
  }

  .share_card .summary_label,
  .share_card .summary_value,
  .share_card .summary_hint {
    color: #00685f;
  }

  .summary_hint {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 4px;
    color: #6d7a77;
    font-size: 13px;
    line-height: 18px;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .split_card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .split_row {
    align-items: center;
    gap: 18px;
    margin-top: 16px;
  }

  .avatar_stack,
  .mini_avatar_stack {
    align-items: center;
  }

  .stack_avatar,
  .avatar_more {
    width: 46px;
    height: 46px;
    margin-left: -12px;
    border: 2px solid #ffffff;

    &:first-of-type {
      margin-left: 0;
    }
  }

  .avatar_more,
  .all_badge {
    display: grid;
    place-items: center;
    border-radius: 50%;
    background-color: #dae2fd;
    color: #5c647a;
    font-weight: 800;
  }

  .member_count {
    color: #171d1c;
    font-size: 18px;
    font-weight: 700;
  }

  .settlement_panel {
    margin-top: 24px;
    overflow: hidden;
  }

  .panel_header {
    display: flex;
    min-height: 64px;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 0 24px;
    border-bottom: 1px solid rgba(188, 201, 198, 0.32);

    @media (max-width: 599px) {
      align-items: flex-start;
      flex-direction: column;
      padding: 18px;
    }
  }

  .panel_title {
    color: #171d1c;
    font-size: 18px;
    font-weight: 700;
    line-height: 26px;
  }

  .pending_pill {
    border: 1px solid rgba(146, 70, 40, 0.2);
    border-radius: 999px;
    background-color: rgba(176, 94, 61, 0.1);
    color: #924628;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 800;
  }

  .settlement_row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    min-height: 86px;
    padding: 16px 24px;
    border-bottom: 1px solid rgba(188, 201, 198, 0.28);

    &:last-child {
      border-bottom: 0;
    }

    &.settled {
      background-color: rgba(255, 255, 255, 0.5);
      opacity: 0.62;
    }

    @media (max-width: 799px) {
      align-items: flex-start;
      flex-direction: column;
    }
  }

  .people_flow {
    align-items: center;
    gap: 28px;
    min-width: 0;

    @media (max-width: 599px) {
      align-items: flex-start;
      flex-direction: column;
      gap: 12px;
    }
  }

  .person_block {
    align-items: center;
    gap: 14px;
    min-width: 142px;
  }

  .person_avatar {
    width: 42px;
    height: 42px;
  }

  .person_name {
    color: #171d1c;
    font-size: 14px;
    font-weight: 800;
    line-height: 18px;
  }

  .person_role {
    color: #6d7a77;
    font-size: 12px;
    line-height: 16px;
  }

  .flow_arrow {
    color: #6d7a77;
  }

  .settlement_action {
    align-items: center;
    gap: 24px;
  }

  .settlement_amount {
    color: #00685f;
    font-size: 18px;
    font-weight: 800;
  }

  .settled .settlement_amount {
    color: #6d7a77;
    text-decoration: line-through;
  }

  .settle_btn {
    min-width: 124px;
    border: 1px solid #00685f;
    border-radius: 10px;
    color: #00685f;
    font-size: 12px;
    font-weight: 800;
    text-transform: none;

    &:hover {
      background-color: #00685f;
      color: #ffffff;
    }
  }

  .settled_badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #565e74;
    font-size: 13px;
    font-weight: 800;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  .tabs {
    display: flex;
    gap: 16px;
    margin-top: 28px;
    border-bottom: 1px solid rgba(188, 201, 198, 0.42);
    overflow-x: auto;
  }

  .tab_btn {
    min-height: 50px;
    border-radius: 0;
    color: #3d4947;
    font-size: 13px;
    font-weight: 800;
    text-transform: none;

    &.active {
      border-bottom: 2px solid #00685f;
      color: #00685f;
    }
  }

  .transaction_panel {
    margin-top: 16px;
    overflow: hidden;
  }

  .transaction_table {
    overflow-x: auto;
  }

  .transaction_row {
    display: grid;
    grid-template-columns: minmax(126px, 0.75fr) minmax(220px, 1.55fr) minmax(110px, 0.65fr) minmax(150px, 0.8fr) minmax(82px, 0.4fr);
    align-items: center;
    min-width: 760px;
    min-height: 72px;
    border-bottom: 1px solid rgba(188, 201, 198, 0.24);

    > * {
      padding: 0 24px;
    }

    &:last-child {
      border-bottom: 0;
    }
  }

  .transaction_head {
    min-height: 52px;
    background-color: #f0f5f2;
    color: #6d7a77;
    font-size: 12px;
    font-weight: 800;
  }

  .date_cell {
    color: #3d4947;
    font-size: 13px;
  }

  .description_cell {
    align-items: center;
    gap: 14px;
  }

  .transaction_icon {
    display: grid;
    width: 40px;
    height: 40px;
    place-items: center;
    border-radius: 8px;

    svg {
      width: 20px;
      height: 20px;
    }

    &.primary {
      color: #00685f;
      background-color: rgba(0, 104, 95, 0.1);
    }

    &.tertiary {
      color: #924628;
      background-color: rgba(146, 70, 40, 0.1);
    }

    &.secondary {
      color: #565e74;
      background-color: rgba(218, 226, 253, 0.65);
    }
  }

  .mini_avatar,
  .all_badge {
    width: 30px;
    height: 30px;
    margin-left: -8px;
    border: 2px solid #ffffff;

    &:first-of-type {
      margin-left: 0;
    }
  }

  .all_badge {
    font-size: 9px;
  }

  .fab_btn {
    position: fixed;
    right: 32px;
    bottom: 32px;
    z-index: 40;
    min-width: 156px;
    min-height: 54px;
    border-radius: 12px;
    background-color: #00685f;
    color: #ffffff;
    font-weight: 800;
    text-transform: none;
    box-shadow: 0 12px 24px rgba(0, 104, 95, 0.24);

    @media (max-width: 599px) {
      right: 16px;
      bottom: 16px;
      min-width: 132px;
    }
  }
`;
