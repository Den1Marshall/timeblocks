'use client';
import { FC, useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { deserializeTimeBlocks, ITimeBlock } from '@/entities/TimeBlock';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { startTimeBlock } from '../api/startTimeBlock';
import { stopTimeBlock } from '../api/stopTimeBlock';
import { resetTimeBlock } from '../api/resetTimeBlock';
import { AnimatePresence, motion } from 'motion/react';
import { Button, Tooltip } from '@nextui-org/react';
import { FirebaseError } from 'firebase/app';
import { timeBlocksSliceActions } from '@/widgets/TimeBlocks';
import { variants } from './variants';
import { msToTime, timeToMs } from '@/shared/lib';
import { ResetIcon } from './ResetIcon';
import { tooltipProps } from '@/shared/ui';

interface ControlTimeBlockProps {
  timeBlock: ITimeBlock;
}

export const ControlTimeBlock: FC<ControlTimeBlockProps> = ({ timeBlock }) => {
  const dispatch = useAppDispatch();
  const userUid = useAppSelector((state) => state.userSliceReducer.user!.uid);
  const timeBlocks = deserializeTimeBlocks(
    useAppSelector((state) => state.timeBlocksSliceReducer.timeBlocks)
  );

  const isStarted = Boolean(timeBlock.timerStartTime);
  const [isStartedLocal, setIsStartedLocal] = useState(false);

  const isElapsed = timeToMs(timeBlock.elapsed) > 0;
  const isFinished = timeBlock.elapsed.compare(timeBlock.duration) >= 0;
  const isAnyOtherStarted = timeBlocks.find(
    (tb) => tb.id !== timeBlock.id && tb.timerStartTime
  )
    ? true
    : false;

  const timeBlockElapsedRef = useRef(timeBlock.elapsed);

  // Create web worker, terminate web worker on unmount.
  const workerRef = useRef<Worker>(undefined);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../model/worker.js', import.meta.url)
    );

    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, []);

  // Process messages from web worker, output errors if present.
  useEffect(() => {
    if (!workerRef.current) return;

    workerRef.current.onmessage = (ev) => {
      const diff = msToTime(ev.data + timeToMs(timeBlockElapsedRef.current));

      dispatch(
        timeBlocksSliceActions.setElapsed({
          id: timeBlock.id,
          elapsed: JSON.parse(
            JSON.stringify(
              timeBlockElapsedRef.current.set({ ...diff, millisecond: 0 })
            )
          ),
        })
      );
    };

    workerRef.current.onerror = (error) => alert(error); // TODO: use nextui alert
  }, [timeBlock.id, dispatch, timeBlockElapsedRef]);

  const handleStart = async (): Promise<void> => {
    if (!workerRef.current) return;

    const timerStartTime = Date.now();

    workerRef.current.postMessage({
      timerStartTime,
    });

    timeBlockElapsedRef.current = timeBlock.elapsed;

    setIsStartedLocal(true);

    try {
      await startTimeBlock(userUid, timeBlocks, timeBlock.id, timerStartTime);
    } catch (error) {
      setIsStartedLocal(false);

      if (error instanceof FirebaseError) {
        alert(error.code); // TODO: use nextui alert
      } else {
        alert(error);
      }
    }
  };

  const handleStop = async (): Promise<void> => {
    if (!workerRef.current) return;

    workerRef.current.postMessage(null);

    setIsStartedLocal(false);

    try {
      await stopTimeBlock(userUid, timeBlocks, timeBlock.id, timeBlock.elapsed);
    } catch (error) {
      setIsStartedLocal(true);

      if (error instanceof FirebaseError) {
        alert(error.code); // TODO: use nextui alert
      } else {
        alert(error);
      }
    }
  };

  const handleReset = async (): Promise<void> => {
    if (!workerRef.current) return;

    workerRef.current.postMessage(null);

    setIsStartedLocal(false);

    try {
      await resetTimeBlock(userUid, timeBlocks, timeBlock.id);
    } catch (error) {
      setIsStartedLocal(true);

      if (error instanceof FirebaseError) {
        alert(error.code); // TODO: use nextui alert
      } else {
        alert(error);
      }
    }
  };

  // Start or stop the timer on another device
  useEffect(() => {
    if (!workerRef.current) return;

    // Start the timer
    if (isStarted && !isStartedLocal) {
      console.log('Start the timer on this device'); //
      const timeoutWithServerLatency =
        1000 - (Date.now() - (timeBlock.timerStartTime ?? 0));

      workerRef.current.postMessage({
        timerStartTime: timeBlock.timerStartTime,
        timeoutWithServerLatency,
      });

      timeBlockElapsedRef.current = timeBlock.elapsed;

      setIsStartedLocal(true);
      return;
    }

    // Stop the timer
    if (!isStarted && isStartedLocal) {
      console.log('Stop the timer on this device'); //
      workerRef.current.postMessage(null);
      setIsStartedLocal(false);

      return;
    }
  }, [isStarted]);

  // Stop the timer if time is up.
  useEffect(() => {
    if (isStarted && isFinished) {
      handleStop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStarted, isFinished]);

  return (
    <AnimatePresence mode='popLayout' initial={false}>
      {!isFinished && (
        <motion.span
          key={0}
          layout
          variants={variants}
          initial='exit'
          animate='enter'
          exit='exit'
        >
          <Tooltip
            content={`${isStarted ? 'Stop' : 'Start'} TimeBlock "${
              timeBlock.title
            }"`}
            {...tooltipProps}
          >
            <Button
              isDisabled={isAnyOtherStarted}
              color='primary'
              isIconOnly
              aria-label={`${isStarted ? 'Stop' : 'Start'} TimeBlock "${
                timeBlock.title
              }"`}
              onPress={isStarted ? handleStop : handleStart}
            >
              <Icon isStarted={isStarted} />
            </Button>
          </Tooltip>
        </motion.span>
      )}

      {isElapsed && (
        <motion.span
          key={1}
          layout
          variants={variants}
          initial='exit'
          animate='enter'
          exit='exit'
        >
          <Tooltip
            content={`Reset TimeBlock "${timeBlock.title}"`}
            {...tooltipProps}
          >
            <Button
              isIconOnly
              aria-label={`Reset TimeBlock "${timeBlock.title}"`}
              onPress={handleReset}
            >
              <ResetIcon />
            </Button>
          </Tooltip>
        </motion.span>
      )}
    </AnimatePresence>
  );
};
