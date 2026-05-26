'use client';

import { Box, styled } from '@mui/material';

export const CreateTripPageWrapper = styled(Box)`
  min-height: 100svh;
  background:
    linear-gradient(90deg, rgba(245, 250, 248, 0.94) 0%, rgba(245, 250, 248, 0.96) 68%, rgba(245, 250, 248, 0.82) 100%),
    url('https://lh3.googleusercontent.com/aida-public/AB6AXuBkuk7UEY5nAc2SWs8CihDu311gU-vZfte5825OCODdrc_TFUq7Rx7-IU5UAJh9PIgTtSBLsZv31rheNHOqF-ta1y5zLmBmOj6nUdb_IPfN1Q0_tL4gr81qzM-IYVBx2-NMOhktYrXarwIa9yQV9rp3Argw_IX8uwBzpBUuFMI-aGJmYdaoxQdb6lMpZUlFCqRmyQz3pqcysqj4Xp5OjCU6XQiOfj3_n3VNt9xVDjFmsV_xy9_pKXiSp3L2cY7lGFJMcvXod_SA4es')
      right center / 34vw 100% no-repeat;
  color: ${({ theme }) => theme.palette.text.primary};

  .create_header {
    position: sticky;
    top: 0;
    z-index: 40;
    border-bottom: 1px solid rgba(188, 201, 198, 0.35);
    background-color: rgba(245, 250, 248, 0.84);
    backdrop-filter: blur(20px);
  }

  .create_header_inner {
    display: flex;
    width: min(100%, 1280px);
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin: 0 auto;
    padding: 14px 24px;
  }

  .brand_lockup,
  .step_meter,
  .step_heading,
  .action_bar,
  .help_card,
  .upload_prompt,
  .category_chip,
  .invite_row {
    display: flex;
    align-items: center;
  }

  .brand_lockup {
    gap: 12px;
    min-width: 0;
  }

  .close_link {
    color: #3d4947;
    text-decoration: none;
  }

  .brand_name {
    color: #00685f;
    font-size: 22px;
    font-weight: 800;
    line-height: 28px;
  }

  .step_meter {
    gap: 16px;
    color: #6d7a77;
    font-size: 13px;
    font-weight: 800;
    white-space: nowrap;
  }

  .progress_track {
    width: 112px;
    height: 6px;
    overflow: hidden;
    border-radius: 999px;
    background-color: #dee4e1;
  }

  .progress_bar {
    display: block;
    height: 100%;
    border-radius: inherit;
    background-color: #00685f;
    transition: width 180ms ease;
  }

  .create_main {
    width: min(100%, 980px);
    margin: 0 auto;
    padding: 48px 24px 64px;
  }

  .eyebrow {
    color: #6d7a77;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    line-height: 16px;
    text-transform: uppercase;
  }

  .page_title {
    max-width: 720px;
    margin-top: 8px;
    color: #172124;
    font-size: 36px;
    font-weight: 800;
    letter-spacing: 0;
    line-height: 44px;
  }

  .page_subtitle {
    max-width: 640px;
    margin-top: 8px;
    color: #5f6f74;
    font-size: 16px;
    line-height: 24px;
  }

  .wizard_shell {
    overflow: hidden;
    margin-top: 28px;
    border: 1px solid rgba(188, 201, 198, 0.35);
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 18px 44px rgba(23, 29, 28, 0.08);
  }

  .cover_upload {
    position: relative;
    height: 236px;
    overflow: hidden;
    background-color: #e4e9e7;
  }

  .cover_upload img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cover_overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(23, 29, 28, 0.06), rgba(23, 29, 28, 0.44));
  }

  .upload_prompt {
    position: absolute;
    right: 24px;
    bottom: 24px;
    gap: 10px;
    min-height: 44px;
    padding: 0 16px;
    border: 1px solid rgba(255, 255, 255, 0.54);
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.82);
    color: #00685f;
    font-size: 14px;
    font-weight: 800;
    backdrop-filter: blur(16px);
  }

  .form_body {
    padding: 28px;
  }

  .step_panel {
    display: none;
  }

  .step_panel.active {
    display: block;
  }

  .step_heading {
    gap: 16px;
    margin-bottom: 24px;
  }

  .step_number {
    display: grid;
    width: 40px;
    height: 40px;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 50%;
    background-color: #00685f;
    color: #ffffff;
    font-weight: 800;
  }

  .step_title {
    color: #172124;
    font-size: 24px;
    font-weight: 800;
    line-height: 32px;
  }

  .field_grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }

  .full_span {
    grid-column: 1 / -1;
  }

  .form_label {
    display: block;
    margin-bottom: 8px;
    color: #6d7a77;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.06em;
    line-height: 16px;
    text-transform: uppercase;
  }

  .MuiOutlinedInput-root {
    border-radius: 8px;
    background-color: #f5faf8;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: #bcc9c6;
  }

  .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #00685f;
  }

  .category_grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
  }

  .category_chip {
    position: relative;
    justify-content: center;
    gap: 8px;
    min-height: 48px;
    border: 1px solid #bcc9c6;
    border-radius: 8px;
    background-color: #f5faf8;
    color: #3d4947;
    cursor: pointer;
    font-weight: 800;
  }

  .category_chip input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .category_chip.active {
    border-color: #00685f;
    background-color: rgba(0, 131, 120, 0.11);
    color: #00685f;
  }

  .invite_stack {
    display: grid;
    gap: 12px;
  }

  .invite_row {
    gap: 12px;
  }

  .invite_role {
    width: 150px;
  }

  .review_grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin-top: 24px;
  }

  .review_tile {
    min-height: 94px;
    padding: 16px;
    border: 1px solid rgba(188, 201, 198, 0.35);
    border-radius: 8px;
    background-color: #f0f5f2;
  }

  .review_tile strong {
    display: block;
    color: #172124;
    font-size: 20px;
    line-height: 28px;
  }

  .review_tile span {
    color: #6d7a77;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .action_bar {
    justify-content: space-between;
    gap: 16px;
    padding: 16px 28px;
    border-top: 1px solid rgba(188, 201, 198, 0.35);
    background-color: #f0f5f2;
  }

  .action_group {
    display: flex;
    gap: 12px;
  }

  .help_grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin-top: 24px;
  }

  .help_card {
    align-items: flex-start;
    gap: 14px;
    min-height: 112px;
    padding: 16px;
    border-radius: 8px;
    background-color: rgba(0, 131, 120, 0.09);
  }

  .help_card svg {
    color: #00685f;
  }

  .help_card strong {
    display: block;
    color: #00685f;
    font-size: 14px;
    line-height: 20px;
  }

  .help_card p {
    margin: 3px 0 0;
    color: #5f6f74;
    font-size: 13px;
    line-height: 20px;
  }

  @media (max-width: 899px) {
    background: #f5faf8;

    .create_header_inner,
    .create_main {
      padding-right: 16px;
      padding-left: 16px;
    }

    .step_meter {
      display: none;
    }

    .page_title {
      font-size: 28px;
      line-height: 36px;
    }

    .form_body {
      padding: 20px;
    }

    .field_grid,
    .category_grid,
    .review_grid,
    .help_grid {
      grid-template-columns: 1fr;
    }

    .invite_row,
    .action_bar {
      align-items: stretch;
      flex-direction: column;
    }

    .invite_role {
      width: 100%;
    }

    .action_group {
      width: 100%;
      flex-direction: column-reverse;
    }

    .action_group .MuiButton-root,
    .action_bar > .MuiButton-root {
      width: 100%;
    }
  }
`;
