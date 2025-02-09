'use client';
import { auth } from '@/shared/config';
import { modalMotionProps } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react';
import { FirebaseError } from 'firebase/app';
import { sendPasswordResetEmail } from 'firebase/auth';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodSchema } from '../model/zodSchema';
import { stopPropagate } from '@/shared/lib';
import * as Sentry from '@sentry/nextjs';

interface FormData {
  email: string;
}
export const ForgotPassword: FC = () => {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    shouldUnregister: true,
    resolver: zodResolver(zodSchema),
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    onClose: reset,
  });

  const onSubmit: SubmitHandler<FormData> = async ({ email }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      // TODO: use heroui alert for success
    } catch (error) {
      Sentry.captureException(error);

      if (error instanceof FirebaseError) {
        setError('root', { type: 'custom', message: error.code });
      } else {
        setError('root', {
          type: 'custom',
          message: 'Something went wrong',
        });
      }
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        variant='light'
        color='danger'
        size='sm'
        className='hover:bg-transparent hover:opacity-50 self-start'
      >
        Forgot password?
      </Button>

      <Modal
        placement='center'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop='blur'
        motionProps={modalMotionProps}
      >
        <ModalContent>
          <form onSubmit={stopPropagate(handleSubmit(onSubmit))}>
            <ModalHeader>Reset password</ModalHeader>

            <ModalBody>
              <Controller
                control={control}
                name='email'
                render={({ field }) => (
                  <Input
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
            </ModalBody>

            <ModalFooter>
              <Button
                isDisabled={isSubmitSuccessful}
                isLoading={isSubmitting}
                color={isSubmitSuccessful ? 'success' : 'primary'}
                type='submit'
              >
                Reset password
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
