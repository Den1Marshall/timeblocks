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
import React, { FC, useState } from 'react';
import { BarsIcon } from './BarsIcon';
import { useAppSelector } from '@/app/redux';
import { TaskCheckbox } from './TaskCheckbox';
import { AddNewTask } from './AddNewTask';
import { AnimatePresence, motion } from 'motion/react';
import { Task } from '../model/task';

export const TasksSheet: FC = () => {
  const tasks = useAppSelector((state) => state.tasksSliceReducer.tasks);

  const {
    isOpen: isAddNewTaskOpen,
    onOpen: onAddNewTaskOpen,
    onClose: onAddNewTaskClose,
  } = useDisclosure();

  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    onClose: () => {
      onAddNewTaskClose();
    },
  });

  const [isEditing, setIsEditing] = useState<Task['id'] | null>(null);

  return (
    <>
      <Button isIconOnly aria-label='Tasks' variant='light' onPress={onOpen}>
        <BarsIcon />
      </Button>

      <Sheet isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>Tasks</DrawerHeader>

          <DrawerBody
            onClick={() => {
              if (isAddNewTaskOpen) {
                onAddNewTaskClose();
              } else {
                if (isEditing) {
                  setIsEditing(null);
                } else {
                  onAddNewTaskOpen();
                }
              }
            }}
          >
            <AnimatePresence mode='popLayout' initial={false}>
              {tasks.length === 0 && !isAddNewTaskOpen ? (
                <motion.p
                  key='text'
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
                    layout='preserve-aspect'
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={task.id}
                  >
                    <TaskCheckbox
                      task={task}
                      isEditing={isEditing}
                      setIsEditing={setIsEditing}
                      onAddNewTaskClose={onAddNewTaskClose}
                    />

                    <Divider className='mt-2' />
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            <AnimatePresence mode='popLayout'>
              {isAddNewTaskOpen && (
                <div key='addNewTask'>
                  <AddNewTask isAnimated onClose={onAddNewTaskClose} />
                </div>
              )}
            </AnimatePresence>
          </DrawerBody>
        </DrawerContent>
      </Sheet>
    </>
  );
};
