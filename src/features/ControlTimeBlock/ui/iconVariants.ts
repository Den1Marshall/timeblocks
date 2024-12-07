import { Transition, Variants } from 'motion/react';

const transition: Transition = {
  type: 'spring',
  duration: 0.5,
  bounce: 0.4,
  restDelta: 0.0001,
  restSpeed: 0.0001,
};

export const iconVariants: Variants = {
  enter: {
    transform: 'scale(1)',
    opacity: 1,
    transition,
  },
  exit: {
    transform: 'scale(0)',
    opacity: 0,
    transition: {
      ...transition,
      duration: 1,
    },
  },
};
