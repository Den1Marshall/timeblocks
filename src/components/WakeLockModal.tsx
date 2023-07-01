import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Link,
  Stack,
  useTheme,
} from '@mui/material';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleModalVisibility } from '../redux/slices/modalsSlice';
import { isWakelogSupported } from '../utils/wakeLock';

const WakeLockModal: FC = () => {
  const stateOpen = useSelector(
    (state: RootState) => state.modalsReducer.modals[0].visible
  );

  const theme = useTheme();

  const dispatch = useDispatch();

  const [open, setOpen] = useState<boolean>(stateOpen);

  const wakeLogSupported = isWakelogSupported();

  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonClick = () => {
    setOpen(false);
    dispatch(
      toggleModalVisibility({
        name: 'wakeLock',
        visible: false,
      })
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} TransitionComponent={Fade}>
      <DialogTitle>Please, note!</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <DialogContentText>
            Time Blocks app supports disabling auto-locking your screen while
            you in the app.
          </DialogContentText>
          <DialogContentText>
            If your OS or browser version is equal or bigger your screen will
            not lock during app usage. Link for all supported devices:{' '}
            <Link
              href='https://caniuse.com/?search=wake%20lock'
              target='_blank'
              rel='noopener noreferrer'
            >
              click
            </Link>
          </DialogContentText>
          <DialogContentText>
            And if your device is supported you can also toggle this option in
            settings.
          </DialogContentText>
        </Stack>
        <DialogContentText
          textAlign={'center'}
          mt={4}
          color={
            wakeLogSupported
              ? theme.palette.success.main
              : theme.palette.warning.main
          }
        >
          {wakeLogSupported
            ? 'Your device is supported ✅'
            : 'Your device is not supported ❌'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='error' fullWidth onClick={handleButtonClick}>
          Do not show anymore
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WakeLockModal;
