import { FC, useEffect, useMemo, useState } from 'react';
import TimeBlockBackground from './TimeBlockBackground';
import { useDispatch, useSelector } from 'react-redux';
import { updateTimeBlock } from '../../redux/slices/timeBlocksSlice';
import TimeBlockName from './TimeBlockName';
import TimeBlockTime from './TimeBlockTime';
import { setIsRunning } from '../../redux/slices/isRunningSlice';
import { RootState } from '../../redux/store';
import { Paper, Stack, Theme, useMediaQuery, useTheme } from '@mui/material';
import { setSelectedTimeBlockId } from '../../redux/slices/selectedTimeBlockSlice';
import { useLongPress } from 'use-long-press';
import { animated, useSpring } from '@react-spring/web';
import { TimeBlock } from '../../utils/TimeBlock';
import sendNotif from '../../utils/notification';
import dayjs from 'dayjs';

const AnimatedPaper = animated(Paper);

let notifSent = false;

const HomeTimeBlock: FC<TimeBlock> = ({
  id,
  name,
  timeStart,
  timeEnd,
  duration,
  color,
  progressPercent,
  elapsed,
}) => {
  const dispatch = useDispatch();

  const tb = useSelector((state: RootState) =>
    state.timeBlocksReducer.timeBlocks.find((timeBlock) => timeBlock.id === id)
  );

  if (tb) {
    id = tb.id;
    name = tb.name;
    timeStart = tb.timeStart;
    timeEnd = tb.timeEnd;
    duration = tb.duration;
    color = tb.color;
    progressPercent = tb.progressPercent;
    elapsed = tb.elapsed;
  }

  const isRunning = useSelector((state: RootState) => state.isRunningSlice);

  const selectedTimeBlockId = useSelector(
    (state: RootState) => state.selectedTimeBlockSlice.id
  );

  const isThisRunning = isRunning.isRunning && isRunning.timeBlockId === id;

  const [startTime, setStartTime] = useState<number | null>(null);
  // const [deleted, setDeleted] = useState<boolean>(false);

  const worker = useMemo(() => {
    const worker = new Worker(new URL('./timeBlockWorker', import.meta.url), {
      type: 'module',
    });

    worker.onmessage = ({ data }: MessageEvent) => {
      dispatch(
        updateTimeBlock({
          id,
          elapsed: data.elapsed,
          progressPercent: data.progressPercent,
        })
      );
    };

    return worker;
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      worker.terminate();

      dispatch(
        setIsRunning({
          isRunning: false,
          timeBlockId: null,
        })
      );
    };
  }, [dispatch, worker]);

  useEffect(() => {
    if (progressPercent === 100) {
      dispatch(
        setIsRunning({
          isRunning: false,
          timeBlockId: null,
        })
      );
    }
  }, [progressPercent, dispatch]);

  const isRunningState = useSelector(
    (state: RootState) => state.isRunningSlice
  );

  const done = progressPercent === 100;
  const started = elapsed > 0;
  const paused = startTime === null && elapsed > 0;
  const notStarted = startTime === null && elapsed === 0;

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

  let startOffsetInMinutes: number | null = null;

  if (dayjs(timeStart).minute() > 0) {
    startOffsetInMinutes = dayjs(timeStart).minute() * 0.125;
  }

  const durationInMinutes = duration / 1000 / 60;
  let height: null | number = null;

  if (durationInMinutes > 30) {
    height = durationInMinutes / 8;
  }

  const handleContextClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isThisRunning) {
      e.preventDefault();

      return;
    } else {
      e.preventDefault();
      dispatch(setSelectedTimeBlockId(id));
    }
  };

  const onLongPress = useLongPress(
    () => {
      if (isThisRunning) {
        return;
      } else {
        dispatch(setSelectedTimeBlockId(id));
      }
    },
    {
      detect: 'touch',
      cancelOnMovement: true,
      threshold: 250,
    }
  );

  const [spring] = useSpring(
    () => ({
      height: `${height || 3.75}vh`,
      top: `${startOffsetInMinutes || 0}vh`,
    }),
    [height, top]
  );

  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const theme = useTheme();

  // console.log('TB RENDER');
  return (
    <AnimatedPaper
      // component={'article'}
      onContextMenu={handleContextClick}
      elevation={7}
      {...onLongPress()}
      style={spring}
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
      onDoubleClick={handleReset}
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'auto',
        textAlign: 'center',
        width: '100%',
        cursor: 'pointer',
        backgroundColor: selectedTimeBlockId === id ? color : undefined,
        transition: `background-color ${
          selectedTimeBlockId === id
            ? theme.transitions.duration.enteringScreen
            : theme.transitions.duration.leavingScreen
        }ms ${theme.transitions.easing.easeInOut}`,
        px: 3,
        pb: mobile ? 0.5 : undefined,
      }}
    >
      {/* <TimeBlockClose setDeleted={setDeleted} /> */}
      <Stack
        width={'100%'}
        height={'100%'}
        alignItems={mobile ? 'center' : 'flex-start'}
        direction={mobile ? 'column' : 'row'}
        justifyContent={mobile ? undefined : 'space-between'}
      >
        <TimeBlockName name={name} variant='subtitle1' />
        <TimeBlockTime
          duration={duration}
          elapsed={elapsed}
          timeStart={timeStart}
          timeEnd={timeEnd}
          variant='subtitle2'
        />
      </Stack>
      <TimeBlockBackground
        progressPercent={progressPercent}
        startTime={startTime}
        color={color}
      />
    </AnimatedPaper>
  );
};

export default HomeTimeBlock;
