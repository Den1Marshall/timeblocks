'use client';
import { FC } from 'react';
import { deleteTimeBlock } from '../api/deleteTimeBlock';
import { FirebaseError } from 'firebase/app';
import { deserializeTimeBlocks } from '@/entities/TimeBlock';
import { useAppSelector } from '@/app/redux';

interface DeleteTimeBlockProps {
  timeBlockId: string;
}

export const DeleteTimeBlock: FC<DeleteTimeBlockProps> = ({ timeBlockId }) => {
  const timeBlocks = deserializeTimeBlocks(
    useAppSelector((state) => state.timeBlocksSliceReducer.timeBlocks)
  );
  const userUid = useAppSelector((state) => state.userSliceReducer.user!.uid);

  const handleDelete = async () => {
    try {
      await deleteTimeBlock(userUid, timeBlocks, timeBlockId);
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(error.code); // TODO: use heroui alert
      } else {
        alert(error);
      }
    }
  };

  return <span onClick={handleDelete}>Delete TimeBlock</span>;
};
