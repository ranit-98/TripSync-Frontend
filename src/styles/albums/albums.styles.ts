'use client';

import { Box, styled } from '@mui/material';

export const AlbumsPageWrapper = styled(Box)`
  display: flex;
  min-height: 100svh;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};

  .albums_main {
    min-width: 0;
    flex: 1;
    padding-bottom: 88px;
  }

  .albums_topbar {
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
  .album_meta,
  .gallery_meta {
    color: #5f6f74;
    font-size: 14px;
    line-height: 20px;
  }

  .albums_content {
    width: min(100%, 1280px);
    margin: 0 auto;
    padding: 24px;
  }

  .hero_album {
    position: relative;
    min-height: 280px;
    overflow: hidden;
    border-radius: 12px;
    background-color: #172124;
    box-shadow: 0 16px 38px rgba(23, 29, 28, 0.16);
  }

  .empty_album_panel {
    display: grid;
    min-height: 220px;
    place-items: center;
    align-content: center;
    gap: 12px;
    border: 1px dashed rgba(0, 104, 95, 0.42);
    border-radius: 12px;
    background-color: rgba(0, 131, 120, 0.05);
    text-align: center;

    .MuiButton-root {
      margin-top: 6px;
    }
  }

  .hero_album img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero_overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(23, 29, 28, 0.84), rgba(23, 29, 28, 0.28), transparent);
  }

  .hero_content {
    position: relative;
    display: flex;
    min-height: inherit;
    flex-direction: column;
    justify-content: flex-end;
    gap: 14px;
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
    max-width: 720px;
    color: #ffffff;
    font-size: 42px;
    font-weight: 800;
    line-height: 50px;
  }

  .hero_actions,
  .section_row,
  .gallery_toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .section_row {
    justify-content: space-between;
    margin: 32px 0 18px;
  }

  .section_title {
    color: #172124;
    font-size: 24px;
    font-weight: 800;
    line-height: 32px;
  }

  .album_grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }

  .album_card {
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

  .album_card:hover {
    box-shadow: 0 18px 38px rgba(23, 29, 28, 0.12);
    transform: translateY(-2px);
  }

  .album_media {
    position: relative;
    height: 190px;
  }

  .album_media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .photo_count {
    position: absolute;
    right: 14px;
    bottom: 14px;
    padding: 5px 12px;
    border-radius: 999px;
    background-color: rgba(255, 255, 255, 0.88);
    color: #00685f;
    font-size: 12px;
    font-weight: 800;
    backdrop-filter: blur(12px);
  }

  .album_body {
    padding: 20px;
  }

  .album_title {
    color: #172124;
    font-size: 22px;
    font-weight: 800;
    line-height: 30px;
  }

  .album_meta {
    margin-top: 5px;
  }

  .gallery_hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: 24px;
    margin-bottom: 24px;
  }

  .gallery_showcase {
    position: relative;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: repeat(2, 190px);
    gap: 12px;
    overflow: hidden;
    margin-bottom: 24px;
    border-radius: 12px;
  }

  .showcase_large,
  .showcase_tile {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .showcase_large {
    grid-row: 1 / span 2;
  }

  .showcase_caption {
    position: absolute;
    right: 18px;
    bottom: 18px;
    padding: 14px 18px;
    border: 1px solid rgba(255, 255, 255, 0.32);
    border-radius: 10px;
    background-color: rgba(23, 29, 28, 0.58);
    color: #ffffff;
    backdrop-filter: blur(16px);

    span,
    strong {
      display: block;
    }

    span {
      color: rgba(255, 255, 255, 0.76);
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
    }

    strong {
      font-size: 22px;
      font-weight: 800;
      line-height: 30px;
    }
  }

  .upload_panel,
  .gallery_stat {
    border: 1px solid rgba(188, 201, 198, 0.36);
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 5px 18px rgba(23, 29, 28, 0.05);
  }

  .upload_panel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 24px;
  }

  .upload_copy {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .upload_icon {
    display: grid;
    width: 52px;
    height: 52px;
    place-items: center;
    border-radius: 10px;
    background-color: rgba(0, 104, 95, 0.1);
    color: #00685f;
  }

  .upload_copy strong,
  .gallery_stat strong {
    display: block;
    color: #172124;
    font-size: 20px;
    font-weight: 800;
    line-height: 28px;
  }

  .gallery_stat {
    padding: 20px;
  }

  .gallery_grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .gallery_card {
    overflow: hidden;
    border: 1px solid rgba(188, 201, 198, 0.36);
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 5px 18px rgba(23, 29, 28, 0.05);
  }

  .gallery_card img {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  .gallery_caption {
    padding: 14px 16px;
  }

  .gallery_caption strong {
    display: block;
    color: #172124;
    font-size: 14px;
    font-weight: 800;
    line-height: 20px;
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
      color: #172124;
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
    color: #00685f;
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
      color: #172124;
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
      display: block;
      overflow: hidden;
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

  @media (max-width: 1099px) {
    .album_grid,
    .gallery_grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .gallery_hero {
      grid-template-columns: 1fr;
    }

    .gallery_showcase {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .showcase_large {
      grid-column: 1 / -1;
      grid-row: auto;
    }
  }

  @media (max-width: 899px) {
    .mobile_page_header {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .albums_topbar,
    .upload_panel {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    }

    .albums_content {
      padding: 16px 16px 96px;
    }

    .album_grid,
    .gallery_grid {
      grid-template-columns: 1fr;
    }

    .hero_content {
      padding: 24px;
    }

    .hero_title {
      font-size: 30px;
      line-height: 38px;
    }

    .gallery_showcase {
      grid-template-columns: 1fr;
      grid-template-rows: none;
    }

    .showcase_large,
    .showcase_tile {
      height: 220px;
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
  }
`;
