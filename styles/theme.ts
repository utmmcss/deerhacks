import { createTheme } from '@mui/material/styles';

const base = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#878789',
    },
    error: {
      main: '#FF2424',
    },
    background: {
      default: '#202124',
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
    fontFamily: 'inherit',
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
          backgroundColor: base.palette.background.default,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'large',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          gap: '0.5rem',
          p: '0.75rem 1.5rem',
        },
      },
    },
    MuiDivider: {
      defaultProps: {
        flexItem: true,
      },
      styleOverrides: {
        root: {
          borderColor: base.palette.primary.main,
          opacity: 0.1,
        },
      },
    },
    MuiLinearProgress: {
      defaultProps: {
        color: 'secondary',
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
      styleOverrides: {
        root: {
          transition: 'opacity 0.2s ease',
          opacity: 0.5,
          '&:hover': {
            opacity: 1,
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: ({ ownerState }: any) => ({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          padding: '2rem',
          gap: '1rem',
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
