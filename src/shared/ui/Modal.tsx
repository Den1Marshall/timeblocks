'use client';
import {
  Modal as NextUIModal,
  type ModalProps as NextUIModalProps,
} from '@nextui-org/react';
import { MotionProps } from 'motion/react';
import { FC, useRef } from 'react';
import { useMediaQuery } from 'usehooks-ts';

// TODO: use drawer?
export const Modal: FC<NextUIModalProps> = ({ children, ...rest }) => {
  const isMobile = useMediaQuery('(max-width: 640px)');

  const modalRef = useRef<HTMLDivElement>(null);
  const modalHeight = modalRef.current?.getBoundingClientRect().height;

  const motionProps: MotionProps = {
    initial: {
      transform: 'translateY(50%)',
    },
    animate: { transform: 'translateY(0%)' },
    exit: {
      transform: `translateY(${modalHeight + 'px'})`,
    },
  };

  return (
    <NextUIModal
      ref={modalRef}
      motionProps={isMobile ? motionProps : undefined}
      classNames={{
        base: 'max-sm:h-[auto] max-sm:max-h-[50%] max-sm:overflow-y-auto max-sm:min-w-full max-sm:pb-safe max-sm:mb-0 max-sm:mx-0',
        closeButton: 'max-sm:hidden',
      }}
      {...rest}
    >
      {children}
    </NextUIModal>
  );
};
