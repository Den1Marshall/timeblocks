import { FC, memo, useEffect } from 'react';
import { setIsRunning } from '../../redux/slices/isRunningSlice';
import { Button, Stack } from '@mui/material';

import PauseIcon from '@mui/icons-material/Pause';
import DoneIcon from '@mui/icons-material/Done';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import sendNotif from '../../utils/notification';
import dayjs from 'dayjs';

interface TimeBlockButtonsProps {
  done: boolean;
  started: boolean;
  paused: boolean;
  notStarted: boolean;
  id: number;
  timeStart: dayjs.Dayjs;
  timeEnd: dayjs.Dayjs;
  duration: number;
  elapsed: number;
  worker: Worker;
  name: string;
  setStartTime: (time: number | null) => void;
}

const compareProps = (
  p: TimeBlockButtonsProps,
  n: TimeBlockButtonsProps
): boolean => {
  return (
    p.done === n.done &&
    p.started === n.started &&
    p.paused === n.paused &&
    p.notStarted === n.notStarted &&
    p.id === n.id &&
    p.timeStart === n.timeStart &&
    p.timeEnd === n.timeEnd &&
    p.elapsed !== n.elapsed &&
    p.setStartTime === n.setStartTime
  );
};

let notifSent = false;

const TimeBlockButtons: FC<TimeBlockButtonsProps> = memo(
  ({
    done,
    started,
    id,
    setStartTime,
    paused,
    notStarted,
    duration,
    elapsed,
    worker,
    name,
  }) => {
    const dispatch = useDispatch();

    const isRunningState = useSelector(
      (state: RootState) => state.isRunningSlice
    );

    // const [resetBtnSpring, resetBtnSpringApi] = useSpring(() => ({
    //   scale: 1,
    // }));

    // const [btnSpring, btnSpringApi] = useSpring(() => ({
    //   transform: `translateX(0px)`,
    //   scale: 1,
    // }));

    const handleStart = () => {
      if (done) {
        // console.log('DONE');

        return;
      }

      if (notStarted) {
        // console.log('START');

        dispatch(
          setIsRunning({
            isRunning: true,
            timeBlockId: id,
          })
        );

        const currentTime = Date.now() - elapsed;

        worker.postMessage({
          duration,
          startTime: currentTime - elapsed,
          isRunning: isRunningState.isRunning,
        });

        setStartTime(currentTime - elapsed);

        return;
      }

      if (paused) {
        // console.log('ELAPSED TIME: ', elapsed);

        dispatch(
          setIsRunning({
            isRunning: true,
            timeBlockId: id,
          })
        );

        worker.postMessage({
          duration,
          startTime: Date.now() - elapsed,
          isRunning: isRunningState.isRunning,
        });

        setStartTime(Date.now() - elapsed);

        return;
      }
    };

    const handlePause = () => {
      if (started && !done) {
        // console.log('PAUSE');
        worker.postMessage({
          duration,
          startTime: null,
        });
        setStartTime(null);

        dispatch(
          setIsRunning({
            isRunning: false,
            timeBlockId: id,
          })
        );
      }
    };

    const handleReset = () => {
      // console.log('RESET');

      dispatch(
        setIsRunning({
          isRunning: false,
          timeBlockId: id,
        })
      );

      setStartTime(null);

      notifSent = false;

      worker.postMessage({
        startTime: null,
        reset: true,
        isRunning: false,
      });
    };

    useEffect(() => {
      if (done && !notifSent) {
        sendNotif(name);
        notifSent = true;
      }
    }, [done, name]);

    // console.log('render');

    return (
      <Stack direction={'row'} spacing={2}>
        <Button
          color={done ? 'success' : 'primary'}
          variant={
            done ? 'contained' : paused || notStarted ? 'contained' : 'outlined'
          }
          onClick={() => {
            if (isRunningState.isRunning && done) {
              handleStart();
              return;
            } else if (isRunningState.isRunning) {
              handlePause();
              return;
            } else {
              handleStart();
            }
          }}
          disabled={
            isRunningState.isRunning && isRunningState.timeBlockId !== id
          }
        >
          {done ? (
            <DoneIcon />
          ) : isRunningState.isRunning && isRunningState.timeBlockId === id ? (
            <PauseIcon />
          ) : (
            <PlayArrowIcon />
          )}
        </Button>
        <Button
          disabled={
            !started ||
            (isRunningState.isRunning && isRunningState.timeBlockId !== id)
          }
          variant='contained'
          onClick={handleReset}
        >
          Reset
        </Button>
      </Stack>
    );
  },
  compareProps
);

export default TimeBlockButtons;
