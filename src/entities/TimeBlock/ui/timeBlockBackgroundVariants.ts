import { Variants } from 'motion/react';

export const timeBlockBackgroundVariants: Variants = {
  enter: (completionPercentage) => ({
    transform: `translateX(${completionPercentage - 100}%)`,
  }),

  exit: {
    transform: 'translateX(-100%)',
  },
};
