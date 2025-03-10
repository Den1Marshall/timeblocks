'use client';

import { FC, useState } from 'react';
import { SettingsButton } from '../../SettingsButton/SettingsButton';
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { modalMotionProps, TogglePasswordVisibilityButton } from '@/shared/ui';
import { deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/shared/config';
import { useAppSelector } from '@/app/redux';
import { deleteUser } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { reauthenticateUser } from '@/entities/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { googleZodSchema, zodSchema } from './zodSchema';
import { useRouter } from 'next/navigation';
import { ForgotPassword } from '../ForgotPassword/ui/ForgotPassword';
import * as Sentry from '@sentry/nextjs';

interface DeleteAccountProps {
  isGoogleProvider: boolean;
}

interface FormData {
  email: string;
  password: string;
  isConfirmed: string;
}

export const DeleteAccount: FC<DeleteAccountProps> = ({ isGoogleProvider }) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.userSliceReducer.user!);

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    shouldUnregister: true,
    resolver: zodResolver(isGoogleProvider ? googleZodSchema : zodSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    try {
      if (!auth.currentUser) throw new Error('Current user is null');

      await reauthenticateUser(auth.currentUser, email, password);

      await deleteDoc(doc(db, 'users', user.uid));

      await deleteUser(auth.currentUser);

      await fetch('/api/logout');

      router.refresh();
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

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure({
    onClose: reset,
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <>
      <SettingsButton color='danger' onPress={onOpen}>
        Delete account
      </SettingsButton>

      <Modal
        placement='center'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop='blur'
        motionProps={modalMotionProps}
      >
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Delete account</ModalHeader>

            <ModalBody>
              {!isGoogleProvider && (
                <Controller
                  control={control}
                  name='email'
                  render={({ field }) => (
                    <Input
                      type='email'
                      placeholder='Email'
                      isClearable
                      onClear={() => setValue('email', '')}
                      errorMessage={errors.email?.message}
                      isInvalid={Boolean(errors.email?.message)}
                      {...field}
                    />
                  )}
                />
              )}

              {!isGoogleProvider && (
                <Controller
                  control={control}
                  name='password'
                  render={({ field }) => (
                    <Input
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder='Password'
                      errorMessage={errors.password?.message}
                      isInvalid={Boolean(errors.password?.message)}
                      endContent={
                        <TogglePasswordVisibilityButton
                          isVisible={isPasswordVisible}
                          setIsVisible={setIsPasswordVisible}
                        />
                      }
                      {...field}
                    />
                  )}
                />
              )}

              {!isGoogleProvider && <ForgotPassword />}

              <Controller
                control={control}
                name='isConfirmed'
                render={({ field }) => (
                  <Checkbox
                    isInvalid={Boolean(errors.isConfirmed?.message)}
                    {...field}
                  >
                    I understand that deleted account isn&apos;t recoverable
                  </Checkbox>
                )}
              />

              {errors.root && (
                <p role='alert' className='text-danger self-start'>
                  Error: {errors.root?.message}
                </p>
              )}
            </ModalBody>

            <ModalFooter>
              <Button variant='light' color='danger' onPress={onClose}>
                Cancel
              </Button>

              <Button type='submit' isLoading={isSubmitting} color='primary'>
                Delete account
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
