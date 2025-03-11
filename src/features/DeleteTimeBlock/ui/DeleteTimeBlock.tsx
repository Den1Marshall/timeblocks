'use client';

import { FC } from 'react';
import { deleteTimeBlock } from '../api/deleteTimeBlock';
import { TimeBlock } from '@/entities/timeBlock';
import { useAppSelector } from '@/app/redux';
import * as Sentry from '@sentry/nextjs';
import { addToast } from '@heroui/react';

type DeleteTimeBlockProps = Pick<TimeBlock, 'id' | 'title'>;

export const DeleteTimeBlock: FC<DeleteTimeBlockProps> = ({ id, title }) => {
  const userUid = useAppSelector((state) => state.userSliceReducer.user!.uid);

  const handleDelete = async () => {
    try {
      await deleteTimeBlock(userUid, id);
    } catch (error) {
      Sentry.captureException(error);

      addToast({
        title: `Failed to delete TimeBlock ${title}`,
        color: 'danger',
      });
    }
  };

  return <span onClick={handleDelete}>Delete TimeBlock</span>;
};
