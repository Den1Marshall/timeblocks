'use client';

import { deserializeTimeBlocks } from '@/entities/TimeBlock';
import { FC, useEffect, useMemo } from 'react';
import { useAppSelector } from '../../redux';
import {
  getLocalTimeZone,
  isEqualDay,
  now,
  parseZonedDateTime,
} from '@internationalized/date';
import { resetTimeBlocks } from '@/features/ControlTimeBlock';
import { useSendNotification, useToast } from '@/shared/lib';
import { markNotified } from './markNotified';
import * as Sentry from '@sentry/nextjs';

export const TimeBlocksProvider: FC = () => {
  const user = useAppSelector((state) => state.userSliceReducer.user);
  const timeBlocks = deserializeTimeBlocks(
    useAppSelector((state) => state.timeBlocksSliceReducer.timeBlocks)
  );
  const sendNotification = useSendNotification();
  const toast = useToast();

  // Reset TimeBlocks every night
  useEffect(() => {
    if (!user?.uid) return;

    const resetOutdatedTimeBlocks = () => {
      const currentTime = now(getLocalTimeZone());

      const outdatedTimeBlocks = timeBlocks.filter(
        (timeBlock) =>
          !isEqualDay(parseZonedDateTime(timeBlock.lastUpdated), currentTime)
      );

      if (outdatedTimeBlocks.length > 0) resetTimeBlocks(user.uid, timeBlocks);
    };

    resetOutdatedTimeBlocks();

    // TODO: timeout for tonight instead of every 500ms interval
    const interval = setInterval(resetOutdatedTimeBlocks, 500);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') resetOutdatedTimeBlocks();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user?.uid, timeBlocks]);

  const finishedTimeBlocks = useMemo(() => {
    return timeBlocks.filter(
      (timeBlock) => timeBlock.elapsed.compare(timeBlock.duration) >= 0
    );
  }, [timeBlocks]);

  useEffect(() => {
    finishedTimeBlocks.forEach(async (timeBlock) => {
      if (timeBlock.isNotificationSent) return;

      try {
        await markNotified(user!.uid, timeBlocks, timeBlock.id);

        const TITLE = `TimeBlock ${timeBlock.title} is done!`;

        sendNotification(TITLE);
        toast({
          title: TITLE,
          color: 'primary',
        });
      } catch (error) {
        Sentry.captureException(error);
        // TODO: handle error for user?
      }
    });
  }, [finishedTimeBlocks, timeBlocks, user, sendNotification, toast]);

  useEffect(() => {
    if ('setAppBadge' in navigator) {
      navigator.setAppBadge(timeBlocks.length - finishedTimeBlocks.length);
    }
  }, [timeBlocks.length, finishedTimeBlocks.length]);

  return null;
};
