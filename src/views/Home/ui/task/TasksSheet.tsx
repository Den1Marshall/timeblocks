'use client';

import { Sheet } from '@/shared/ui';
import {
  Button,
  Divider,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
} from '@heroui/react';
import { FC, useState } from 'react';
import { BarsIcon } from './BarsIcon';
import { useAppSelector } from '@/app/redux';
import { TaskCheckbox } from './TaskCheckbox';
import { AddNewTask } from './AddNewTask';
import { AnimatePresence, motion } from 'motion/react';

export const TasksSheet: FC = () => {
  const tasks = useAppSelector((state) => state.tasksSliceReducer.tasks);
  const [isBlocked, setIsBlocked] = useState(false);

  const {
    isOpen: isAddNewTaskOpen,
    onOpen: onAddNewTaskOpen,
    onClose: onAddNewTaskClose,
  } = useDisclosure({
    onOpen() {
      setIsBlocked(true);
    },
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    onClose: () => {
      onAddNewTaskClose();
      setIsBlocked(false);
    },
  });

  return (
    <>
      <Button isIconOnly aria-label='Tasks' variant='light' onPress={onOpen}>
        <BarsIcon />
      </Button>

      <Sheet isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className='justify-between'>Tasks</DrawerHeader>{' '}
          {/* TODO: h2? */}
          <DrawerBody
            onClick={() => {
              if (isAddNewTaskOpen) {
                onAddNewTaskClose();
              } else {
                if (!isBlocked) {
                  onAddNewTaskOpen();
                }
              }
            }}
          >
            <AnimatePresence mode='popLayout' initial={false}>
              {tasks.length === 0 && !isAddNewTaskOpen ? (
                <motion.p
                  key={0}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='font-medium text-foreground-500 text-center my-auto'
                >
                  All tasks for today are completed
                </motion.p>
              ) : (
                tasks.map((task) => (
                  <motion.div
                    layout
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={task.id}
                  >
                    <TaskCheckbox task={task} />

                    <Divider className='mt-2' />
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            <AnimatePresence
              mode='popLayout'
              onExitComplete={() => setIsBlocked(false)}
            >
              {isAddNewTaskOpen && (
                <motion.span
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <AddNewTask onClose={onAddNewTaskClose} />

                  <Divider className='mt-2' />
                </motion.span>
              )}
            </AnimatePresence>
          </DrawerBody>
        </DrawerContent>
      </Sheet>
    </>
  );
};
