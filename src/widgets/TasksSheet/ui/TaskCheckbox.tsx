'use client';

import { Checkbox } from '@heroui/react';
import { FC } from 'react';
import { Task } from '../model/task';
import { useAppSelector } from '@/app/redux';
import { updateTaskCompletionStatus } from '../api/updateTaskCompletionStatus';
import * as Sentry from '@sentry/nextjs';
import { useToast } from '@/shared/lib';
import { AddNewTask } from './AddNewTask';
import { DeleteTaskButton } from './DeleteTaskButton';
import { AnimatePresence } from 'motion/react';
import { motion } from 'motion/react';

interface TaskCheckboxProps {
  task: Task;
  isEditing: Task['id'] | null;
  setIsEditing: (taskId: Task['id'] | null) => void;
  onAddNewTaskClose: () => void;
}

export const TaskCheckbox: FC<TaskCheckboxProps> = ({
  task,
  isEditing,
  setIsEditing,
  onAddNewTaskClose,
}) => {
  const user = useAppSelector((state) => state.userSliceReducer.user!);
  const toast = useToast();

  const { id, title, description, isCompleted } = task;

  const onCompletionChange = async (isCompleted: boolean) => {
    try {
      await updateTaskCompletionStatus(user.uid, id, isCompleted);
    } catch (error) {
      Sentry.captureException(error);

      toast({
        title: `Failed to mark task as ${
          isCompleted ? 'complete' : 'incomplete'
        }`,
        color: 'danger',
      });
    }
  };

  return (
    <AnimatePresence mode='wait'>
      {isEditing === task.id ? (
        <AddNewTask
          key='addNewTask'
          task={task}
          onClose={() => setIsEditing(null)}
        />
      ) : (
        <motion.article key='taskCheckbox' className='flex items-center'>
          <div
            className='flex items-center'
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              color='primary'
              isSelected={isCompleted}
              onValueChange={onCompletionChange}
              classNames={{ hiddenInput: 'hidden' }}
            />

            <div
              onClick={() => {
                setIsEditing(task.id);
                onAddNewTaskClose();
              }}
              className={`motion-safe:transition-opacity motion-safe:duration-500 motion-safe:ease-in-out ${
                isCompleted ? 'opacity-disabled' : ''
              }`}
            >
              <p>{title}</p>

              {description && (
                <p className='text-tiny opacity-hover'>{description}</p>
              )}
            </div>
          </div>

          <DeleteTaskButton taskId={task.id} />
        </motion.article>
      )}
    </AnimatePresence>
  );
};
