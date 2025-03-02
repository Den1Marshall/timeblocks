'use client';

import { Checkbox, Input } from '@heroui/react';
import { FC, RefObject, useEffect, useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { taskSchema } from '../../model/taskSchema';
import { useOnClickOutside } from 'usehooks-ts';
import { addNewTask } from '../../api/addNewTask';
import { Task } from '../../model/task';
import { useAppSelector } from '@/app/redux';
import { v4 as uuidv4 } from 'uuid';
import * as Sentry from '@sentry/nextjs';
import { useToast } from '@/shared/lib';

type FormData = z.infer<typeof taskSchema>;

interface AddNewTaskProps {
  onClose: () => void;
}

export const AddNewTask: FC<AddNewTaskProps> = ({ onClose }) => {
  const user = useAppSelector((state) => state.userSliceReducer.user!);
  const toast = useToast();

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isDirty },
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async ({ title, description }) => {
    const task: Task = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      isCompleted: false,
    };

    try {
      await addNewTask(user.uid, task);
    } catch (error) {
      Sentry.captureException(error);

      toast({ title: 'Failed to add new task', color: 'danger' });
    }
  };

  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  const formRef = useRef<HTMLFormElement>(null);
  useOnClickOutside(formRef as RefObject<HTMLElement>, async () => {
    if (isDirty) {
      handleSubmit(onSubmit)();
      onClose();
    } else {
      onClose();
    }
  });

  return (
    <article onClick={(e) => e.stopPropagation()} className='flex'>
      <Checkbox
        color='primary'
        isDisabled
        classNames={{ base: 'border-0', hiddenInput: 'hidden' }}
      />

      <form ref={formRef}>
        <Controller
          control={control}
          name='title'
          render={({ field }) => (
            <Input
              {...field}
              variant='underlined'
              placeholder='Title'
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
              classNames={{
                innerWrapper: 'pb-0',
                inputWrapper: '!pl-0 border-0 after:content-none',
                input: 'text-tiny',
              }}
              className='max-h-4 justify-center'
            />
          )}
        />
      </form>
    </article>
  );
};
