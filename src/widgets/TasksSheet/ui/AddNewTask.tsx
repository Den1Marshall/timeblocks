'use client';

import { Checkbox, Input } from '@heroui/react';
import { FC, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { taskSchema } from '../model/taskSchema';
import { addTask } from '../api/addTask';
import { Task } from '../model/task';
import { useAppSelector } from '@/app/redux';
import { v4 as uuidv4 } from 'uuid';
import * as Sentry from '@sentry/nextjs';
import { useToast } from '@/shared/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateTask } from '../api/updateTask';
import { getLocalTimeZone, now } from '@internationalized/date';
import { DeleteTaskButton } from './DeleteTaskButton';
import { motion, Variants } from 'motion/react';

type FormData = z.infer<typeof taskSchema>;

interface AddNewTaskProps {
  task?: Task;
  isAnimated?: boolean;
  onClose: () => void;
}

export const AddNewTask: FC<AddNewTaskProps> = ({
  task,
  isAnimated,
  onClose,
}) => {
  const user = useAppSelector((state) => state.userSliceReducer.user!);
  const toast = useToast();

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isDirty },
  } = useForm<FormData>({
    defaultValues: {
      title: task?.title ?? '',
      description: task?.description ?? '',
    },
    resolver: zodResolver(taskSchema),
  });

  const handleAddTask = async ({ title, description }: FormData) => {
    const task: Task = {
      id: uuidv4(),
      createdAt: now(getLocalTimeZone()).toString(),
      title: title.trim(),
      description: description.trim(),
      isCompleted: false,
    };

    try {
      await addTask(user.uid, task);
    } catch (error) {
      Sentry.captureException(error);

      toast({ title: 'Failed to add task', color: 'danger' });
    }
  };

  const handleEditTask = async ({ title, description }: FormData) => {
    if (!task) return;

    try {
      await updateTask(user.uid, { ...task, title, description });
    } catch (error) {
      Sentry.captureException(error);

      toast({ title: 'Failed to edit task', color: 'danger' });
    }
  };

  const onSubmit: SubmitHandler<FormData> = async ({ title, description }) => {
    if (task) {
      await handleEditTask({
        title,
        description,
      });
    } else {
      await handleAddTask({
        title,
        description,
      });
    }

    onClose();
  };

  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  const variants: Variants = {
    enter: {
      opacity: 1,
    },

    exit: (isAnimated: boolean) =>
      isAnimated ? { opacity: 0 } : { opacity: 1, transition: { duration: 0 } },
  };

  return (
    <motion.article
      key='addNewTask'
      layout
      variants={variants}
      initial={isAnimated ? 'exit' : false}
      animate='enter'
      exit='exit'
      custom={isAnimated}
      onAnimationStart={(definition) => {
        if (definition === 'exit' && isDirty) handleSubmit(onSubmit)();
      }}
      className='flex items-center'
    >
      <Checkbox
        color='primary'
        isDisabled={!task?.id}
        classNames={{ hiddenInput: 'hidden' }}
      />

      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex flex-col items-center'
      >
        <Controller
          control={control}
          name='title'
          render={({ field }) => (
            <Input
              {...field}
              variant='underlined'
              spellCheck='true'
              classNames={{
                innerWrapper: 'pb-0',
                inputWrapper: '!pl-0 border-0 after:content-none',
                input: 'text-medium',
              }}
              className='max-h-6 justify-center'
            />
          )}
        />

        <Controller
          control={control}
          name='description'
          render={({ field }) => (
            <Input
              {...field}
              variant='underlined'
              placeholder='Description'
              spellCheck='true'
              classNames={{
                innerWrapper: 'pb-0',
                inputWrapper: '!pl-0 border-0 after:content-none',
                input: 'text-tiny opacity-hover',
              }}
              className='max-h-4 justify-center'
            />
          )}
        />
      </form>

      {task?.id && <DeleteTaskButton taskId={task.id} />}
    </motion.article>
  );
};
