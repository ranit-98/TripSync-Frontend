'use client';

import { Box, styled } from '@mui/material';

export const DashboardPageWrapper = styled(Box)`
  display: flex;
  min-height: 100svh;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};

  .dashboard_sidebar {
    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    width: 280px;
    height: 100svh;
    flex: 0 0 280px;
    flex-direction: column;
    border-right: 1px solid rgba(188, 201, 198, 0.3);
    background-color: ${({ theme }) => theme.palette.background.paper};
    box-shadow: 0 18px 38px rgba(23, 29, 28, 0.08);

    @media (max-width: 899px) {
      display: none;
    }
  }

  .sidebar_inner {
    display: flex;
    height: 100%;
    flex-direction: column;
    gap: 8px;
    overflow-y: auto;
    padding: 16px;
  }

  .brand_block {
    margin-bottom: 16px;
    padding: 24px 16px;
  }

  .brand_name {
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 24px;
    font-weight: 800;
    line-height: 32px;
  }

  .brand_caption,
  .metric_label,
  .user_role,
  .countdown_label {
    color: #6d7a77;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    line-height: 16px;
    text-transform: uppercase;
  }

  .sidebar_nav {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 4px;
  }

  .nav_link {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 10px 16px;
    border-radius: 8px;
    color: ${({ theme }) => theme.palette.text.secondary};
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    text-decoration: none;
    transition:
      background-color 160ms ease,
      color 160ms ease,
      transform 160ms ease;

    &:hover {
      background-color: #e4e9e7;
    }

    &.active {
      color: ${({ theme }) => theme.palette.primary.main};
      background-color: rgba(0, 131, 120, 0.1);
      transform: scale(0.98);
    }

    &.separated {
      margin-top: 32px;
    }
  }

  .sidebar_cta {
    gap: 8px;
    margin-bottom: 16px;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 800;
  }

  .sidebar_user {
    margin-top: auto;
    padding: 16px 8px;
    border-top: 1px solid rgba(188, 201, 198, 0.3);
  }

  .user_row {
    align-items: center;
    gap: 16px;
  }

  .user_avatar,
  .mobile_avatar {
    overflow: hidden;
    border-radius: 50%;
    object-fit: cover;
  }

  .user_avatar {
    width: 40px;
    height: 40px;
    border: 2px solid rgba(0, 104, 95, 0.2);
  }

  .user_name {
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 14px;
    font-weight: 800;
    line-height: 20px;
  }

  .dashboard_main {
    min-width: 0;
    flex: 1;
    overflow-y: auto;
    padding-bottom: 88px;
  }

  .dashboard_topbar {
    position: sticky;
    top: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 16px 24px;
    border-bottom: 1px solid rgba(188, 201, 198, 0.3);
    background-color: rgba(245, 250, 248, 0.82);
    backdrop-filter: blur(20px);

    @media (max-width: 599px) {
      padding: 14px 16px;
    }
  }

  .dashboard_title {
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 32px;
    font-weight: 800;
    line-height: 40px;

    @media (max-width: 599px) {
      font-size: 24px;
      line-height: 32px;
    }
  }

  .dashboard_subtitle {
    color: #6d7a77;
    font-size: 14px;
    line-height: 20px;
  }

  .topbar_actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .topbar_avatar {
    display: block;
    width: 40px;
    height: 40px;
    flex: 0 0 auto;
    overflow: hidden;
    border: 2px solid rgba(0, 104, 95, 0.22);
    border-radius: 50%;
    text-decoration: none;
  }

  .topbar_avatar img {
    width: 100%;
    height: 100%;
  }

  .search_wrap {
    position: relative;

    @media (max-width: 599px) {
      display: none;
    }
  }

  .search_icon {
    position: absolute;
    top: 50%;
    left: 16px;
    color: #6d7a77;
    transform: translateY(-50%);
  }

  .search_input {
    width: 300px;

    .MuiOutlinedInput-root {
      border-radius: 999px;
      background-color: #eaefed;
    }

    fieldset {
      border: 0;
    }
  }

  .notification_btn {
    position: relative;
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  .notification_badge {
    position: absolute;
    top: 9px;
    right: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.palette.error.main};
  }

  .dashboard_content {
    width: min(100%, 1280px);
    margin-right: auto;
    margin-left: auto;
    padding: 24px;

    @media (max-width: 599px) {
      padding: 16px 16px 96px;
    }
  }

  .mobile_page_header {
    display: none;
  }

  .page_title {
    color: #172124;
    font-size: 28px;
    font-weight: 900;
    line-height: 34px;
  }

  @media (min-width: 900px) {
    .dashboard_content { padding-top: 10px; padding-bottom: 10px; }
    .analytics_head { margin-bottom: 8px; }
    .analytics_head .section_title { font-size: 18px; line-height: 22px; }
    .analytics_head .section_copy { font-size: 12px; line-height: 16px; }
    .analytics_stats { gap: 12px; }
    .stat_card { gap: 12px; min-height: 66px; padding: 12px 16px; }
    .stat_icon { width: 36px; height: 36px; }
    .stat_icon svg { width: 24px; height: 24px; }
    .metric_value { font-size: 22px; line-height: 26px; }
    .dashboard_grid { gap: 12px; margin-top: 12px; }
    .insight_card { padding: 14px 16px; }
    .section_title, .next_trip_title { font-size: 18px; line-height: 22px; }
    .section_copy { font-size: 12px; line-height: 16px; }
    .activity_chart { height: 112px; margin-top: 4px; }
    .next_trip_card { min-height: 166px; }
    .spend_card { min-height: 166px; }
    .category_chart { height: 82px; margin-top: 2px; }
    .category_legend { gap: 3px; }
    .category_legend span { font-size: 11px; }
    .category_legend { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media (max-width: 899px) {
    .mobile_page_header {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 18px;
    }
  }

  .stats_grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;

    @media (max-width: 899px) {
      grid-template-columns: 1fr;
    }
  }

  .stat_card,
  .trip_card {
    border: 1px solid rgba(188, 201, 198, 0.32);
    border-radius: 12px;
    background-color: #f0f5f2;
    box-shadow: 0 5px 18px rgba(23, 29, 28, 0.05);
  }

  .stat_card {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 24px;
  }

  .dashboard_grid {
    display: grid;
    grid-template-columns: minmax(0, 1.65fr) minmax(280px, 0.75fr);
    gap: 24px;
    margin-top: 24px;
  }

  .analytics_head {
    display: none;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 20px;
  }

  @media (max-width: 899px) {
    .analytics_head {
      display: flex;
    }
  }

  .period_filter {
    flex: 0 0 auto;
    gap: 4px;
    overflow: hidden;
    border: 1px solid rgba(188, 201, 198, 0.58);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.72);
    padding: 4px;
    box-shadow: 0 8px 22px rgba(23, 29, 28, 0.06);
  }

  .period_filter .MuiToggleButton-root {
    min-width: 88px;
    border: 0;
    border-radius: 999px !important;
    color: #48615d;
    font-size: 12px;
    font-weight: 900;
    line-height: 18px;
    text-transform: none;
  }

  .period_filter .MuiToggleButton-root:hover {
    background-color: rgba(0, 131, 120, 0.08);
  }

  .period_filter .Mui-selected {
    background-color: #008378 !important;
    color: #ffffff !important;
    box-shadow: 0 8px 18px rgba(0, 104, 95, 0.22);
  }

  .analytics_stats { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .analytics_grid { margin-top: 0; }

  .spend_card { min-height: 316px; }
  .category_chart { height: 155px; margin-top: 8px; }
  .category_skeleton { display: block; width: 118px; height: 118px; margin: 14px auto; }
  .category_legend { display: grid; gap: 6px; }
  .category_legend span { display: flex; align-items: center; gap: 7px; color: #5f6f74; font-size: 12px; }
  .category_legend i { width: 8px; height: 8px; border-radius: 50%; }
  .category_legend strong { margin-left: auto; color: #172124; }

  .lower_grid {
    grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.6fr);
  }

  .insight_card {
    min-width: 0;
    padding: 24px;
    border: 1px solid rgba(188, 201, 198, 0.36);
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 5px 18px rgba(23, 29, 28, 0.05);
  }

  .section_header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }

  .section_title,
  .next_trip_title {
    color: #172124;
    font-size: 20px;
    font-weight: 800;
    line-height: 28px;
  }

  .section_copy {
    color: #5f6f74;
    font-size: 13px;
    line-height: 20px;
  }

  .trend_icon { color: #008378; }

  .activity_chart {
    height: 230px;
    margin-top: 16px;

    .recharts-text { fill: #6d7a77; font-size: 12px; }
  }

  .next_trip_card {
    display: flex;
    min-height: 316px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
    background: linear-gradient(145deg, #073d3b, #008378);

    .metric_label,
    .next_trip_title,
    .section_copy { color: #ffffff; }

    .MuiButton-root { margin-top: 12px; color: #ffffff; }
  }

  .dashboard_trip_list {
    display: grid;
    gap: 10px;
    margin-top: 18px;
  }

  .dashboard_trip {
    display: grid;
    grid-template-columns: 68px minmax(0, 1fr) auto;
    align-items: center;
    gap: 14px;
    padding: 8px;
    border-radius: 12px;
    color: inherit;
    text-decoration: none;

    &:hover { background: #f0f5f2; }
  }

  .trip_cover {
    width: 68px;
    height: 52px;
    border-radius: 9px;
    object-fit: cover;
  }

  .trip_title { color: #172124; font-weight: 800; }

  .quick_actions {
    display: grid;
    gap: 10px;
    margin-top: 20px;

    .MuiButton-root { justify-content: flex-start; text-transform: none; }
  }

  .action_count {
    margin-left: auto;
    padding: 2px 7px;
    border-radius: 999px;
    background: rgba(0, 104, 95, 0.12);
    font-size: 12px;
    font-weight: 800;
  }

  .empty_dashboard {
    display: grid;
    gap: 10px;
    place-items: start;
    padding: 20px 0;
  }

  @media (max-width: 899px) {
    .dashboard_grid,
    .lower_grid { grid-template-columns: 1fr; }
    .next_trip_card { min-height: 220px; }
    .analytics_stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .analytics_head { align-items: flex-start; flex-direction: column; }
  }

  @media (max-width: 599px) {
    .analytics_stats { grid-template-columns: 1fr; }
    .period_filter {
      width: 100%;
      overflow-x: auto;
      justify-content: flex-start;
    }

    .period_filter .MuiToggleButton-root {
      min-width: max-content;
      padding: 7px 12px;
      font-size: 11px;
    }
  }

  .stat_icon {
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border-radius: 8px;

    svg {
      width: 32px;
      height: 32px;
    }

    &.primary {
      color: ${({ theme }) => theme.palette.primary.main};
      background-color: rgba(0, 104, 95, 0.1);
    }

    &.tertiary {
      color: ${({ theme }) => theme.palette.secondary.dark};
      background-color: rgba(176, 94, 61, 0.1);
    }

    &.secondary {
      color: ${({ theme }) => theme.palette.secondary.main};
      background-color: rgba(218, 226, 253, 0.45);
    }
  }

  .metric_value {
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 24px;
    font-weight: 800;
    line-height: 32px;
  }

  .spotlight {
    position: relative;
    height: 320px;
    margin-top: 32px;
    overflow: hidden;
    border-radius: 16px;
    box-shadow: 0 16px 38px rgba(23, 29, 28, 0.16);
  }

  .spotlight_img,
  .trip_img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .spotlight_overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(23, 29, 28, 0.82), rgba(23, 29, 28, 0.2), transparent);
  }

  .spotlight_content {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    padding: 32px;

    @media (max-width: 899px) {
      flex-direction: column;
      align-items: flex-start;
      padding: 24px;
    }
  }

  .spotlight_copy {
    gap: 8px;
  }

  .spotlight_tag {
    width: fit-content;
    padding: 4px 16px;
    border-radius: 999px;
    background-color: rgba(0, 104, 95, 0.9);
    color: ${({ theme }) => theme.palette.primary.contrastText};
    font-size: 12px;
    font-weight: 800;
  }

  .spotlight_title {
    color: #ffffff;
    font-size: 48px;
    font-weight: 800;
    line-height: 56px;

    @media (max-width: 599px) {
      font-size: 30px;
      line-height: 38px;
    }
  }

  .spotlight_meta,
  .spotlight_meta_item {
    align-items: center;
    color: rgba(255, 255, 255, 0.9);
    gap: 8px;
  }

  .spotlight_side {
    align-items: flex-end;
    gap: 16px;

    @media (max-width: 899px) {
      align-items: flex-start;
      width: 100%;
    }
  }

  .countdown_card {
    min-width: 180px;
    padding: 16px 24px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
    backdrop-filter: blur(12px);
  }

  .countdown_values {
    justify-content: center;
    gap: 16px;
  }

  .countdown_value {
    display: block;
    color: #ffffff;
    font-size: 24px;
    font-weight: 800;
    line-height: 1;
  }

  .countdown_unit {
    color: rgba(255, 255, 255, 0.72);
    font-size: 10px;
    text-transform: uppercase;
  }

  .open_trip_btn {
    gap: 8px;
    padding: 16px 32px;
    border-radius: 12px;
    background-color: #ffffff;
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: 800;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: rgba(0, 104, 95, 0.94);
      color: #ffffff;
    }
  }

  .section_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 32px;
    margin-bottom: 24px;
  }

  .section_title {
    font-size: 32px;
    font-weight: 800;
    line-height: 40px;
  }

  .view_all_btn {
    gap: 4px;
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: 800;
    text-transform: none;
  }

  .trips_scroller {
    display: flex;
    gap: 24px;
    overflow-x: auto;
    padding-bottom: 24px;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .trip_card {
    min-width: 340px;
    overflow: hidden;
    scroll-snap-align: start;
    transition:
      box-shadow 160ms ease,
      transform 160ms ease;

    &:hover {
      box-shadow: 0 18px 38px rgba(23, 29, 28, 0.12);
      transform: translateY(-2px);
    }
  }

  .trip_media {
    position: relative;
    height: 160px;
  }

  .trip_status {
    position: absolute;
    top: 16px;
    right: 16px;
    padding: 4px 16px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 800;

    &.primary {
      color: #f4fffc;
      background-color: #008378;
    }

    &.secondary {
      color: #5c647a;
      background-color: #dae2fd;
    }

    &.neutral {
      color: #3d4947;
      background-color: #dee4e1;
    }
  }

  .trip_body {
    padding: 24px;
  }

  .trip_title {
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 24px;
    font-weight: 800;
    line-height: 32px;
  }

  .trip_date,
  .progress_label {
    color: #6d7a77;
    font-size: 14px;
    line-height: 20px;
  }

  .trip_footer {
    margin-top: 16px;
    align-items: center;
    justify-content: space-between;
  }

  .avatar_stack {
    flex-direction: row;

    .trip_avatar,
    .avatar_more {
      width: 32px;
      height: 32px;
      margin-left: -10px;
      border: 2px solid ${({ theme }) => theme.palette.background.paper};
      border-radius: 50%;

      &:first-of-type {
        margin-left: 0;
      }
    }
  }

  .trip_avatar {
    object-fit: cover;
  }

  .avatar_more {
    display: grid;
    place-items: center;
    background-color: #dee4e1;
    color: #6d7a77;
    font-size: 10px;
    font-weight: 800;
  }

  .progress_block {
    text-align: right;
  }

  .progress_track {
    width: 96px;
    height: 6px;
    overflow: hidden;
    border-radius: 999px;
    background-color: rgba(188, 201, 198, 0.42);
  }

  .progress_bar {
    height: 100%;
    border-radius: inherit;
    background-color: ${({ theme }) => theme.palette.primary.main};
  }

  .mobile_nav {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 50;
    display: none;
    align-items: center;
    justify-content: space-between;
    padding: 8px 24px;
    border-top: 1px solid rgba(188, 201, 198, 0.3);
    background-color: rgba(245, 250, 248, 0.9);
    backdrop-filter: blur(20px);

    @media (max-width: 899px) {
      display: flex;
    }
  }

  .mobile_nav_link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: ${({ theme }) => theme.palette.text.secondary};
    font-size: 10px;
    font-weight: 800;
    text-decoration: none;

    &.active {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  .mobile_add_wrap {
    position: relative;
    top: -24px;
  }

  .mobile_add_btn {
    min-width: 0;
    padding: 16px;
    border: 4px solid ${({ theme }) => theme.palette.background.default};
    border-radius: 999px;
    box-shadow: 0 14px 26px rgba(0, 104, 95, 0.26);
  }

  .mobile_avatar {
    width: 24px;
    height: 24px;
    border: 1px solid #bcc9c6;
  }

  @media (min-width: 900px) {
    .analytics_grid,
    .lower_grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .dashboard_content { padding-top: 16px; padding-bottom: 16px; }
    .analytics_head { margin-bottom: 12px; }
    .analytics_stats { gap: 12px; }
    .stat_card { gap: 14px; padding: 16px; }
    .stat_icon { width: 40px; height: 40px; }
    .stat_icon svg { width: 24px; height: 24px; }
    .dashboard_grid { gap: 16px; margin-top: 16px; }
    .insight_card { padding: 16px; }
    .activity_chart { height: 230px; margin-top: 14px; }
    .next_trip_card { min-height: 292px; }
    .spend_card { min-height: 350px; }
    .category_chart { height: 190px; margin-top: 10px; }
    .category_legend { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
`;
