'use client';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { AuthError } from 'next-firebase-auth-edge/lib/auth/error';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { SettingsButton } from './SettingsButton';
import { modalMotionProps } from '@/shared/ui';

export const Logout: FC = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const logout = async () => {
    try {
      await fetch('/api/logout');

      router.refresh();
    } catch (error) {
      error instanceof AuthError ? alert(error.message) : alert(error); // TODO: use nextui alert
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
