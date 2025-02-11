'use client';
import { FC, useEffect, useRef } from 'react';
import { Icon } from './icons/Icon';
import { deserializeTimeBlocks, ITimeBlock } from '@/entities/TimeBlock';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { startTimeBlock } from '../api/startTimeBlock';
import { stopTimeBlock } from '../api/stopTimeBlock';
import { resetTimeBlock } from '../api/resetTimeBlock';
import { AnimatePresence, motion } from 'motion/react';
import { Button, Tooltip } from '@heroui/react';
import { timeBlocksSliceActions } from '@/widgets/TimeBlocks';
import { variants } from './variants';
import { msToTime, timeToMs, useSendNotification } from '@/shared/lib';
import { ResetIcon } from './icons/ResetIcon';
import { toast, tooltipProps } from '@/shared/ui';
import { Time } from '@internationalized/date';
import * as Sentry from '@sentry/nextjs';

interface ControlTimeBlockProps {
  timeBlock: ITimeBlock;
}

export const ControlTimeBlock: FC<ControlTimeBlockProps> = ({ timeBlock }) => {
  const dispatch = useAppDispatch();
  const userUid = useAppSelector((state) => state.userSliceReducer.user!.uid);
  const timeBlocks = deserializeTimeBlocks(
    useAppSelector((state) => state.timeBlocksSliceReducer.timeBlocks)
  );
  const sendNotification = useSendNotification();

  const isStarted = Boolean(timeBlock.timerStartTime);
  const isElapsed = timeToMs(timeBlock.elapsed) > 0;
  const isFinished = timeBlock.elapsed.compare(timeBlock.duration) >= 0;
  const isAnyOtherStarted = timeBlocks.find(
    (tb) => tb.id !== timeBlock.id && tb.timerStartTime
  )
    ? true
    : false;

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
      const diff = msToTime(ev.data + timeToMs(timeBlock.serverElapsed));

      dispatch(
        timeBlocksSliceActions.setElapsed({
          id: timeBlock.id,
          elapsed: JSON.parse(
            JSON.stringify(timeBlock.elapsed.set({ ...diff, millisecond: 0 }))
          ),
        })
      );
    };

    workerRef.current.onerror = () =>
      toast({
        title: `Failed to start TimeBlock ${timeBlock.title}`,
        color: 'danger',
      });
  }, [
    dispatch,
    timeBlock.elapsed,
    timeBlock.id,
    timeBlock.serverElapsed,
    timeBlock.title,
  ]);

  const startWorker = (timerStartTime: number): void => {
    if (!workerRef.current) return;

    workerRef.current.postMessage({
      timerStartTime,
    });
  };

  const stopWorker = (): void => {
    if (!workerRef.current) return;

    workerRef.current.postMessage(null);
  };

  const handleStart = async (): Promise<void> => {
    const timerStartTime = Date.now();

    startWorker(timerStartTime);

    try {
      await startTimeBlock(userUid, timeBlocks, timeBlock.id, timerStartTime);
    } catch (error) {
      Sentry.captureException(error);

      stopWorker();

      toast({
        title: `Failed to start TimeBlock ${timeBlock.title}`,
        color: 'danger',
      });
    }
  };

  const handleStop = async (elapsed?: Time): Promise<void> => {
    stopWorker();

    try {
      await stopTimeBlock(
        userUid,
        timeBlocks,
        timeBlock.id,
        elapsed ?? timeBlock.elapsed
      );
    } catch (error) {
      Sentry.captureException(error);

      if (timeBlock.timerStartTime) startWorker(timeBlock.timerStartTime);

      toast({
        title: `Failed to stop TimeBlock ${timeBlock.title}`,
        color: 'danger',
      });
    }
  };

  const handleReset = async (): Promise<void> => {
    try {
      await resetTimeBlock(userUid, timeBlocks, timeBlock.id);
    } catch (error) {
      Sentry.captureException(error);

      toast({
        title: `Failed to reset TimeBlock ${timeBlock.title}`,
        color: 'danger',
      });
    }
  };

  useEffect(() => {
    if (timeBlock.timerStartTime) {
      startWorker(timeBlock.timerStartTime);
    } else {
      stopWorker();
    }
  }, [timeBlock.timerStartTime, isFinished]);

  // Stop the timer if time is up.
  useEffect(() => {
    if (isStarted && isFinished) {
      const TITLE = `TimeBlock ${timeBlock.title} is done!`;

      handleStop(timeBlock.duration);

      sendNotification(TITLE);
      toast({
        title: TITLE,
        color: 'primary',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isFinished,
    isStarted,
    timeBlock.duration,
    sendNotification,
    timeBlock.title,
  ]);

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
              onPress={() => {
                if (isStarted) {
                  handleStop();
                } else {
                  handleStart();
                }
              }}
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
