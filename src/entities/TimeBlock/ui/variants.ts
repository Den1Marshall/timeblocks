import { Variants } from 'motion/react';

export const variants: Variants = {
  enter: {
    transform: 'translateY(0%)',
    opacity: 1,
  },

  exit: {
    transform: 'translateY(-100%)',
    opacity: 0,
  },
};
