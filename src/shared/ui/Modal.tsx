'use client';
import {
  Modal as NextUIModal,
  type ModalProps as NextUIModalProps,
} from '@nextui-org/react';
import { MotionProps } from 'framer-motion';
import { FC, useLayoutEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

export const Modal: FC<NextUIModalProps> = ({ children, ...rest }) => {
  const [mobileHeight, setMobileHeight] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 640px)');

  const motionProps: MotionProps = {
    initial: { transform: `translateY(${mobileHeight}px)` },
    animate: { transform: `translateY(0px)` },
    exit: { transform: `translateY(${mobileHeight}px)` },
    transition: {
      type: 'spring',
      duration: 0.6,
      bounce: 0,
      restDelta: 0.0001,
      restSpeed: 0.0001,
    },
  };

  useLayoutEffect(() => {
    setMobileHeight(modalRef.current?.getBoundingClientRect().height ?? 0); // TODO: refactor height calculations
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalRef.current]);

  // TODO: fix miss-positioning in PWA mode iOS?

  return (
    <NextUIModal
      ref={modalRef}
      motionProps={isMobile ? motionProps : undefined}
      classNames={{
        base: 'max-sm:max-h-fit max-sm:min-w-full max-sm:pb-safe max-sm:mb-0 max-sm:mx-0',
        closeButton: 'max-sm:hidden',
      }}
      {...rest}
    >
      {children}
    </NextUIModal>
  );
};
