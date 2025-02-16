'use client';

import { useDisclosure, Button, Tooltip } from '@heroui/react';
import { FC } from 'react';
import { motion } from 'motion/react';
import { AddIcon } from './AddIcon';
import { SetupTimeBlock } from '@/features/SetupTimeBlock';
import { addTimeBlock } from '../api/addTimeBlock';
import { deserializeTimeBlocks, ITimeBlock } from '@/entities/TimeBlock';
import { defaultTransition, Sheet, tooltipProps } from '@/shared/ui';
import { useAppSelector } from '@/app/redux';

export const AddTimeBlock: FC = () => {
  const timeBlocks = deserializeTimeBlocks(
    useAppSelector((state) => state.timeBlocksSliceReducer.timeBlocks)
  );

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleAddTimeBlock = async (timeBlock: ITimeBlock, userUid: string) => {
    onClose();

    await addTimeBlock(userUid, timeBlocks, timeBlock);
  };

  return (
    <>
      <motion.span
        layout
        transition={{ ...defaultTransition, visualDuration: 0.3, bounce: 0.2 }}
        className='w-96 aspect-video flex justify-center items-center'
      >
        <Tooltip content='Add new TimeBlock' {...tooltipProps}>
          <Button
            color='primary'
            isIconOnly
            aria-label='Add new TimeBlock'
            onPress={onOpen}
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </motion.span>

      <Sheet isOpen={isOpen} onOpenChange={onOpenChange}>
        <SetupTimeBlock
          label='Add new TimeBlock'
          onConfigured={handleAddTimeBlock}
          timeBlockToEdit={null}
        />
      </Sheet>
    </>
  );
};
