import { MotionProps } from 'motion/react';

export const modalMotionProps: MotionProps = {
  variants: {
    enter: {
      transform: 'scale(1)',
      opacity: 1,
    },
    exit: { transform: 'scale(1.03)', opacity: 0 },
  },
};
