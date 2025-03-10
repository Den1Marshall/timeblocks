'use client';

import { FC, useState } from 'react';
import { SettingsButton } from '../../SettingsButton/SettingsButton';
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
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { modalMotionProps, TogglePasswordVisibilityButton } from '@/shared/ui';
import { verifyBeforeUpdateEmail } from 'firebase/auth';
import { useAppSelector } from '@/app/redux';
import { reauthenticateUser } from '@/entities/user';
import { auth } from '@/shared/config';
import { FirebaseError } from 'firebase/app';
import { AnimatePresence, motion } from 'motion/react';
import { ChangeSuccess } from '../ChangeSuccess/ChangeSuccess';
import { zodResolver } from '@hookform/resolvers/zod';
import { zodSchema } from './zodSchema';
import { GoogleProviderModal } from '../GoogleProviderModal/GoogleProviderModal';
import { ForgotPassword } from '../ForgotPassword/ui/ForgotPassword';
import * as Sentry from '@sentry/nextjs';

interface ChangeEmailProps {
  isGoogleProvider: boolean;
}

interface FormData {
  newEmail: string;
  password: string;
}

export const ChangeEmail: FC<ChangeEmailProps> = ({ isGoogleProvider }) => {
  const user = useAppSelector((state) => state.userSliceReducer.user)!;

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

  const onSubmit: SubmitHandler<FormData> = async ({ newEmail, password }) => {
    try {
      if (!auth.currentUser) throw new Error('Current user is null');

      await reauthenticateUser(auth.currentUser, user.email!, password);
      await verifyBeforeUpdateEmail(auth.currentUser, newEmail);
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
    onClose: () => {
      setIsPasswordVisible(false);
      reset();
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  if (isGoogleProvider) {
    return (
      <>
        <SettingsButton value={user.email ?? ''} onPress={onOpen}>
          Email address
        </SettingsButton>

        <GoogleProviderModal
          for='email'
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
        />
      </>
    );
  }

  return (
    <>
      <SettingsButton value={user.email ?? ''} onPress={onOpen}>
        Email address
      </SettingsButton>

      <Modal
        placement='center'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop='blur'
        motionProps={modalMotionProps}
      >
        <ModalContent>
          <AnimatePresence initial={false} mode='popLayout'>
            {isSubmitSuccessful ? (
              <ChangeSuccess
                key='success'
                title='Check your email'
                onClose={onClose}
              >
                <p>
                  A verification email has been sent to your new email address.
                </p>
                <p>Please verify it to login with the new email.</p>
              </ChangeSuccess>
            ) : (
              <motion.form
                key='form'
                onSubmit={handleSubmit(onSubmit)}
                initial={{ transform: 'translateX(100%)' }}
                animate={{ transform: 'translateX(0%)' }}
                exit={{ transform: 'translateX(-100%)' }}
              >
                <ModalHeader>Change email address</ModalHeader>

                <ModalBody>
                  <Controller
                    control={control}
                    name='newEmail'
                    render={({ field }) => (
                      <Input
                        type='email'
                        placeholder='New email'
                        isClearable
                        onClear={() => setValue('newEmail', '')}
                        errorMessage={errors.newEmail?.message}
                        isInvalid={Boolean(errors.newEmail?.message)}
                        {...field}
                      />
                    )}
                  />

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

                  {errors.root && (
                    <p role='alert' className='text-danger self-start'>
                      Error: {errors.root?.message}
                    </p>
                  )}

                  <ForgotPassword />
                </ModalBody>

                <ModalFooter>
                  <Button onPress={onClose} variant='light' color='danger'>
                    Cancel
                  </Button>

                  <Button
                    type='submit'
                    color='primary'
                    isLoading={isSubmitting}
                  >
                    Save
                  </Button>
                </ModalFooter>
              </motion.form>
            )}
          </AnimatePresence>
        </ModalContent>
      </Modal>
    </>
  );
};
