'use client';
import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from '@nextui-org/react';
import { FC } from 'react';
import { Variants, motion } from 'framer-motion';
import { sendPasswordResetEmail } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { ArrowLeftIcon } from './ArrowLeftIcon';
import { auth } from '@/shared/firebase';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '../model/zodSchema';

interface LoginForgotPasswordProps {
  setIsOpen: (value: boolean) => void;
}

interface FormData {
  email: string;
}

export const LoginForgotPassword: FC<LoginForgotPasswordProps> = ({
  setIsOpen,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async ({ email }) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError('root', { type: 'custom', message: error.code });
      } else {
        setError('root', {
          type: 'custom',
          message: 'Something has went wrong',
        });
      }
    }
  };

  const variants: Variants = {
    enter: {
      transform: 'translateX(0%)',
    },
    exit: {
      transform: 'translateX(100%)',
    },
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      variants={variants}
      initial='exit'
      animate='enter'
      exit='exit'
      className='flex flex-col absolute top-0 left-0 w-full h-full'
    >
      <CardHeader className='flex items-center gap-1'>
        <Button
          isIconOnly
          aria-label='go back to login'
          variant='light'
          onPress={() => setIsOpen(false)}
          className='absolute'
        >
          <ArrowLeftIcon />
        </Button>
        <span className='mx-auto text-xl'>Reset Password</span>
      </CardHeader>
      <CardBody>
        <Controller
          control={control}
          name='email'
          render={({ field }) => (
            <Input
              isDisabled={isSubmitSuccessful}
              type='email'
              placeholder='Enter your email'
              isClearable
              onClear={() => setValue('email', '')}
              isInvalid={Boolean(errors.email?.message)}
              errorMessage={errors.email?.message}
              {...field}
            />
          )}
        />

        {errors.root && (
          <p role='alert' className='text-danger self-start'>
            Error: {errors.root?.message}
          </p>
        )}
      </CardBody>
      <CardFooter className='mt-auto'>
        <Button
          type='submit'
          isLoading={isSubmitting}
          fullWidth
          color={isSubmitSuccessful ? 'success' : 'primary'}
        >
          {isSubmitSuccessful ? 'Sent' : 'Send'}
        </Button>
      </CardFooter>
    </motion.form>
  );
};
