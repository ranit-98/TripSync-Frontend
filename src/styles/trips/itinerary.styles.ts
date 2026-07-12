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
    overflow-x: hidden;
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

  .hero_transition {
    height: 400px;
    flex-shrink: 0;
    overflow: hidden;
    transition: height 280ms ease, opacity 220ms ease, transform 280ms ease;

    &.is_collapsing {
      height: 0;
      opacity: 0;
      pointer-events: none;
      transform: translateY(-16px);
    }

    @media (max-width: 599px) {
      height: 460px;
    }
  }

  .hero_skeleton_content {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 32px;
  }

  .hero_img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;

    img { object-fit: cover; }
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

  .hero_user_island {
    display: inline-flex;
    max-width: min(250px, 52vw);
    min-width: 0;
    align-items: center;
    gap: 9px;
    border: 1px solid rgba(255, 255, 255, 0.34);
    border-radius: 999px;
    background-color: rgba(17, 32, 29, 0.48);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
    color: #ffffff;
    cursor: pointer;
    font: inherit;
    font-size: 13px;
    font-weight: 900;
    padding: 5px 12px 5px 5px;
    backdrop-filter: blur(16px);

    span {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
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
    min-height: 40px;
    border: 1px solid rgba(188, 201, 198, 0.35);
    border-radius: 999px;
    background-color: #ffffff;
    color: #3d4947;
    font-weight: 800;
    padding: 6px 14px;
    text-transform: none;
  }

  .collapsed_trip_header {
    position: sticky;
    top: 0;
    z-index: 35;
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid rgba(188, 201, 198, 0.3);
    background-color: rgba(245, 250, 248, 0.94);
    padding: 10px 24px;
    backdrop-filter: blur(16px);
  }

  .collapsed_back_btn {
    width: 40px;
    height: 40px;
    flex: 0 0 40px;
    background-color: #ffffff;
    color: ${({ theme }) => theme.palette.primary.main};
    box-shadow: 0 4px 12px rgba(23, 29, 28, 0.06);
  }

  .collapsed_trip_copy {
    min-width: 0;
    flex: 1;

    h1 {
      overflow: hidden;
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 18px;
      font-weight: 900;
      line-height: 24px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    span {
      color: #6d7a77;
      font-size: 12px;
      font-weight: 700;
    }
  }

  @media (max-width: 599px) {
    .collapsed_trip_header {
      gap: 8px;
      padding: 8px 64px 8px 12px;
    }

    .collapsed_trip_copy h1 {
      font-size: 15px;
      line-height: 20px;
    }

    .hero_restore {
      min-width: 42px;
      font-size: 0;
      padding: 6px 10px;

      .MuiButton-startIcon {
        margin: 0;
        font-size: 18px;
      }
    }
  }

  @media (max-width: 599px) {
    .hero_topbar {
      align-items: flex-start;
      padding: 18px 12px;
    }

    .hero_actions {
      display: flex;
      min-width: 0;
      flex: 0 1 auto;
      justify-content: flex-end;
    }

    .hero_user_island {
      max-width: calc(100vw - 82px);
      gap: 7px;
      font-size: 12px;
      padding: 4px 10px 4px 4px;
    }

    .profile_avatar {
      width: 34px;
      height: 34px;
    }
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
  .member_initial.compact,
  .assignee_avatar,
  .feed_avatar {
    border-radius: 50%;
    object-fit: cover;
  }

  .member_avatar,
  .member_more,
  .member_initial.compact {
    width: 40px;
    height: 40px;
    margin-left: -12px;
    border: 2px solid ${({ theme }) => theme.palette.background.paper};

    &:first-of-type {
      margin-left: 0;
    }
  }

  .member_more,
  .member_initial.compact {
    display: grid;
    place-items: center;
  }

  .member_more {
    cursor: default;
    background-color: #dee4e1;
    color: ${({ theme }) => theme.palette.text.secondary};
    font-size: 12px;
    font-weight: 800;
    padding: 0;
  }

  .member_more_button {
    cursor: pointer;
    font-family: inherit;

    &:hover {
      background-color: #cfd9d5;
    }
  }

  .member_initial.compact {
    background-color: #dae2fd;
    color: #131b2e;
    font-size: 14px;
    font-weight: 800;
  }

  .members_popover {
    width: min(300px, calc(100vw - 32px));
    max-height: 360px;
    overflow-y: auto;
    border: 1px solid rgba(188, 201, 198, 0.45);
    background-color: #ffffff;
    padding: 12px;
  }

  .members_popover_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 2px 4px 10px;

    h3 {
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 15px;
      font-weight: 800;
      line-height: 20px;
    }

    span {
      display: grid;
      min-width: 28px;
      height: 28px;
      place-items: center;
      border-radius: 999px;
      background-color: #eef5f2;
      color: ${({ theme }) => theme.palette.primary.main};
      font-size: 12px;
      font-weight: 800;
    }
  }

  .members_popover_item {
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    padding: 8px 6px;

    &:hover {
      background-color: #f4f8f6;
    }

    strong,
    small {
      display: block;
    }

    strong {
      overflow: hidden;
      max-width: 190px;
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 14px;
      font-weight: 800;
      line-height: 18px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    small {
      color: #6d7a77;
      font-size: 12px;
      font-weight: 700;
      line-height: 16px;
    }
  }

  .members_popover_avatar,
  .members_popover_initial {
    width: 36px;
    height: 36px;
    flex: 0 0 36px;
    border-radius: 50%;
  }

  .members_popover_avatar {
    object-fit: cover;
  }

  .members_popover_initial {
    display: grid;
    place-items: center;
    background-color: #dae2fd;
    color: #131b2e;
    font-size: 13px;
    font-weight: 800;
  }

  .members_popover_empty {
    color: #6d7a77;
    font-size: 13px;
    font-weight: 700;
    padding: 10px 4px 4px;
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
    min-width: 0;
    overflow: hidden;
    border-bottom: 1px solid rgba(188, 201, 198, 0.3);
    background-color: rgba(245, 250, 248, 0.84);
    backdrop-filter: blur(20px);

    &::before,
    &::after {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 1;
      width: 18px;
      content: '';
      pointer-events: none;
    }

    &::before {
      left: 0;
      background: linear-gradient(90deg, rgba(245, 250, 248, 0.96), transparent);
    }

    &::after {
      right: 0;
      background: linear-gradient(270deg, rgba(245, 250, 248, 0.96), transparent);
    }
  }

  .trip_main.hero_collapsed .tab_bar {
    top: 61px;

    @media (max-width: 599px) {
      top: 61px;
    }
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
    scroll-padding: 24px;
    scroll-snap-type: x proximity;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 599px) {
      width: 100%;
      gap: 4px;
      padding: 0 6px;
      scroll-padding: 6px;
    }
  }

  .tab_btn {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 4px;
    min-width: max-content;
    padding: 16px 0;
    border-bottom: 2px solid transparent;
    color: ${({ theme }) => theme.palette.text.secondary};
    font-weight: 800;
    scroll-snap-align: center;
    text-transform: none;

    &.active {
      border-bottom-color: ${({ theme }) => theme.palette.primary.main};
      color: ${({ theme }) => theme.palette.primary.main};
    }

    @media (max-width: 599px) {
      min-width: 42px;
      justify-content: center;
      gap: 3px;
      padding: 13px 4px;
      font-size: 0;

      svg {
        font-size: 20px;
      }

      &.active {
        min-width: 92px;
        font-size: 13px;
      }
    }
  }

  .content_area {
    flex: 1;
    padding: 32px;
    min-width: 0;
    overflow-x: hidden;

    @media (max-width: 599px) {
      padding: 14px 16px 96px;
    }
  }

  .content_grid {
    display: grid;
    width: min(100%, 1280px);
    margin-right: auto;
    margin-left: auto;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 32px;
    min-width: 0;

    @media (max-width: 599px) {
      gap: 18px;
    }
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

    @media (max-width: 599px) {
      padding: 24px;
    }
  }

  .day_header.expanded {
    background-color: #f0f5f2;
  }

  .day_title_group {
    align-items: center;
    gap: 16px;
    min-width: 0;
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

    @media (max-width: 599px) {
      font-size: 25px;
      line-height: 31px;
    }
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
    gap: 16px;
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
      display: grid;
      grid-template-columns: 26px 48px minmax(0, 1fr);
      align-items: flex-start;
      gap: 10px;
      padding: 14px;
      overflow: visible;
    }
  }

  .drag_icon {
    color: #bcc9c6;
    cursor: grab;

    @media (max-width: 599px) {
      align-self: center;
    }
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

    @media (max-width: 599px) {
      grid-column: 3;
    }
  }

  .activity_top {
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;

    @media (max-width: 599px) {
      flex-direction: column;
      gap: 6px;
    }
  }

  .activity_title {
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 16px;
    font-weight: 800;
    overflow-wrap: anywhere;
  }

  .time_badge {
    flex-shrink: 0;
    max-width: 100%;
    overflow: hidden;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 800;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .activity_added_by {
    display: none;
    align-items: center;
    min-width: 0;
    gap: 6px;
    margin-top: 8px;
    color: #6d7a77;
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;

    span {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    @media (max-width: 599px) {
      display: flex;
    }
  }

  .activity_added_avatar {
    width: 20px;
    height: 20px;
    flex: 0 0 20px;
    border: 2px solid #ffffff;
    border-radius: 999px;
    object-fit: cover;
    box-shadow: 0 3px 8px rgba(23, 29, 28, 0.12);
  }

  .assignee_avatar {
    width: 32px;
    height: 32px;
    border: 2px solid #ffffff;
    box-shadow: 0 4px 10px rgba(23, 29, 28, 0.14);

    @media (max-width: 599px) {
      display: none;
    }
  }

  .activity_actions,
  .row_actions {
    align-items: center;
    justify-content: flex-end;
    gap: 2px;

    .MuiIconButton-root {
      width: 34px;
      height: 34px;
      color: #6d7a77;

      &:hover {
        background-color: rgba(0, 131, 120, 0.1);
        color: ${({ theme }) => theme.palette.primary.main};
      }
    }

    @media (max-width: 599px) {
      position: static;
      grid-column: 3;
      justify-content: flex-start;
      gap: 0;
      margin-top: 6px;

      .MuiIconButton-root {
        width: 28px;
        height: 28px;
        padding: 4px;
      }
    }
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
      padding: 20px 16px calc(156px + env(safe-area-inset-bottom));
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

  .budget_progress,
  .budget_breakdown {
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

  .budget_breakdown {
    display: grid;
    justify-items: end;
    gap: 3px;
    color: #3d4947;

    span {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
    }

    strong {
      color: ${({ theme }) => theme.palette.primary.main};
      font-size: 24px;
      line-height: 30px;
    }

    small {
      color: #6d7a77;
      font-size: 12px;
    }

    @media (max-width: 899px) {
      justify-items: start;
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

    &.tabbed {
      grid-template-columns: minmax(0, 1fr);
    }

    @media (max-width: 1099px) {
      grid-template-columns: 1fr;
    }
  }

  .expense_view_tabs {
    display: flex;
    width: fit-content;
    gap: 6px;
    margin-bottom: 24px;
    padding: 5px;
    border: 1px solid rgba(188, 201, 198, 0.35);
    border-radius: 12px;
    background: #edf3f1;

    button,
    a {
      min-width: 140px;
      min-height: 42px;
      border-radius: 9px;
      color: #63716e;
      font-weight: 800;
      text-decoration: none;
      text-transform: none;

      &.active {
        background: #ffffff;
        color: ${({ theme }) => theme.palette.primary.main};
        box-shadow: 0 3px 10px rgba(23, 29, 28, 0.09);
      }
    }

    @media (max-width: 599px) {
      width: 100%;
      min-width: 0;
      gap: 3px;
      padding: 4px;

      button,
      a {
        flex: 1 1 0;
        min-width: 0;
        min-height: 40px;
        padding-inline: 6px;
        font-size: 12px;
        white-space: nowrap;
      }
    }
  }

  .payment_due_banner {
    display: flex;
    align-items: center;
    gap: 14px;
    width: min(calc(100% - 64px), 1280px);
    margin: 20px auto 0;
    padding: 14px 16px;
    border: 1px solid rgba(176, 64, 42, 0.24);
    border-radius: 12px;
    background: linear-gradient(90deg, #fff4f1, #fff9f7);
    box-shadow: 0 5px 16px rgba(143, 51, 31, 0.08);

    @media (max-width: 599px) {
      width: calc(100% - 32px);
      align-items: flex-start;
      flex-wrap: wrap;
      margin-top: 14px;
    }
  }

  .payment_due_icon {
    display: grid;
    width: 42px;
    height: 42px;
    flex: 0 0 42px;
    place-items: center;
    border-radius: 50%;
    background: rgba(176, 64, 42, 0.11);
    color: #a13f27;
  }

  .payment_due_copy {
    min-width: 0;
    flex: 1;

    strong,
    span { display: block; }
    strong { color: #862f1f; font-size: 14px; }
    span { margin-top: 2px; color: #6d4d45; font-size: 12px; }
  }

  .payment_due_action {
    flex: 0 0 auto;
    border-radius: 9px;
    background: #a13f27;
    font-size: 12px;
    font-weight: 800;
    text-transform: none;

    @media (max-width: 599px) {
      width: 100%;
    }
  }

  .payment_due_close {
    width: 34px;
    height: 34px;
    flex: 0 0 34px;
    color: #8c3d2d;
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
    grid-template-columns: minmax(250px, 1.4fr) minmax(120px, 0.55fr) minmax(150px, 0.7fr) minmax(130px, 0.65fr) minmax(130px, 0.7fr) minmax(116px, 0.5fr);
    align-items: center;
    min-width: 960px;
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

  .paid_by_cell {
    align-items: center;
    gap: 10px;
    min-width: 0;

    span {
      min-width: 0;
      overflow: hidden;
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 13px;
      font-weight: 800;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
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

    @media (max-width: 599px) {
      padding: 12px;
    }
  }

  .expense_list_pagination {
    display: flex;
    max-width: 100%;
    justify-content: center;
    margin-top: 16px;
    overflow: hidden;

    .MuiPagination-root,
    .MuiPagination-ul { width: 100%; max-width: 100%; }
    .MuiPagination-ul { flex-wrap: nowrap; justify-content: center; }

    @media (max-width: 599px) {
      order: 3;
      margin-bottom: 24px;
      padding: 16px 0 40px;

      .MuiPaginationItem-root {
        min-width: 28px;
        width: 28px;
        height: 28px;
        margin: 0 1px;
        font-size: 12px;
      }
    }
  }

  @media (max-width: 599px) {
    .expense_list {
      display: flex;
      min-width: 0;
      flex-direction: column;

      .section_row { order: 0; }
      .expense_table { order: 2; }
    }
  }

  .settlement_tabs {
    display: flex;
    gap: 4px;
    margin-bottom: 18px;
    padding: 4px;
    border-radius: 10px;
    background: #eef3f1;

    button {
      flex: 1;
      border-radius: 8px;
      color: #63716e;
      font-size: 12px;
      font-weight: 800;
      text-transform: none;

      &.active {
        background: #ffffff;
        color: ${({ theme }) => theme.palette.primary.main};
        box-shadow: 0 2px 8px rgba(23, 29, 28, 0.08);
      }
    }
  }

  .balance_explorer {
    min-width: 0;
    margin-bottom: 28px;
    padding: 18px;
    border: 1px solid rgba(0, 104, 95, 0.14);
    border-radius: 12px;
    background: #f8fbfa;

    @media (max-width: 599px) {
      padding: 12px;
    }
  }

  .settlement_actions_panel {
    margin-bottom: 20px;
    padding: 18px;
    border: 1px solid rgba(176, 64, 42, 0.18);
    border-radius: 12px;
    background: #fffaf8;
  }

  .settlement_actions_heading {
    strong,
    span { display: block; }
    strong { color: ${({ theme }) => theme.palette.text.primary}; font-size: 15px; }
    span { color: #6d716f; font-size: 12px; }
  }

  .settlement_action_cards {
    display: grid;
    gap: 10px;
    margin-top: 14px;

    > div {
      display: grid;
      grid-template-columns: 38px minmax(0, 1fr) auto;
      align-items: center;
      gap: 10px;
      padding: 12px;
      border-radius: 9px;
      background: #ffffff;

      &.pay { border-left: 3px solid #b04428; }
      &.receive { border-left: 3px solid #008074; }
    }

    .person_avatar { width: 38px; height: 38px; }
    strong,
    span { display: block; }
    > div > span { color: #687572; font-size: 12px; }
    button { border-radius: 8px; background: #007b70; color: #ffffff; font-size: 11px; font-weight: 800; text-transform: none; }
    .pay button { background: #a13f27; }
    .awaiting_label { color: #886c25; font-size: 11px; font-weight: 800; }

    @media (max-width: 599px) {
      > div { grid-template-columns: 38px minmax(0, 1fr); }
      button,
      .awaiting_label { grid-column: 1 / -1; width: 100%; }
    }
  }

  .payment_details_drawer {
    width: min(92vw, 460px);
    height: 100%;
    overflow-y: auto;
    padding: 24px;
    background: #f8fbfa;
  }

  .payment_drawer_header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    h3 { font-size: 22px; font-weight: 800; }
    span { color: #687572; font-size: 12px; }
  }

  .payment_drawer_amount {
    margin-top: 24px;
    padding: 20px;
    border-radius: 12px;
    span,
    strong { display: block; }
    span { font-size: 12px; }
    strong { margin-top: 4px; font-size: 28px; }
    &.pay { background: rgba(176, 64, 42, 0.09); color: #a13f27; }
    &.receive { background: rgba(0, 131, 120, 0.09); color: #007b70; }
  }

  .selected_payment_purpose {
    margin-top: 22px;
    padding: 16px;
    border: 1px solid rgba(188, 201, 198, 0.38);
    border-radius: 10px;
    background: #ffffff;
    span { color: #687572; font-size: 10px; text-transform: uppercase; }
    strong { display: block; margin-top: 3px; font-size: 16px; }
    p { margin: 3px 0 0; color: #687572; font-size: 11px; }
  }

  .payment_drawer_meta {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-top: 16px;
    > div { padding: 12px; border-radius: 9px; background: #ffffff; }
    span,
    strong { display: block; }
    span { color: #687572; font-size: 10px; }
    strong { font-size: 13px; }
  }

  .payment_split_breakdown {
    margin-top: 22px;
    padding: 14px;
    border: 1px solid rgba(188, 201, 198, 0.34);
    border-radius: 12px;
    background: #ffffff;
  }

  .payment_split_heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 10px;

    strong,
    span { display: block; }
    strong { color: ${({ theme }) => theme.palette.text.primary}; font-size: 14px; }
    span { color: #687572; font-size: 11px; text-align: right; }
  }

  .payment_split_row {
    display: grid;
    grid-template-columns: 36px minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
    padding: 12px 0;
    border-top: 1px solid rgba(222, 230, 228, 0.9);

    &:first-of-type { border-top: 0; }
    &.paid strong:last-child { color: #52615e; }
    &.current {
      margin-inline: -8px;
      padding-inline: 8px;
      border-radius: 9px;
      background: rgba(0, 131, 120, 0.07);
    }

    .person_avatar { width: 36px; height: 36px; }
    strong,
    span { display: block; }
    > div strong { color: ${({ theme }) => theme.palette.text.primary}; font-size: 13px; }
    span { margin-top: 2px; color: #687572; font-size: 11px; }
    > strong { color: #101f1d; font-size: 13px; white-space: nowrap; }
  }

  .payment_purpose_list {
    max-height: 280px;
    overflow-y: auto;
    margin-top: 24px;
    padding-right: 4px;
    > strong { font-size: 14px; }
    > div { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 9px; padding: 12px; border-radius: 9px; background: #ffffff; }
    span { display: block; color: #687572; font-size: 10px; }
    > div strong { font-size: 12px; }
  }

  .payment_drawer_note {
    margin-top: 16px;
    padding: 12px;
    border-radius: 9px;
    background: #eef3f1;
    color: #5f6c69;
    font-size: 11px;
  }

  .confirm_payment {
    width: 100%;
    min-height: 46px;
    margin-top: 20px;
    border-radius: 10px;
    font-weight: 800;
    text-transform: none;
    &.pay { background: #a13f27; }
    &.receive { background: #007b70; }
  }

  .balance_explorer_heading,
  .settle_up_heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;

    strong,
    span { display: block; }
    strong { color: ${({ theme }) => theme.palette.text.primary}; font-size: 15px; }
    span { margin-top: 2px; color: #687572; font-size: 12px; }

    button { padding: 2px 6px; font-size: 11px; font-weight: 800; text-transform: none; }
  }

  .settle_up_heading {
    margin-bottom: 12px;
  }

  .balance_filters {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-top: 16px;

    .MuiOutlinedInput-root { border-radius: 9px; background: #ffffff; }

    @media (max-width: 599px) { grid-template-columns: 1fr; }
  }

  .person_balance_summary {
    display: grid;
    grid-template-columns: minmax(180px, 1.4fr) repeat(2, minmax(110px, 0.7fr));
    align-items: center;
    gap: 12px;
    margin-top: 16px;
    padding: 14px;
    border-radius: 10px;
    border: 1px solid rgba(202, 151, 0, 0.28);
    background: rgba(255, 193, 7, 0.12);
    box-shadow: 0 4px 14px rgba(151, 109, 0, 0.1);

    @media (max-width: 899px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  .person_balance_identity {
    display: flex;
    align-items: center;
    gap: 10px;

    strong,
    span { display: block; }
    strong { font-size: 14px; }
    span { color: #687572; font-size: 11px; }
  }

  .person_balance_stat {
    span,
    strong { display: block; }
    span { color: #687572; font-size: 10px; }
    strong { font-size: 15px; }
    &.pay strong { color: #b04428; }
    &.receive strong { color: #008074; }
  }

  .person_payment_action {
    border-radius: 8px;
    font-size: 11px;
    font-weight: 800;
    text-transform: none;
    &.pay { background: rgba(176, 64, 42, 0.1); color: #a13f27; }
    &.receive { background: rgba(0, 131, 120, 0.1); color: #007b70; }
  }

  .spending_insights_view { min-width: 0; }

  .insights_summary_grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin-top: 16px;

    > div { padding: 20px; border: 1px solid rgba(188, 201, 198, 0.35); border-radius: 12px; background: #ffffff; }
    span,
    strong { display: block; }
    span { color: #687572; font-size: 12px; }
    strong { margin-top: 4px; color: ${({ theme }) => theme.palette.primary.main}; font-size: 22px; }
    @media (max-width: 699px) { grid-template-columns: 1fr; }
  }

  .spending_chart_card {
    margin-top: 18px;
    padding: 24px;
    border: 1px solid rgba(188, 201, 198, 0.35);
    border-radius: 12px;
    background: #ffffff;

    > div > strong,
    > div > span { display: block; }
    > div > span { color: #687572; font-size: 12px; }
  }

  .category_bar_chart { display: grid; gap: 16px; margin-top: 24px; }
  .category_bar_row {
    display: grid;
    grid-template-columns: 150px minmax(120px, 1fr) 110px;
    align-items: center;
    gap: 14px;
    font-size: 12px;
    > div { height: 12px; overflow: hidden; border-radius: 999px; background: #e8efed; }
    i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #008378, #4eb7a9); }
    > strong { text-align: right; }
    @media (max-width: 599px) { grid-template-columns: 100px minmax(80px, 1fr); > strong { grid-column: 2; } }
  }

  .expense_share_results {
    display: grid;
    min-width: 0;
    gap: 8px;
    margin-top: 14px;
  }

  .balance_group_empty {
    padding: 14px;
    border: 1px dashed rgba(188, 201, 198, 0.5);
    border-radius: 9px;
    color: #687572;
    font-size: 12px;
    text-align: center;
  }

  .expense_share_row {
    display: grid;
    grid-template-columns: 34px minmax(0, 1fr) auto 112px;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border: 1px solid rgba(188, 201, 198, 0.3);
    border-radius: 9px;
    background: #ffffff;

    &.pay {
      border-color: rgba(176, 64, 42, 0.2);
      background: rgba(176, 64, 42, 0.055);
    }

    &.receive {
      border-color: rgba(0, 131, 120, 0.2);
      background: rgba(0, 131, 120, 0.055);
    }

    .person_avatar { width: 34px; height: 34px; }
    strong,
    span { display: block; }
    > div > strong { overflow: hidden; font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
    span { color: #687572; font-size: 11px; }
    > strong { font-size: 14px; }
    > strong.pay { color: #b04428; }
    > strong.receive { color: #008074; }

    @media (max-width: 599px) {
      grid-template-columns: 34px minmax(0, 1fr) auto;
      .share_payment_action,
      .share_settled_label { grid-column: 2 / -1; width: 100%; }
    }
  }

  .share_payment_action {
    border-radius: 8px;
    font-size: 11px;
    font-weight: 800;
    text-transform: none;
    &.pay { background: rgba(176, 64, 42, 0.1); color: #a13f27; }
    &.receive { background: rgba(0, 131, 120, 0.1); color: #007b70; }
  }

  .share_settled_label {
    color: #70807c;
    font-size: 11px;
    font-weight: 800;
    text-align: center;
  }

  .more_share_results {
    color: #687572;
    font-size: 11px;
    text-align: center;
  }

  .transaction_totals {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-bottom: 16px;

    > div {
      padding: 12px;
      border-radius: 9px;

      span,
      strong { display: block; }
      span { font-size: 11px; font-weight: 700; }
      strong { margin-top: 2px; font-size: 18px; }
    }

    .pay { background: rgba(176, 94, 61, 0.08); color: #a04426; }
    .receive { background: rgba(0, 131, 120, 0.08); color: #007b70; }
  }

  .settlement_table {
    overflow-x: auto;
    border: 1px solid rgba(188, 201, 198, 0.35);
    border-radius: 10px;
  }

  .settlement_pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-top: 16px;

    > span { color: #6d7a77; font-size: 11px; }

    @media (max-width: 599px) {
      align-items: center;
      flex-direction: column;
      width: 100%;
      padding-bottom: 20px;

      > span { width: 100%; text-align: center; }
      .MuiPagination-root,
      .MuiPagination-ul { width: 100%; max-width: 100%; }
      .MuiPagination-ul { flex-wrap: nowrap; justify-content: center; }
      .MuiPaginationItem-root {
        min-width: 28px;
        width: 28px;
        height: 28px;
        margin: 0 1px;
        font-size: 12px;
      }
    }
  }

  .settlement_table_head,
  .settlement_table_row {
    display: grid;
    grid-template-columns: minmax(170px, 1.8fr) 82px 68px minmax(105px, 1fr) 72px;
    align-items: center;
    gap: 10px;
    min-width: 570px;
    padding: 11px 12px;
  }

  .settlement_table_head {
    background: #f3f7f5;
    color: #53615e;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
  }

  .settlement_table_row {
    border-top: 1px solid rgba(188, 201, 198, 0.25);
    font-size: 12px;
  }

  .transaction_person {
    display: flex;
    align-items: center;
    gap: 9px;
    min-width: 0;

    .person_avatar { width: 32px; height: 32px; flex: 0 0 32px; }
    strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  }

  .transaction_type,
  .transaction_status {
    width: fit-content;
    padding: 3px 7px;
    border-radius: 999px;
    background: #eef2f1;
    color: #596763;
    font-size: 10px;
    font-weight: 800;
  }

  .transaction_type.pay { background: rgba(176, 94, 61, 0.1); color: #a04426; }
  .transaction_type.receive { background: rgba(0, 131, 120, 0.1); color: #007b70; }

  .transaction_amount { text-align: right; font-size: 14px; }
  .transaction_amount.pay { color: #b04428; }
  .transaction_amount.receive { color: #008074; }
  .transaction_amount.neutral { color: #4f5e5a; }

  .transaction_action {
    text-align: right;

    button { min-width: 0; padding: 5px 9px; border-radius: 7px; font-size: 10px; font-weight: 800; text-transform: none; }
    .pay_action { background: rgba(161, 63, 39, 0.1); color: #a13f27; }
    span { color: #9aa5a2; }
  }

  .balance_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;
    border-radius: 8px;
    padding: 16px;

    &.positive {
      border: 1px solid rgba(0, 131, 120, 0.12);
      background-color: rgba(0, 131, 120, 0.05);
    }

    &.settled {
      border: 1px solid rgba(88, 109, 103, 0.18);
      background-color: #f5f8f7;
    }

    &.warning {
      margin-top: 12px;
      border: 1px solid rgba(176, 94, 61, 0.12);
      background-color: rgba(176, 94, 61, 0.05);
    }

  }

  .settlement_card_action {
    flex: 0 0 100%;
    min-height: 36px;
    margin-top: 2px;
    border-radius: 9px;
    font-size: 12px;
    font-weight: 800;
    text-transform: none;

    &.reminder {
      border-color: rgba(146, 70, 40, 0.35);
      color: #924628;
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

    &.settled {
      strong { color: #536460; }

      span {
        background-color: rgba(83, 100, 96, 0.1);
        color: #536460;
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

    &.pay strong { color: #a04426; }
    &.receive strong { color: #007b70; }
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

  .settlement_complete {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 16px;
    padding: 14px;
    border-radius: 10px;
    background-color: rgba(0, 131, 120, 0.08);
    color: ${({ theme }) => theme.palette.primary.main};

    strong,
    span { display: block; }
    strong { font-size: 14px; }
    span { color: #536460; font-size: 12px; }
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

    @media (max-width: 899px) {
      right: 16px;
      bottom: calc(84px + env(safe-area-inset-bottom));
      z-index: 60;
      width: 54px;
      height: 54px;
    }
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
    width: min(100%, 760px);
    max-height: min(90vh, 760px);
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
    padding: 18px 24px;
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
    column-gap: 16px;
    row-gap: 18px;
    overflow-y: auto;
    padding: 24px;

    .MuiOutlinedInput-root {
      border-radius: 8px;
      background-color: #f5faf8;
    }

    .MuiOutlinedInput-root:not(.MuiInputBase-multiline) {
      min-height: 48px;
      box-sizing: border-box;
    }

    .MuiOutlinedInput-root:not(.MuiInputBase-multiline) .MuiInputBase-input,
    .MuiSelect-select {
      height: 46px;
      min-height: 46px;
      box-sizing: border-box;
      padding-top: 0;
      padding-bottom: 0;
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
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
  }

  .split_member {
    position: relative;
    display: flex;
    min-width: 0;
    min-height: 56px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    padding: 10px 12px;
    border: 1px solid #bcc9c6;
    border-radius: 8px;
    background-color: #f5faf8;
    color: #3d4947;
    cursor: pointer;
    font-size: 12px;
    font-weight: 800;
    text-align: left;
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
    width: 34px;
    height: 34px;
    flex: 0 0 34px;
    border-radius: 50%;
    object-fit: cover;
  }

  .expense_error {
    display: block;
    margin-top: 6px;
  }

  .split_amounts_table {
    overflow: hidden;
    border: 1px solid rgba(188, 201, 198, 0.45);
    border-radius: 10px;
  }

  .split_amounts_head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    background-color: rgba(0, 131, 120, 0.06);
    border-bottom: 1px solid rgba(188, 201, 198, 0.3);

    span {
      color: #6d7a77;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
  }

  .split_amounts_row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 16px;
    border-bottom: 1px solid rgba(188, 201, 198, 0.2);
    background-color: #f9fbfa;
    transition: background-color 140ms ease;

    &:last-of-type {
      border-bottom: 0;
    }

    &:hover {
      background-color: rgba(0, 131, 120, 0.04);
    }
  }

  .split_amounts_member {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    flex: 1;

    span {
      min-width: 0;
      overflow: hidden;
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 13px;
      font-weight: 700;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .split_amount_input {
    width: 140px;
    flex: 0 0 140px;

    .MuiOutlinedInput-root {
      background-color: #ffffff;
      border-radius: 8px;
    }

    .MuiInputBase-input {
      font-weight: 700;
      text-align: right;
    }
  }

  .split_amounts_footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 6px;
    padding: 10px 16px;
    border-top: 1px solid rgba(188, 201, 198, 0.3);

    span {
      color: #6d7a77;
      font-size: 12px;
      font-weight: 700;
    }

    strong {
      font-size: 15px;
    }

    &.balanced {
      background-color: rgba(0, 131, 120, 0.07);
      strong { color: ${({ theme }) => theme.palette.primary.main}; }
    }

    &.unbalanced {
      background-color: rgba(176, 94, 61, 0.06);
      strong { color: #924628; }
    }
  }

  .split_remaining_hint {
    width: 100%;
    display: block;
    font-weight: 600;
  }

  .expense_modal_footer {
    justify-content: flex-end;
    border-top: 1px solid rgba(188, 201, 198, 0.28);
    background-color: #f4f8f6;

    .MuiButton-root {
      min-width: 120px;
      border-radius: 8px;
      font-weight: 800;
    }
  }

  .details_modal {
    width: min(100%, 560px);
  }

  .confirm_modal {
    width: min(100%, 460px);
  }

  .confirm_body {
    padding: 24px;

    p {
      margin: 0;
      color: #3d4947;
      font-size: 15px;
      line-height: 22px;
    }
  }

  .detail_body {
    display: grid;
    gap: 12px;
    overflow-y: auto;
    padding: 24px;
  }

  .detail_row {
    display: grid;
    grid-template-columns: 128px minmax(0, 1fr);
    gap: 16px;
    align-items: start;
    padding: 14px 0;
    border-bottom: 1px solid rgba(188, 201, 198, 0.24);

    &:last-child {
      border-bottom: 0;
    }

    span {
      color: #6d7a77;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.06em;
      line-height: 16px;
      text-transform: uppercase;
    }

    strong {
      min-width: 0;
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 14px;
      line-height: 20px;
      overflow-wrap: anywhere;
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
      margin-bottom: calc(76px + env(safe-area-inset-bottom));
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
    min-width: 0;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 24px;
  }

  .older_messages_loader {
    display: flex;
    min-height: 34px;
    align-items: center;
    justify-content: center;
    gap: 8px;

    button {
      border: 1px solid rgba(188, 201, 198, 0.5);
      border-radius: 999px;
      background-color: #ffffff;
      color: ${({ theme }) => theme.palette.primary.main};
      cursor: pointer;
      font-size: 12px;
      font-weight: 800;
      padding: 7px 14px;
    }

    span {
      width: min(180px, 26vw);
      height: 12px;
      border-radius: 999px;
      background: linear-gradient(90deg, #e7eeeb 0%, #f6faf8 50%, #e7eeeb 100%);
      background-size: 200% 100%;
      animation: chatSkeleton 1100ms ease-in-out infinite;
    }
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

  .message_group {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .message {
    position: relative;
    display: flex;
    max-width: min(78%, 760px);
    min-width: 0;
    gap: 12px;

    small {
      display: block;
      margin: 0 0 4px 4px;
      color: #6d7a77;
      font-size: 12px;
    }

    .message_bubble {
      display: flex;
      min-width: 120px;
      max-width: 100%;
      flex-direction: column;
      gap: 8px;
      border-radius: 18px;
      padding: 14px 16px;

      p {
        margin: 0;
        line-height: 24px;
        white-space: pre-wrap;
        word-break: break-word;
      }
    }

    .quoted_message {
      display: flex;
      max-width: 100%;
      flex-direction: column;
      gap: 3px;
      border-left: 3px solid rgba(0, 104, 95, 0.82);
      border-radius: 9px;
      padding: 8px 10px;

      strong,
      span {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      strong {
        font-size: 12px;
        line-height: 16px;
      }

      span {
        font-size: 13px;
        line-height: 18px;
      }
    }

    &.incoming .message_bubble {
      border: 1px solid rgba(188, 201, 198, 0.24);
      border-bottom-left-radius: 4px;
      background-color: #ffffff;
      color: ${({ theme }) => theme.palette.text.primary};
      box-shadow: 0 2px 4px rgba(23, 29, 28, 0.06);

      .quoted_message {
        background-color: #eef4f2;

        strong {
          color: ${({ theme }) => theme.palette.primary.main};
        }

        span {
          color: #5d6a67;
        }
      }
    }

    &.outgoing {
      align-self: flex-end;
      flex-direction: column;
      align-items: flex-end;

      .message_bubble {
        border-bottom-right-radius: 4px;
        background-color: ${({ theme }) => theme.palette.primary.main};
        color: #ffffff;
        box-shadow: 0 6px 14px rgba(0, 104, 95, 0.16);

        .quoted_message {
          border-left-color: rgba(255, 255, 255, 0.86);
          background-color: rgba(255, 255, 255, 0.16);

          strong {
            color: #ffffff;
          }

          span {
            color: rgba(255, 255, 255, 0.82);
          }
        }
      }
    }
  }

  .message_bubble_wrap {
    position: relative;
    display: flex;
    min-width: 0;
    flex-direction: column;
    align-items: flex-start;

    &:hover .message_surface .message_actions,
    &:focus-within .message_surface .message_actions {
      opacity: 1;
      transform: translateY(50%);
      pointer-events: auto;
    }
  }

  .message.outgoing .message_bubble_wrap {
    align-items: flex-end;
  }

  .message_surface {
    position: relative;
    display: flex;
    min-width: 0;
    max-width: 100%;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .message.outgoing .message_surface {
    align-items: flex-end;
  }

  .message_delete_btn {
    color: #924628;

    &:hover {
      background-color: rgba(146, 70, 40, 0.1);
      color: #924628;
    }
  }

  .message_actions {
    position: absolute;
    bottom: -3px;
    left: 10px;
    z-index: 4;
    width: max-content;
    max-width: 100%;
    align-items: center;
    gap: 4px;
    border: 1px solid rgba(188, 201, 198, 0.4);
    border-radius: 999px;
    background-color: rgba(255, 255, 255, 0.92);
    box-shadow: 0 8px 18px rgba(23, 29, 28, 0.08);
    opacity: 0;
    padding: 3px;
    pointer-events: none;
    transform: translateY(38%);
    transition: opacity 160ms ease, transform 160ms ease;

    .MuiIconButton-root {
      width: 28px;
      height: 28px;
      color: #6d7a77;
    }
  }

  .message.outgoing .message_actions {
    right: 10px;
    left: auto;
  }

  .reaction_btn {
    width: 28px;
    height: 28px;
    border: 0;
    border-radius: 50%;
    background-color: transparent;
    cursor: pointer;
    font-size: 15px;
    line-height: 1;

    &:hover {
      background-color: #f0f5f2;
    }
  }

  .reaction_summary {
    position: absolute;
    bottom: 0;
    z-index: 2;
    width: max-content;
    gap: 4px;
    border: 1px solid rgba(188, 201, 198, 0.4);
    border-radius: 999px;
    background-color: #ffffff;
    padding: 2px 7px;
    box-shadow: 0 5px 12px rgba(23, 29, 28, 0.1);
    font-size: 13px;
    line-height: 18px;
    transform: translateY(50%);
  }

  .message.incoming .reaction_summary {
    left: 14px;
  }

  .message.outgoing .reaction_summary {
    right: 14px;
  }

  .message_avatar {
    width: 32px;
    height: 32px;
    align-self: flex-end;
  }

  .message_attachment {
    display: block;
    width: min(360px, 100%);
    margin-top: 8px;
    border: 1px solid rgba(188, 201, 198, 0.24);
    border-radius: 12px;
    background-color: #ffffff;
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 13px;
    font-weight: 800;
    overflow: hidden;
    padding: 10px;
    text-decoration: none;

    img {
      display: block;
      width: 100%;
      max-height: 220px;
      border-radius: 8px;
      object-fit: cover;
    }
  }

  .voice_note_attachment {
    display: flex;
    width: clamp(250px, 34vw, 350px);
    max-width: 100%;
    min-width: 0;
    align-items: center;
    gap: 10px;
    margin-top: 8px;
    border: 1px solid rgba(0, 104, 95, 0.14);
    border-radius: 16px;
    background: linear-gradient(135deg, #ffffff 0%, #f3faf8 100%);
    padding: 9px 10px;
    box-shadow: 0 10px 24px rgba(23, 29, 28, 0.08);

    audio {
      display: none;
    }

    @media (max-width: 599px) {
      width: 100%;
      min-width: 0;
    }
  }

  .voice_note_icon {
    display: grid;
    width: 36px;
    height: 36px;
    flex: 0 0 36px;
    place-items: center;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: #ffffff;
    box-shadow: 0 8px 16px rgba(0, 104, 95, 0.22);
  }

  .voice_note_body {
    min-width: 0;
    flex: 1;

    strong {
      display: block;
      overflow: hidden;
      margin-bottom: 5px;
      color: #3d4947;
      font-size: 11px;
      font-weight: 800;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .voice_note_controls,
  .voice_note_volume {
    display: flex;
    min-width: 0;
    align-items: center;
  }

  .voice_note_controls {
    gap: 7px;

    button {
      display: grid;
      width: 28px;
      height: 28px;
      flex: 0 0 28px;
      place-items: center;
      border: 0;
      border-radius: 50%;
      background-color: rgba(0, 104, 95, 0.1);
      color: ${({ theme }) => theme.palette.primary.main};
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 104, 95, 0.16);
      }
    }

    span {
      flex: 0 0 30px;
      color: #5d6a67;
      font-size: 11px;
      font-weight: 700;
      white-space: nowrap;
    }
  }

  .voice_note_volume {
    position: relative;
    flex: 0 0 auto;
    gap: 0;
    margin-top: 0;
    color: #6d7a77;

    .MuiIconButton-root {
      width: 26px;
      height: 26px;
      color: #6d7a77;
    }

    &.open .voice_volume_panel {
      width: 92px;
      opacity: 1;
      pointer-events: auto;
    }
  }

  .voice_volume_panel {
    position: absolute;
    right: 0;
    bottom: calc(100% + 8px);
    display: flex;
    width: 0;
    overflow: hidden;
    border: 1px solid rgba(188, 201, 198, 0.42);
    border-radius: 999px;
    background-color: #ffffff;
    box-shadow: 0 10px 22px rgba(23, 29, 28, 0.12);
    opacity: 0;
    padding: 8px;
    pointer-events: none;
    transition: width 180ms ease, opacity 160ms ease;

    input {
      width: 76px;
      flex: 0 0 76px;
    }
  }

  .voice_note_controls input,
  .voice_note_volume input {
    height: 6px;
    min-width: 0;
    appearance: none;
    border-radius: 999px;
    background-color: #dce6e3;
    cursor: pointer;
    outline: none;

    &::-webkit-slider-thumb {
      width: 13px;
      height: 13px;
      appearance: none;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.palette.primary.main};
      box-shadow: 0 1px 4px rgba(23, 29, 28, 0.22);
    }

    &::-moz-range-thumb {
      width: 13px;
      height: 13px;
      border: 0;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.palette.primary.main};
      box-shadow: 0 1px 4px rgba(23, 29, 28, 0.22);
    }
  }

  .voice_note_controls input {
    flex: 1;
    background-image: linear-gradient(
      ${({ theme }) => theme.palette.primary.main},
      ${({ theme }) => theme.palette.primary.main}
    );
    background-repeat: no-repeat;
    background-size: 0% 100%;
  }

  .voice_volume_panel input {
    background-image: linear-gradient(#6d7a77, #6d7a77);
    background-repeat: no-repeat;
    background-size: 90% 100%;
  }

  @media (max-width: 599px) {
    .voice_note_attachment {
      width: min(292px, 78vw);
      gap: 8px;
      padding: 8px;
    }

    .voice_note_icon {
      width: 34px;
      height: 34px;
      flex-basis: 34px;
    }

    .voice_note_controls {
      gap: 6px;
    }

    .voice_note_controls span {
      flex-basis: 28px;
      font-size: 10px;
    }
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
    flex: 0 0 auto;
    border-top: 1px solid rgba(188, 201, 198, 0.3);
    background-color: rgba(255, 255, 255, 0.82);
    padding: 18px 24px;
    backdrop-filter: blur(16px);

    @media (max-width: 899px) {
      position: sticky;
      bottom: 0;
      z-index: 12;
      box-shadow: 0 -10px 24px rgba(23, 29, 28, 0.08);
    }

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

  .reply_preview {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 10px;
    border-left: 3px solid ${({ theme }) => theme.palette.primary.main};
    border-radius: 8px;
    background-color: #f0f5f2;
    padding: 10px 12px;

    strong,
    span {
      display: block;
    }

    strong {
      color: ${({ theme }) => theme.palette.primary.main};
      font-size: 12px;
    }

    span {
      color: #6d7a77;
      font-size: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .pending_files {
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 10px;
  }

  .pending_file {
    display: flex;
    max-width: 280px;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(188, 201, 198, 0.5);
    border-radius: 10px;
    background-color: #ffffff;
    padding: 6px 8px;

    > img {
      width: 34px;
      height: 34px;
      border-radius: 7px;
      object-fit: cover;
    }

    > svg {
      width: 24px;
      height: 24px;
      color: ${({ theme }) => theme.palette.primary.main};
    }

    span {
      min-width: 0;
      overflow: hidden;
      color: #3d4947;
      font-size: 12px;
      font-weight: 700;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .MuiIconButton-root {
      width: 24px;
      height: 24px;
      margin-left: auto;
      color: #6d7a77;
    }
  }

  .voice_recorder_composer {
    display: flex;
    min-width: 0;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    margin-bottom: 0;
    border: 1px solid rgba(0, 104, 95, 0.18);
    border-radius: 16px;
    background: linear-gradient(135deg, #eef7f5 0%, #ffffff 100%);
    padding: 12px;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.62);
  }

  @media (max-width: 599px) {
    .message_input {
      padding: 10px 12px;
    }

    .voice_recorder_composer {
      align-items: stretch;
      flex-direction: column;
      gap: 8px;
      border-radius: 14px;
      padding: 8px;
    }

    .voice_recording_status {
      gap: 8px;
      width: 100%;

      strong {
        font-size: 12px;
      }
    }

    .voice_recording_mic {
      width: 34px;
      height: 34px;
      flex-basis: 34px;
    }

    .voice_waveform {
      min-width: 0;
      gap: 2px;

      span {
        width: 3px;
        flex-basis: 3px;
      }
    }

    .voice_recording_actions {
      justify-content: flex-end;
      gap: 6px;

      .MuiIconButton-root {
        width: 34px;
        height: 34px;
        flex: 0 0 34px;
      }

      .voice_recording_send {
        min-width: 0;
        min-height: 34px;
        font-size: 0;
        padding: 6px 9px;

        .MuiButton-endIcon {
          margin: 0;
          font-size: 18px;
        }
      }
    }
  }

  .voice_recording_status {
    display: flex;
    min-width: 0;
    flex: 1;
    align-items: center;
    gap: 12px;

    strong {
      color: ${({ theme }) => theme.palette.primary.main};
      font-size: 13px;
      font-weight: 900;
      white-space: nowrap;
    }
  }

  .voice_recording_mic {
    position: relative;
    display: grid;
    width: 34px;
    height: 34px;
    flex: 0 0 34px;
    place-items: center;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: #ffffff;

    &::after {
      position: absolute;
      inset: -4px;
      border: 1px solid rgba(0, 104, 95, 0.28);
      border-radius: inherit;
      animation: voicePulse 1200ms ease-out infinite;
      content: '';
    }
  }

  .voice_waveform {
    display: flex;
    min-width: 120px;
    flex: 1;
    align-items: center;
    gap: 3px;
    overflow: hidden;

    span {
      width: 4px;
      height: 12px;
      flex: 0 0 4px;
      border-radius: 999px;
      background-color: ${({ theme }) => theme.palette.primary.main};
      opacity: 0.76;
      animation: voiceWave 840ms ease-in-out infinite;
    }

    span:nth-of-type(3n) {
      height: 22px;
    }

    span:nth-of-type(4n) {
      height: 16px;
      opacity: 0.55;
    }
  }

  .voice_recording_actions {
    display: flex;
    align-items: center;
    gap: 8px;

    .MuiIconButton-root {
      width: 36px;
      height: 36px;
      border: 1px solid rgba(188, 201, 198, 0.5);
      background-color: #ffffff;
      color: #6d7a77;
    }

    .voice_recording_send {
      min-height: 36px;
      border-color: transparent;
      border-radius: 999px;
      background-color: ${({ theme }) => theme.palette.primary.main};
      color: #ffffff;
      font-size: 12px;
      font-weight: 900;
      padding: 6px 14px;
      text-transform: none;

      &:hover {
        background-color: ${({ theme }) => theme.palette.primary.dark};
      }

      &.Mui-disabled {
        background-color: rgba(0, 104, 95, 0.22);
        color: #ffffff;
      }
    }
  }

  @keyframes voiceWave {
    0%,
    100% {
      transform: scaleY(0.45);
    }

    50% {
      transform: scaleY(1);
    }
  }

  @keyframes voicePulse {
    0% {
      opacity: 0.8;
      transform: scale(0.9);
    }

    100% {
      opacity: 0;
      transform: scale(1.25);
    }
  }

  @keyframes chatSkeleton {
    0% {
      background-position: 100% 0;
    }

    100% {
      background-position: -100% 0;
    }
  }

  @media (max-width: 599px) {
    .messages {
      gap: 18px;
      padding: 16px 12px;
    }

    .message {
      max-width: 92%;
      gap: 8px;
    }

    .message_bubble {
      min-width: 0;
      padding: 12px 14px;
    }

    .voice_note_attachment {
      width: min(320px, 82vw);
      max-width: 100%;
    }

    .reaction_summary {
      bottom: 1px;
      padding: 1px 6px;
      font-size: 12px;
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

      &.recording {
        background-color: rgba(146, 70, 40, 0.1);
        color: #924628;
      }
    }
  }

  @media (max-width: 599px) {
    .input_actions {
      gap: 8px;
    }

    .input_actions > .MuiStack-root {
      min-width: 0;
      flex: 1;
      flex-wrap: wrap;
      gap: 2px;
    }

    .input_actions .MuiIconButton-root {
      width: 36px;
      height: 36px;
      padding: 6px;
    }
  }

  .composer_tool {
    position: relative;
  }

  .composer_popover,
  .mention_popover {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 0;
    z-index: 8;
    border: 1px solid rgba(188, 201, 198, 0.45);
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 14px 34px rgba(23, 29, 28, 0.12);
    padding: 8px;
  }

  .composer_popover {
    gap: 4px;

    button {
      width: 32px;
      height: 32px;
      border: 0;
      border-radius: 8px;
      background-color: transparent;
      cursor: pointer;
      font-size: 18px;

      &:hover {
        background-color: #f0f5f2;
      }
    }
  }

  .mention_popover {
    width: 220px;
    max-height: 260px;
    gap: 4px;
    overflow-y: auto;

    button {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 8px;
      border: 0;
      border-radius: 8px;
      background-color: transparent;
      cursor: pointer;
      padding: 7px;
      text-align: left;

      &:hover {
        background-color: #f0f5f2;
      }
    }

    img {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      object-fit: cover;
    }

    span {
      min-width: 0;
      overflow: hidden;
      color: #3d4947;
      font-size: 13px;
      font-weight: 700;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .send_btn {
    flex: 0 0 auto;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: #ffffff;
    font-weight: 800;
    padding: 8px 24px;
    text-transform: none;
  }

  @media (max-width: 599px) {
    .send_btn {
      min-width: 42px;
      min-height: 38px;
      padding: 8px 10px;
      font-size: 0;

      .MuiButton-endIcon {
        margin: 0;
        font-size: 20px;
      }
    }
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

    &.is_dragging {
      border-color: ${({ theme }) => theme.palette.primary.main};
      background-color: rgba(0, 131, 120, 0.14);
      box-shadow: inset 0 0 0 1px ${({ theme }) => theme.palette.primary.main};
    }

    .MuiButton-root {
      margin-top: 4px;
      border-radius: 8px;
      font-weight: 800;
    }

    &.is_disabled {
      border-color: rgba(188, 201, 198, 0.65);
      background-color: #f7f9f8;
      color: #a1aaa7;
      cursor: not-allowed;
      opacity: 0.7;
    }
  }

  .selected_photo_list {
    display: grid;
    max-height: 232px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    overflow-y: auto;
  }

  .selected_photo {
    position: relative;
    min-width: 0;
    overflow: hidden;
    border-radius: 8px;
    background-color: #f5faf8;

    img {
      display: block;
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
    }

    span {
      overflow: hidden;
      display: block;
      padding: 7px 8px;
      color: #45514e;
      font-size: 13px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .MuiIconButton-root {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 28px;
      height: 28px;
      background-color: rgba(255, 255, 255, 0.88);
      color: #45514e;

      &:hover {
        background-color: #ffffff;
      }
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
    align-items: start;
    gap: 24px;
  }

  .folder_panel,
  .documents_panel {
    display: flex;
    height: clamp(560px, calc(100vh - 230px), 760px);
    min-height: 0;
    flex-direction: column;
    border: 1px solid rgba(188, 201, 198, 0.35);
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 14px 34px rgba(23, 29, 28, 0.08);
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
    background: linear-gradient(180deg, #f7fbfa 0%, #eef6f3 100%);
    flex: 0 0 auto;

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

  .documents_actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 8px;

    .MuiButton-root {
      border-radius: 8px;
      font-weight: 800;
      text-transform: none;
    }
  }

  .folder_list {
    display: grid;
    gap: 10px;
    padding: 16px;
  }

  .folder_tree {
    display: block;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    gap: 4px;
    padding: 12px 12px 16px;
    scrollbar-gutter: stable;
  }

  .folder_tree_node {
    min-width: 0;
  }

  .folder_tree_row {
    display: flex;
    align-items: center;
    min-height: 42px;
    min-width: 0;
    border-radius: 8px;
    transition: background-color 160ms ease, box-shadow 160ms ease;

    &.active {
      background-color: rgba(0, 131, 120, 0.1);
      box-shadow: inset 3px 0 0 ${({ theme }) => theme.palette.primary.main};

      .folder_action {
        display: inline-flex;
      }
    }

    .MuiIconButton-root {
      width: 28px;
      height: 28px;
      flex: 0 0 28px;

      svg {
        width: 18px;
        height: 18px;
      }
    }

    .folder_action {
      display: none;
      color: #6b7774;
    }

    &:hover .folder_action,
    &:focus-within .folder_action {
      display: inline-flex;
    }

    .MuiButton-root {
      min-width: 0;
      flex: 1;
      justify-content: flex-start;
      overflow: hidden;
      color: #263432;
      font-weight: 800;
      text-overflow: ellipsis;
      text-transform: none;
      white-space: nowrap;

      .MuiButton-startIcon {
        flex: 0 0 auto;
      }

      .folder_tree_name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .folder_collapsed {
    transform: rotate(-90deg);
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

  .documents_panel_body {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    scrollbar-gutter: stable;
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
    padding: 18px 20px;
    border: 1px dashed rgba(0, 104, 95, 0.38);
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(0, 131, 120, 0.08), rgba(218, 226, 253, 0.32));
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

    &.is_dragging {
      border-color: ${({ theme }) => theme.palette.primary.main};
      background-color: rgba(0, 131, 120, 0.14);
      box-shadow: inset 0 0 0 1px ${({ theme }) => theme.palette.primary.main};
    }
  }

  .document_upload_progress {
    display: grid;
    gap: 10px;
    margin: 0 24px 20px;
    padding: 14px;
    border-radius: 10px;
    background-color: #f5faf8;

    .MuiLinearProgress-root { height: 7px; border-radius: 999px; }
  }

  .upload_progress_label {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 5px;
    color: #566360;
    font-size: 12px;

    span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  }

  .document_table {
    overflow-x: auto;
    border-top: 1px solid rgba(188, 201, 198, 0.24);
  }

  .document_row {
    display: grid;
    grid-template-columns: minmax(260px, 1fr) minmax(180px, 0.7fr) 116px;
    align-items: center;
    min-width: 640px;
    min-height: 80px;
    border-top: 1px solid rgba(188, 201, 198, 0.24);
    background-color: #ffffff;
    transition: background-color 140ms ease;

    > * {
      padding: 0 20px;
    }

    &:hover:not(.document_head) {
      background-color: #f8fbfa;
    }
  }

  .document_head {
    position: sticky;
    top: 0;
    z-index: 1;
    min-height: 52px;
    border-top: 0;
    background-color: #eef5f2;
    color: #3d4947;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .document_name {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;

    strong,
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

  .document_file_meta {
    min-width: 0;

    strong,
    small {
      display: block;
    }

    strong {
      overflow: hidden;
      color: #52605d;
      font-size: 13px;
      font-weight: 700;
      line-height: 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    small {
      color: #87908d;
      font-size: 12px;
      line-height: 18px;
    }
  }

  .document_actions {
    display: flex;
    align-items: center;
    gap: 4px;

    .MuiIconButton-root {
      width: 34px;
      height: 34px;
      color: #6b7774;

      &:hover {
        background-color: rgba(0, 131, 120, 0.1);
        color: ${({ theme }) => theme.palette.primary.main};
      }
    }
  }

  .documents_empty {
    display: grid;
    min-height: 250px;
    place-items: center;
    align-content: center;
    gap: 8px;
    padding: 32px;
    color: #6d7a77;
    text-align: center;

    > svg {
      width: 44px;
      height: 44px;
      color: ${({ theme }) => theme.palette.primary.main};
    }

    h4 {
      margin: 4px 0 0;
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 18px;
      font-weight: 800;
    }

    p {
      font-size: 14px;
    }

    > div {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin-top: 10px;
    }
  }

  .documents_no_selection {
    display: grid;
    min-height: 420px;
    place-items: center;
    align-content: center;
    gap: 12px;
    padding: 32px;
    text-align: center;

    > svg {
      width: 48px;
      height: 48px;
      color: ${({ theme }) => theme.palette.primary.main};
    }

    h3 {
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 22px;
      font-weight: 800;
    }

    p {
      max-width: 380px;
      color: #6d7a77;
      font-size: 14px;
      line-height: 21px;
    }
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

  .preview_overlay {
    z-index: 1500;
    padding: 20px;
  }

  .document_preview_modal {
    width: min(1180px, 96vw);
    height: min(860px, 92vh);
    max-height: 92vh;
    background-color: #ffffff;
  }

  .preview_modal_header {
    flex: 0 0 auto;

    h3 {
      overflow: hidden;
      max-width: min(760px, 66vw);
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .document_preview_body {
    flex: 1;
    min-height: 0;
    overflow: hidden;
    background-color: #eef3f1;
  }

  /* PDF / video / image / object all fill the preview body */
  .iframe_document_preview,
  .video_document_preview,
  .image_document_preview {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
  }

  /* <object> used for PDF blob rendering needs the same sizing */
  object.iframe_document_preview {
    display: block;
    width: 100%;
    height: 100%;
  }

  .iframe_document_preview {
    background-color: #ffffff;
  }

  .image_document_preview {
    object-fit: contain;
    padding: 20px;
  }

  .pdf_blob_preview {
    background-color: #202423;
  }

  .video_document_preview {
    background-color: #17211f;
  }

  /* Spinner shown while PDF / text / spreadsheet loads */
  .pdf_preview_loading {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    color: #6d7a77;

    p {
      font-size: 14px;
      font-weight: 600;
    }
  }

  /* Wrapper used for Office viewer (iframe + overlay) */
  .iframe_loader_wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .iframe_loading_overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    background-color: #eef3f1;
    color: #6d7a77;

    p {
      font-size: 14px;
      font-weight: 600;
    }
  }

  .iframe_loader_wrap iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  /* Open-in-new-tab + close button cluster in preview header */
  .preview_header_actions {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }

  .text_document_preview {
    height: 100%;
    overflow: auto;
    background-color: #ffffff;
    padding: 20px;

    pre {
      margin: 0;
      color: #24312f;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 13px;
      line-height: 21px;
      white-space: pre-wrap;
      word-break: break-word;
    }
  }

  .spreadsheet_preview {
    display: flex;
    height: 100%;
    min-height: 0;
    flex-direction: column;
    background-color: #ffffff;
  }

  .spreadsheet_tabs {
    display: flex;
    flex: 0 0 auto;
    gap: 6px;
    overflow-x: auto;
    border-bottom: 1px solid rgba(188, 201, 198, 0.34);
    background-color: #f5faf8;
    padding: 10px 14px 0;

    button {
      min-height: 36px;
      border: 1px solid transparent;
      border-bottom: 0;
      border-radius: 8px 8px 0 0;
      background-color: transparent;
      color: #52605d;
      cursor: pointer;
      font-family: inherit;
      font-size: 13px;
      font-weight: 800;
      padding: 0 14px;
    }

    button.active {
      border-color: rgba(188, 201, 198, 0.5);
      background-color: #ffffff;
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  .spreadsheet_table_wrap {
    flex: 1;
    min-height: 0;
    overflow: auto;
    padding: 18px;

    table {
      width: max-content;
      min-width: 100%;
      border-collapse: collapse;
      background-color: #ffffff;
      box-shadow: 0 0 0 1px rgba(188, 201, 198, 0.36);
    }

    td {
      min-width: 130px;
      max-width: 280px;
      border: 1px solid rgba(188, 201, 198, 0.36);
      color: #24312f;
      font-size: 13px;
      line-height: 20px;
      overflow: hidden;
      padding: 9px 12px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .header_cell {
      position: sticky;
      top: 0;
      z-index: 1;
      background-color: #eef6f3;
      color: ${({ theme }) => theme.palette.text.primary};
      font-weight: 900;
    }
  }

  .spreadsheet_preview_status {
    display: grid;
    height: 100%;
    place-items: center;
    color: #6d7a77;
    font-size: 14px;
    font-weight: 800;
  }

  .document_preview_fallback {
    display: grid;
    min-height: 100%;
    place-items: center;
    align-content: center;
    gap: 10px;
    padding: 32px;
    color: #6d7a77;
    text-align: center;

    > svg {
      width: 52px;
      height: 52px;
      color: ${({ theme }) => theme.palette.primary.main};
    }

    h4 {
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 20px;
      font-weight: 800;
    }

    p {
      max-width: 360px;
      font-size: 14px;
      line-height: 22px;
    }

    .MuiButton-root {
      margin-top: 8px;
      border-radius: 8px;
      font-weight: 800;
      text-transform: none;
    }
  }

  .preview_modal_footer {
    flex: 0 0 auto;
  }

  .folder_modal {
    width: min(100%, 600px);

    .document_modal_body {
      padding: 28px 32px;
    }

    .folder_name_field {
      .MuiInputBase-root {
        min-height: 58px;
        border-radius: 10px;
      }

      .MuiInputBase-input {
        padding-top: 17px;
        padding-bottom: 17px;
        font-size: 15px;
        font-weight: 700;
      }

      .MuiFormHelperText-root {
        margin-top: 8px;
      }
    }
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

  .invite_autocomplete {
    position: relative;
    flex: 1;
  }

  .invite_autocomplete input {
    width: 100%;
  }

  .invite_suggestions {
    position: absolute;
    z-index: 10;
    top: calc(100% + 6px);
    right: 0;
    left: 0;
    overflow: hidden;
    border: 1px solid rgba(188, 201, 198, 0.7);
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 0 12px 24px rgba(23, 29, 28, 0.14);
  }

  .invite_suggestions button {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border: 0;
    border-bottom: 1px solid rgba(188, 201, 198, 0.35);
    background: #ffffff;
    color: #172124;
    cursor: pointer;
    text-align: left;
  }

  .invite_suggestions button:hover { background: #f0f5f2; }

  .invite_suggestions button img,
  .invite_suggestions button > span {
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    border-radius: 50%;
    background: #dae2fd;
    object-fit: cover;
    font-size: 12px;
    font-weight: 800;
  }

  .invite_suggestions strong,
  .invite_suggestions small { display: block; }
  .invite_suggestions small,
  .suggestion_status { color: #5f6f74; font-size: 12px; }
  .suggestion_status { display: block; padding: 12px; }

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
