import { FC, PropsWithChildren } from 'react';
import { Button, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { motion } from 'motion/react';

interface ChangeSuccessProps extends PropsWithChildren {
  title: string;
  onClose: () => void;
}

export const ChangeSuccess: FC<ChangeSuccessProps> = ({
  children,
  title,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ transform: 'translateX(100%)' }}
      animate={{ transform: 'translateX(0%)' }}
      exit={{ transform: 'translateX(0%)' }}
    >
      <ModalHeader>{title}</ModalHeader>

      {children && <ModalBody>{children}</ModalBody>}

      <ModalFooter>
        <Button color='primary' onPress={onClose}>
          Done
        </Button>
      </ModalFooter>
    </motion.div>
  );
};
