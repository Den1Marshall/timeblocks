'use client';

import { useDisclosure, Button, Tooltip } from '@heroui/react';
import { FC } from 'react';
import { motion } from 'motion/react';
import { AddIcon } from './AddIcon';
import { SetupTimeBlock } from '@/features/SetupTimeBlock';
import { addTimeBlock } from '../api/addTimeBlock';
import { TimeBlock } from '@/entities/timeBlock';
import { defaultTransition, Sheet, tooltipProps } from '@/shared/ui';
import * as Sentry from '@sentry/nextjs';
import { useToast } from '@/shared/lib';
import { User } from '@/entities/user';

export const AddTimeBlock: FC = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const toast = useToast();

  const handleAddTimeBlock = async (
    timeBlock: TimeBlock,
    userUid: User['uid']
  ) => {
    onClose();

    try {
      await addTimeBlock(userUid, timeBlock);
    } catch (error) {
      Sentry.captureException(error);

      toast({ title: 'Failed to add TimeBlock', color: 'danger' });
    }
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
