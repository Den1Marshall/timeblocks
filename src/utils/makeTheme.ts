import { PaletteMode, Shadows, Theme, createTheme } from '@mui/material';
import { blue, cyan, green, orange, red } from './HIG/colors';
import {
  materialRegularDark,
  materialRegularLight,
  materialThickDark,
  materialThickLight,
  materialThinDark,
  materialThinLight,
  materialUltrathinDark,
  materialUltrathinLight,
} from './HIG/materials';
import {
  backgroundDarkBase,
  backgroundDarkElevated,
  backgroundLight,
} from './HIG/backgrounds';

const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blue.light,
    },
    error: {
      main: red.light,
    },
    warning: {
      main: orange.light,
    },
    info: {
      main: cyan.light,
    },
    success: {
      main: green.light,
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.elevation === 0 && {
            backgroundColor: backgroundLight.primary,
          }),
          ...(ownerState.elevation === 1 && {
            backgroundColor: backgroundLight.secondary,
          }),
          ...(ownerState.elevation === 2 && {
            backgroundColor: backgroundLight.tertiary,
          }),
          ...(ownerState.elevation === 6 && {
            ...materialUltrathinLight,
          }),
          ...(ownerState.elevation === 7 && {
            ...materialThinLight,
          }),
          ...(ownerState.elevation === 8 && {
            ...materialRegularLight,
          }),
          ...(ownerState.elevation &&
            ownerState.elevation === 9 && {
              ...materialThickLight,
            }),
        }),
      },
    },

    MuiBottomNavigation: {
      styleOverrides: {
        root: () => ({
          background: 'none',
        }),
      },
    },

    MuiBottomNavigationAction: {
      styleOverrides: {
        label: () => ({
          '&.Mui-selected': {
            fontSize: '0.75rem',
          },
        }),
      },
    },

    MuiDialog: {
      defaultProps: {
        PaperProps: {
          elevation: 8,
        },
      },
    },

    MuiTooltip: {
      defaultProps: {
        enterDelay: 1000,
      },
    },
  },
  shadows: Array(25).fill('none') as Shadows,
});

const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: blue.dark,
    },
    error: {
      main: red.dark,
    },
    warning: {
      main: orange.dark,
    },
    info: {
      main: cyan.dark,
    },
    success: {
      main: green.dark,
    },
    background: {
      default: '#000',
      paper: '#000',
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.elevation === 0 && {
            backgroundColor: backgroundDarkBase.primary,
          }),
          ...(ownerState.elevation === 1 && {
            backgroundColor: backgroundDarkBase.secondary,
          }),
          ...(ownerState.elevation === 2 && {
            backgroundColor: backgroundDarkBase.tertiary,
          }),
          ...(ownerState.elevation === 3 && {
            backgroundColor: backgroundDarkElevated.primary,
          }),
          ...(ownerState.elevation === 4 && {
            backgroundColor: backgroundDarkElevated.secondary,
          }),
          ...(ownerState.elevation === 5 && {
            backgroundColor: backgroundDarkElevated.tertiary,
          }),
          ...(ownerState.elevation === 6 && {
            ...materialUltrathinDark,
          }),
          ...(ownerState.elevation === 7 && {
            ...materialThinDark,
          }),
          ...(ownerState.elevation === 8 && {
            ...materialRegularDark,
          }),
          ...(ownerState.elevation &&
            ownerState.elevation === 9 && {
              ...materialThickDark,
            }),
        }),
      },
    },

    MuiBottomNavigation: {
      styleOverrides: {
        root: () => ({
          background: 'none',
        }),
      },
    },

    MuiBottomNavigationAction: {
      styleOverrides: {
        label: () => ({
          '&.Mui-selected': {
            fontSize: '0.75rem',
          },
        }),
      },
    },

    MuiDialog: {
      defaultProps: {
        PaperProps: {
          elevation: 8,
        },
      },
    },

    MuiTooltip: {
      defaultProps: {
        enterDelay: 1000,
      },
    },
  },
  shadows: Array(25).fill('none') as Shadows,
});

const makeTheme = (mode: PaletteMode): Theme =>
  mode === 'light' ? lightTheme : darkTheme;

export default makeTheme;
