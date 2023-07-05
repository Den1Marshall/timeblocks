import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import doWakeLock, { releaseWakeLock } from '../utils/wakeLock';
import { setWakeLock } from '../redux/slices/wakeLockSlice';

const WakeLock: FC = () => {
  const wakeLockEnabled = useSelector(
    (state: RootState) => state.wakeLockReducer.enabled
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (wakeLockEnabled) {
      doWakeLock();
      dispatch(setWakeLock(true));
    } else {
      releaseWakeLock();
      dispatch(setWakeLock(false));
    }
  }, [wakeLockEnabled, dispatch]);

  return null;
};

export default WakeLock;
