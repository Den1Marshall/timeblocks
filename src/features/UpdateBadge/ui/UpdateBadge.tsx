'use client';

import { useAppSelector } from '@/app/redux';
import { deserializeTimeBlocks } from '@/entities/TimeBlock';
import { FC, useEffect } from 'react';

export const UpdateBadge: FC = () => {
  const timeBlocks = deserializeTimeBlocks(
    useAppSelector((state) => state.timeBlocksSliceReducer.timeBlocks)
  );

  useEffect(() => {
    const completedCount = timeBlocks.filter(
      (timeBlock) => timeBlock.elapsed.compare(timeBlock.duration) >= 0
    ).length;

    navigator.setAppBadge(completedCount);
  }, [timeBlocks]);

  return null;
};
