'use client';

import { useAppSelector } from '@/app/redux';
import { FC, useEffect } from 'react';
import {
  getLocalTimeZone,
  isEqualDay,
  now,
  parseZonedDateTime,
} from '@internationalized/date';
import { resetTimeBlocks } from '@/features/ControlTimeBlock';

export const ResetOutdatedTimeBlocks: FC = () => {
  const user = useAppSelector((state) => state.userSliceReducer.user);
  const timeBlocks = useAppSelector(
    (state) => state.timeBlocksSliceReducer.timeBlocks
  );

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

  return null;
};
