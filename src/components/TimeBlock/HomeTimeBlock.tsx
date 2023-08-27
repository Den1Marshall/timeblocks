import {
  FC,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import TimeBlockBackground from './TimeBlockBackground';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeTimeBlock,
  updateTimeBlock,
} from '../../redux/slices/timeBlocksSlice';
import TimeBlockName from './TimeBlockName';
import TimeBlockTime from './TimeBlockTime';
import TimeBlockButtons from './TimeBlockButtons';
import { setIsRunning } from '../../redux/slices/isRunningSlice';
import TimeBlockClose from './TimeBlockClose';
import { RootState } from '../../redux/store';
import {
  Paper,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { setSelectedTimeBlockId } from '../../redux/slices/selectedTimeBlockSlice';
import { useLongPress } from 'use-long-press';
import { animated, config, useSpring } from '@react-spring/web';
import { TimeBlock } from '../../utils/TimeBlock';
import sendNotif from '../../utils/notification';
import dayjs from 'dayjs';

const AnimatedPaper = animated(Paper);

let notifSent = false;

interface HomeTimeBlockProps extends TimeBlock {
  date: dayjs.Dayjs;
}

const HomeTimeBlock: FC<HomeTimeBlockProps> = ({
  id,
  name,
  timeStart,
  timeEnd,
  duration,
  color,
  progressPercent,
  elapsed,
  date,
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
  const [deleted, setDeleted] = useState<boolean>(false);

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

  const durationInMinutes = duration / 1000 / 60;
  let height: null | number = null;

  if (durationInMinutes > 30) {
    height = durationInMinutes / 6;
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
      threshold: 500,
    }
  );

  const [spring] = useSpring(
    () => ({
      backgroundColor: selectedTimeBlockId === id ? color : 'none',
      height: `${height || 5}vh`,
    }),
    [height, selectedTimeBlockId]
  );

  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  // console.log('TB RENDER');
  return (
    <AnimatedPaper
      // component={'article'}
      onContextMenu={handleContextClick}
      elevation={1}
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 2 / 1,
        gap: 1.5,
        overflow: 'auto',
        textAlign: 'center',
        width: '100%',
        height: `${height || 4}vh`,
        cursor: 'pointer',
        backgroundColor: selectedTimeBlockId === id ? color : undefined,
      }}
    >
      {/* <TimeBlockClose setDeleted={setDeleted} /> */}
      <Stack
        px={3}
        width={'100%'}
        direction={mobile ? 'column' : 'row'}
        justifyContent={'space-between'}
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
      {/* <TimeBlockButtons
        done={progressPercent === 100}
        started={elapsed > 0}
        paused={startTime === null && elapsed > 0}
        notStarted={startTime === null && elapsed === 0}
        timeStart={timeStart}
        timeEnd={timeEnd}
        elapsed={elapsed}
        duration={duration}
        setStartTime={setStartTime}
        id={id}
        worker={worker}
        name={name}
      /> */}
    </AnimatedPaper>
  );
};

export default HomeTimeBlock;
