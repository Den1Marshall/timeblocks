'use client';

import { Button, Checkbox } from '@heroui/react';
import { FC } from 'react';
import { Task } from '../../model/task';
import { deleteTask } from '../../api/deleteTask';
import { useAppSelector } from '@/app/redux';
import { TrashIcon } from '@/shared/ui';
import { updateTaskCompletionStatus } from '../../api/updateTaskCompletionStatus';
import * as Sentry from '@sentry/nextjs';
import { useToast } from '@/shared/lib';

interface TaskCheckboxProps {
  task: Task;
}

export const TaskCheckbox: FC<TaskCheckboxProps> = ({ task }) => {
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

  const handleDeleteTask = async () => {
    try {
      await deleteTask(user.uid, id);
    } catch (error) {
      Sentry.captureException(error);

      toast({ title: 'Failed to delete task', color: 'danger' });
    }
  };

  return (
    <article onClick={(e) => e.stopPropagation()} className='flex'>
      <Checkbox
        color='primary'
        isSelected={isCompleted}
        onValueChange={onCompletionChange}
        classNames={{
          hiddenInput: 'hidden',
        }}
      />

      <div
        className={`motion-safe:transition-opacity motion-safe:duration-500 motion-safe:ease-in-out ${
          isCompleted ? 'opacity-disabled' : ''
        }`}
      >
        <p>{title}</p>

        {description && (
          <p className='text-tiny opacity-hover'>{description}</p>
        )}
      </div>

      <Button
        isIconOnly
        variant='light'
        size='sm'
        color='danger'
        onPress={handleDeleteTask}
        className='ml-auto'
      >
        <TrashIcon />
      </Button>
    </article>
  );
};
