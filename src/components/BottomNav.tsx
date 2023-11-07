import { FC, useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  useTheme,
} from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const BottomNav: FC = () => {
  const defineActive = () => {
    switch (window.location.pathname) {
      case '/':
        return 0;
      case '/my-blocks':
        return 1;
      case '/settings':
        return 2;
      default:
        return 0;
    }
  };
  const [active, setActive] = useState<number | null>(defineActive());

  const isRunning = useSelector(
    (state: RootState) => state.isRunningSlice.isRunning
  );

  const theme = useTheme();

  const bg =
    theme.palette.mode === 'dark'
      ? {
          background: 'rgba(0, 0, 0, 0.75)',
          backgroundBlendMode: 'hard-light',
          boxShadow:
            '0px -0.33000001311302185px 0px 0px rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(25px)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }
      : {
          background: 'rgba(255, 255, 255, 0.75)',
          backgroundBlendMode: 'hard-light',
          boxShadow: '0px -0.33000001311302185px 0px 0px rgba(0, 0, 0, 0.30)',
          backdropFilter: 'blur(25px)',
        };

  return (
    <Box
      sx={{
        zIndex: 1,
        position: 'fixed',
        bottom: 0,
        width: '100%',
        pb: 'env(safe-area-inset-bottom)',
        ...bg,
      }}
    >
      <BottomNavigation
        component={'nav'}
        value={active}
        onChange={(_event, newValue) => {
          setActive(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction
          component={Link}
          to={'/'}
          label={'Home'}
          icon={<HomeIcon />}
          disableRipple
          disabled={isRunning}
          sx={{ opacity: isRunning ? '0.4' : '', transition: 'none' }}
        />
        <BottomNavigationAction
          component={Link}
          to={'/my-blocks'}
          label={'My Blocks'}
          icon={<ViewModuleIcon />}
          disableRipple
          disabled={isRunning}
          sx={{ opacity: isRunning ? '0.4' : '', transition: 'none' }}
        />
        <BottomNavigationAction
          component={Link}
          to={'/settings'}
          label={'Settings'}
          icon={<SettingsIcon />}
          disableRipple
          disabled={isRunning}
          sx={{ opacity: isRunning ? '0.4' : '', transition: 'none' }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default BottomNav;
