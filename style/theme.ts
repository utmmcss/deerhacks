import { createTheme } from '@mui/material/styles';

const base = createTheme({
  palette: {
    primary: {
      main: '#001834',
    },
    secondary: {
      main: '#614C4E',
    },
    error: {
      main: '#FF2424',
    },
    background: {
      default: '#FFF',
    },
    text: {
      primary: '#fff',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
});

const theme = createTheme(base, {
  typography: {
    fontFamily: "'Roboto','Helvetica','BlinkMacSystemFont','Segoe UI','Oxygen'",
    fontSize: 16,
    h1: {
      fontSize: '2rem',
      [base.breakpoints.up('md')]: {
        fontSize: '3rem',
      },
      [base.breakpoints.up('lg')]: {
        fontSize: '4.5rem',
      },
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.5rem',
    },
  },
  zIndex: {
    modal: 2000,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#202124',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'large',
        color: 'main',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiLinearProgress: {
      defaultProps: {
        color: 'main',
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: ({ ownerState }: any) => ({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          minHeight: '100svh',
          ...(ownerState.maxWidth !== false && {
            maxWidth: 1400,
            [base.breakpoints.up('lg')]: {
              maxWidth: 1140,
            },
            [base.breakpoints.up('xl')]: {
              maxWidth: 1320,
            },
          }),
        }),
      },
    },
  },
});

export default theme;
