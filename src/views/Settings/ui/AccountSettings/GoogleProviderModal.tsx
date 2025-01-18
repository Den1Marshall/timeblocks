import { modalMotionProps } from '@/shared/ui';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from '@heroui/react';
import { FC } from 'react';

interface GoogleProviderModalProps
  extends Required<Pick<ModalProps, 'isOpen' | 'onClose' | 'onOpenChange'>> {
  for: 'email' | 'password';
}

export const GoogleProviderModal: FC<GoogleProviderModalProps> = ({
  isOpen,
  onOpenChange,
  for: text,
  onClose,
}) => {
  return (
    <Modal
      placement='center'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop='blur'
      motionProps={modalMotionProps}
    >
      <ModalContent>
        <ModalHeader>You are currently logged in via Google</ModalHeader>

        <ModalBody>
          You are currently logged in via Google, so you can&apos;t change your{' '}
          {text} explicitly
        </ModalBody>

        <ModalFooter>
          <Button color='primary' onPress={onClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
