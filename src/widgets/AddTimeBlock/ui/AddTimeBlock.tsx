'use client';
import { useDisclosure, Button } from '@nextui-org/react';
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
    await addTimeBlock(timeBlock, userUid);

    onClose();
  };

  return (
    <>
      <motion.span
        layout
        className='w-96 aspect-video flex justify-center items-center'
      >
        <Button
          color='primary'
          isIconOnly
          aria-label='Add new TimeBlock'
          onPress={onOpen}
        >
          <AddIcon />
        </Button>
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
