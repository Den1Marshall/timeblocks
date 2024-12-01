'use client';
import { AnimatePresence, motion, Transition, Variants } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import {
  ColorSwatchProps as RACColorSwatchProps,
  ColorSwatch as RACColorSwatch,
} from 'react-aria-components';

interface ColorSwatchProps extends RACColorSwatchProps {
  i: number;
  isSelected: boolean;
}

export const ColorSwatch: FC<ColorSwatchProps> = ({
  i,
  isSelected,
  className,
  ...rest
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const transition: Transition = {
    type: 'spring',
    duration: isMounted ? 0.5 : 0.6,
    bounce: isMounted ? 0 : 0.5,
    delay: isMounted ? 0 : i * 0.075,
    restDelta: 0.0001,
    restSpeed: 0.0001,
  };

  const variants: Variants = {
    selected: {
      transform: 'scale(1.1)',
      opacity: 1,
    },

    notSelected: {
      transform: 'scale(1)',
      opacity: 0.5,
    },
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.div
      variants={variants}
      whileHover={'selected'}
      animate={isSelected ? 'selected' : 'notSelected'}
      transition={transition}
    >
      <RACColorSwatch
        className={`w-11 h-11 rounded cursor-pointer ${className}`}
        {...rest}
      />

      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            exit={{ width: '0%' }}
            className='absolute left-0 right-0 -bottom-1 w-full h-[1px] bg-content1-foreground'
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
