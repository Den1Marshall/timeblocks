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
import { Paper } from '@mui/material';
import { setSelectedTimeBlockId } from '../../redux/slices/selectedTimeBlockSlice';
import { useLongPress } from 'use-long-press';
import { animated, config, useSpring } from '@react-spring/web';
import { TimeBlock } from '../../utils/TimeBlock';

const AnimatedPaper = animated(Paper);

const TimeBlockComponent: FC<TimeBlock> = ({
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

  const handleContextClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isThisRunning || animateAppear) {
      e.preventDefault();

      return;
    } else {
      e.preventDefault();
      scaleUp();
    }
  };

  let timeout: number;

  const onLongPress = useLongPress(
    () => {
      null;
    },
    {
      detect: 'touch',
      cancelOnMovement: true,

      onStart: () => {
        if (isThisRunning || animateAppear) {
          return;
        }

        console.log('start');

        timeout = setTimeout(() => {
          scaleUp();
        }, 200);
      },

      onCancel: () => {
        clearTimeout(timeout);
        springApi.stop();
      },

      filterEvents: (e: React.TouchEvent) =>
        e.target === paperRef.current ? true : false,
    }
  );

  const paperRef = useRef<HTMLDivElement>(null);

  const [spring, springApi] = useSpring(
    () => ({
      from: {
        scale: 1,
      },

      reverse: selectedTimeBlockId === null,

      onRest(result) {
        if (result.finished && result.value.scale === 1) {
          return;
        }

        if (result.finished && selectedTimeBlockId === null) {
          dispatch(setSelectedTimeBlockId(id));
          return;
        }
      },
    }),
    [selectedTimeBlockId]
  );

  const scaleUp = () => {
    console.log('start');

    springApi.start({
      to: { scale: 1.1 },
      config: config.stiff,
    });
  };

  const [offset, setOffset] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (paperRef.current) {
      setOffset(
        paperRef.current.getBoundingClientRect().top +
          paperRef.current.getBoundingClientRect().height
      );
    }
  }, []);

  const [animateAppear, setAnimateAppear] = useState<boolean>(true);

  const [appearSpring, api] = useSpring(
    () => ({
      from: {
        transform: `translateY(-${offset || 0}px)`,
      },

      to: {
        transform: `translateY(0px)`,
      },

      onRest(result) {
        if (result.finished && result.value.transform === 'translateY(0px)') {
          setAnimateAppear(false);
        }

        if (
          result.finished &&
          result.value.transform === `translateY(-${offset}px)` &&
          deleted
        ) {
          dispatch(removeTimeBlock(id));
          return;
        }
      },
    }),
    [deleted, offset]
  );

  useLayoutEffect(() => {
    if (deleted && offset) {
      setAnimateAppear(true);

      api.start({
        to: [
          { transform: `translateY(10%)`, config: { tension: 300 } },
          { transform: `translateY(-${offset}px)` },
        ],
      });
    }
  }, [deleted]);

  // console.log('TB RENDER');
  return (
    <AnimatedPaper
      component={'article'}
      onContextMenu={handleContextClick}
      elevation={isThisRunning ? 9 : 6}
      {...onLongPress()}
      ref={paperRef}
      style={animateAppear ? appearSpring : spring}
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
        transform: `translateY(-${window.innerHeight}px)`,
      }}
    >
      <TimeBlockClose setDeleted={setDeleted} />
      <TimeBlockName name={name} />
      <TimeBlockBackground
        progressPercent={progressPercent}
        startTime={startTime}
        color={color}
      />
      <TimeBlockTime
        duration={duration}
        elapsed={elapsed}
        timeStart={timeStart}
        timeEnd={timeEnd}
      />
      <TimeBlockButtons
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
      />
    </AnimatedPaper>
  );
};

export default TimeBlockComponent;
