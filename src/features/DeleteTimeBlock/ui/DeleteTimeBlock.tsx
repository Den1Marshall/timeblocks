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
      error instanceof FirebaseError ? alert(error.code) : alert(error); // TODO: use nextui alert
    }
  };

  return <span onClick={handleDelete}>Delete TimeBlock</span>;
};
