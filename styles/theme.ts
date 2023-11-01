import { Poppins } from 'next/font/google'

import { createTheme } from '@mui/material/styles'

const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin'] })

export const base = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#e9e9e9',
    },
    error: {
      main: '#ff574e',
    },
    warning: {
      main: '#ffa726',
    },
    info: {
      main: '#29b6f6',
    },
    success: {
      main: '#66bb6a',
    },
    text: {
      primary: '#fff',
      secondary: '#878789',
      disabled: 'rgba(255, 255, 255, 0.4)',
    },
    background: {
      default: '#181818',
      paper: '#121212',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
    common: {
      white: '#e9e9e9',
      black: '#181818',
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
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
})

const typography = createTheme({
  typography: {
    fontFamily: poppins.style.fontFamily,
    fontSize: 14,
    htmlFontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      color: base.palette.text.primary,
      textAlign: 'center',
      marginBottom: '2rem',
      fontSize: '2rem',
      [base.breakpoints.up('md')]: {
        fontSize: '3rem',
      },
      [base.breakpoints.up('lg')]: {
        marginBottom: '3rem',
        fontSize: '4.5rem',
      },
      fontWeight: 700,
    },
    h2: {
      color: base.palette.text.primary,
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h3: {
      color: base.palette.text.primary,
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle1: {
      marginBottom: '1rem',
    },
    subtitle2: {
      marginBottom: '1rem',
    },
    body1: {
      color: base.palette.text.secondary,
    },
    body2: {
      color: base.palette.text.secondary,
    },
    caption: {
      color: base.palette.text.secondary,
    },
    button: {
      textTransform: 'none',
    },
  },
}).typography

const theme = createTheme(base, {
  typography: typography,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: base.palette.background.default,
          color: base.palette.text.primary,
        },
        img: {
          pointerEvents: 'none',
          webkitUserSelect: 'none',
          userSelect: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'large',
        color: 'secondary',
      },
      styleOverrides: {
        root: {
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          minWidth: 0,
        },
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            borderRadius: '1rem',
          },
        },
      ],
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
    MuiLink: {
      defaultProps: {
        color: 'secondary',
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
          ...(ownerState?.maxWidth === 'lg' && {
            maxWidth: 1400,
            [base.breakpoints.up('lg')]: {
              maxWidth: 1140,
              padding: '2rem',
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
          borderRadius: base.shape.borderRadius,
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
          borderRadius: base.shape.borderRadius,
          transition: 'all 0.2s ease',
          '&:hover, &:focus-visible': {
            '@media (hover: hover)': {
              padding: '0 1rem',
              backgroundColor: 'rgba(255,255,255,0.03)',
            },
          },
        },
        content: {
          '& .MuiTypography-root': {
            color: base.palette.text.primary,
          },
        },
        expandIconWrapper: {
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backgroundColor: 'transparent',
          color: base.palette.text.primary,
        },
      },
    },
    MuiChip: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiAlert: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          textAlign: 'left',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
          backgroundColor: base.palette.common.white,
          color: base.palette.common.black,
        },
        arrow: {
          '&:before': {
            backgroundColor: base.palette.common.white,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 2 * base.shape.borderRadius,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          height: '100%',
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          height: '100%',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '1rem',
          height: '100%',
          '&:last-child': {
            paddingBottom: 16,
          },
        },
      },
    },
  },
})

export default theme
