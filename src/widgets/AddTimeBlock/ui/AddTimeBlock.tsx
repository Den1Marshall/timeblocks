'use client';
import { useDisclosure, Button, Modal } from '@nextui-org/react';
import { FC, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { motion } from 'framer-motion';
import { AddIcon } from './AddIcon';
import { SetupTimeBlock } from '@/features/SetupTimeBlock';
import { addTimeBlock } from '../api/addTimeBlock';
import { ITimeBlock } from '@/entities/TimeBlock';

export const AddTimeBlock: FC = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [mobileHeight, setMobileHeight] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 640px)');

  const handleAddTimeBlock = async (timeBlock: ITimeBlock, userUid: string) => {
    await addTimeBlock(timeBlock, userUid);

    onClose();
  };

  useEffect(() => {
    setMobileHeight(modalRef.current?.getBoundingClientRect().height ?? 0); // TODO: refactor height calculations
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalRef.current]);
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

      <Modal
        shouldBlockScroll={false}
        ref={modalRef}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={
          isMobile
            ? {
                initial: { transform: `translateY(${mobileHeight}px)` },
                animate: { transform: `translateY(0px)` },
                exit: { transform: `translateY(${mobileHeight}px)` },
                transition: {
                  type: 'spring',
                  duration: 0.6,
                  bounce: 0,
                  restDelta: 0.0001,
                  restSpeed: 0.0001,
                },
              }
            : undefined
        }
        classNames={{
          base: 'max-sm:max-h-fit max-sm:min-w-full max-sm:pb-safe max-sm:mb-0 max-sm:mx-0',
          closeButton: 'max-sm:hidden',
        }}
      >
        <SetupTimeBlock
          label='Add new TimeBlock'
          onConfigured={handleAddTimeBlock}
        />
      </Modal>
    </>
  );
};
