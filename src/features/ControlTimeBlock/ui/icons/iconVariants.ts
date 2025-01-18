import { defaultTransition } from '@/shared/ui';
import { Variants } from 'motion/react';

export const iconVariants: Variants = {
  enter: {
    scale: 1,
    opacity: 1,
    transition: { ...defaultTransition, bounce: 0.4 },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: defaultTransition,
  },
};
