import { FC, useEffect, useMemo, useState } from 'react';
import TimeBlockBackground from './TimeBlockBackground';
import { useDispatch, useSelector } from 'react-redux';
import { updateTimeBlock } from '../../redux/slices/timeBlocksSlice';
import TimeBlockName from './TimeBlockName';
import TimeBlockTime from './TimeBlockTime';
import TimeBlockButtons from './TimeBlockButtons';
import { setIsRunning } from '../../redux/slices/isRunningSlice';
import TimeBlockClose from './TimeBlockClose';
import { RootState } from '../../redux/store';
import TimeBlockPaper from './TimeBlockPaper';

interface TimeBlockComponentProps {
  tbId: number;
}

const TimeBlockComponent: FC<TimeBlockComponentProps> = ({ tbId }) => {
  const isRunning = useSelector((state: RootState) => state.isRunningSlice);

  const {
    id,
    time,
    elapsed,
    minutes,
    seconds,
    hours,
    progressPercent,
    color,
    name,
  } = useSelector(
    (state: RootState) =>
      state.timeBlocksReducer.timeBlocks.find((tb) => tb.id === tbId)!
  );

  const dispatch = useDispatch();

  const [startTime, setStartTime] = useState<number | null>(null);
  const isThisRunning = isRunning.isRunning && isRunning.timeBlockId === id;
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
          minutes: data.minutes,
          seconds: data.seconds,
          hours: data.hours,
          progressPercent: data.progressPercent,
        })
      );
    };

    return worker;
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      worker.terminate();

      // console.log('WORKER TERMINATED');

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

  // console.log('TB RENDER');

  return (
    <TimeBlockPaper isThisRunning={isThisRunning} deleted={deleted}>
      <TimeBlockClose id={id} setDeleted={setDeleted} />
      <TimeBlockName name={name} />
      <TimeBlockBackground
        progressPercent={progressPercent}
        startTime={startTime}
        color={color}
      />
      <TimeBlockTime
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        time={time}
      />
      <TimeBlockButtons
        done={progressPercent === 100}
        started={elapsed > 0}
        paused={startTime === null && elapsed > 0}
        notStarted={startTime === null && elapsed === 0}
        time={time}
        elapsed={elapsed}
        setStartTime={setStartTime}
        id={id}
        worker={worker}
        name={name}
      />
    </TimeBlockPaper>
  );
};

export default TimeBlockComponent;
