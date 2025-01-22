'use client';
import { FC } from 'react';
import { SetupTimeBlock } from '@/features/SetupTimeBlock';
import { editTimeBlock } from '../api/editTimeBlock';
import {
  deserializeTimeBlock,
  deserializeTimeBlocks,
  ITimeBlock,
} from '@/entities/TimeBlock';
import { Sheet } from '@/shared/ui';
import { useDisclosure } from '@heroui/react';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { timeBlocksSliceActions } from '@/widgets/TimeBlocks';

export const EditTimeBlock: FC = () => {
  const dispatch = useAppDispatch();
  const timeBlocks = deserializeTimeBlocks(
    useAppSelector((state) => state.timeBlocksSliceReducer.timeBlocks)
  );
  let timeBlockToEdit = useAppSelector(
    (state) => state.timeBlocksSliceReducer.timeBlockToEdit
  );

  if (timeBlockToEdit) timeBlockToEdit = deserializeTimeBlock(timeBlockToEdit); // ???

  const { isOpen, onClose } = useDisclosure({
    isOpen: !!timeBlockToEdit,
    onClose: () => dispatch(timeBlocksSliceActions.setTimeBlockToEdit(null)),
  });

  const handleEditTimeBlock = async (
    timeBlock: ITimeBlock,
    userUid: string
  ) => {
    dispatch(timeBlocksSliceActions.setTimeBlockToEdit(null));

    await editTimeBlock(userUid, timeBlocks, timeBlock);
  };

  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
      <SetupTimeBlock
        label={'Edit TimeBlock'}
        timeBlockToEdit={timeBlockToEdit}
        onConfigured={handleEditTimeBlock}
      />
    </Sheet>
  );
};
