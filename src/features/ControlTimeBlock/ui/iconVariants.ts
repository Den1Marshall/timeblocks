import { defaultTransition } from '@/shared/ui';
import { Variants } from 'motion/react';

export const iconVariants: Variants = {
  enter: {
    transform: 'scale(1)',
    opacity: 1,
    transition: { ...defaultTransition, bounce: 0.4 },
  },
  exit: {
    transform: 'scale(0)',
    opacity: 0,
    transition: defaultTransition,
  },
};
