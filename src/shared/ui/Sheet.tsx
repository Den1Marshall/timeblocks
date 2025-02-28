'use client';

import { Drawer, type DrawerProps } from '@heroui/react';
import { MotionProps } from 'motion/react';
import { FC, useRef } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { defaultTransition } from './defaultTransition';

type SheetProps = Omit<
  DrawerProps,
  'ref' | 'motionProps' | 'placement' | 'hideCloseButton' | 'classNames'
>;

export const Sheet: FC<SheetProps> = ({ backdrop, children, ...rest }) => {
  const sm = useMediaQuery('(max-width: 640px)');

  const sheetRef = useRef<HTMLDivElement>(null);
  const sheetHeight = sheetRef.current?.getBoundingClientRect().height;
  const sheetWidth = sheetRef.current?.getBoundingClientRect().width;

  const mobileMotionProps: MotionProps = {
    transition: defaultTransition,

    variants: {
      enter: {
        transform: 'translateY(0%)',
      },

      exit: {
        transform: `translateY(${sheetHeight + 'px'})`,
      },
    },

    initial: {
      transform: 'translateY(100%)',
    },
    animate: 'enter',
    exit: 'exit',
  };

  const motionProps: MotionProps = {
    transition: defaultTransition,

    variants: {
      enter: {
        transform: 'translateX(0%)',
      },

      exit: {
        transform: `translateX(${sheetWidth + 'px'})`,
      },
    },

    initial: {
      transform: 'translateX(100%)',
    },
    animate: 'enter',
    exit: 'exit',
  };

  return (
    <Drawer
      {...rest}
      backdrop={backdrop ?? 'blur'}
      ref={sheetRef}
      motionProps={sm ? mobileMotionProps : motionProps}
      placement={sm ? 'bottom' : 'right'}
      hideCloseButton={sm}
      classNames={{
        base: 'max-sm:max-h-screen-safe max-sm:min-h-[33.33333%] no-scrollbar',
        footer: 'pb-safe',
      }}
    >
      {children}
    </Drawer>
  );
};
