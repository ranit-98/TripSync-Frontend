'use client';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const PublicNavbarWrapper = styled(Box)`
  position: sticky;
  top: 0;
  z-index: 20;
  padding: 18px 0;
  border-bottom: 1px solid #e9e5df;
  background: rgba(250, 249, 248, 0.86);
  backdrop-filter: blur(16px);

  .public_nav_inner {
    align-items: center;
    justify-content: space-between;
  }

  .public_brand {
    display: flex;
    gap: 8px;
    align-items: center;
    color: #00675b;
    font: 700 25px Georgia, serif;
    text-decoration: none;
  }

  .public_links {
    gap: 30px;
  }

  .public_links a {
    color: #4b6360;
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
  }

  .public_actions {
    align-items: center;
    gap: 8px;
  }

  .MuiButton-root {
    padding: 10px 22px;
    border-radius: 999px;
    font-weight: 800;
    text-transform: none;
  }

  @media (max-width: 800px) {
    padding: 12px 0;

    .public_nav_inner {
      gap: 12px;
    }

    .public_brand {
      min-width: 0;
      font-size: 21px;
      white-space: nowrap;
    }

    .public_links {
      display: none;
    }

    .MuiButton-root {
      padding: 8px 14px;
      font-size: 13px;
    }
  }

  @media (max-width: 420px) {
    .public_brand {
      font-size: 19px;
    }

    .public_brand svg {
      width: 19px;
      height: 19px;
    }

    .public_actions {
      gap: 6px;
    }

    .MuiButton-root {
      min-width: 0;
      padding: 7px 11px;
    }
  }
`;
