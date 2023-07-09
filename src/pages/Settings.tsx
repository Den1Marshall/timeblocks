import {
  Button,
  Checkbox,
  Container,
  Divider,
  Paper,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  resetDefaultColorMode,
  setColorMode,
  toggleColorMode,
  toggleWatchUserColorMode,
} from '../redux/slices/colorModeSlice';
import {
  resetDefaultWakeLock,
  setWakeLock,
} from '../redux/slices/wakeLockSlice';
import { isWakelogSupported } from '../utils/wakeLock';
import { clearTimeBlocks } from '../redux/slices/timeBlocksSlice';

const Settings: FC = () => {
  const dispatch = useDispatch();

  const checked =
    useSelector((state: RootState) => state.colorModeReducer.colorMode) ===
    'dark'
      ? true
      : false;

  const defaultChecked = useSelector(
    (state: RootState) => state.colorModeReducer.watchUser
  );

  const [wakeLockChecked, setWakeLockChecked] = useState<boolean>(
    useSelector((state: RootState) => state.wakeLockReducer.enabled)
  );

  const handleChange = () => {
    dispatch(toggleColorMode());
  };

  const handleCheckboxChange = () => {
    dispatch(toggleWatchUserColorMode(!defaultChecked));
  };

  const handleWakeLockChange = () => {
    dispatch(setWakeLock(!wakeLockChecked));
    setWakeLockChecked(!wakeLockChecked);
  };

  useEffect(() => {
    if (defaultChecked) {
      dispatch(
        setColorMode(
          window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
        )
      );

      const watchChange = (e: MediaQueryListEvent) => {
        console.log(e.matches);

        dispatch(setColorMode(e.matches ? 'dark' : 'light'));
      };

      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', watchChange);
    }
  }, [defaultChecked, dispatch, wakeLockChecked]);

  const resetDefaults = () => {
    dispatch(resetDefaultWakeLock());
    dispatch(resetDefaultColorMode());
  };

  return (
    <Paper square sx={{ textAlign: 'center', pt: 3 }}>
      <Container fixed>
        <Typography variant='h4' component={'h1'} mb={3}>
          Settings (work in progress)
        </Typography>
        <Stack direction={'row'} alignItems={'center'} gap={2}>
          <Typography>Dark mode</Typography>
          <Switch
            onChange={handleChange}
            checked={checked}
            disabled={defaultChecked}
          />
        </Stack>
        <Divider />
        <Stack direction={'row'} alignItems={'center'} gap={2}>
          <Typography>Watch user</Typography>
          <Checkbox checked={defaultChecked} onChange={handleCheckboxChange} />
        </Stack>
        <Divider />
        <Stack direction={'row'} alignItems={'center'}>
          <Typography>Disable screen lock</Typography>
          <Checkbox
            checked={wakeLockChecked}
            disabled={!isWakelogSupported()}
            onChange={handleWakeLockChange}
          />
        </Stack>
        <Divider />
        <Stack direction={'row'} mt={2} spacing={2}>
          <Button color='error' variant='contained' onClick={resetDefaults}>
            Reset settings
          </Button>
          <Button
            color='error'
            variant='contained'
            onClick={() => {
              dispatch(clearTimeBlocks());
            }}
          >
            Clear Time Blocks
          </Button>
          <Button
            color='error'
            variant='contained'
            onClick={() => {
              localStorage.clear();
              location.reload();
            }}
          >
            RESET ALL
          </Button>
        </Stack>
        <Typography mt={10} color={'info.main'}>
          v1.0.0-pre-alpha
        </Typography>
      </Container>
    </Paper>
  );
};

export default Settings;
