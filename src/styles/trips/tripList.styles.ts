'use client';

import { Box, styled } from '@mui/material';

export const TripListPageWrapper = styled(Box)`
  display: flex;
  min-height: 100svh;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};

  .trips_main {
    min-width: 0;
    flex: 1;
    padding-bottom: 88px;
  }

  .trips_topbar {
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
  .trip_date,
  .trip_meta,
  .progress_label {
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

  .trips_content {
    width: min(100%, 1280px);
    margin: 0 auto;
    padding: 24px;
  }

  .hero_panel {
    position: relative;
    min-height: 260px;
    overflow: hidden;
    border-radius: 12px;
    background-color: #172124;
    box-shadow: 0 16px 38px rgba(23, 29, 28, 0.16);
  }

  .hero_panel img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero_overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(23, 29, 28, 0.86), rgba(23, 29, 28, 0.32), rgba(23, 29, 28, 0.04));
  }

  .hero_content {
    position: relative;
    display: flex;
    min-height: inherit;
    flex-direction: column;
    justify-content: flex-end;
    gap: 16px;
    padding: 32px;
  }

  .hero_tag {
    width: fit-content;
    padding: 5px 14px;
    border-radius: 999px;
    background-color: rgba(0, 104, 95, 0.94);
    color: #ffffff;
    font-size: 12px;
    font-weight: 800;
  }

  .hero_title {
    max-width: 680px;
    color: #ffffff;
    font-size: 40px;
    font-weight: 800;
    line-height: 48px;
  }

  .hero_meta {
    color: rgba(255, 255, 255, 0.78);
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
  }

  .hero_actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .primary_btn {
    border-radius: 8px;
    background-color: #ffffff;
    color: #00685f;
    font-weight: 800;
  }

  .ghost_btn {
    border-color: rgba(255, 255, 255, 0.58);
    color: #ffffff;
    font-weight: 800;
  }

  .section_row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-top: 32px;
    margin-bottom: 18px;
  }

  .section_row.compact {
    margin-top: 0;
    margin-bottom: 16px;
  }

  .section_title {
    color: #172124;
    font-size: 24px;
    font-weight: 800;
    line-height: 32px;
  }

  .invites_panel {
    margin-bottom: 24px;
    padding: 20px;
    border: 1px solid rgba(0, 104, 95, 0.18);
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 8px 24px rgba(23, 29, 28, 0.06);
  }

  .invite_list {
    display: grid;
    gap: 12px;
  }

  .invite_card {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 14px;
    padding: 14px;
    border: 1px solid rgba(188, 201, 198, 0.38);
    border-radius: 10px;
    background-color: #f7fbfa;
  }

  .invite_icon {
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border-radius: 10px;
    background-color: #d8efea;
    color: #00685f;
  }

  .invite_copy {
    min-width: 0;
  }

  .invite_title {
    color: #172124;
    font-size: 17px;
    font-weight: 800;
    line-height: 24px;
  }

  .invite_message {
    color: #5f6f74;
    font-size: 14px;
    line-height: 20px;
  }

  .invite_actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .trip_grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
    align-items: stretch;
  }

  .trip_card {
    display: flex;
    min-height: 438px;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid rgba(188, 201, 198, 0.36);
    border-radius: 12px;
    background-color: #ffffff;
    color: inherit;
    text-decoration: none;
    box-shadow: 0 5px 18px rgba(23, 29, 28, 0.05);
    transition:
      box-shadow 160ms ease,
      transform 160ms ease;
  }

  .trip_card:hover {
    box-shadow: 0 18px 38px rgba(23, 29, 28, 0.12);
    transform: translateY(-2px);
  }

  .trip_media {
    position: relative;
    height: 170px;
  }

  .trip_media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .trip_status {
    position: absolute;
    top: 14px;
    right: 14px;
    padding: 4px 14px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 800;
  }

  .trip_status.primary {
    color: #f4fffc;
    background-color: #008378;
  }

  .trip_status.secondary {
    color: #5c647a;
    background-color: #dae2fd;
  }

  .trip_status.neutral {
    color: #3d4947;
    background-color: #dee4e1;
  }

  .trip_body {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 20px;
  }

  .trip_title {
    color: #172124;
    font-size: 22px;
    font-weight: 800;
    line-height: 30px;
  }

  .trip_meta {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-top: 12px;
  }

  .trip_footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-top: auto;
    padding-top: 24px;
  }

  .avatar_stack {
    display: flex;
    min-width: 104px;
    align-items: center;
    flex-direction: row;
  }

  .trip_avatar,
  .avatar_more {
    display: block;
    flex: 0 0 auto;
    width: 32px;
    height: 32px;
    margin-left: -10px;
    border: 2px solid #ffffff;
    border-radius: 50%;
  }

  .trip_avatar:first-of-type {
    margin-left: 0;
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
    display: grid;
    justify-items: end;
    gap: 5px;
    min-width: 112px;
    text-align: right;
  }

  .progress_track {
    width: 96px;
    height: 6px;
    overflow: hidden;
    border-radius: 999px;
    background-color: rgba(188, 201, 198, 0.45);
  }

  .progress_bar {
    display: block;
    height: 100%;
    border-radius: inherit;
    background-color: #00685f;
  }

  .empty_state {
    display: grid;
    min-height: 240px;
    place-items: center;
    gap: 10px;
    padding: 32px;
    border: 1px solid rgba(188, 201, 198, 0.36);
    border-radius: 12px;
    background-color: #ffffff;
    text-align: center;
  }

  .empty_title {
    color: #172124;
    font-size: 22px;
    font-weight: 800;
    line-height: 30px;
  }

  .empty_copy {
    color: #5f6f74;
    font-size: 14px;
    line-height: 20px;
  }

  @media (max-width: 1199px) {
    .trip_grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 899px) {
    .mobile_page_header {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .trips_topbar {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      padding: 16px;
    }

    .search_wrap {
      width: 100%;
      flex-basis: auto;
    }

    .trips_content {
      padding: 16px 16px 96px;
    }

    .trip_grid {
      grid-template-columns: 1fr;
    }

    .invite_card {
      grid-template-columns: auto minmax(0, 1fr);
    }

    .invite_actions {
      grid-column: 1 / -1;
      justify-content: flex-start;
      padding-left: 58px;
    }

    .hero_content {
      padding: 24px;
    }

    .hero_title {
      font-size: 30px;
      line-height: 38px;
    }
  }
`;
