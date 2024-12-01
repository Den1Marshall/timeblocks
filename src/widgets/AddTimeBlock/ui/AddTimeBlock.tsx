'use client';
import { useDisclosure, Button, Tooltip } from '@nextui-org/react';
import { FC } from 'react';
import { motion } from 'framer-motion';
import { AddIcon } from './AddIcon';
import { SetupTimeBlock } from '@/features/SetupTimeBlock';
import { addTimeBlock } from '../api/addTimeBlock';
import { ITimeBlock } from '@/entities/TimeBlock';
import { Modal } from '@/shared/ui';

export const AddTimeBlock: FC = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleAddTimeBlock = async (timeBlock: ITimeBlock, userUid: string) => {
    onClose();

    await addTimeBlock(timeBlock, userUid);
  };

  return (
    <>
      <motion.span
        layout
        className='w-96 aspect-video flex justify-center items-center'
      >
        <Tooltip
          content='Add new TimeBlock'
          showArrow
          color='primary'
          delay={1000}
          closeDelay={0}
        >
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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <SetupTimeBlock
          label='Add new TimeBlock'
          onConfigured={handleAddTimeBlock}
        />
      </Modal>
    </>
  );
};
