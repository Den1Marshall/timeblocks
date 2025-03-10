'use client';

import { FC } from 'react';
import { SetupTimeBlock } from '@/features/SetupTimeBlock';
import { editTimeBlock } from '../api/editTimeBlock';
import { deserializeTimeBlock, TimeBlock } from '@/entities/timeBlock';
import { Sheet } from '@/shared/ui';
import { useDisclosure } from '@heroui/react';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { timeBlocksSliceActions } from '@/widgets/TimeBlocks';
import * as Sentry from '@sentry/nextjs';
import { useToast } from '@/shared/lib';
import { User } from '@/entities/user';

export const EditTimeBlock: FC = () => {
  const dispatch = useAppDispatch();
  let timeBlockToEdit = useAppSelector(
    (state) => state.timeBlocksSliceReducer.timeBlockToEdit
  );
  const toast = useToast();

  if (timeBlockToEdit) timeBlockToEdit = deserializeTimeBlock(timeBlockToEdit); // ???

  const { isOpen, onClose } = useDisclosure({
    isOpen: !!timeBlockToEdit,
    onClose: () => dispatch(timeBlocksSliceActions.setTimeBlockToEdit(null)),
  });

  const handleEditTimeBlock = async (
    timeBlock: TimeBlock,
    userUid: User['uid']
  ) => {
    dispatch(timeBlocksSliceActions.setTimeBlockToEdit(null));

    try {
      await editTimeBlock(userUid, timeBlock);
    } catch (error) {
      Sentry.captureException(error);

      toast({ title: 'Failed to edit TimeBlock', color: 'danger' });
    }
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
