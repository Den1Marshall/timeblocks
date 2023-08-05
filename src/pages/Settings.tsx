import {
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  resetDefaultColorMode,
  setColorMode,
  setWatchUser,
} from '../redux/slices/colorModeSlice';
import {
  resetDefaultWakeLock,
  setWakeLock,
} from '../redux/slices/wakeLockSlice';
import { isWakelogSupported } from '../utils/wakeLock';
import { clearTimeBlocks } from '../redux/slices/timeBlocksSlice';

const Settings: FC = () => {
  const dispatch = useDispatch();

  const colorModeSlice = useSelector(
    (state: RootState) => state.colorModeReducer
  );

  const [wakeLockChecked, setWakeLockChecked] = useState<boolean>(
    useSelector((state: RootState) => state.wakeLockReducer.enabled)
  );

  const handleWakeLockChange = () => {
    dispatch(setWakeLock(!wakeLockChecked));
    setWakeLockChecked(!wakeLockChecked);
  };

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
        <Stack
          direction={'row'}
          display={'flex'}
          alignItems={'center'}
          spacing={2}
        >
          <Typography>Theme:</Typography>
          <ButtonGroup>
            <Button
              variant={
                colorModeSlice.colorMode === 'system' ? 'contained' : 'outlined'
              }
              onClick={() => dispatch(setWatchUser())}
            >
              System
            </Button>
            <Button
              variant={
                colorModeSlice.colorMode === 'light' ? 'contained' : 'outlined'
              }
              onClick={() => dispatch(setColorMode('light'))}
            >
              Light
            </Button>
            <Button
              variant={
                colorModeSlice.colorMode === 'dark' ? 'contained' : 'outlined'
              }
              onClick={() => dispatch(setColorMode('dark'))}
            >
              Dark
            </Button>
          </ButtonGroup>
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
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          <Typography>Always enabled MyBlocks page animation</Typography>
          <Checkbox title='Always enabled MyBlocks page animation' />
        </Stack>
        <Button
          variant='contained'
          onClick={() => {
            Notification.requestPermission()
              .then((res) => alert(res))
              .catch((err) => alert(`ERR: ${err}`));
          }}
        >
          Enable notif
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            navigator.setAppBadge(12).catch((err) => console.log(err));
          }}
        >
          badge 12
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            navigator.clearAppBadge();
          }}
        >
          badge none
        </Button>
        <Typography mt={10} color={'info.main'}>
          v2.0.0-pre-alpha
        </Typography>
      </Container>
    </Paper>
  );
};

export default Settings;
