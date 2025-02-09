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
import { updatePassword } from 'firebase/auth';
import { useAppSelector } from '@/app/redux';
import { reauthenticateUser } from '@/entities/User';
import { auth } from '@/shared/config';
import { FirebaseError } from 'firebase/app';
import { AnimatePresence, motion } from 'motion/react';
import { ChangeSuccess } from '../ChangeSuccess/ChangeSuccess';
import { zodResolver } from '@hookform/resolvers/zod';
import { zodSchema } from './zodSchema';
import { GoogleProviderModal } from '../GoogleProviderModal/GoogleProviderModal';
import { ForgotPassword } from '../ForgotPassword/ui/ForgotPassword';
import * as Sentry from '@sentry/nextjs';

interface ChangePasswordProps {
  isGoogleProvider: boolean;
}

interface FormData {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
  isPasswordVisible: boolean;
}

export const ChangePassword: FC<ChangePasswordProps> = ({
  isGoogleProvider,
}) => {
  const user = useAppSelector((state) => state.userSliceReducer.user)!;

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    shouldUnregister: true,
    resolver: zodResolver(zodSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async ({
    password,
    newPassword,
  }) => {
    try {
      if (!auth.currentUser) throw new Error('Current user is null');

      await reauthenticateUser(auth.currentUser, user.email!, password);
      await updatePassword(auth.currentUser, newPassword);
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
      reset();
      setIsPasswordVisible(false);
      setIsNewPasswordVisible(false);
      setIsConfirmNewPasswordVisible(false);
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] =
    useState(false);

  if (isGoogleProvider) {
    return (
      <>
        <SettingsButton value='******' onPress={onOpen}>
          Password
        </SettingsButton>

        <GoogleProviderModal
          for='password'
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
        />
      </>
    );
  }

  return (
    <>
      <SettingsButton value='******' onPress={onOpen}>
        Password
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
                title='Your password has been updated'
                onClose={onClose}
              />
            ) : (
              <motion.form
                key='form'
                onSubmit={handleSubmit(onSubmit)}
                initial={{ transform: 'translateX(100%)' }}
                animate={{ transform: 'translateX(0%)' }}
                exit={{ transform: 'translateX(-100%)' }}
              >
                <ModalHeader>Change password</ModalHeader>

                <ModalBody>
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

                  <Controller
                    control={control}
                    name='newPassword'
                    render={({ field }) => (
                      <Input
                        type={isNewPasswordVisible ? 'text' : 'password'}
                        placeholder='New password'
                        errorMessage={errors.newPassword?.message}
                        isInvalid={Boolean(errors.newPassword?.message)}
                        endContent={
                          <TogglePasswordVisibilityButton
                            isVisible={isNewPasswordVisible}
                            setIsVisible={setIsNewPasswordVisible}
                          />
                        }
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name='confirmNewPassword'
                    render={({ field }) => (
                      <Input
                        type={isConfirmNewPasswordVisible ? 'text' : 'password'}
                        placeholder='Confirm new password'
                        errorMessage={errors.confirmNewPassword?.message}
                        isInvalid={Boolean(errors.confirmNewPassword?.message)}
                        endContent={
                          <TogglePasswordVisibilityButton
                            isVisible={isConfirmNewPasswordVisible}
                            setIsVisible={setIsConfirmNewPasswordVisible}
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
