import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
    primary: {
      main: '#0f7b6c',
      light: '#32a795',
      dark: '#07594f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e0a21a',
      light: '#f2bf47',
      dark: '#ad7907',
      contrastText: '#1f2528',
    },
    background: {
      default: '#f5f7f4',
      paper: '#ffffff',
    },
    text: {
      primary: '#172124',
      secondary: '#5f6f74',
    },
    divider: '#dfe6e2',
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: 'var(--font-plus-jakarta), Arial, Helvetica, sans-serif',
    h1: {
      fontSize: 'clamp(2.25rem, 6vw, 4.75rem)',
      fontWeight: 800,
      letterSpacing: 0,
      lineHeight: 0.95,
    },
    h2: {
      fontSize: 'clamp(1.75rem, 4vw, 3rem)',
      fontWeight: 800,
      letterSpacing: 0,
      lineHeight: 1.05,
    },
    h5: {
      fontWeight: 800,
      letterSpacing: 0,
    },
    h6: {
      fontWeight: 800,
      letterSpacing: 0,
    },
    button: {
      fontWeight: 800,
      letterSpacing: 0,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 44,
          borderRadius: 6,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 700,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});
