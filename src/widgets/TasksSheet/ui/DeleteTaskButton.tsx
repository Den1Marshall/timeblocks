'use client';

import { Button } from '@heroui/react';
import { FC } from 'react';
import { deleteTask } from '../api/deleteTask';
import { useAppSelector } from '@/app/redux';
import { Task } from '../model/task';
import * as Sentry from '@sentry/nextjs';
import { useToast } from '@/shared/lib';
import { TrashIcon } from '@/shared/ui';

interface DeleteTaskButtonProps {
  taskId: Task['id'];
}

export const DeleteTaskButton: FC<DeleteTaskButtonProps> = ({ taskId }) => {
  const user = useAppSelector((state) => state.userSliceReducer.user!);
  const toast = useToast();

  const handleDeleteTask = async () => {
    try {
      await deleteTask(user.uid, taskId);
    } catch (error) {
      Sentry.captureException(error);

      toast({ title: 'Failed to delete task', color: 'danger' });
    }
  };

  return (
    <Button
      isIconOnly
      variant='light'
      size='sm'
      color='danger'
      onPress={(e) => {
        e.continuePropagation();
        handleDeleteTask();
      }}
      className='ml-auto'
    >
      <TrashIcon />
    </Button>
  );
};
