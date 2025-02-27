'use client';

import { FC } from 'react';
import { deleteTimeBlock } from '../api/deleteTimeBlock';
import { ITimeBlock } from '@/entities/TimeBlock';
import { useAppSelector } from '@/app/redux';
import * as Sentry from '@sentry/nextjs';
import { useToast } from '@/shared/lib';

export const DeleteTimeBlock: FC<Pick<ITimeBlock, 'id' | 'title'>> = ({
  id,
  title,
}) => {
  const userUid = useAppSelector((state) => state.userSliceReducer.user!.uid);
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await deleteTimeBlock(userUid, id);
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
