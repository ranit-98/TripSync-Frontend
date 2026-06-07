'use client';

import { Box, styled } from '@mui/material';

export const TripItineraryWrapper = styled(Box)`
  display: flex;
  height: 100svh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};

  .trip_sidebar {
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

  .brand_row {
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    padding: 16px 8px;
  }

  .brand_icon {
    display: grid;
    width: 40px;
    height: 40px;
    place-items: center;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }

  .brand_name {
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 24px;
    font-weight: 800;
    line-height: 32px;
  }

  .brand_caption,
  .day_meta,
  .activity_location,
  .feed_time,
  .online_pill,
  .hero_date {
    color: #6d7a77;
    font-size: 12px;
    line-height: 16px;
  }

  .sidebar_nav {
    display: flex;
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
      color 160ms ease;

    &:hover {
      background-color: #e4e9e7;
    }

    &.active {
      color: ${({ theme }) => theme.palette.primary.main};
      background-color: rgba(0, 131, 120, 0.1);
      font-weight: 800;
    }
  }

  .sidebar_bottom {
    margin-top: auto;
  }

  .new_trip_btn {
    gap: 8px;
    width: 100%;
    padding: 16px;
    border-radius: 12px;
    font-weight: 800;
  }

  .logout_link {
    margin-top: 16px;
  }

  .trip_main {
    position: relative;
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    overflow-y: auto;
  }

  .hero {
    position: relative;
    height: 400px;
    flex-shrink: 0;
    overflow: hidden;

    @media (max-width: 599px) {
      height: 460px;
    }
  }

  .hero_img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero_overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0.22), transparent);
  }

  .hero_topbar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
  }

  .glass_icon_btn {
    background-color: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    backdrop-filter: blur(12px);

    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }

  .hero_actions {
    align-items: center;
    gap: 16px;
  }

  .profile_avatar {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border: 2px solid ${({ theme }) => theme.palette.primary.main};
    border-radius: 50%;
    object-fit: cover;
  }

  .hero_content {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    padding: 32px;

    @media (max-width: 599px) {
      padding: 24px 16px;
    }
  }

  .hero_toggle {
    position: absolute;
    right: 24px;
    bottom: 24px;
    z-index: 3;
    border: 1px solid rgba(188, 201, 198, 0.35);
    background-color: rgba(255, 255, 255, 0.84);
    color: #3d4947;
    backdrop-filter: blur(10px);

    &:hover {
      background-color: #ffffff;
    }
  }

  .hero_restore {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 52px;
    border-top: 1px solid rgba(188, 201, 198, 0.25);
    border-bottom: 1px solid rgba(188, 201, 198, 0.25);
    border-radius: 0;
    background-color: rgba(245, 250, 248, 0.94);
    color: #3d4947;
    font-weight: 800;
    text-transform: none;
    backdrop-filter: blur(12px);
  }

  .hero_inner {
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;

    @media (max-width: 899px) {
      align-items: flex-start;
      flex-direction: column;
    }
  }

  .hero_copy {
    max-width: 720px;
    gap: 8px;
  }

  .hero_meta {
    align-items: center;
    gap: 8px;
  }

  .status_pill {
    padding: 4px 16px;
    border: 1px solid rgba(137, 245, 231, 0.32);
    border-radius: 999px;
    background-color: rgba(0, 104, 95, 0.24);
    color: #89f5e7;
    font-size: 12px;
    font-weight: 700;
  }

  .hero_date {
    color: rgba(255, 255, 255, 0.82);
    font-weight: 700;
  }

  .hero_title {
    color: #ffffff;
    font-size: 48px;
    font-weight: 800;
    line-height: 1;

    @media (max-width: 599px) {
      font-size: 34px;
      line-height: 40px;
    }
  }

  .member_actions {
    align-items: center;
    gap: 8px;
    margin-top: 16px;
  }

  .member_stack {
    flex-direction: row;
  }

  .member_avatar,
  .member_more,
  .assignee_avatar,
  .feed_avatar {
    border-radius: 50%;
    object-fit: cover;
  }

  .member_avatar,
  .member_more {
    width: 40px;
    height: 40px;
    margin-left: -12px;
    border: 2px solid ${({ theme }) => theme.palette.background.paper};

    &:first-of-type {
      margin-left: 0;
    }
  }

  .member_more {
    display: grid;
    place-items: center;
    background-color: #dee4e1;
    color: ${({ theme }) => theme.palette.text.secondary};
    font-size: 12px;
    font-weight: 800;
  }

  .invite_btn {
    gap: 4px;
    padding: 8px 16px;
    border-radius: 999px;
    background-color: #ffffff;
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: 800;

    &:hover {
      background-color: #f4fffc;
    }
  }

  .tab_bar {
    position: sticky;
    top: 0;
    z-index: 30;
    border-bottom: 1px solid rgba(188, 201, 198, 0.3);
    background-color: rgba(245, 250, 248, 0.84);
    backdrop-filter: blur(20px);
  }

  .tab_inner {
    display: flex;
    width: min(100%, 1280px);
    margin-right: auto;
    margin-left: auto;
    align-items: center;
    gap: 32px;
    overflow-x: auto;
    padding: 0 32px;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .tab_btn {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 4px;
    padding: 16px 0;
    border-bottom: 2px solid transparent;
    color: ${({ theme }) => theme.palette.text.secondary};
    font-weight: 800;
    text-transform: none;

    &.active {
      border-bottom-color: ${({ theme }) => theme.palette.primary.main};
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  .content_area {
    flex: 1;
    padding: 32px;

    @media (max-width: 599px) {
      padding: 20px 16px 96px;
    }
  }

  .content_grid {
    display: grid;
    width: min(100%, 1280px);
    margin-right: auto;
    margin-left: auto;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 32px;
  }

  .itinerary_col {
    grid-column: span 8;

    @media (max-width: 1199px) {
      grid-column: span 12;
    }
  }

  .feed_col {
    grid-column: span 4;

    @media (max-width: 1199px) {
      grid-column: span 12;
    }
  }

  .day_card,
  .live_card {
    overflow: hidden;
    border: 1px solid rgba(188, 201, 198, 0.3);
    border-radius: 16px;
    background-color: ${({ theme }) => theme.palette.background.paper};
    box-shadow: 0 6px 20px rgba(23, 29, 28, 0.05);
  }

  .day_card:not(:last-child) {
    margin-bottom: 24px;
  }

  .day_header {
    align-items: center;
    justify-content: space-between;
    padding: 24px;
    cursor: pointer;
  }

  .day_header.expanded {
    background-color: #f0f5f2;
  }

  .day_title_group {
    align-items: center;
    gap: 16px;
  }

  .date_badge {
    display: flex;
    width: 48px;
    height: 48px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background-color: #eaefed;
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  .date_badge.active {
    background-color: #008378;
    color: #f4fffc;
  }

  .date_month {
    font-size: 12px;
    font-weight: 800;
    line-height: 16px;
    text-transform: uppercase;
  }

  .date_day {
    font-size: 24px;
    font-weight: 800;
    line-height: 1;
  }

  .day_title {
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 24px;
    font-weight: 800;
    line-height: 32px;
  }

  .activities {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
  }

  .activity_card {
    position: relative;
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 16px;
    overflow: hidden;
    border: 1px solid rgba(188, 201, 198, 0.2);
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(23, 29, 28, 0.04);
    transition: box-shadow 160ms ease;

    &:hover {
      box-shadow: 0 10px 24px rgba(23, 29, 28, 0.09);
    }

    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 4px;
      border-radius: 4px 0 0 4px;
      content: '';
    }

    &.flight::before {
      background-color: #3b82f6;
    }

    &.hotel::before {
      background-color: #10b981;
    }

    &.food::before {
      background-color: #ef4444;
    }

    @media (max-width: 599px) {
      align-items: flex-start;
      gap: 14px;
    }
  }

  .drag_icon {
    color: #bcc9c6;
    cursor: grab;
  }

  .activity_icon {
    display: grid;
    width: 48px;
    height: 48px;
    flex: 0 0 48px;
    place-items: center;
    border-radius: 8px;
  }

  .activity_icon.flight {
    background-color: #eff6ff;
    color: #2563eb;
  }

  .activity_icon.hotel {
    background-color: #ecfdf5;
    color: #059669;
  }

  .activity_icon.food {
    background-color: #fef2f2;
    color: #dc2626;
  }

  .activity_main {
    min-width: 0;
    flex: 1;
  }

  .activity_top {
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }

  .activity_title {
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 16px;
    font-weight: 800;
  }

  .time_badge {
    flex-shrink: 0;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 800;
  }

  .time_badge.flight {
    background-color: #eff6ff;
    color: #2563eb;
  }

  .time_badge.hotel {
    background-color: #ecfdf5;
    color: #059669;
  }

  .time_badge.food {
    background-color: #fef2f2;
    color: #dc2626;
  }

  .activity_location {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 4px;
  }

  .assignee_avatar {
    width: 32px;
    height: 32px;
    border: 2px solid #ffffff;
    box-shadow: 0 4px 10px rgba(23, 29, 28, 0.14);
  }

  .add_activity_btn {
    gap: 4px;
    padding: 16px;
    border: 2px dashed rgba(188, 201, 198, 0.36);
    border-radius: 12px;
    color: #6d7a77;
    font-weight: 800;
    text-transform: none;

    &:hover {
      border-color: ${({ theme }) => theme.palette.primary.main};
      color: ${({ theme }) => theme.palette.primary.main};
      background-color: transparent;
    }
  }

  .add_day_btn {
    width: 100%;
    margin-top: 18px;
    padding: 16px;
    border: 2px dashed rgba(0, 104, 95, 0.28);
    border-radius: 16px;
    background-color: rgba(0, 104, 95, 0.04);
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: 800;
    text-transform: none;
  }

  .live_card {
    position: sticky;
    top: 88px;
    padding: 24px;
  }

  .live_header {
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  .live_title {
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 24px;
    font-weight: 800;
  }

  .online_pill {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 16px;
    border: 1px solid #d1fae5;
    border-radius: 999px;
    background-color: #ecfdf5;
    color: #047857;
    font-weight: 800;
  }

  .online_dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #10b981;
  }

  .feed_list {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 32px;

    &::before {
      position: absolute;
      top: 8px;
      bottom: 0;
      left: 19px;
      width: 2px;
      background-color: #e4e9e7;
      content: '';
    }
  }

  .feed_item {
    position: relative;
    display: flex;
    gap: 16px;
  }

  .feed_avatar_wrap {
    position: relative;
    z-index: 1;
    padding: 4px;
    background-color: #ffffff;
  }

  .feed_avatar,
  .feed_icon {
    width: 32px;
    height: 32px;
  }

  .feed_icon {
    display: grid;
    place-items: center;
    border-radius: 50%;
    background-color: #dae2fd;
    color: #5c647a;
  }

  .feed_text {
    font-size: 16px;
    line-height: 24px;
  }

  .feed_actor {
    color: ${({ theme }) => theme.palette.text.primary};
    font-weight: 800;
  }

  .feed_highlight {
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: 800;
  }

  .feed_note {
    margin-top: 4px;
    color: #6d7a77;
    font-size: 12px;
    font-style: italic;
    line-height: 16px;
  }

  .view_activity_btn {
    width: 100%;
    margin-top: 32px;
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: 800;
    text-transform: none;
  }

  .empty_panel {
    display: grid;
    min-height: 260px;
    place-items: center;
    gap: 8px;
    padding: 32px;
    border: 1px solid rgba(188, 201, 198, 0.3);
    border-radius: 16px;
    background-color: #ffffff;
    text-align: center;
    box-shadow: 0 6px 20px rgba(23, 29, 28, 0.05);
  }

  .empty_title {
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 22px;
    font-weight: 800;
    line-height: 30px;
  }

  .empty_copy,
  .empty_inline {
    color: #6d7a77;
    font-size: 14px;
    line-height: 20px;
  }

  .empty_inline {
    padding: 16px;
    border: 1px dashed rgba(188, 201, 198, 0.4);
    border-radius: 12px;
    background-color: #f8fbfa;
    text-align: center;
  }

  .mobile_fab {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 50;
    display: none;
    width: 56px;
    min-width: 56px;
    height: 56px;
    border-radius: 50%;
    box-shadow: 0 18px 34px rgba(0, 104, 95, 0.28);

    @media (max-width: 899px) {
      display: inline-flex;
    }
  }

  .tab_page {
    position: relative;
    flex: 1;
    min-height: 0;
  }

  .padded_page {
    width: min(100%, 1280px);
    margin: 0 auto;
    padding: 32px;

    @media (max-width: 599px) {
      padding: 20px 16px 96px;
    }
  }

  .budget_banner,
  .expense_table,
  .summary_panel,
  .insight_card,
  .placeholder_panel {
    border: 1px solid rgba(188, 201, 198, 0.35);
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 6px 20px rgba(23, 29, 28, 0.06);
  }

  .budget_banner {
    position: relative;
    overflow: hidden;
    margin-bottom: 28px;
    padding: 32px;

    &::after {
      position: absolute;
      inset: 0 0 0 auto;
      width: 280px;
      background: linear-gradient(270deg, rgba(0, 104, 95, 0.08), transparent);
      content: '';
      pointer-events: none;
    }
  }

  .banner_toggle {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 1;
    color: #6d7a77;
  }

  .budget_restore {
    margin-bottom: 20px;
    border: 1px dashed rgba(188, 201, 198, 0.55);
    border-radius: 12px;
    color: #3d4947;
    font-weight: 800;
    text-transform: none;
  }

  .budget_content {
    position: relative;
    z-index: 1;
    align-items: flex-end;
    justify-content: space-between;
    gap: 32px;

    @media (max-width: 899px) {
      align-items: flex-start;
      flex-direction: column;
    }
  }

  .eyebrow {
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    line-height: 16px;
    text-transform: uppercase;
  }

  .budget_amount {
    align-items: baseline;
    gap: 10px;
    margin-top: 8px;

    h2 {
      color: ${({ theme }) => theme.palette.primary.main};
      font-size: 48px;
      font-weight: 800;
      line-height: 56px;

      @media (max-width: 599px) {
        font-size: 34px;
        line-height: 42px;
      }
    }

    span {
      color: #3d4947;
      font-size: 16px;
    }
  }

  .budget_progress {
    width: min(100%, 420px);

    .MuiStack-root,
    > div:first-of-type {
      align-items: center;
      justify-content: space-between;
      color: #3d4947;
      font-size: 12px;
      font-weight: 800;
    }

    strong {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  .progress_track {
    height: 12px;
    margin-top: 8px;
    overflow: hidden;
    border-radius: 999px;
    background-color: #eaefed;

    span {
      display: block;
      height: 100%;
      border-radius: inherit;
      background-color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  .expense_grid {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(320px, 0.95fr);
    gap: 24px;

    @media (max-width: 1099px) {
      grid-template-columns: 1fr;
    }
  }

  .expense_list,
  .settlement_summary {
    min-width: 0;
  }

  .section_row {
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding: 0 8px;
  }

  .section_heading {
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 24px;
    font-weight: 800;
    line-height: 32px;
  }

  .plain_action {
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: 800;
    text-transform: none;
  }

  .expense_table {
    overflow-x: auto;
  }

  .expense_row {
    display: grid;
    grid-template-columns: minmax(250px, 1.4fr) minmax(110px, 0.55fr) minmax(90px, 0.45fr) minmax(130px, 0.65fr) minmax(130px, 0.7fr);
    align-items: center;
    min-width: 820px;
    min-height: 86px;
    border-bottom: 1px solid rgba(188, 201, 198, 0.24);

    > * {
      padding: 0 24px;
    }

    &:last-child {
      border-bottom: 0;
    }
  }

  .expense_head {
    min-height: 56px;
    background-color: #f0f5f2;
    color: #3d4947;
    font-size: 13px;
    font-weight: 800;
  }

  .expense_desc {
    align-items: center;
    gap: 16px;

    strong {
      display: block;
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 15px;
    }

    span {
      display: block;
      color: #6d7a77;
      font-size: 12px;
    }
  }

  .expense_icon {
    display: grid;
    width: 42px;
    height: 42px;
    flex: 0 0 42px;
    place-items: center;
    border-radius: 8px;

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
      background-color: #dae2fd;
    }
  }

  .paid_avatar,
  .mini_avatar,
  .mini_more,
  .person_avatar {
    border-radius: 50%;
  }

  .paid_avatar {
    width: 34px;
    height: 34px;
    object-fit: cover;
  }

  .mini_stack {
    align-items: center;
  }

  .mini_avatar,
  .mini_more {
    width: 28px;
    height: 28px;
    margin-left: -8px;
    border: 2px solid #ffffff;

    &:first-of-type {
      margin-left: 0;
    }
  }

  .mini_avatar {
    object-fit: cover;
  }

  .mini_more {
    display: grid;
    place-items: center;
    background-color: #dee4e1;
    color: #3d4947;
    font-size: 10px;
    font-weight: 800;
  }

  .muted_text {
    color: #6d7a77;
    font-size: 13px;
  }

  .summary_panel {
    margin-top: 16px;
    padding: 24px;
  }

  .balance_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    border-radius: 8px;
    padding: 16px;

    &.positive {
      border: 1px solid rgba(0, 131, 120, 0.12);
      background-color: rgba(0, 131, 120, 0.05);
    }

    &.warning {
      margin-top: 12px;
      border: 1px solid rgba(176, 94, 61, 0.12);
      background-color: rgba(176, 94, 61, 0.05);
    }
  }

  .person_avatar {
    width: 42px;
    height: 42px;
    object-fit: cover;
  }

  .balance_copy {
    min-width: 0;
    flex: 1;

    strong,
    span {
      display: block;
    }

    strong {
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 14px;
    }

    span {
      color: #6d7a77;
      font-size: 12px;
    }
  }

  .balance_amount {
    text-align: right;

    strong,
    span {
      display: block;
    }

    strong {
      color: ${({ theme }) => theme.palette.primary.main};
      font-size: 18px;
    }

    span {
      width: fit-content;
      margin-left: auto;
      border-radius: 999px;
      background-color: rgba(0, 104, 95, 0.1);
      color: ${({ theme }) => theme.palette.primary.main};
      padding: 2px 8px;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
    }

    &.warning {
      strong {
        color: #924628;
      }

      span {
        background-color: rgba(146, 70, 40, 0.1);
        color: #924628;
      }
    }
  }

  .net_balance {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid rgba(188, 201, 198, 0.32);

    span {
      color: #3d4947;
    }

    strong {
      color: ${({ theme }) => theme.palette.primary.main};
      font-size: 24px;
    }
  }

  .primary_wide,
  .outline_wide {
    width: 100%;
    min-height: 48px;
    margin-top: 14px;
    border-radius: 12px;
    font-weight: 800;
    text-transform: none;
  }

  .primary_wide {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: #ffffff;
  }

  .outline_wide {
    border: 1px solid ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.main};
  }

  .insight_card {
    display: flex;
    gap: 16px;
    margin-top: 16px;
    padding: 24px;
    background-color: #dae2fd;
    color: #5c647a;

    > span {
      display: grid;
      width: 48px;
      height: 48px;
      flex: 0 0 48px;
      place-items: center;
      border-radius: 50%;
      background-color: #ffffff;
    }

    strong {
      display: block;
      color: #131b2e;
      font-size: 15px;
    }

    p {
      margin: 4px 0 0;
      font-size: 12px;
      line-height: 18px;
    }
  }

  .round_fab {
    position: fixed;
    right: 32px;
    bottom: 32px;
    z-index: 40;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: #ffffff;
    box-shadow: 0 16px 30px rgba(0, 104, 95, 0.28);
  }

  .expense_modal_overlay {
    position: fixed;
    inset: 0;
    z-index: 130;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background-color: rgba(23, 29, 28, 0.28);
    backdrop-filter: blur(8px);
  }

  .expense_modal {
    display: flex;
    width: min(100%, 720px);
    max-height: min(92vh, 820px);
    flex-direction: column;
    overflow: hidden;
    border: 1px solid rgba(188, 201, 198, 0.45);
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.94);
    box-shadow: 0 24px 48px rgba(23, 29, 28, 0.2);
    backdrop-filter: blur(20px);
  }

  .expense_modal_header,
  .expense_modal_footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 24px;
  }

  .expense_modal_header {
    border-bottom: 1px solid rgba(188, 201, 198, 0.28);

    h3 {
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 24px;
      font-weight: 800;
      line-height: 32px;
    }

    p {
      color: #6d7a77;
      font-size: 14px;
      line-height: 20px;
    }
  }

  .expense_modal_body {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 18px;
    row-gap: 16px;
    overflow-y: auto;
    padding: 24px;

    .MuiOutlinedInput-root {
      border-radius: 8px;
      background-color: #f5faf8;
    }

    .MuiInputBase-input,
    .MuiSelect-select {
      min-height: 24px;
      padding-top: 13px;
      padding-bottom: 13px;
    }

    .MuiFormHelperText-root {
      margin-left: 0;
      font-weight: 700;
    }
  }

  .expense_field.full {
    grid-column: 1 / -1;
  }

  .expense_select_option {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .expense_modal_label {
    display: block;
    margin-bottom: 8px;
    color: #6d7a77;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.06em;
    line-height: 16px;
    text-transform: uppercase;
  }

  .split_member_grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
  }

  .split_member {
    position: relative;
    display: flex;
    min-height: 78px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 10px;
    border: 1px solid #bcc9c6;
    border-radius: 8px;
    background-color: #f5faf8;
    color: #3d4947;
    cursor: pointer;
    font-size: 12px;
    font-weight: 800;
    text-align: center;
    transition:
      border-color 160ms ease,
      background-color 160ms ease,
      color 160ms ease;

    input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }

    &.active {
      border-color: ${({ theme }) => theme.palette.primary.main};
      background-color: rgba(0, 131, 120, 0.1);
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  .split_avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .expense_error {
    display: block;
    margin-top: 6px;
  }

  .expense_modal_footer {
    justify-content: flex-end;
    border-top: 1px solid rgba(188, 201, 198, 0.28);
    background-color: #f0f5f2;

    .MuiButton-root {
      min-width: 120px;
      border-radius: 8px;
      font-weight: 800;
    }
  }

  .map_canvas {
    position: relative;
    flex: 1;
    min-height: 640px;
    overflow: hidden;
    background-color: #e5e7eb;
  }

  .map_image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(20%);
    opacity: 0.64;
  }

  .route_svg {
    position: absolute;
    inset: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    pointer-events: none;

    path {
      fill: none;
      stroke: #006a61;
      stroke-dasharray: 8 8;
      stroke-width: 4;
      opacity: 0.6;
    }
  }

  .map_marker {
    position: absolute;
    z-index: 3;
    transform: translate(-50%, -50%);

    > span {
      display: grid;
      width: 40px;
      height: 40px;
      place-items: center;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.palette.primary.main};
      color: #ffffff;
      font-weight: 800;
      box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
    }

    &:hover .marker_popover {
      opacity: 1;
      transform: translate(-50%, -8px);
    }
  }

  .marker_popover,
  .route_panel,
  .weather_badge,
  .map_controls .MuiIconButton-root {
    border: 1px solid rgba(188, 201, 198, 0.3);
    background-color: rgba(255, 255, 255, 0.82);
    box-shadow: 0 12px 30px rgba(23, 29, 28, 0.16);
    backdrop-filter: blur(16px);
  }

  .marker_popover {
    position: absolute;
    bottom: 46px;
    left: 50%;
    min-width: 240px;
    border-radius: 12px;
    padding: 10px 14px;
    opacity: 0;
    transform: translate(-50%, 0);
    transition:
      opacity 160ms ease,
      transform 160ms ease;

    strong,
    small {
      display: block;
    }

    strong {
      color: ${({ theme }) => theme.palette.primary.main};
      font-size: 13px;
    }

    small {
      color: #3d4947;
    }
  }

  .route_panel {
    position: absolute;
    top: 24px;
    bottom: 24px;
    left: 24px;
    z-index: 4;
    display: flex;
    width: 320px;
    flex-direction: column;
    overflow: hidden;
    border-radius: 16px;

    @media (max-width: 899px) {
      right: 16px;
      bottom: auto;
      left: 16px;
      width: auto;
      max-height: 430px;
    }
  }

  .route_header {
    padding: 24px;
    border-bottom: 1px solid rgba(188, 201, 198, 0.28);

    h2 {
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 24px;
      font-weight: 800;
    }

    p {
      color: #3d4947;
      font-size: 13px;
    }

    span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-top: 16px;
      color: ${({ theme }) => theme.palette.primary.main};
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
    }
  }

  .route_list {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
  }

  .route_stop {
    display: flex;
    gap: 14px;
    border: 1px solid rgba(188, 201, 198, 0.16);
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.62);
    padding: 14px;

    &:not(:last-of-type) {
      margin-bottom: 12px;
    }

    strong {
      display: block;
      color: ${({ theme }) => theme.palette.text.primary};
    }

    small {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 4px;
      color: #3d4947;
    }
  }

  .stop_rail {
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      display: grid;
      width: 32px;
      height: 32px;
      place-items: center;
      border-radius: 50%;
      background-color: #008378;
      color: #f4fffc;
      font-size: 12px;
      font-weight: 800;
    }

    i {
      width: 2px;
      flex: 1;
      margin-top: 4px;
      background-color: rgba(188, 201, 198, 0.5);
    }
  }

  .add_location_btn {
    width: 100%;
    min-height: 48px;
    border: 2px dashed rgba(188, 201, 198, 0.45);
    border-radius: 12px;
    color: #6d7a77;
    font-weight: 800;
    text-transform: none;
  }

  .optimize_btn {
    min-height: 52px;
    margin: 16px;
    border-radius: 12px;
    background-color: #565e74;
    color: #ffffff;
    font-weight: 800;
    text-transform: none;
  }

  .weather_badge {
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 4;
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 999px;
    padding: 10px 18px;

    svg {
      color: #924628;
    }

    span {
      color: #3d4947;
      font-size: 12px;
      font-weight: 700;
    }

    @media (max-width: 899px) {
      display: none;
    }
  }

  .map_controls {
    position: absolute;
    right: 24px;
    bottom: 24px;
    z-index: 4;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .MuiIconButton-root {
      border-radius: 12px;
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  .chat_shell {
    display: flex;
    flex: 1;
    min-height: 0;
    overflow: hidden;
    background-color: rgba(240, 245, 242, 0.48);

    @media (max-width: 899px) {
      flex-direction: column;
      overflow-y: auto;
    }
  }

  .chat_members {
    display: flex;
    width: 320px;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
    border-right: 1px solid rgba(188, 201, 198, 0.3);
    padding: 24px;

    @media (max-width: 899px) {
      width: 100%;
      max-height: 270px;
      border-right: 0;
      border-bottom: 1px solid rgba(188, 201, 198, 0.3);
    }
  }

  .member_list {
    gap: 8px;
  }

  .chat_member {
    align-items: center;
    gap: 14px;
    border-radius: 12px;
    padding: 12px;

    &.active {
      border: 1px solid rgba(188, 201, 198, 0.24);
      background-color: #ffffff;
      box-shadow: 0 4px 12px rgba(23, 29, 28, 0.05);
    }

    strong,
    small {
      display: block;
    }

    small {
      color: #6d7a77;
      font-size: 12px;
    }

    &.active small {
      color: ${({ theme }) => theme.palette.primary.main};
      font-weight: 800;
    }
  }

  .chat_avatar_wrap {
    position: relative;
  }

  .chat_avatar,
  .message_avatar,
  .typing_avatar {
    border-radius: 50%;
    object-fit: cover;
  }

  .chat_avatar {
    width: 48px;
    height: 48px;

    &.away {
      filter: grayscale(100%);
    }
  }

  .chat_avatar_wrap > span {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 13px;
    height: 13px;
    border: 2px solid #ffffff;
    border-radius: 50%;

    &.online {
      background-color: #22c55e;
    }

    &.away {
      background-color: #bcc9c6;
    }
  }

  .invite_member_btn {
    margin-top: auto;
    min-height: 48px;
    border: 2px dashed rgba(188, 201, 198, 0.45);
    border-radius: 12px;
    color: #6d7a77;
    font-weight: 800;
    text-transform: none;
  }

  .chat_window {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.52);
  }

  .messages {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 24px;
    overflow-y: auto;
    padding: 24px;
  }

  .date_chip {
    align-self: center;
    border-radius: 999px;
    background-color: #e4e9e7;
    color: #3d4947;
    padding: 4px 14px;
    font-size: 12px;
    font-weight: 700;
  }

  .message {
    display: flex;
    max-width: min(78%, 760px);
    gap: 12px;

    small {
      display: block;
      margin: 0 0 4px 4px;
      color: #6d7a77;
      font-size: 12px;
    }

    p {
      margin: 0;
      border-radius: 18px;
      padding: 14px 16px;
      line-height: 24px;
    }

    &.incoming p {
      border: 1px solid rgba(188, 201, 198, 0.24);
      border-bottom-left-radius: 4px;
      background-color: #ffffff;
      color: ${({ theme }) => theme.palette.text.primary};
      box-shadow: 0 2px 4px rgba(23, 29, 28, 0.06);
    }

    &.outgoing {
      align-self: flex-end;
      flex-direction: column;
      align-items: flex-end;

      p {
        border-bottom-right-radius: 4px;
        background-color: ${({ theme }) => theme.palette.primary.main};
        color: #ffffff;
        box-shadow: 0 6px 14px rgba(0, 104, 95, 0.16);
      }
    }
  }

  .message_avatar {
    width: 32px;
    height: 32px;
    align-self: flex-end;
  }

  .media_message {
    width: min(460px, 78%);
    margin-left: 44px;
    border: 1px solid rgba(188, 201, 198, 0.24);
    border-radius: 18px;
    border-bottom-left-radius: 4px;
    background-color: #ffffff;
    padding: 8px;
    box-shadow: 0 2px 4px rgba(23, 29, 28, 0.06);

    img {
      width: 100%;
      height: 190px;
      border-radius: 12px;
      object-fit: cover;
    }

    .MuiStack-root {
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 4px 2px;
    }

    span {
      color: ${({ theme }) => theme.palette.primary.main};
      font-weight: 800;
    }
  }

  .typing_row {
    display: flex;
    align-items: center;
    gap: 10px;

    span {
      border-radius: 999px;
      background-color: #f0f5f2;
      color: #6d7a77;
      padding: 8px 14px;
      font-size: 12px;
      font-style: italic;
    }
  }

  .typing_avatar {
    width: 24px;
    height: 24px;
  }

  .message_input {
    border-top: 1px solid rgba(188, 201, 198, 0.3);
    background-color: rgba(255, 255, 255, 0.82);
    padding: 18px 24px;
    backdrop-filter: blur(16px);

    textarea {
      width: 100%;
      min-height: 46px;
      resize: none;
      border: 1px solid rgba(188, 201, 198, 0.7);
      border-radius: 16px;
      background-color: #ffffff;
      color: ${({ theme }) => theme.palette.text.primary};
      font: inherit;
      outline: none;
      padding: 12px 16px;
    }
  }

  .input_actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 8px;

    .MuiIconButton-root {
      color: #6d7a77;
    }
  }

  .send_btn {
    border-radius: 12px;
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: #ffffff;
    font-weight: 800;
    padding: 8px 24px;
    text-transform: none;
  }

  .files_header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 24px;
  }

  .files_subtitle {
    margin-top: 6px;
    color: #6d7a77;
    font-size: 14px;
    line-height: 22px;
  }

  .files_actions {
    gap: 12px;
    white-space: nowrap;

    .MuiButton-root {
      border-radius: 8px;
      font-weight: 800;
    }
  }

  .trip_gallery_showcase {
    position: relative;
    min-height: 380px;
    overflow: hidden;
    margin-bottom: 28px;
    border-radius: 12px;
    background-color: #172124;
    box-shadow: 0 18px 38px rgba(23, 29, 28, 0.14);
  }

  .trip_gallery_cover {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .trip_gallery_overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(23, 29, 28, 0.88), rgba(23, 29, 28, 0.36), transparent);
  }

  .trip_gallery_content {
    position: relative;
    z-index: 2;
    display: flex;
    width: min(100%, 620px);
    min-height: inherit;
    flex-direction: column;
    justify-content: flex-end;
    gap: 12px;
    padding: 32px;

    > span {
      width: fit-content;
      padding: 5px 14px;
      border-radius: 999px;
      background-color: rgba(137, 245, 231, 0.16);
      color: #89f5e7;
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
    }

    h2 {
      color: #ffffff;
      font-size: 42px;
      font-weight: 800;
      line-height: 50px;
    }

    p {
      color: rgba(255, 255, 255, 0.82);
      font-size: 15px;
      line-height: 24px;
    }

    .MuiButton-root {
      width: fit-content;
      margin-top: 8px;
      border-radius: 8px;
      font-weight: 800;
    }
  }

  .trip_gallery_strip {
    position: absolute;
    right: 24px;
    bottom: 24px;
    z-index: 2;
    display: grid;
    width: min(36%, 430px);
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;

    img {
      width: 100%;
      aspect-ratio: 1;
      border: 2px solid rgba(255, 255, 255, 0.58);
      border-radius: 10px;
      object-fit: cover;
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
    }
  }

  .trip_gallery_toolbar {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 18px;

    .MuiButton-root {
      border-radius: 8px;
      font-weight: 800;
    }
  }

  .trip_gallery_grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
  }

  .trip_gallery_card {
    overflow: hidden;
    border: 1px solid rgba(188, 201, 198, 0.35);
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 6px 20px rgba(23, 29, 28, 0.06);

    img {
      display: block;
      width: 100%;
      aspect-ratio: 4 / 3;
      object-fit: cover;
    }

    > div {
      padding: 14px 16px;
    }

    strong,
    span {
      display: block;
    }

    strong {
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 14px;
      font-weight: 800;
      line-height: 20px;
    }

    span {
      color: #6d7a77;
      font-size: 13px;
      line-height: 20px;
    }
  }

  .add_photo_overlay {
    position: fixed;
    inset: 0;
    z-index: 140;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background-color: rgba(23, 29, 28, 0.28);
    backdrop-filter: blur(8px);
  }

  .add_photo_modal {
    display: flex;
    width: min(100%, 560px);
    max-height: min(92vh, 760px);
    flex-direction: column;
    overflow: hidden;
    border: 1px solid rgba(188, 201, 198, 0.45);
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.96);
    box-shadow: 0 24px 48px rgba(23, 29, 28, 0.2);
  }

  .add_photo_header,
  .add_photo_footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 24px;
  }

  .add_photo_header {
    border-bottom: 1px solid rgba(188, 201, 198, 0.28);

    h3 {
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 24px;
      font-weight: 800;
      line-height: 32px;
    }

    p {
      color: #6d7a77;
      font-size: 14px;
      line-height: 20px;
    }
  }

  .add_photo_body {
    display: grid;
    gap: 18px;
    overflow-y: auto;
    padding: 24px;
  }

  .photo_dropzone {
    display: grid;
    min-height: 172px;
    place-items: center;
    gap: 8px;
    border: 1px dashed rgba(0, 104, 95, 0.42);
    border-radius: 12px;
    background-color: rgba(0, 131, 120, 0.06);
    color: ${({ theme }) => theme.palette.primary.main};
    text-align: center;
    text-transform: none;

    svg {
      width: 38px;
      height: 38px;
    }

    strong,
    span {
      display: block;
    }

    strong {
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 18px;
      font-weight: 800;
    }

    span {
      color: #6d7a77;
      font-size: 13px;
    }
  }

  .add_photo_footer {
    justify-content: flex-end;
    border-top: 1px solid rgba(188, 201, 198, 0.28);
    background-color: #f0f5f2;

    .MuiButton-root {
      min-width: 120px;
      border-radius: 8px;
      font-weight: 800;
    }
  }

  .files_grid {
    display: grid;
    grid-template-columns: 360px minmax(0, 1fr);
    gap: 24px;
  }

  .folder_panel,
  .documents_panel {
    border: 1px solid rgba(188, 201, 198, 0.35);
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 6px 20px rgba(23, 29, 28, 0.06);
  }

  .folder_panel {
    overflow: hidden;
  }

  .folder_panel_header,
  .documents_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 24px;
    border-bottom: 1px solid rgba(188, 201, 198, 0.24);
    background-color: #f0f5f2;

    h3 {
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 20px;
      font-weight: 800;
      line-height: 28px;
    }

    span,
    p {
      color: #6d7a77;
      font-size: 13px;
      line-height: 20px;
    }
  }

  .folder_list {
    display: grid;
    gap: 10px;
    padding: 16px;
  }

  .folder_card {
    display: grid;
    grid-template-columns: 46px minmax(0, 1fr) auto;
    align-items: center;
    justify-content: stretch;
    gap: 12px;
    padding: 14px;
    border: 1px solid transparent;
    border-radius: 10px;
    background-color: #f5faf8;
    color: inherit;
    text-align: left;
    text-transform: none;

    &:hover,
    &.active {
      border-color: rgba(0, 104, 95, 0.35);
      background-color: rgba(0, 131, 120, 0.08);
    }
  }

  .folder_icon {
    display: grid;
    width: 46px;
    height: 46px;
    place-items: center;
    border-radius: 10px;
    background-color: #dae2fd;
    color: #565e74;
  }

  .folder_card.active .folder_icon {
    background-color: rgba(0, 104, 95, 0.12);
    color: ${({ theme }) => theme.palette.primary.main};
  }

  .folder_copy {
    min-width: 0;

    strong,
    span,
    small {
      display: block;
    }

    strong {
      overflow: hidden;
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 14px;
      font-weight: 800;
      line-height: 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    span,
    small {
      color: #6d7a77;
      font-size: 12px;
      line-height: 18px;
    }
  }

  .folder_count {
    text-align: right;

    strong,
    span {
      display: block;
    }

    strong {
      color: ${({ theme }) => theme.palette.primary.main};
      font-size: 18px;
      font-weight: 800;
      line-height: 24px;
    }

    span {
      color: #6d7a77;
      font-size: 11px;
      line-height: 16px;
    }
  }

  .documents_panel {
    overflow: hidden;
  }

  .documents_header .MuiButton-root {
    border-radius: 8px;
    font-weight: 800;
  }

  .scan_dropzone {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 20px 24px;
    padding: 18px;
    border: 1px dashed rgba(0, 104, 95, 0.38);
    border-radius: 10px;
    background-color: rgba(0, 131, 120, 0.06);
    color: ${({ theme }) => theme.palette.primary.main};

    svg {
      width: 34px;
      height: 34px;
    }

    strong,
    span {
      display: block;
    }

    strong {
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 15px;
      font-weight: 800;
      line-height: 22px;
    }

    span {
      color: #6d7a77;
      font-size: 13px;
      line-height: 20px;
    }
  }

  .document_table {
    overflow-x: auto;
  }

  .document_row {
    display: grid;
    grid-template-columns: minmax(280px, 1fr) minmax(220px, 0.7fr);
    align-items: center;
    min-width: 560px;
    min-height: 76px;
    border-top: 1px solid rgba(188, 201, 198, 0.24);

    > * {
      padding: 0 20px;
    }
  }

  .document_head {
    min-height: 52px;
    background-color: #f0f5f2;
    color: #3d4947;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .document_name {
    align-items: center;
    gap: 12px;

    strong,
    small {
      display: block;
    }

    strong {
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 14px;
      font-weight: 800;
      line-height: 20px;
    }

    small {
      color: #6d7a77;
      font-size: 12px;
      line-height: 18px;
    }
  }

  .document_icon {
    display: grid;
    width: 42px;
    height: 42px;
    flex: 0 0 42px;
    place-items: center;
    border-radius: 8px;
    background-color: rgba(0, 104, 95, 0.1);
    color: ${({ theme }) => theme.palette.primary.main};
  }

  .document_modal_overlay {
    position: fixed;
    inset: 0;
    z-index: 140;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background-color: rgba(23, 29, 28, 0.28);
    backdrop-filter: blur(8px);
  }

  .document_modal {
    display: flex;
    width: min(100%, 520px);
    max-height: min(92vh, 720px);
    flex-direction: column;
    overflow: hidden;
    border: 1px solid rgba(188, 201, 198, 0.45);
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.96);
    box-shadow: 0 24px 48px rgba(23, 29, 28, 0.2);
  }

  .document_modal_header,
  .document_modal_footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 24px;
  }

  .document_modal_header {
    border-bottom: 1px solid rgba(188, 201, 198, 0.28);

    h3 {
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 24px;
      font-weight: 800;
      line-height: 32px;
    }

    p {
      color: #6d7a77;
      font-size: 14px;
      line-height: 20px;
    }
  }

  .document_modal_body {
    display: grid;
    gap: 18px;
    overflow-y: auto;
    padding: 24px;

    .MuiOutlinedInput-root {
      border-radius: 8px;
      background-color: #f5faf8;
    }
  }

  .itinerary_modal_body {
    .form_field_header {
      margin-bottom: 8px;
    }

    .form_field_label,
    .form_label {
      color: #6d7a77;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.06em;
      line-height: 16px;
      text-transform: uppercase;
    }
  }

  .itinerary_time_grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;

    @media (max-width: 560px) {
      grid-template-columns: 1fr;
    }
  }

  .document_file_dropzone {
    display: grid;
    min-height: 150px;
    place-items: center;
    gap: 8px;
    border: 1px dashed rgba(0, 104, 95, 0.42);
    border-radius: 12px;
    background-color: rgba(0, 131, 120, 0.06);
    color: ${({ theme }) => theme.palette.primary.main};
    text-align: center;
    text-transform: none;

    svg {
      width: 36px;
      height: 36px;
    }

    strong,
    span {
      display: block;
    }

    strong {
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 17px;
      font-weight: 800;
    }

    span {
      color: #6d7a77;
      font-size: 13px;
    }
  }

  .document_modal_footer {
    justify-content: flex-end;
    border-top: 1px solid rgba(188, 201, 198, 0.28);
    background-color: #f0f5f2;

    .MuiButton-root {
      min-width: 120px;
      border-radius: 8px;
      font-weight: 800;
    }
  }

  .placeholder_panel {
    padding: 40px;

    h2 {
      font-size: 28px;
      font-weight: 800;
    }

    p {
      color: #6d7a77;
    }
  }

  @media (max-width: 1040px) {
    .files_grid {
      grid-template-columns: 1fr;
    }

    .trip_gallery_grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .trip_gallery_strip {
      display: none;
    }
  }

  @media (max-width: 720px) {
    .trip_gallery_showcase {
      min-height: 420px;
    }

    .trip_gallery_content {
      padding: 24px;

      h2 {
        font-size: 30px;
        line-height: 38px;
      }
    }

    .trip_gallery_toolbar {
      align-items: stretch;
      flex-direction: column;
    }

    .trip_gallery_grid {
      grid-template-columns: 1fr;
    }

    .add_photo_overlay {
      align-items: flex-end;
      padding: 12px;
    }

    .add_photo_modal {
      max-height: 94vh;
    }

    .add_photo_footer {
      flex-direction: column-reverse;

      .MuiButton-root {
        width: 100%;
      }
    }

    .document_modal_overlay {
      align-items: flex-end;
      padding: 12px;
    }

    .document_modal {
      max-height: 94vh;
    }

    .document_modal_footer {
      flex-direction: column-reverse;

      .MuiButton-root {
        width: 100%;
      }
    }

    .files_header,
    .documents_header {
      align-items: stretch;
      flex-direction: column;
    }

    .files_actions {
      flex-direction: column;

      .MuiButton-root {
        width: 100%;
      }
    }

    .folder_card {
      grid-template-columns: 46px minmax(0, 1fr);
    }

    .folder_count {
      grid-column: 2;
      text-align: left;
    }

    .scan_dropzone {
      align-items: flex-start;
    }
  }

  .invite_overlay {
    position: fixed;
    inset: 0;
    z-index: 120;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(23, 29, 28, 0.25);
    padding: 24px;
    backdrop-filter: blur(8px);
  }

  @media (max-width: 720px) {
    .expense_modal_overlay {
      align-items: flex-end;
      padding: 12px;
    }

    .expense_modal {
      max-height: 94vh;
      border-radius: 16px;
    }

    .expense_modal_header,
    .expense_modal_footer,
    .expense_modal_body {
      padding: 18px;
    }

    .expense_modal_body,
    .split_member_grid {
      grid-template-columns: 1fr;
    }

    .expense_modal_footer {
      flex-direction: column-reverse;

      .MuiButton-root {
        width: 100%;
      }
    }
  }

  .invite_modal {
    width: min(100%, 560px);
    max-height: min(90vh, 820px);
    overflow: hidden;
    border: 1px solid rgba(188, 201, 198, 0.45);
    border-radius: 24px;
    background-color: rgba(255, 255, 255, 0.86);
    box-shadow: 0 22px 44px rgba(23, 29, 28, 0.2);
    backdrop-filter: blur(20px);
  }

  .invite_header,
  .invite_footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
  }

  .invite_header {
    border-bottom: 1px solid rgba(188, 201, 198, 0.24);

    h3 {
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
    }
  }

  .invite_body {
    display: flex;
    max-height: 68vh;
    flex-direction: column;
    gap: 24px;
    overflow-y: auto;
    padding: 24px;
  }

  .invite_input_row,
  .invite_roles {
    label {
      display: block;
      margin: 0 0 8px 4px;
      color: #6d7a77;
      font-size: 12px;
      font-weight: 800;
      line-height: 16px;
      text-transform: uppercase;
    }

    .MuiStack-root {
      gap: 8px;
    }

    input {
      width: 100%;
      height: 48px;
      border: 1px solid #bcc9c6;
      border-radius: 12px;
      background-color: #ffffff;
      color: ${({ theme }) => theme.palette.text.primary};
      font: inherit;
      outline: none;
      padding: 0 16px;
    }

    .MuiButton-contained {
      border-radius: 12px;
      background-color: ${({ theme }) => theme.palette.primary.main};
      color: #ffffff;
      font-weight: 800;
      text-transform: none;
    }
  }

  .role_grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;

    @media (max-width: 560px) {
      grid-template-columns: 1fr;
    }
  }

  .role_card {
    display: flex;
    flex-direction: column;
    gap: 4px;
    border: 1px solid #bcc9c6;
    border-radius: 12px;
    cursor: pointer;
    padding: 14px;
    transition:
      background-color 160ms ease,
      border-color 160ms ease;

    &.active {
      border-color: ${({ theme }) => theme.palette.primary.main};
      background-color: rgba(0, 104, 95, 0.05);
    }

    strong {
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 14px;
      font-weight: 700;
    }

    small {
      color: #6d7a77;
      font-size: 13px;
      line-height: 18px;
    }
  }

  .role_icon {
    display: grid;
    width: 28px;
    height: 28px;
    place-items: center;

    &.primary {
      color: ${({ theme }) => theme.palette.primary.main};
    }

    &.secondary {
      color: ${({ theme }) => theme.palette.secondary.main};
    }
  }

  .invite_members > p {
    color: #6d7a77;
    font-size: 12px;
    font-weight: 800;
    line-height: 16px;
    text-transform: uppercase;
  }

  .member_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 8px;
    border-radius: 12px;
    padding: 12px;

    &:hover {
      background-color: #f0f5f2;
    }

    .MuiStack-root {
      align-items: center;
      gap: 12px;
    }

    strong,
    small {
      display: block;
    }

    small {
      color: #6d7a77;
      font-size: 13px;
    }
  }

  .member_avatar,
  .member_initial {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .member_avatar {
    object-fit: cover;
  }

  .member_initial {
    display: grid;
    place-items: center;
    background-color: #dae2fd;
    color: #131b2e;
    font-size: 14px;
    font-weight: 800;

    &.tertiary {
      background-color: rgba(176, 94, 61, 0.18);
      color: #773215;
    }
  }

  .chip {
    border-radius: 999px;
    background-color: #dee4e1;
    color: #3d4947;
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;

    &.owner {
      background-color: rgba(0, 131, 120, 0.12);
      color: #005049;
    }

    &.collaborator {
      background-color: rgba(0, 131, 120, 0.12);
      color: #005049;
    }

    &.viewer {
      background-color: #dae2fd;
      color: #3a456d;
    }
  }

  .empty_member {
    justify-content: center;
    border: 1px dashed rgba(188, 201, 198, 0.5);
    color: #6d7a77;
    text-align: center;
  }

  .invite_footer {
    justify-content: flex-end;
    border-top: 1px solid rgba(188, 201, 198, 0.24);
    background-color: rgba(240, 245, 242, 0.5);

    .MuiButton-root {
      border-radius: 12px;
      color: #3d4947;
      font-weight: 700;
      text-transform: none;
    }
  }
`;
