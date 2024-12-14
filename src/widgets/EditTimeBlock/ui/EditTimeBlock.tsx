'use client';
import { FC } from 'react';
import { SetupTimeBlock } from '@/features/SetupTimeBlock';
import { editTimeBlock } from '../api/editTimeBlock';
import { deserializeTimeBlocks, ITimeBlock } from '@/entities/TimeBlock';
import { Modal } from '@/shared/ui';
import { useDisclosure } from '@nextui-org/react';
import { useAppSelector } from '@/app/redux';

interface EditTimeBlockProps {
  timeBlockToEdit: ITimeBlock | null;
  setTimeBlockToEdit: (timeBlock: ITimeBlock | null) => void;
}

export const EditTimeBlock: FC<EditTimeBlockProps> = ({
  timeBlockToEdit,
  setTimeBlockToEdit,
}) => {
  const timeBlocks = deserializeTimeBlocks(
    useAppSelector((state) => state.timeBlocksSliceReducer.timeBlocks)
  );

  const { isOpen, onClose } = useDisclosure({
    isOpen: !!timeBlockToEdit,
    onClose: () => setTimeBlockToEdit(null),
  });

  const handleEditTimeBlock = async (
    timeBlock: ITimeBlock,
    userUid: string
  ) => {
    setTimeBlockToEdit(null);

    await editTimeBlock(userUid, timeBlocks, timeBlock);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop='blur'>
      <SetupTimeBlock
        label={'Edit TimeBlock'}
        timeBlockToEdit={timeBlockToEdit}
        onConfigured={handleEditTimeBlock}
      />
    </Modal>
  );
};
