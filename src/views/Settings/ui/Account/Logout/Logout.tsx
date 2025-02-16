'use client';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { SettingsButton } from '../../SettingsButton/SettingsButton';
import { modalMotionProps } from '@/shared/ui';
import * as Sentry from '@sentry/nextjs';
import { useToast } from '@/shared/lib';

export const Logout: FC = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const toast = useToast();

  const logout = async () => {
    try {
      await fetch('/api/logout');

      router.refresh();
    } catch (error) {
      Sentry.captureException(error);

      toast({
        title: 'Failed to sign out',
        color: 'danger',
      });
    }
  };

  return (
    <>
      <SettingsButton onPress={onOpen}>Sign out</SettingsButton>

      <Modal
        placement='center'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop='blur'
        motionProps={modalMotionProps}
      >
        <ModalContent>
          <ModalHeader>Sign out</ModalHeader>

          <ModalBody>Are you sure?</ModalBody>

          <ModalFooter>
            <Button color='danger' variant='light' onPress={onClose}>
              Cancel
            </Button>

            <Button color='primary' onPress={logout}>
              Sign out
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
