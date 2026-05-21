'use client';

import { Box, styled } from '@mui/material';

export const AdminDashboardWrapper = styled(Box)`
  display: flex;
  min-height: 100svh;
  background-color: #f5faf8;
  color: #171d1c;

  .admin_sidebar {
    position: sticky;
    top: 0;
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
    padding: 48px 24px 24px;
  }

  .brand_block {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 22px;
  }

  .brand_mark {
    display: grid;
    width: 38px;
    height: 38px;
    place-items: center;
    border-radius: 8px;
    background-color: #00685f;
    color: #ffffff;
  }

  .brand_name {
    color: #00685f;
    font-size: 18px;
    font-weight: 800;
    line-height: 22px;
  }

  .brand_caption {
    color: #3d4947;
    font-size: 10px;
    line-height: 14px;
  }

  .sidebar_nav,
  .sidebar_bottom {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .sidebar_nav {
    flex: 1;
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
    line-height: 20px;
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

  .sidebar_cta {
    min-height: 52px;
    border-radius: 8px;
    background-color: #00685f;
    color: #ffffff;
    font-weight: 800;
    text-transform: none;
  }

  .logout_link {
    color: #6d7a77;
  }

  .admin_main {
    min-width: 0;
    flex: 1;
    overflow-y: auto;
  }

  .admin_topbar {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    min-height: 72px;
    padding: 0 32px;
    border-bottom: 1px solid rgba(188, 201, 198, 0.35);
    background-color: rgba(245, 250, 248, 0.88);
    backdrop-filter: blur(18px);

    @media (max-width: 599px) {
      min-height: 64px;
      padding: 0 16px;
    }
  }

  .admin_title {
    color: #00685f;
    font-size: 22px;
    font-weight: 800;
    line-height: 30px;
  }

  .topbar_actions {
    align-items: center;
    gap: 14px;
  }

  .search_wrap {
    position: relative;

    @media (max-width: 699px) {
      display: none;
    }
  }

  .search_icon {
    position: absolute;
    top: 50%;
    left: 16px;
    z-index: 1;
    width: 18px;
    height: 18px;
    color: #6d7a77;
    transform: translateY(-50%);
  }

  .search_input {
    width: 248px;

    .MuiInputBase-input {
      padding-left: 40px;
      font-size: 13px;
    }

    .MuiOutlinedInput-root {
      height: 44px;
      border-radius: 999px;
      background-color: #eaefed;
    }

    fieldset {
      border: 0;
    }
  }

  .notification_btn {
    position: relative;
    color: #3d4947;
  }

  .notification_badge {
    position: absolute;
    top: 11px;
    right: 11px;
    width: 7px;
    height: 7px;
    border: 1px solid #f5faf8;
    border-radius: 50%;
    background-color: #ba1a1a;
  }

  .topbar_avatar,
  .table_avatar {
    border-radius: 50%;
    object-fit: cover;
  }

  .topbar_avatar {
    width: 38px;
    height: 38px;
    border: 2px solid #6bd8cb;
  }

  .admin_content {
    width: min(100%, 1280px);
    margin: 0 auto;
    padding: 32px;

    @media (max-width: 899px) {
      padding: 20px 16px 92px;
    }
  }

  .stats_grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;

    @media (max-width: 1199px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 599px) {
      grid-template-columns: 1fr;
    }
  }

  .panel,
  .stat_card {
    border: 1px solid rgba(188, 201, 198, 0.4);
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 8px 20px rgba(23, 29, 28, 0.08);
  }

  .stat_card {
    display: flex;
    min-height: 140px;
    flex-direction: column;
    justify-content: space-between;
    padding: 22px;
  }

  .stat_header,
  .panel_header,
  .status_footer {
    align-items: center;
    justify-content: space-between;
  }

  .stat_icon,
  .activity_icon {
    display: grid;
    place-items: center;
    border-radius: 8px;
  }

  .stat_icon {
    width: 34px;
    height: 34px;

    svg {
      width: 19px;
      height: 19px;
    }
  }

  .primary {
    color: #00685f;
    background-color: rgba(0, 104, 95, 0.1);
  }

  .tertiary {
    color: #924628;
    background-color: rgba(146, 70, 40, 0.1);
  }

  .secondary {
    color: #565e74;
    background-color: rgba(218, 226, 253, 0.65);
  }

  .neutral {
    color: #6d7a77;
    background-color: #dee4e1;
  }

  .error {
    color: #ba1a1a;
    background-color: rgba(186, 26, 26, 0.1);
  }

  .trend_pill {
    padding: 4px 9px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 800;
    line-height: 14px;
  }

  .metric_label,
  .table_head,
  .bar_label,
  .activity_time {
    color: #6d7a77;
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
  }

  .metric_label,
  .table_head {
    text-transform: uppercase;
  }

  .metric_value {
    margin-top: 3px;
    color: #171d1c;
    font-size: 30px;
    font-weight: 800;
    line-height: 38px;
  }

  .admin_grid {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(300px, 0.95fr);
    gap: 24px;
    margin-top: 28px;

    @media (max-width: 1099px) {
      grid-template-columns: 1fr;
    }
  }

  .panel_header {
    display: flex;
    min-height: 64px;
    padding: 0 24px;
    border-bottom: 1px solid rgba(188, 201, 198, 0.32);
    background-color: rgba(240, 245, 242, 0.55);
  }

  .panel_title {
    color: #171d1c;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
  }

  .view_all_btn {
    color: #00685f;
    font-size: 12px;
    font-weight: 800;
    text-transform: none;
  }

  .users_table {
    overflow-x: auto;
  }

  .table_row {
    display: grid;
    grid-template-columns: minmax(180px, 1.2fr) minmax(190px, 1.3fr) minmax(110px, 0.7fr) minmax(90px, 0.5fr) minmax(96px, 0.5fr);
    align-items: center;
    min-width: 760px;
    min-height: 88px;
    border-bottom: 1px solid rgba(188, 201, 198, 0.22);

    > * {
      padding: 0 24px;
    }
  }

  .table_head {
    min-height: 48px;
    background-color: #f0f5f2;
  }

  .user_cell {
    align-items: center;
    gap: 14px;
    color: #171d1c;
    font-size: 14px;
    line-height: 18px;
  }

  .table_avatar {
    width: 36px;
    height: 36px;
  }

  .email_cell {
    color: #3d4947;
    font-size: 14px;
  }

  .role_pill {
    width: fit-content;
    border-radius: 999px;
    padding: 4px 9px;
    font-size: 11px;
    font-weight: 800;

    &.admin {
      background-color: #e9d5ff;
      color: #6b21a8;
    }

    &.owner {
      background-color: #dbeafe;
      color: #1e40af;
    }

    &.member {
      background-color: #dee4e1;
      color: #3d4947;
    }

    &.contributor {
      background-color: #dcfce7;
      color: #166534;
    }
  }

  .status_toggle {
    display: flex;
    width: 38px;
    height: 18px;
    align-items: center;
    padding: 3px;
    border-radius: 999px;
    background-color: #d6dbd9;

    span {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #ffffff;
      transition: transform 160ms ease;
    }

    &.active {
      background-color: #00685f;

      span {
        transform: translateX(20px);
      }
    }
  }

  .action_cell {
    justify-content: flex-end;
    gap: 2px;

    .MuiIconButton-root {
      width: 32px;
      height: 32px;
      color: #6d7a77;
    }
  }

  .side_panels {
    gap: 24px;
  }

  .chart_panel,
  .activity_panel {
    padding: 24px;
  }

  .bar_chart {
    align-items: end;
    justify-content: space-between;
    height: 210px;
    gap: 12px;
    padding-top: 24px;
  }

  .bar_item {
    display: flex;
    height: 100%;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }

  .bar {
    width: 100%;
    max-width: 36px;
    border-radius: 8px 8px 0 0;
    background-color: rgba(0, 104, 95, 0.22);

    &.active {
      background-color: #00685f;
    }
  }

  .activity_panel {
    max-height: 418px;
    overflow: hidden;
  }

  .activity_list {
    gap: 18px;
    margin-top: 24px;
    overflow-y: auto;
    padding-right: 4px;
  }

  .activity_item {
    align-items: flex-start;
    gap: 14px;
  }

  .activity_icon {
    width: 30px;
    height: 30px;
    flex: 0 0 30px;
    border-radius: 50%;

    svg {
      width: 17px;
      height: 17px;
    }
  }

  .activity_text {
    color: #171d1c;
    font-size: 13px;
    line-height: 18px;

    em {
      color: #00685f;
    }
  }

  .status_footer {
    display: flex;
    gap: 18px;
    padding: 28px 0 0;
    color: #6d7a77;
    font-size: 12px;

    strong {
      color: #00685f;
    }

    @media (max-width: 699px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .status_items {
    flex-wrap: wrap;
    gap: 18px;
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
    padding: 10px 16px;
    border-top: 1px solid rgba(188, 201, 198, 0.35);
    background-color: rgba(245, 250, 248, 0.92);
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
