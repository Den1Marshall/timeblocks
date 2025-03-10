'use client';

import { FC, useEffect } from 'react';
import { Icon } from './icons/Icon';
import {
  deserializeTimeBlocks,
  TimeBlock,
  useTimeBlockElapsed,
} from '@/entities/timeBlock';
import { useAppSelector } from '@/app/redux';
import { startTimeBlock } from '../api/startTimeBlock';
import { stopTimeBlock } from '../api/stopTimeBlock';
import { resetTimeBlock } from '../api/resetTimeBlock';
import { AnimatePresence, motion } from 'motion/react';
import { Button, Tooltip } from '@heroui/react';
import { variants } from './variants';
import { timeToMs, useToast } from '@/shared/lib';
import { ResetIcon } from './icons/ResetIcon';
import { tooltipProps } from '@/shared/ui';
import { Time } from '@internationalized/date';
import * as Sentry from '@sentry/nextjs';

interface ControlTimeBlockProps {
  timeBlock: TimeBlock;
}

export const ControlTimeBlock: FC<ControlTimeBlockProps> = ({ timeBlock }) => {
  const userUid = useAppSelector((state) => state.userSliceReducer.user!.uid);
  const timeBlocks = deserializeTimeBlocks(
    useAppSelector((state) => state.timeBlocksSliceReducer.timeBlocks)
  );
  const timeBlockElapsed = useTimeBlockElapsed(
    timeBlock.timerStartTime,
    timeBlock.elapsed
  );
  const toast = useToast();

  const isStarted = Boolean(timeBlock.timerStartTime);
  const isElapsed = timeToMs(timeBlockElapsed) > 0;
  const isFinished = timeBlockElapsed.compare(timeBlock.duration) >= 0;
  const isAnyOtherStarted = timeBlocks.find(
    (tb) => tb.id !== timeBlock.id && tb.timerStartTime
  )
    ? true
    : false;

  const handleStart = async (): Promise<void> => {
    const timerStartTime = Date.now();

    try {
      await startTimeBlock(userUid, timeBlock.id, timerStartTime);
    } catch (error) {
      Sentry.captureException(error);

      toast({
        title: `Failed to start TimeBlock ${timeBlock.title}`,
        color: 'danger',
      });
    }
  };

  const handleStop = async (elapsed?: Time): Promise<void> => {
    if (!timeBlock.timerStartTime) return;

    try {
      await stopTimeBlock(userUid, timeBlock.id, elapsed ?? timeBlockElapsed);
    } catch (error) {
      Sentry.captureException(error);

      toast({
        title: `Failed to stop TimeBlock ${timeBlock.title}`,
        color: 'danger',
      });
    }
  };

  const handleReset = async (): Promise<void> => {
    try {
      await resetTimeBlock(userUid, timeBlock.id);
    } catch (error) {
      Sentry.captureException(error);

      toast({
        title: `Failed to reset TimeBlock ${timeBlock.title}`,
        color: 'danger',
      });
    }
  };

  // Stop the timer if time is up.
  useEffect(() => {
    if (isStarted && isFinished) handleStop(timeBlock.duration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished, isStarted, timeBlock.duration]);

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
