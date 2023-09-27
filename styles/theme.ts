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
      //default: '#202124',
      default: '#181818',
    },
    text: {
      primary: '#fff',
      secondary: '#878789',
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
          backgroundImage:
            'radial-gradient(circle closest-corner at 25% 60%, rgba(238, 39, 39, 0.25), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 71% 16%, rgba(154, 39, 238, 0.15), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(238, 164, 39, 0.1), rgba(255, 255, 255, 0) 76%), radial-gradient(circle farthest-side at 69% 81%, rgba(255, 0, 48, 0.1), rgba(255, 255, 255, 0) 76%)',
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
          padding: '2rem 1rem',
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
    MuiAccordion: {
      defaultProps: {
        square: true,
        disableGutters: true,
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: 'transparent',
          overflow: 'hidden',
          '&:before': {
            display: 'none',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: '0',
          gap: '1rem',
          borderRadius: 8,
          transition: 'all 0.2s ease',
          '&:hover, &:focus-visible': {
            '@media (hover: hover)': {
              padding: '0 1rem',
              backgroundColor: 'rgba(255,255,255,0.03)',
            },
          },
        },
        expandIconWrapper: {
          color: base.palette.primary.main,
          transition: 'transform 0.2s ease',
          '&.Mui-expanded': {
            transform: 'rotate(-135deg)',
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '1rem',
          color: base.palette.text.secondary,
        },
      },
    },
    MuiCollapse: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
        },
      },
    },
  },
});

export default theme;
