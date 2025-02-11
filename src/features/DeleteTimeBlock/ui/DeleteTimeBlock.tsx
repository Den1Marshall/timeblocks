'use client';
import { FC } from 'react';
import { deleteTimeBlock } from '../api/deleteTimeBlock';
import { deserializeTimeBlocks, ITimeBlock } from '@/entities/TimeBlock';
import { useAppSelector } from '@/app/redux';
import * as Sentry from '@sentry/nextjs';
import { toast } from '@/shared/ui';

export const DeleteTimeBlock: FC<Pick<ITimeBlock, 'id' | 'title'>> = ({
  id,
  title,
}) => {
  const timeBlocks = deserializeTimeBlocks(
    useAppSelector((state) => state.timeBlocksSliceReducer.timeBlocks)
  );
  const userUid = useAppSelector((state) => state.userSliceReducer.user!.uid);

  const handleDelete = async () => {
    try {
      await deleteTimeBlock(userUid, timeBlocks, id);
    } catch (error) {
      Sentry.captureException(error);

      toast({
        title: `Failed to delete TimeBlock ${title}`,
        color: 'danger',
      });
    }
  };

  return <span onClick={handleDelete}>Delete TimeBlock</span>;
};
